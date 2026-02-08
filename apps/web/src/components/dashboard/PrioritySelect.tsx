"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Priority } from "@/types/task";

import { getPriorityColorClass } from "@/lib/priority";

interface PrioritySelectProps {
  value: Priority;
  onChange: (value: Priority) => void;
  disabled?: boolean;
}

export function PrioritySelect({
  value,
  onChange,
  disabled,
}: PrioritySelectProps) {
  const formattedValue = value || Priority.MEDIUM;

  return (
    <Select value={formattedValue} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger
        className={`w-[140px] border-none h-8 ${getPriorityColorClass(
          formattedValue,
        )}`}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={Priority.VERY_HIGH} className="text-destructive">
          Very High
        </SelectItem>
        <SelectItem value={Priority.HIGH} className="text-warning-yellow">
          High
        </SelectItem>
        <SelectItem value={Priority.MEDIUM} className="text-variable-purple">
          Medium
        </SelectItem>
        <SelectItem value={Priority.LOW} className="text-string-green">
          Low
        </SelectItem>
        <SelectItem value={Priority.VERY_LOW} className="text-muted-foreground">
          Very Low
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
