"use client";
import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getClips } from "@/actions/twitch-api";
import ClipCard from "./cards/clip-card";
import { useInView } from 'react-intersection-observer'

interface Props {
  broadcaster_name: string;
}

const TwitchClips: React.FC<Props> = ({ broadcaster_name }) => {
  const {ref, inView} = useInView();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, error } = useInfiniteQuery({
    queryKey: ["twitchClips", broadcaster_name],
    queryFn: ({ pageParam }) => getClips({ pageParam, broadcaster_name }),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: "", // Add this line
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <div className="w-full">
      {status === "error" && <p>Error: {(error as Error).message}</p>}

      {data?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          <div className="grid grid-cols-4 gap-4 w-full">
            {page.data.map((clip) => (
              <div key={clip.id}>
                <ClipCard clip={clip} innerRef={ref} />
              </div>
            ))}
          </div>
        </React.Fragment>
      ))}

      <div>
        <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
          {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Load More" : "Nothing more to load"}
        </button>
      </div>
    </div>
  );
};

export default TwitchClips;
