"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/auth-context";
import { api } from "@/lib/api";
import { Project, UpdateProjectDto } from "@/types/project";
import { useProjectsStore } from "@/store/useProjectsStore";

export function useProject(projectId: string | undefined) {
  const { token } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Access the global store actions
  const removeProjectFromStore = useProjectsStore(
    (state) => state.removeProject,
  );
  const updateProjectInStore = useProjectsStore((state) => state.updateProject);

  // Cargar proyecto
  const loadProject = useCallback(async () => {
    if (!token || !projectId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await api.get<Project>(`/projects/${projectId}`, token);
      setProject(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load project");
      console.error("Failed to load project:", err);
    } finally {
      setIsLoading(false);
    }
  }, [token, projectId]);

  // Cargar al montar o cuando cambie el ID
  useEffect(() => {
    loadProject();
  }, [loadProject]);

  // Actualizar proyecto
  const updateProject = async (data: UpdateProjectDto): Promise<Project> => {
    if (!token || !projectId) throw new Error("Missing token or project ID");

    // Call API and update local state
    const updated = await api.patch<Project>(
      `/projects/${projectId}`,
      data,
      token,
    );
    setProject(updated);

    // Sync with global store
    updateProjectInStore(projectId, data, token).catch((err) =>
      console.warn("Failed to sync update with global store", err),
    );

    return updated;
  };

  // Eliminar proyecto
  const deleteProject = async (): Promise<void> => {
    if (!token || !projectId) throw new Error("Missing token or project ID");

    // Use store action which handles API call and state update
    await removeProjectFromStore(projectId, token);
    setProject(null);
  };

  return {
    project,
    isLoading,
    error,
    loadProject,
    updateProject,
    deleteProject,
  };
}
