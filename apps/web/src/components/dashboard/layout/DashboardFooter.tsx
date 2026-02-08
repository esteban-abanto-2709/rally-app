"use client";

export default function DashboardFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-card/30 backdrop-blur-sm">
      <div className="px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          {/* Left Side */}
          <div className="flex items-center gap-4">
            <span>© {currentYear} Rally</span>
            <span className="hidden sm:inline text-border">•</span>
            <span className="hidden sm:inline">
              Made with ❤️ for productivity
            </span>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <span className="text-border">•</span>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <span className="text-border">•</span>
            <a href="#" className="hover:text-foreground transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
