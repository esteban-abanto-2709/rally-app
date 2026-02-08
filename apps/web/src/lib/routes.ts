export const routes = {
  home: () => "/",
  login: () => "/?auth=login",

  userDashboard: (userSlug: string) => `/u/${userSlug}`,
  project: (userSlug: string, projectSlug: string) =>
    `/u/${userSlug}/p/${projectSlug}`,
  task: (
    userSlug: string,
    projectSlug: string,
    featureSlug: string,
    taskSlug: string,
  ) => `/u/${userSlug}/p/${projectSlug}/f/${featureSlug}/t/${taskSlug}`,

  help: (userSlug: string) => `/u/${userSlug}/help`,

  api: {
    auth: {
      login: () => "/auth/login",
      register: () => "/auth/register",
      me: () => "/auth/me",
    },
    projects: {
      list: () => "/p",
      detail: (slug: string) => `/p/${slug}`,
    },
    features: {
      list: (projectSlug: string) => `/p/${projectSlug}/f`,
      detail: (projectSlug: string, featureSlug: string) =>
        `/p/${projectSlug}/f/${featureSlug}`,
    },
    tasks: {
      list: (projectSlug: string, featureSlug: string) =>
        `/p/${projectSlug}/f/${featureSlug}/t`,
      detail: (projectSlug: string, featureSlug: string, taskSlug: string) =>
        `/p/${projectSlug}/f/${featureSlug}/t/${taskSlug}`,
    },
  },
} as const;
