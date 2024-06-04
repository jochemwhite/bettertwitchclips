"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import TwitchSearchBar from "../search-bars/twitch-channel-search";
import TwitchGameSearchBar from "../search-bars/twitch-game-search";

const formSchema = z.object({
  broadcaster: z.string().min(4).max(20),
  game: z.string().min(4).max(100).optional(),
});

export function GetClipsForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      broadcaster: "",
      game: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push(`/clips/${values.broadcaster}?game_id=${values.game}`);

    console.log(values);
  }

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(onSubmit)}>
        <div className="flex items-center justify-center">
          <FormField
            control={form.control}
            name="broadcaster"
            render={({ field }) => (
              <FormItem className="w-1/2 mr-2">
                <FormControl>
                  <TwitchSearchBar setValue={(value) => field.onChange(value)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="game"
            render={({ field }) => (
              <FormItem className="w-1/2 ml-2">
                <FormControl>
                  <TwitchGameSearchBar setValue={(value) => field.onChange(value)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
