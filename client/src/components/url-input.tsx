import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link as LinkIcon, Loader2 } from "lucide-react";

interface UrlInputProps {
  onFetch: (url: string) => void;
  isLoading?: boolean;
}

export function UrlInput({ onFetch, isLoading = false }: UrlInputProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onFetch(url.trim());
    }
  };

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    setUrl(text);
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Paste YouTube URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pl-10 font-mono text-sm"
                data-testid="input-youtube-url"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handlePaste}
              data-testid="button-paste"
            >
              Paste
            </Button>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={!url.trim() || isLoading}
            data-testid="button-fetch-video"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Fetching...
              </>
            ) : (
              "Fetch Video"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
