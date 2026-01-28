import { create } from "zustand";
import { Project, CreateProjectDto, UpdateProjectDto } from "@/types/project";
import { api } from "@/lib/api";
import { routes } from "@/lib/routes";

interface ProjectsState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  initialized: boolean;

  // Actions
  fetchProjects: (token: string) => Promise<void>;
  addProject: (data: CreateProjectDto, token: string) => Promise<Project>;
  updateProject: (
    id: string,
    data: UpdateProjectDto,
    token: string,
  ) => Promise<void>;
  removeProject: (id: string, token: string) => Promise<void>;
  reset: () => void;
}

export const useProjectsStore = create<ProjectsState>((set, get) => ({
  projects: [],
  isLoading: false,
  error: null,
  initialized: false,

  fetchProjects: async (token: string) => {
    // Evitar recargas innecesarias si ya está cargando o ya se inicializó recientemente
    // (Opcional: puedes quitar !get().initialized si quieres forzar recarga siempre)
    if (get().isLoading) return;

    set({ isLoading: true, error: null });
    try {
      const projects = await api.get<Project[]>(
        routes.api.projects.list(),
        token,
      );
      set({ projects, isLoading: false, initialized: true });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to fetch projects",
        isLoading: false,
      });
    }
  },

  addProject: async (data: CreateProjectDto, token: string) => {
    set({ isLoading: true, error: null });
    try {
      const newProject = await api.post<Project>(
        routes.api.projects.list(),
        data,
        token,
      );
      set((state) => ({
        projects: [newProject, ...state.projects],
        isLoading: false,
      }));
      return newProject;
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to create project",
        isLoading: false,
      });
      throw err;
    }
  },

  updateProject: async (id: string, data: UpdateProjectDto, token: string) => {
    // Optimistic update logic could go here, but for now simple await
    try {
      const updated = await api.patch<Project>(
        routes.api.projects.detail(id),
        data,
        token,
      );
      set((state) => ({
        projects: state.projects.map((p) => (p.id === id ? updated : p)),
      }));
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to update project",
      });
      throw err;
    }
  },

  removeProject: async (id: string, token: string) => {
    try {
      await api.delete(routes.api.projects.detail(id), token);
      set((state) => ({
        projects: state.projects.filter((p) => p.id !== id),
      }));
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to delete project",
      });
      throw err;
    }
  },

  reset: () =>
    set({ projects: [], isLoading: false, error: null, initialized: false }),
}));
