"use client";

import type { Media } from "@/lib/placeholder-images";
import { useState } from "react";
import { AiCurationPanel } from "./ai-curation-panel";
import { MediaItem } from "./media-item";
import { MediaViewer } from "./media-viewer";
import type { SuggestMediaGroupsOutput } from "@/ai/flows/ai-media-grouping";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function GalleryClient({ allMedia }: { allMedia: Media[] }) {
  const [viewerState, setViewerState] = useState<{
    isOpen: boolean;
    index: number;
  }>({ isOpen: false, index: 0 });

  const [aiSuggestions, setAiSuggestions] =
    useState<SuggestMediaGroupsOutput | null>(null);
  const [highlightedGroup, setHighlightedGroup] = useState<number[] | null>(
    null
  );

  const { toast } = useToast();
  
  const handleUploadClick = () => {
    toast({
      title: "Feature coming soon!",
      description: "Media upload functionality is currently in development.",
    });
  };

  const openViewer = (index: number) => setViewerState({ isOpen: true, index });
  const closeViewer = () => setViewerState({ isOpen: false, index: 0 });

  const handleNext = () => {
    setViewerState((prev) => ({
      ...prev,
      index: (prev.index + 1) % allMedia.length,
    }));
  };

  const handlePrev = () => {
    setViewerState((prev) => ({
      ...prev,
      index: (prev.index - 1 + allMedia.length) % allMedia.length,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="text-center md:text-left">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
            Our Moments
          </h1>
          <p className="mt-2 text-lg text-foreground/80">
            A collection of memories we'll never forget.
          </p>
        </div>
        <div className="flex gap-2">
            <Button onClick={handleUploadClick} variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Media
            </Button>
            <AiCurationPanel
                media={allMedia}
                setAiSuggestions={setAiSuggestions}
                setHighlightedGroup={setHighlightedGroup}
                suggestions={aiSuggestions}
            />
        </div>
      </div>

      {aiSuggestions?.reasoning && highlightedGroup && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-lg border border-accent/20 bg-accent/10 p-4 text-center text-accent-foreground shadow-inner"
        >
          <p className="font-semibold italic">
            AI Suggestion: &quot;{aiSuggestions.reasoning}&quot;
          </p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence>
          {allMedia.map((media, index) => (
            <MediaItem
              key={media.id}
              media={media}
              index={index}
              openViewer={openViewer}
              isHighlighted={highlightedGroup?.includes(index) ?? false}
            />
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {viewerState.isOpen && (
          <MediaViewer
            media={allMedia[viewerState.index]}
            onClose={closeViewer}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
