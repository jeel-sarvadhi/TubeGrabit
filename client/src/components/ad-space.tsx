import { cn } from "@/lib/utils";

interface AdSpaceProps {
  width: string;
  height: string;
  label: string;
  className?: string;
}

export function AdSpace({ width, height, label, className }: AdSpaceProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/30 bg-muted/30",
        className
      )}
      style={{ width, height }}
      data-testid={`ad-space-${label.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <span className="text-sm text-muted-foreground font-mono">{label}</span>
    </div>
  );
}
