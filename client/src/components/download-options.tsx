import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Video, Music, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface DownloadOptionsProps {
  onDownload: (format: string, quality: string) => void;
}

export function DownloadOptions({ onDownload }: DownloadOptionsProps) {
  const [videoQuality, setVideoQuality] = useState("720p");
  const [audioBitrate, setAudioBitrate] = useState("192kbps");

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="hover-elevate transition-shadow">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
              <Video className="h-5 w-5 text-primary" />
            </div>
            <Badge variant="secondary">MP4</Badge>
          </div>
          <CardTitle className="text-xl">Download Video</CardTitle>
          <CardDescription>
            Save the complete video with audio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Quality</label>
            <Select value={videoQuality} onValueChange={setVideoQuality}>
              <SelectTrigger data-testid="select-video-quality">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                <SelectItem value="720p">720p (HD)</SelectItem>
                <SelectItem value="480p">480p (SD)</SelectItem>
                <SelectItem value="360p">360p</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            className="w-full"
            onClick={() => onDownload("mp4", videoQuality)}
            data-testid="button-download-video"
          >
            <Download className="mr-2 h-4 w-4" />
            Download MP4
          </Button>
        </CardContent>
      </Card>

      <Card className="hover-elevate transition-shadow">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-destructive/10">
              <Music className="h-5 w-5 text-destructive" />
            </div>
            <Badge variant="secondary">MP3</Badge>
          </div>
          <CardTitle className="text-xl">Download Audio</CardTitle>
          <CardDescription>
            Extract audio only in MP3 format
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Bitrate</label>
            <Select value={audioBitrate} onValueChange={setAudioBitrate}>
              <SelectTrigger data-testid="select-audio-bitrate">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="320kbps">320 kbps (Best)</SelectItem>
                <SelectItem value="192kbps">192 kbps (High)</SelectItem>
                <SelectItem value="128kbps">128 kbps (Medium)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => onDownload("mp3", audioBitrate)}
            data-testid="button-download-audio"
          >
            <Download className="mr-2 h-4 w-4" />
            Download MP3
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
