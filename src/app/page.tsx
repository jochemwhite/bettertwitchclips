import TwitchSearchBar from "@/components/search-bars/twitch-search";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TwitchSearchBar />
    </main>
  );
}
