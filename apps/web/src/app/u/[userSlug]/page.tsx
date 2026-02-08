"use client";

import { useRouter, useParams } from "next/navigation";
import { routes } from "@/lib/routes";
import { useProjects } from "@/hooks/useProjects";
import { useAuth } from "@/contexts/auth-context";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { ProjectsTable } from "@/components/dashboard/ProjectsTable";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";

export default function UserDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const userSlug = params.userSlug as string;
  const { projects, isLoading } = useProjects();
  const { user } = useAuth();

  const handleProjectClick = (projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (project && user) {
      router.push(routes.project(userSlug, project.slug));
    }
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <DashboardPageHeader />
          <StatsGrid projectsCount={projects.length} />
          <ProjectsTable
            projects={projects}
            onProjectClick={handleProjectClick}
          />
        </div>
      </div>
    </div>
  );
}
