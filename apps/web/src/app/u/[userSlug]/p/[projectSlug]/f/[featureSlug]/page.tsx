"use client";

import { useState, useEffect } from "react"; // Added useEffect
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Task, CreateTaskDto, TaskStatus, Priority } from "@/types/task";
import { Feature, CreateFeatureDto } from "@/types/feature"; // Import Feature type
import { ArrowLeft, Save, Trash2, Plus } from "lucide-react";
import Link from "next/link";

// Removed useProjects
import { useTasks } from "@/hooks/useTasks";
import { useFeatures } from "@/hooks/useFeatures"; // Import useFeatures
import { useFeatureEditor } from "@/hooks/useFeatureEditor"; // Import hook
import { useDialogState } from "@/hooks/useDialogState";
import { routes } from "@/lib/routes";

import { ProjectDetailSkeleton } from "@/components/dashboard/ProjectDetailSkeleton"; // Kept for now, could be FeatureDetailSkeleton
import { StatusSelect } from "@/components/dashboard/StatusSelect";
import { PrioritySelect } from "@/components/dashboard/PrioritySelect";

export default function FeatureDetailPage() {
  const params = useParams();
  const userSlug = params.userSlug as string;
  const projectSlug = params.projectSlug as string;
  const featureSlug = params.featureSlug as string;

  // Removed useProjects and related destructuring

  const {
    isLoading: isLoadingFeatures, // Changed from isLoadingProjects
    getFeature, // From useFeatures
    updateFeature, // From useFeatures
    deleteFeature, // From useFeatures
  } = useFeatures({ projectSlug }); // Use useFeatures for feature operations

  const [feature, setFeature] = useState<Feature | null>(null); // State for the current feature

  useEffect(() => {
    if (featureSlug) {
      getFeature(featureSlug).then(setFeature);
    }
  }, [featureSlug, getFeature]);

  /*
   * Feature: Tasks are now fetched using hierarchical slugs.
   * We pass projectSlug and featureSlug to the hook.
   */
  const {
    tasks,
    isLoading: isLoadingTasks,
    createTask,
    updateTaskStatus,
    updateTaskPriority,
  } = useTasks({ projectSlug, featureSlug });

  const isLoading = isLoadingFeatures || (feature && isLoadingTasks); // Updated isLoading logic

  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();

  const handleUpdateFeature = async (
    slug: string,
    data: Partial<CreateFeatureDto>,
  ) => {
    const updated = await updateFeature(slug, data);
    if (updated) {
      setFeature(updated);
    }
    return updated;
  };

  const editor = useFeatureEditor({
    feature,
    onUpdate: handleUpdateFeature,
  });
  const taskDialog = useDialogState();
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  const handleDelete = async () => {
    if (
      !feature || // Check feature instead of project
      !confirm(
        "Are you sure you want to delete this feature? This action cannot be undone.", // Updated message
      )
    ) {
      return;
    }

    try {
      await deleteFeature(feature.id); // Delete feature
      router.push(routes.project(userSlug, projectSlug)); // Redirect to project detail
    } catch (error) {
      console.error("Failed to delete feature:", error); // Updated error message
    }
  };

  const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!feature) return; // Check feature instead of project

    setIsCreatingTask(true);
    const formData = new FormData(e.currentTarget);
    const taskData: CreateTaskDto = {
      title: formData.get("title") as string,
      description: (formData.get("description") as string) || undefined,
      projectId: feature.projectId,
    };

    try {
      await createTask(taskData);
      taskDialog.close();
      e.currentTarget.reset();
    } catch (error) {
      console.error("Failed to create task:", error);
    } finally {
      setIsCreatingTask(false);
    }
  };

  /*
   * Updated handlers to accept the full Task object.
   * This is required because the new useTasks hook needs the task's slug for updates.
   */
  const handleStatusChange = async (task: Task, newStatus: TaskStatus) => {
    try {
      await updateTaskStatus(task, newStatus);
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  const handlePriorityChange = async (task: Task, newPriority: Priority) => {
    try {
      await updateTaskPriority(task, newPriority);
    } catch (error) {
      console.error("Failed to update task priority:", error);
    }
  };

  if (isAuthLoading || isLoading) {
    return <ProjectDetailSkeleton />;
  }

  if (!user || !feature) {
    // Check feature instead of project
    return (
      <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
        Feature not found {/* Updated message */}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Button variant="ghost" asChild>
            <Link href={routes.project(userSlug, projectSlug)}>
              {" "}
              {/* Corrected back link */}
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Project
            </Link>
          </Button>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-4">
                  {editor.isEditing ? (
                    <>
                      <div className="space-y-2">
                        <Input
                          value={editor.editedData.name}
                          onChange={(e) =>
                            editor.handleChange("name", e.target.value)
                          }
                          placeholder="Feature name"
                          className="text-2xl font-bold"
                          disabled={editor.isSaving}
                        />
                      </div>
                      <div className="space-y-2">
                        <Textarea
                          value={editor.editedData.description}
                          onChange={(e) =>
                            editor.handleChange("description", e.target.value)
                          }
                          placeholder="Feature description (optional)"
                          rows={3}
                          disabled={editor.isSaving}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={editor.handleSave}
                          disabled={editor.isSaving}
                        >
                          <Save className="w-4 h-4 mr-2" />
                          {editor.isSaving ? "Saving..." : "Save Changes"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={editor.handleCancel}
                          disabled={editor.isSaving}
                        >
                          Cancel
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <CardTitle className="text-3xl">{feature.name}</CardTitle>{" "}
                      {/* Use feature.name */}
                      <p className="text-muted-foreground">
                        {feature.description || "No description"}{" "}
                        {/* Use feature.description */}
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={editor.startEditing}>
                          Edit Feature {/* Updated button text */}
                        </Button>
                        <Button
                          variant="ghost"
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive border border-destructive/20"
                          onClick={handleDelete}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Feature {/* Updated button text */}
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
                  {new Date(feature.createdAt).toLocaleDateString()}{" "}
                  {/* Use feature.createdAt */}
                </div>
                <div>
                  <span className="font-medium">Updated:</span>{" "}
                  {new Date(feature.updatedAt).toLocaleDateString()}{" "}
                  {/* Use feature.updatedAt */}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  Tasks ({tasks.length})
                </CardTitle>
                <Dialog
                  open={taskDialog.isOpen}
                  onOpenChange={taskDialog.setIsOpen}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      New Task
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Task</DialogTitle>
                      <DialogDescription>
                        Add a new task to this project
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCreateTask} className="space-y-4">
                      <div className="space-y-2">
                        <Input
                          id="title"
                          name="title"
                          placeholder="Task title"
                          required
                          disabled={isCreatingTask}
                        />
                      </div>
                      <div className="space-y-2">
                        <Textarea
                          id="description"
                          name="description"
                          placeholder="Task description (optional)"
                          disabled={isCreatingTask}
                        />
                      </div>
                      <div className="flex gap-3 justify-end">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={taskDialog.close}
                          disabled={isCreatingTask}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isCreatingTask}>
                          {isCreatingTask ? "Creating..." : "Create Task"}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {tasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground mb-4">
                    No tasks yet. Create your first task to get started!
                  </p>
                  <Button onClick={taskDialog.open}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Task
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell>
                          <div>
                            <Link
                              href={routes.task(
                                userSlug,
                                projectSlug,
                                featureSlug,
                                task.slug,
                              )}
                              className="font-medium hover:underline"
                            >
                              {task.title}
                            </Link>
                          </div>
                        </TableCell>
                        <TableCell>
                          <PrioritySelect
                            value={task.priority}
                            onChange={(value) =>
                              handlePriorityChange(task, value)
                            }
                          />
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(task.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <StatusSelect
                            value={task.status}
                            onChange={(value) =>
                              handleStatusChange(task, value)
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
