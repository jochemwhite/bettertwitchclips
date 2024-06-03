import { z } from "zod";

const envSchema = z.object({
  TWITCH_CLIENT_ID: z.string(),
  TWITCH_SECRET: z.string(),
  TWITCH_APP_TOKEN: z.string(),
});


export const env = envSchema.parse(process.env);