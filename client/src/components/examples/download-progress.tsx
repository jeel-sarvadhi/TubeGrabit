import { DownloadProgress } from "../download-progress";

export default function DownloadProgressExample() {
  return (
    <div className="p-8 bg-background max-w-md space-y-4">
      <DownloadProgress status="processing" progress={25} />
      <DownloadProgress status="converting" progress={75} />
      <DownloadProgress status="ready" progress={100} />
    </div>
  );
}
