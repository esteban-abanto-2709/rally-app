"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsGridProps {
  projectsCount: number;
}

export function StatsGrid({ projectsCount }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="border-border/60 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/10 transition-all">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-primary">{projectsCount}</div>
          <p className="text-xs text-muted-foreground mt-2">
            <span className="text-primary">{projectsCount} active</span>
          </p>
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/10 transition-all">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Active Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-primary">Coming soon</div>
          <p className="text-xs text-muted-foreground mt-2">
            <span className="text-primary">Coming soon</span>
          </p>
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/10 transition-all">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Completion Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-primary">Coming soon</div>
          <p className="text-xs text-muted-foreground mt-2">
            <span className="text-primary">Coming soon</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
