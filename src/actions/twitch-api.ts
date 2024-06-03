"use server";

import { TwitchAPI } from "@/lib/axios/twitch-api";
import { ChannelSearchResults, TwitchClipsResponse, TwitchUsersResponse } from "@/types/twitch-api";

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

export async function getClips(broadcaster: string, first: number = 10) {
  try {
    const user = await getBroadcasterId(broadcaster);


    const res = await TwitchAPI.get<TwitchClipsResponse>(`/clips`, {
      params: {
        broadcaster_id: user.data.data[0].id,
        first: first,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
