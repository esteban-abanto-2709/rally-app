import { Priority } from "@/types/task";

export const getPriorityLabel = (priority: Priority) => {
  return priority?.replace("_", " ") || "MEDIUM";
};

export const getPriorityColorClass = (priority: Priority) => {
  switch (priority) {
    case Priority.VERY_HIGH:
      return "bg-destructive/10 text-destructive border-transparent";
    case Priority.HIGH:
      return "bg-warning-yellow/10 text-warning-yellow border-transparent";
    case Priority.MEDIUM:
      return "bg-variable-purple/10 text-variable-purple border-transparent";
    case Priority.LOW:
      return "bg-string-green/10 text-string-green border-transparent";
    default:
      return "bg-muted text-muted-foreground border-transparent";
  }
};
