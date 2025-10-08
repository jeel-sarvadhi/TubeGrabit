import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface VideoPreviewProps {
  thumbnail: string;
  title: string;
  duration: string;
  channel: string;
}

export function VideoPreview({
  thumbnail,
  title,
  duration,
  channel,
}: VideoPreviewProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-shrink-0 w-full sm:w-48 aspect-video rounded-md overflow-hidden bg-muted">
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover"
              data-testid="img-video-thumbnail"
            />
            <Badge
              variant="secondary"
              className="absolute bottom-2 right-2 bg-black/70 text-white border-0"
            >
              {duration}
            </Badge>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2" data-testid="text-video-title">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground" data-testid="text-channel-name">
              {channel}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
