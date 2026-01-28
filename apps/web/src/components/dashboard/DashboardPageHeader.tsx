"use client";

interface DashboardPageHeaderProps {
  title?: string;
  subtitle?: string;
}

export function DashboardPageHeader({
  title = "Welcome back!",
  subtitle = "Here is a summary of your projects.",
}: DashboardPageHeaderProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-foreground via-primary to-primary bg-clip-text text-transparent">
        {title}
      </h1>
      <p className="text-muted-foreground text-lg">{subtitle}</p>
    </div>
  );
}
