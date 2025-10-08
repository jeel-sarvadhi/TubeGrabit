import { AdSpace } from "../ad-space";

export default function AdSpaceExample() {
  return (
    <div className="p-8 space-y-4 bg-background">
      <AdSpace width="728px" height="90px" label="728x90 Leaderboard" />
      <AdSpace width="300px" height="250px" label="300x250 Rectangle" />
    </div>
  );
}
