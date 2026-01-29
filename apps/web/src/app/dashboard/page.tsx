"use client";

import { useRouter } from "next/navigation";

import { routes } from "@/lib/routes";
import { useProjects } from "@/hooks/useProjects";

import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { ProjectsTable } from "@/components/dashboard/ProjectsTable";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";

export default function DashboardNewPage() {
  const router = useRouter();
  const { projects, isLoading } = useProjects();

  const handleProjectClick = (projectId: string) => {
    router.push(routes.project(projectId));
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8">
      <DashboardPageHeader />
      <StatsGrid projectsCount={projects.length} />
      <ProjectsTable projects={projects} onProjectClick={handleProjectClick} />
    </div>
  );
}
