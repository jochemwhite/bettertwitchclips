"use client";
import { getGameID } from "@/actions/twitch-api";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Game } from "@/types/twitch-api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { SearchBar } from "../ui/search-bar";

interface results extends Game {
  exactMatch?: boolean;
}

interface Props {
  setValue: (value: string) => void;
}

export default function TwitchGameSearchBar({ setValue }: Props) {
  const [results, setResults] = useState<results[]>([]);

  const search = async (searchTerm: string) => {
    const data = await getGameID(searchTerm, 5);
    if (data) {
      setResults(data);

      const match = data.find((game: Game) => game.name === searchTerm.toLowerCase());
      if (match) {
        const newResults: results[] = data.map((game: Game) => {
          if (game.name.toLowerCase() === searchTerm.toLowerCase()) {
            return { ...game, exactMatch: true };
          }
          return game;
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
      toast.error("Error searching for games.");
    }
  };
  

  return (
    <SearchBar
      results={results}
      setResults={setResults}
      search={search}
      placeholder="Search for a game"
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
                  <img src={channel.box_art_url} className="w-8 h-8 rounded-full" />
                </TableCell>
                <TableCell>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="ghost">{channel.name}</Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80"></HoverCardContent>
                  </HoverCard>
                  {channel.exactMatch && <span className="text-xs text-red-500">Exact Match</span>}
                </TableCell>
                <TableCell>
                  <Button variant="default" onClick={() => setValue(channel.id)}>
                    Select
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    />
  );
}
