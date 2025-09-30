
"use client";

import type { Media, Folder } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { MediaItem } from "./media-item";
import { AnimatePresence } from "framer-motion";

type FolderViewProps = {
  folder: Folder;
  onBack: () => void;
  openViewer: (index: number, mediaList: Media[]) => void;
};

export function FolderView({ folder, onBack, openViewer }: FolderViewProps) {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-8 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div>
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
            {folder.name}
          </h1>
          <p className="mt-1 text-lg text-foreground/80">
            {folder.media.length} cherished memories.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence>
          {folder.media.map((media, index) => (
            <MediaItem
              key={media.id}
              media={media}
              index={index}
              openViewer={(idx) => openViewer(idx, folder.media)}
              isHighlighted={false} // Highlighting not implemented inside folders for now
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
