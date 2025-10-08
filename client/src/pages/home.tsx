import { useState } from "react";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { UrlInput } from "@/components/url-input";
import { VideoPreview } from "@/components/video-preview";
import { DownloadOptions } from "@/components/download-options";
import { DownloadProgress } from "@/components/download-progress";
import { AdSpace } from "@/components/ad-space";
import { Footer } from "@/components/footer";
import { useToast } from "@/hooks/use-toast";

interface VideoData {
  title: string;
  thumbnail: string;
  duration: string;
  channel: string;
  videoId: string;
  url: string;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<{
    status: "processing" | "converting" | "ready";
    progress: number;
  } | null>(null);
  const { toast } = useToast();

  const handleFetchVideo = async (url: string) => {
    setIsLoading(true);
    setVideoData(null);
    setDownloadProgress(null);

    try {
      const response = await fetch("/api/video/info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch video information");
      }

      const data = await response.json();
      setVideoData({ ...data, url });
      toast({
        title: "Video fetched successfully",
        description: "Choose your preferred download format below",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch video",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (format: string, quality: string) => {
    if (!videoData) return;

    setDownloadProgress({ status: "processing", progress: 20 });

    try {
      const endpoint = format === "mp4" ? "/api/download/video" : "/api/download/audio";
      const queryParams = new URLSearchParams({
        url: videoData.url,
        ...(format === "mp4" && { quality }),
      });

      setDownloadProgress({ status: "converting", progress: 50 });

      // Create a hidden link and trigger download
      const downloadUrl = `${endpoint}?${queryParams}`;
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadProgress({ status: "ready", progress: 100 });
      
      setTimeout(() => {
        setDownloadProgress(null);
      }, 3000);

      toast({
        title: "Download started!",
        description: `Your ${format.toUpperCase()} file is downloading`,
      });
    } catch (error) {
      setDownloadProgress(null);
      toast({
        title: "Download failed",
        description: error instanceof Error ? error.message : "Failed to download file",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
      <Header />

      {/* Header Ad Banner - Desktop */}
      <div className="hidden md:flex justify-center py-4 border-b">
        <AdSpace width="728px" height="90px" label="Ad: 728x90 Leaderboard" />
      </div>

      {/* Header Ad Banner - Mobile */}
      <div className="md:hidden flex justify-center py-4 border-b">
        <AdSpace width="320px" height="50px" label="Ad: 320x50 Mobile" />
      </div>

      <HeroSection />

      <main className="flex-1 container mx-auto max-w-7xl px-4 pb-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            <UrlInput onFetch={handleFetchVideo} isLoading={isLoading} />

            {videoData && (
              <>
                <VideoPreview
                  thumbnail={videoData.thumbnail}
                  title={videoData.title}
                  duration={videoData.duration}
                  channel={videoData.channel}
                />

                {/* Ad Between Actions - Desktop */}
                <div className="hidden md:flex justify-center py-4">
                  <AdSpace width="336px" height="280px" label="Ad: 336x280 Rectangle" />
                </div>

                <DownloadOptions onDownload={handleDownload} />

                {downloadProgress && (
                  <DownloadProgress
                    status={downloadProgress.status}
                    progress={downloadProgress.progress}
                  />
                )}
              </>
            )}
          </div>

          {/* Sidebar Ad - Desktop Only */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-20 space-y-4">
              <AdSpace width="300px" height="250px" label="Ad: 300x250 Rectangle" className="mx-auto" />
              <AdSpace width="300px" height="600px" label="Ad: 300x600 Skyscraper" className="mx-auto" />
            </div>
          </aside>
        </div>
      </main>

      {/* Footer Ad Banner - Desktop */}
      <div className="hidden md:flex justify-center py-4 border-t">
        <AdSpace width="728px" height="90px" label="Ad: 728x90 Leaderboard" />
      </div>

      <Footer />
    </div>
  );
}
