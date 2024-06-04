"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clip } from "@/types/twitch-api";
import EmbeddedClip from "../clips/embedded-clip";
import Modal from "../global/modal";
import { set } from "zod";

interface Props {
  clip: Clip;
  innerRef?: (node?: Element | null | undefined) => void;
}

export default function ClipCard({ clip, innerRef }: Props) {
  const [open, setOpen] = React.useState(false);
  const { title, creator_name, created_at, thumbnail_url, embed_url } = clip;

  const handleModal = () => setOpen(!open);

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <>
      <Modal setModal={handleModal} open={open} title={title}>
        <EmbeddedClip height="500" width="800" embed_url={embed_url} autoplay muted={false} />
      </Modal>
      <Card className="max-w-96 cursor-pointer h-96" onClick={handleClick} ref={innerRef}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>Cliped by: {creator_name}</CardDescription>
        </CardHeader>
        <CardContent>
          <img src={thumbnail_url} alt="" />
        </CardContent>
        <CardFooter>
          <p>Created at: {new Date(created_at).toDateString()}</p>
        </CardFooter>
      </Card>
    </>
  );
}
