
import { mediaData } from "@/lib/placeholder-images";
import { GalleryClient } from "./gallery-client";

export default function GalleryPage() {
  // In a real app, you might fetch user-specific media from a database.
  // For now, we use the placeholder data.
  return <GalleryClient folders={mediaData.folders} uncategorized={mediaData.uncategorized} />;
}
