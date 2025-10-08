import { VideoPreview } from "../video-preview";

export default function VideoPreviewExample() {
  return (
    <div className="p-8 bg-background max-w-3xl">
      <VideoPreview
        thumbnail="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop"
        title="How to Build Amazing Web Applications with Modern Tools"
        duration="12:34"
        channel="Tech Channel"
      />
    </div>
  );
}
