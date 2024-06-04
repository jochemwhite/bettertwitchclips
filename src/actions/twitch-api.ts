"use server";

import { TwitchAPI } from "@/lib/axios/twitch-api";
import { ChannelSearchResults, GamesResponse, TwitchClipsResponse, TwitchUsersResponse } from "@/types/twitch-api";

export async function searchChatter(value: string, first: number = 10) {
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
  game_id?: string | null
}

export async function getClips({ pageParam = "", broadcaster_name, first = 20, game_id }: FetchClipsParams) {
  try {
    const user = await getBroadcasterId(broadcaster_name);

    const res = await TwitchAPI.get<TwitchClipsResponse>(`/clips`, {
      params: {
        broadcaster_id: user.data.data[0].id,
        first: first,
        after: pageParam,
      },
    });

    if(game_id) {
      const filteredClips = res.data.data.filter(clip => clip.game_id === game_id)
      return {
        data: filteredClips,
        nextCursor: res.data.pagination.cursor,
      };
    }


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

export async function getGameID(game: string, first: number = 5) {
  try {
    const res = await TwitchAPI.get<GamesResponse>(`/games`, {
      params: {
        name: game,
        first: first,
      },
    });

    console.log(res.data.data);

    return res.data.data
  } catch (error) {
    console.log(error);
  }
}
