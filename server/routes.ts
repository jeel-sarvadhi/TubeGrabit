import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import ytdl from "@distube/ytdl-core";

export async function registerRoutes(app: Express): Promise<Server> {
  // Fetch video info
  app.post("/api/video/info", async (req, res) => {
    try {
      const { url } = z.object({ url: z.string().url() }).parse(req.body);

      if (!ytdl.validateURL(url)) {
        return res.status(400).json({ error: "Invalid YouTube URL" });
      }

      const info = await ytdl.getInfo(url);
      const videoDetails = info.videoDetails;

      res.json({
        title: videoDetails.title,
        thumbnail: videoDetails.thumbnails[videoDetails.thumbnails.length - 1].url,
        duration: formatDuration(parseInt(videoDetails.lengthSeconds)),
        channel: videoDetails.author.name,
        videoId: videoDetails.videoId,
      });
    } catch (error) {
      console.error("Error fetching video info:", error);
      res.status(500).json({ error: "Failed to fetch video information" });
    }
  });

  // Download video (MP4)
  app.get("/api/download/video", async (req, res) => {
    try {
      const { url, quality } = z.object({
        url: z.string().url(),
        quality: z.string().optional().default("highest"),
      }).parse(req.query);

      if (!ytdl.validateURL(url)) {
        return res.status(400).json({ error: "Invalid YouTube URL" });
      }

      const info = await ytdl.getInfo(url);
      const title = info.videoDetails.title.replace(/[^\w\s]/gi, '');

      res.setHeader("Content-Disposition", `attachment; filename="${title}.mp4"`);
      res.setHeader("Content-Type", "video/mp4");

      const videoStream = ytdl(url, {
        quality: quality === "highest" ? "highestvideo" : "lowestvideo",
        filter: "videoandaudio",
      });

      videoStream.pipe(res);

      videoStream.on("error", (error) => {
        console.error("Stream error:", error);
        if (!res.headersSent) {
          res.status(500).json({ error: "Download failed" });
        }
      });
    } catch (error) {
      console.error("Error downloading video:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to download video" });
      }
    }
  });

  // Download audio (MP3)
  app.get("/api/download/audio", async (req, res) => {
    try {
      const { url } = z.object({
        url: z.string().url(),
      }).parse(req.query);

      if (!ytdl.validateURL(url)) {
        return res.status(400).json({ error: "Invalid YouTube URL" });
      }

      const info = await ytdl.getInfo(url);
      const title = info.videoDetails.title.replace(/[^\w\s]/gi, '');

      res.setHeader("Content-Disposition", `attachment; filename="${title}.mp3"`);
      res.setHeader("Content-Type", "audio/mpeg");

      const audioStream = ytdl(url, {
        quality: "highestaudio",
        filter: "audioonly",
      });

      audioStream.pipe(res);

      audioStream.on("error", (error) => {
        console.error("Stream error:", error);
        if (!res.headersSent) {
          res.status(500).json({ error: "Download failed" });
        }
      });
    } catch (error) {
      console.error("Error downloading audio:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to download audio" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}
