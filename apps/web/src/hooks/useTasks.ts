"use client";
import { Priority } from "@/types/task";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/auth-context";
import { api } from "@/lib/api";
import { routes } from "@/lib/routes";
import { Task, CreateTaskDto, UpdateTaskDto, TaskStatus } from "@/types/task";

interface UseTasksOptions {
  projectId?: string; // Mantener por compatibilidad si es necesario, pero idealmente deprecated
  projectSlug?: string;
  featureSlug?: string;
  autoLoad?: boolean;
}

export function useTasks(options: UseTasksOptions = {}) {
  const { projectId, projectSlug, featureSlug, autoLoad = true } = options;
  const { token } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar tareas
  const loadTasks = useCallback(async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    if (!projectSlug || !featureSlug) {
      // Optional: Handle case where slugs are missing if needed, or just return
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const endpoint = routes.api.tasks.list(projectSlug, featureSlug);
      const data = await api.get<Task[]>(endpoint, token);
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load tasks");
      console.error("Failed to load tasks:", err);
    } finally {
      setIsLoading(false);
    }
  }, [token, projectSlug, featureSlug]);

  // Cargar al montar si autoLoad está activado
  useEffect(() => {
    if (autoLoad) {
      loadTasks();
    }
  }, [loadTasks, autoLoad]);

  // Obtener una tarea específica desde la API
  const getTask = useCallback(
    async (taskSlug: string): Promise<Task> => {
      if (!token || !projectSlug || !featureSlug)
        throw new Error("Missing params");

      try {
        setIsLoading(true);
        setError(null);
        const task = await api.get<Task>(
          routes.api.tasks.detail(projectSlug, featureSlug, taskSlug),
          token,
        );
        // Actualizar en el cache si existe
        setTasks((prev) => {
          const exists = prev.find((t) => t.id === task.id);
          if (exists) {
            return prev.map((t) => (t.id === task.id ? task : t));
          }
          return [task, ...prev];
        });
        return task;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load task");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [token, projectSlug, featureSlug],
  );

  // Crear tarea
  const createTask = async (data: CreateTaskDto): Promise<Task> => {
    if (!token || !projectSlug || !featureSlug)
      throw new Error("Missing params");

    const newTask = await api.post<Task>(
      routes.api.tasks.list(projectSlug, featureSlug),
      data,
      token,
    );
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  };

  // Actualizar tarea (usando Slug o ID, el backend prefiere ID para patch usualmente, pero la ruta es jerarquica)
  // El backend PATCH route es: /p/:pSlug/f/:fSlug/t/:tSlug
  // Necesitamos el taskSlug para la URL.
  // Nota: Si el frontend solo tiene el ID, necesitaremos buscar el slug o cambiar la API para aceptar ID en update.
  // Asumamos por ahora que pasamos el slug o que el objeto task lo tiene.
  const updateTask = async (
    taskSlug: string,
    data: UpdateTaskDto,
  ): Promise<Task> => {
    if (!token || !projectSlug || !featureSlug)
      throw new Error("Missing params");

    const updated = await api.patch<Task>(
      routes.api.tasks.detail(projectSlug, featureSlug, taskSlug),
      data,
      token,
    );
    // Update cache using ID since it's stable, or just map
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    return updated;
  };

  // Actualizar solo el status (helper común)
  const updateTaskStatus = async (
    task: Task, // Pasamos la tarea entera para tener el slug
    status: TaskStatus,
  ): Promise<Task> => {
    return updateTask(task.slug, { status });
  };

  // Actualizar solo la prioridad (helper común)
  const updateTaskPriority = async (
    task: Task,
    priority: Priority,
  ): Promise<Task> => {
    return updateTask(task.slug, { priority });
  };

  // Eliminar tarea
  const deleteTask = async (taskSlug: string): Promise<void> => {
    if (!token || !projectSlug || !featureSlug)
      throw new Error("Missing params");

    await api.delete(
      routes.api.tasks.detail(projectSlug, featureSlug, taskSlug),
      token,
    );
    setTasks((prev) => prev.filter((t) => t.slug !== taskSlug));
  };

  // Obtener una tarea por ID (del cache)
  const getTaskById = (id: string): Task | undefined => {
    return tasks.find((t) => t.id === id);
  };

  return {
    tasks,
    isLoading,
    error,
    loadTasks,
    getTask,
    createTask,
    updateTask,
    updateTaskStatus,
    updateTaskPriority,
    deleteTask,
    getTaskById,
  };
}
