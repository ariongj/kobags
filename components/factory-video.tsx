"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { publicVideoSource } from "@/lib/public-video";
import { useKobags } from "./kobags-context";

export function FactoryVideo({
  source, poster, width, height, title, titleSq,
}: {
  source: string;
  poster: string;
  width: number;
  height: number;
  title: string;
  titleSq: string;
}) {
  const { t } = useKobags();
  const video = useRef<HTMLVideoElement>(null);
  const [activated, setActivated] = useState(false);
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => setEnhanced(true), []);
  const label = t(title, titleSq);
  return (
    <figure className="factory-reel">
      <div className="factory-reel-media">
        <video
          ref={video}
          controls={!enhanced || activated}
          playsInline
          preload="none"
          poster={poster}
          width={width}
          height={height}
          aria-label={label}
          tabIndex={0}
          onPlay={() => setActivated(true)}
        >
          <source src={publicVideoSource(source)} type="video/mp4" />
          {t("Your browser does not support video playback.", "Shfletuesi juaj nuk e mbështet videon.")}
        </video>
        {enhanced && !activated && (
          <button
            type="button"
            className="factory-reel-play"
            aria-label={t(`Play video: ${title}`, `Shiko videon: ${titleSq}`)}
            onClick={() => {
              setActivated(true);
              video.current?.focus({ preventScroll: true });
              void video.current?.play().catch(() => {
                // Keep native controls available if the browser declines playback.
              });
            }}
          >
            <span><Play size={23} fill="currentColor" aria-hidden="true" /></span>
          </button>
        )}
      </div>
      <figcaption><strong>{label}</strong></figcaption>
    </figure>
  );
}
