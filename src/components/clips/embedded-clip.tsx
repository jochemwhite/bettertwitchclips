import React from "react";


interface EmbeddedClipProps {
  height: string;
  width: string;
  embed_url: string;
  autoplay?: boolean;
  muted?: boolean;
}

export default function EmbeddedClip({ height, width, embed_url, autoplay, muted}: EmbeddedClipProps) {
  return (
    <iframe
      src={embed_url + `&parent=localhost&parent=bettertwitchclips.com&autoplay=${autoplay}&muted=${muted}`}
      height={height}
      width={width}
      
    ></iframe>
  );
}
