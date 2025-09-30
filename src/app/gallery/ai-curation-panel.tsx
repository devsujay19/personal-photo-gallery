"use client";

import {
  suggestMediaGroups,
  type SuggestMediaGroupsOutput,
} from "@/ai/flows/ai-media-grouping";
import type { Media } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Wand2, Loader2, HeartPulse } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type AiCurationPanelProps = {
  media: Media[];
  setAiSuggestions: (suggestions: SuggestMediaGroupsOutput | null) => void;
  setHighlightedGroup: (group: number[] | null) => void;
  suggestions: SuggestMediaGroupsOutput | null;
};

export function AiCurationPanel({
  media,
  setAiSuggestions,
  setHighlightedGroup,
  suggestions,
}: AiCurationPanelProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSuggestGroups = async () => {
    setIsLoading(true);
    setHighlightedGroup(null);
    try {
      const result = await suggestMediaGroups({
        mediaItemDescriptions: media.map((item) => item.description),
        groupingPreference: "thematic and narrative flow",
      });
      setAiSuggestions(result);
      toast({
        title: "AI Suggestions Ready!",
        description: "New stories have been discovered in your moments.",
      });
    } catch (error) {
      console.error("AI suggestion failed:", error);
      toast({
        variant: "destructive",
        title: "AI Error",
        description: "Could not generate suggestions. Please try again later.",
      });
      setAiSuggestions(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Wand2 className="mr-2 h-4 w-4" />
          Create a Story
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="font-headline text-2xl text-primary">
            AI Storyteller
          </SheetTitle>
          <SheetDescription>
            Let AI discover the hidden narratives and themes within your cherished
            moments.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 flex flex-col gap-6">
          <Button
            onClick={handleSuggestGroups}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Discovering...
              </>
            ) : (
              "Suggest New Stories"
            )}
          </Button>

          {suggestions && (
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">
                Suggested Stories:
              </h3>
              <p className="rounded-md border bg-muted p-3 text-sm italic text-muted-foreground">
                &quot;{suggestions.reasoning}&quot;
              </p>
              <div className="grid grid-cols-2 gap-2">
                {suggestions.suggestedGroups.map((group, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => setHighlightedGroup(group)}
                  >
                    <HeartPulse className="mr-2 h-4 w-4" />
                    Story {index + 1}
                  </Button>
                ))}
              </div>
              <Button variant="secondary" onClick={() => setHighlightedGroup(null)} className="w-full">
                Clear Highlights
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
