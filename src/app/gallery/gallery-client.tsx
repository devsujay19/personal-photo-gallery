
"use client";

import type { Media, Folder } from "@/lib/placeholder-images";
import { useState } from "react";
import { AiCurationPanel } from "./ai-curation-panel";
import { MediaItem } from "./media-item";
import { MediaViewer } from "./media-viewer";
import type { SuggestMediaGroupsOutput } from "@/ai/flows/ai-media-grouping";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, Folder as FolderIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FolderView } from "./folder-view";

export function GalleryClient({ folders, uncategorized }: { folders: Folder[], uncategorized: Media[] }) {
  const [viewerState, setViewerState] = useState<{
    isOpen: boolean;
    index: number;
    mediaList: Media[];
  }>({ isOpen: false, index: 0, mediaList: [] });

  const [aiSuggestions, setAiSuggestions] =
    useState<SuggestMediaGroupsOutput | null>(null);
  const [highlightedGroup, setHighlightedGroup] = useState<number[] | null>(
    null
  );

  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);

  const { toast } = useToast();
  
  const handleUploadClick = () => {
    toast({
      title: "Feature's coming soon!",
      description: "Media upload functionality is currently in development.",
    });
  };

  const openViewer = (index: number, mediaList: Media[]) => setViewerState({ isOpen: true, index, mediaList });
  const closeViewer = () => setViewerState({ isOpen: false, index: 0, mediaList: [] });

  const handleNext = () => {
    setViewerState((prev) => ({
      ...prev,
      index: (prev.index + 1) % prev.mediaList.length,
    }));
  };

  const handlePrev = () => {
    setViewerState((prev) => ({
      ...prev,
      index: (prev.index - 1 + prev.mediaList.length) % prev.mediaList.length,
    }));
  };

  const allMediaForCuration = [...folders.flatMap(f => f.media), ...uncategorized];

  if (selectedFolder) {
    return (
      <FolderView 
        folder={selectedFolder}
        onBack={() => setSelectedFolder(null)}
        openViewer={openViewer}
      />
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="text-center md:text-left">
          <h1 className="font-comic-relief text-4xl font-bold tracking-tight text-primary md:text-5xl">
            Our Moments
          </h1>
          <p className="mt-2 text-lg text-foreground/80">
            A collection of memories we'll never forget...
          </p>
        </div>
        <div className="flex gap-2">
            <Button onClick={handleUploadClick} variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Media
            </Button>
            <AiCurationPanel
                media={allMediaForCuration}
                setAiSuggestions={setAiSuggestions}
                setHighlightedGroup={setHighlightedGroup}
                suggestions={aiSuggestions}
            />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence>
          {folders.map((folder) => (
            <motion.div
              key={folder.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-lg bg-card shadow-lg transition-all duration-300 hover:shadow-primary/30"
              onClick={() => setSelectedFolder(folder)}
            >
              <div className="flex h-full flex-col items-center justify-center p-4">
                <FolderIcon className="h-24 w-24 text-primary/70 transition-transform duration-300 group-hover:scale-110 group-hover:text-primary" />
                <p className="mt-4 text-center font-comic-relief text-xl font-bold text-foreground">
                  {folder.name}
                </p>
                <p className="text-sm text-muted-foreground">{folder.media.length} items</p>
              </div>
            </motion.div>
          ))}
          {uncategorized.map((media, index) => (
            <MediaItem
              key={media.id}
              media={media}
              index={index}
              openViewer={(idx) => openViewer(idx, uncategorized)}
              isHighlighted={highlightedGroup?.includes(folders.length + index) ?? false}
            />
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {viewerState.isOpen && (
          <MediaViewer
            media={viewerState.mediaList[viewerState.index]}
            onClose={closeViewer}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
