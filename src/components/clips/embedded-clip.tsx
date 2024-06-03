import React from "react";


interface EmbeddedClipProps {
  height: string;
  width: string;
  embed_url: string;
}

export default function EmbeddedClip({ height, width, embed_url}: EmbeddedClipProps) {
  return (
    <iframe
      src={embed_url + "&parent=localhost"}
      height={height}
      width={width}
    ></iframe>
  );
}
