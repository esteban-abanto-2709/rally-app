"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import { Project, UpdateProjectDto } from "@/types/project";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import Link from "next/link";

export default function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { user, token, logout, isLoading: isAuthLoading } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push("/login");
    }
  }, [user, isAuthLoading, router]);

  useEffect(() => {
    if (user && token) {
      loadProject();
    }
  }, [user, token, params.id]);

  const loadProject = async () => {
    if (!token || !params.id) return;

    try {
      const data = await api.get<Project>(`/projects/${params.id}`, token);
      setProject(data);
      setEditedName(data.name);
      setEditedDescription(data.description || "");
    } catch (error) {
      console.error("Failed to load project:", error);
      router.push("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!token || !project) return;

    setIsSaving(true);
    const updateData: UpdateProjectDto = {
      name: editedName !== project.name ? editedName : undefined,
      description:
        editedDescription !== project.description
          ? editedDescription
          : undefined,
    };

    // Si no hay cambios, solo salir del modo edición
    if (!updateData.name && !updateData.description) {
      setIsEditing(false);
      setIsSaving(false);
      return;
    }

    try {
      const updated = await api.patch<Project>(
        `/projects/${project.id}`,
        updateData,
        token,
      );
      setProject(updated);
      setEditedName(updated.name);
      setEditedDescription(updated.description || "");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update project:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (
      !token ||
      !project ||
      !confirm(
        "Are you sure you want to delete this project? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      await api.delete(`/projects/${project.id}`, token);
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  const handleCancel = () => {
    if (project) {
      setEditedName(project.name);
      setEditedDescription(project.description || "");
    }
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (isAuthLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user || !project) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-semibold text-lg">TaskFlow</div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Back Button */}
          <Button variant="ghost" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>

          {/* Project Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-4">
                  {isEditing ? (
                    <>
                      <div className="space-y-2">
                        <Input
                          value={editedName}
                          onChange={(e) => setEditedName(e.target.value)}
                          placeholder="Project name"
                          className="text-2xl font-bold"
                          disabled={isSaving}
                        />
                      </div>
                      <div className="space-y-2">
                        <Textarea
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                          placeholder="Project description (optional)"
                          rows={3}
                          disabled={isSaving}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSave} disabled={isSaving}>
                          <Save className="w-4 h-4 mr-2" />
                          {isSaving ? "Saving..." : "Save Changes"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleCancel}
                          disabled={isSaving}
                        >
                          Cancel
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <CardTitle className="text-3xl">{project.name}</CardTitle>
                      <p className="text-muted-foreground">
                        {project.description || "No description"}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsEditing(true)}
                        >
                          Edit Project
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Project
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-6 text-sm text-muted-foreground">
                <div>
                  <span className="font-medium">Created:</span>{" "}
                  {new Date(project.createdAt).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium">Updated:</span>{" "}
                  {new Date(project.updatedAt).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tasks Section - Preparado para Día 4 */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Tasks</h2>
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">
                  Tasks coming in Day 4!
                </p>
                <p className="text-sm text-muted-foreground">
                  You`&apos;`ll be able to create and manage tasks here soon.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
