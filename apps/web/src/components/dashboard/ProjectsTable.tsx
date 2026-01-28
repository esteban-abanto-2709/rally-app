"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FolderKanban } from "lucide-react";
import { Project } from "@/types/project";
import { CreateProjectDialog } from "@/components/dashboard/CreateProjectDialog";

interface ProjectsTableProps {
  projects: Project[];
  onProjectClick: (projectId: string) => void;
}

export function ProjectsTable({
  projects,
  onProjectClick,
}: ProjectsTableProps) {
  return (
    <Card className="border-border/60 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Your Projects</CardTitle>
          <CreateProjectDialog />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow
                key={project.id}
                className="cursor-pointer hover:bg-accent/50"
                onClick={() => onProjectClick(project.id)}
              >
                <TableCell>
                  <div className="w-10 h-10 rounded-lg bg-linear-to-br from-primary to-primary/80 flex items-center justify-center">
                    <FolderKanban className="w-5 h-5 text-primary-foreground" />
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">
                      {project.name}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(project.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
