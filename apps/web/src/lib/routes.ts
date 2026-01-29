export const routes = {
  // PUBLIC
  home: () => "/",
  login: () => "/login",
  register: () => "/register",

  // DASHBOARD
  dashboard: () => "/dashboard",
  help: () => "/dashboard/help",

  // PROJECTS
  project: (projectId: string) => `/dashboard/projects/${projectId}`,

  // TASKS
  task: (projectId: string, taskId: string) =>
    `/dashboard/projects/${projectId}/tasks/${taskId}`,

  // API (opcional)
  api: {
    auth: {
      login: () => "/auth/login",
      register: () => "/auth/register",
      me: () => "/auth/me",
    },
    projects: {
      list: () => "/projects",
      detail: (projectId: string) => `/projects/${projectId}`,
    },
    tasks: {
      list: (projectId?: string) =>
        projectId ? `/tasks?projectId=${projectId}` : "/tasks",
      detail: (taskId: string) => `/tasks/${taskId}`,
    },
  },
} as const;
