export interface ChannelSearchResults {
  data: ChannelSearchResult[];
}

export interface ChannelSearchResult {
  broadcaster_language: string; // The ISO 639-1 two-letter language code of the language used by the broadcaster.
  broadcaster_login: string; // The broadcaster’s login name.
  display_name: string; // The broadcaster’s display name.
  game_id: string; // The ID of the game that the broadcaster is playing or last played.
  game_name: string; // The name of the game that the broadcaster is playing or last played.
  id: string; // An ID that uniquely identifies the channel (this is the broadcaster’s ID).
  is_live: boolean; // A Boolean value that determines whether the broadcaster is streaming live. Is true if the broadcaster is streaming live; otherwise, false.
  tag_ids: string[]; // IMPORTANT: As of February 28, 2023, this field is deprecated and returns only an empty array. If you use this field, please update your code to use the tags field.
  tags: string[]; // The tags applied to the channel.
  thumbnail_url: string; // A URL to a thumbnail of the broadcaster’s profile image.
  title: string; // The stream’s title. Is an empty string if the broadcaster didn’t set it.
  started_at: string; // The UTC date and time (in RFC3339 format) of when the broadcaster started streaming. The string is empty if the broadcaster is not streaming live.
}

// Interface for a single user object in the response
interface User {
  id: string;
  login: string;
  display_name: string;
  type: string; // May be empty string based on the example
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
  email: string; // Might be a placeholder value based on the example
  created_at: string; // Assuming it's a string representation of a date
}

// Interface for the entire response structure
interface TwitchUsersResponse {
  data: User[];
}

// Interface for Pagination object
interface Pagination {
  cursor?: string; // Optional cursor for next/previous page
}

// Interface for a single clip object in the response
export interface Clip {
  id: string;
  url: string;
  embed_url: string;
  broadcaster_id: string;
  broadcaster_name: string;
  creator_id: string;
  creator_name: string;
  video_id: string;
  game_id: string;
  language: string; // ISO 639-1 two-letter code
  title: string;
  view_count: number;
  created_at: string; // RFC3339 format date/time
  thumbnail_url: string;
  duration: number; // Clip length in seconds (float with 0.1 precision)
  vod_offset?: number; // Zero-based offset in seconds (null if unavailable)
  is_featured: boolean;
}

// Interface for the entire response structure
interface TwitchClipsResponse {
  data: Clip[];
  pagination: Pagination;
}

type Game = {
  id: string;
  name: string;
  box_art_url: string;
  igdb_id: string;
};

export type GamesResponse = {
  data: Game[];
};
