import { Download } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
            <Download className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">YT Downloader</span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
