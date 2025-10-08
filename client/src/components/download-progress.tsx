import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Loader2 } from "lucide-react";

interface DownloadProgressProps {
  status: "processing" | "converting" | "ready";
  progress: number;
}

export function DownloadProgress({ status, progress }: DownloadProgressProps) {
  const statusMessages = {
    processing: "Fetching video...",
    converting: "Converting file...",
    ready: "Download ready!",
  };

  const statusColors = {
    processing: "text-primary",
    converting: "text-primary",
    ready: "text-green-600 dark:text-green-400",
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {status === "ready" ? (
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            ) : (
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            )}
            <span className={`font-medium ${statusColors[status]}`} data-testid="text-download-status">
              {statusMessages[status]}
            </span>
          </div>
          <Progress value={progress} className="h-2" data-testid="progress-download" />
          <p className="text-sm text-muted-foreground text-center" data-testid="text-progress-percentage">
            {progress}%
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
