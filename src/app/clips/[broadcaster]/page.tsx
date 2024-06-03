import TwitchClips from "@/components/infinite-scroll";

export default async function Page({ params }: { params: { broadcaster: string } }) {

  return (
    <div className="">
      <TwitchClips broadcaster_name={params.broadcaster} />

    </div>
  )
}
