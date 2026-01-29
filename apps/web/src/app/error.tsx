"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-destructive" />
            <CardTitle className="text-2xl font-bold">
              Something went wrong
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            We encountered an unexpected error. Don&apos;t worry, your data is
            safe.
          </p>

          {process.env.NODE_ENV === "development" && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm font-mono text-destructive">
                {error.message}
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <Button onClick={reset} className="flex-1">
              Try again
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
              className="flex-1"
            >
              Go home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
