"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ExternalLink, Play } from "lucide-react";

interface VideoFeatureProps {
  videoId: string;
  title: string;
  posterSrc: string;
}

export function VideoFeature({
  videoId,
  title,
  posterSrc,
}: VideoFeatureProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const watchUrl = useMemo(
    () => `https://www.youtube.com/watch?v=${videoId}`,
    [videoId],
  );

  const embedUrl = useMemo(
    () =>
      `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&rel=0`,
    [videoId],
  );

  return (
    <div className="space-y-4">
      <div
        className="relative w-full overflow-hidden rounded-2xl border border-[hsl(var(--nav-theme)/0.25)] bg-black/30 shadow-2xl"
        style={{ paddingBottom: "56.25%" }}
      >
        {isPlaying ? (
          <iframe
            className="absolute top-0 left-0 h-full w-full"
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 block h-full w-full text-left"
            aria-label={`Play ${title}`}
          >
            <Image
              src={posterSrc}
              alt={title}
              fill
              className="object-cover"
              sizes="(min-width: 1280px) 1152px, (min-width: 768px) 90vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-xs font-medium text-white/85">
                Gameplay Showcase
              </div>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h3 className="max-w-2xl text-xl font-semibold text-white md:text-3xl">
                    {title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm text-white/75 md:text-base">
                    Watch the launch gameplay preview with Illusion Connect: Re key art.
                  </p>
                </div>
                <span className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-[hsl(var(--nav-theme-light))] text-slate-950 shadow-lg shadow-[hsl(var(--nav-theme-light))/0.35] md:h-20 md:w-20">
                  <Play className="ml-1 h-7 w-7 fill-current md:h-9 md:w-9" />
                </span>
              </div>
            </div>
          </button>
        )}
      </div>

      <div className="flex justify-center">
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors"
        >
          Watch on YouTube
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
