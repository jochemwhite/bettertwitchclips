"use client";
import React, { useEffect, useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChannelSearchResult } from "@/types/twitch-api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { searchChatter } from "@/actions/twitch-api";
import { SearchBar } from "../ui/search-bar";
import Link from "next/link";

interface results extends ChannelSearchResult {
  exactMatch?: boolean;
}

export default function TwitchSearchBar() {
  const [results, setResults] = useState<results[]>([]);

  const search = async (searchTerm: string) => {
    const data = await searchChatter(searchTerm, 5);
    if (data) {
      setResults(data);

      const match = data.find((channel: ChannelSearchResult) => channel.display_name.toLowerCase() === searchTerm.toLowerCase());
      if (match) {
        const newResults: results[] = data.map((channel: ChannelSearchResult) => {
          if (channel.display_name.toLowerCase() === searchTerm.toLowerCase()) {
            return { ...channel, exactMatch: true };
          }
          return channel;
        });

        newResults.sort((a, b) => {
          if (a.exactMatch) {
            return -1;
          }
          return 0;
        });

        setResults(newResults);
      }
    } else {
      toast.error("Error searching for chatters.");
    }
  };

  return (
    <SearchBar
      results={results}
      setResults={setResults}
      search={search}
      placeholder="Search for a streamer"
      Component={() => (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]" />
              <TableHead>Name</TableHead>
              <TableHead className="w-[100px]" align="char">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((channel) => (
              <TableRow key={channel.id}>
                <TableCell className="font-medium">
                  <img src={channel.thumbnail_url} className="w-8 h-8 rounded-full" />
                </TableCell>
                <TableCell>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="ghost">{channel.display_name}</Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80"></HoverCardContent>
                  </HoverCard>
                  {channel.exactMatch && <span className="text-xs text-red-500">Exact Match</span>}
                </TableCell>
                <TableCell>
                  <Link href={`/clips/${channel.broadcaster_login}`}>
                    <Button variant="default">View Clips</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    />
  );
}
