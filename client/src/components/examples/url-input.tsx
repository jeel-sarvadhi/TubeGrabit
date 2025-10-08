import { UrlInput } from "../url-input";

export default function UrlInputExample() {
  return (
    <div className="p-8 bg-background max-w-2xl">
      <UrlInput
        onFetch={(url) => console.log("Fetching:", url)}
        isLoading={false}
      />
    </div>
  );
}
