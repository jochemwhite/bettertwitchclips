import { getClips } from "@/actions/twitch-api";
import EmbeddedClip from "@/components/clips/embedded-clip";

export default async function Page({ params }: { params: { broadcaster: string } }) {
  const clips = await getClips(params.broadcaster);

  if(!clips) {
    return <div>Clips not found</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {clips.map((clip, index) => (
        <EmbeddedClip embed_url={clip.embed_url} height="300" width="400" key={index} />
      ))}
    </div>
  )
}
