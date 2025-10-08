import { DownloadOptions } from "../download-options";

export default function DownloadOptionsExample() {
  return (
    <div className="p-8 bg-background max-w-4xl">
      <DownloadOptions
        onDownload={(format, quality) =>
          console.log(`Downloading ${format} at ${quality}`)
        }
      />
    </div>
  );
}
