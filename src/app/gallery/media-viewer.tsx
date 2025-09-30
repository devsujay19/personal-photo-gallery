"use client";

import type { Media } from "@/lib/placeholder-images";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type MediaViewerProps = {
  media: Media;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
};

export function MediaViewer({ media, onClose, onNext, onPrev }: MediaViewerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Navigation and Close Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-4 z-50 h-12 w-12 rounded-full text-white/70 hover:bg-white/10 hover:text-white"
        onClick={onClose}
      >
        <X className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 z-50 h-14 w-14 -translate-y-1/2 rounded-full text-white/70 hover:bg-white/10 hover:text-white"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
      >
        <ChevronLeft className="h-10 w-10" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 z-50 h-14 w-14 -translate-y-1/2 rounded-full text-white/70 hover:bg-white/10 hover:text-white"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
      >
        <ChevronRight className="h-10 w-10" />
      </Button>

      {/* Media Content */}
      <motion.div
        layoutId={`media-${media.id}`}
        className="relative h-[90vh] w-[90vw] max-w-screen-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {media.type === "image" ? (
          <Image
            src={media.imageUrl}
            alt={media.description}
            fill
            className="rounded-lg object-contain"
          />
        ) : (
          <video
            src={media.videoUrl}
            controls
            autoPlay
            loop
            className="h-full w-full rounded-lg object-contain"
          />
        )}
      </motion.div>
      <div className="absolute bottom-4 max-w-xl p-4 text-center text-white/90">
        <p>{media.description}</p>
      </div>
    </motion.div>
  );
}
