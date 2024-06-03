"use server";

import { TwitchAPI } from "@/lib/axios/twitch-api";
import { ChannelSearchResults, TwitchClipsResponse, TwitchUsersResponse } from "@/types/twitch-api";

export async function searchChatter(value: string, first: number = 10, ) {
  
  try {
    const res = await TwitchAPI.get<ChannelSearchResults>(`/search/channels`, {
      params: {
        query: value,
        first: first,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getBroadcasterId(broadcaster: string) {
  const res = await TwitchAPI.get<TwitchUsersResponse>(`/users`, {
    params: {
      login: broadcaster,
    },
  });
  return res;
}

interface FetchClipsParams {
  pageParam?: string;
  broadcaster_name: string;
  first?: number;
}

export async function getClips({ pageParam = '', broadcaster_name, first = 20 }: FetchClipsParams) {
  try {
    const user = await getBroadcasterId(broadcaster_name);

    const res = await TwitchAPI.get<TwitchClipsResponse>(`/clips`, {
      params: {
        broadcaster_id: user.data.data[0].id,
        first: first,
        after: pageParam,
      },
    });

    // Sort by date
    res.data.data.sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    return {
      data: res.data.data,
      nextCursor: res.data.pagination.cursor,
    };
  } catch (error) {
    console.error(error);
    return {
      data: [],
      nextCursor: undefined,
    };
  }
}

export async function getGameID(game: string) {
  try {
    const res = await TwitchAPI.get(`/games`, {
      params: {
        name: game,
      },
    });
    console.log(res.data);
    return res.data.data[0].id;
  } catch (error) {
    console.log(error);
  }
}
