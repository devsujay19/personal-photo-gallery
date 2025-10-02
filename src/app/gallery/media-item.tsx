
"use client";

import type { Media } from "@/lib/placeholder-images";
import Image from "next/image";
import { PlayCircle, Film } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type MediaItemProps = {
  media: Media;
  index: number;
  openViewer: (index: number) => void;
  isHighlighted: boolean;
};

export function MediaItem({ media, index, openViewer, isHighlighted }: MediaItemProps) {
  const isVideo = media.type === "video";

  return (
    <motion.div
      layoutId={`media-${media.id}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-primary/30",
        isHighlighted
          ? "ring-4 ring-accent ring-offset-2 ring-offset-background"
          : "ring-0"
      )}
      onClick={() => openViewer(index)}
    >
      <Image
        src={media.imageUrl}
        alt={media.description}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        data-ai-hint={media.imageHint}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      
      {isVideo && (
        <div className="absolute inset-0 flex items-center justify-center">
          <PlayCircle className="h-16 w-16 text-white/70 transition-all duration-300 group-hover:scale-110 group-hover:text-white" />
        </div>
      )}

      <div className="absolute bottom-0 left-0 p-4">
        {isVideo && (
          <div className="mb-1 flex items-center gap-1.5 rounded-full bg-black/50 px-2 py-1 text-xs text-white backdrop-blur-sm">
            <Film className="h-3 w-3" />
            <span>Video</span>
          </div>
        )}
        <p className="line-clamp-2 text-sm font-medium text-white">
          {media.description}
        </p>
      </div>
    </motion.div>
  );
}
