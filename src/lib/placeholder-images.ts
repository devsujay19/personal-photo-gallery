
import data from './placeholder-images.json';

export type Media = {
  id: string;
  type: 'image' | 'video';
  description: string;
  imageUrl: string;
  videoUrl?: string;
  imageHint: string;
};

export type Folder = {
  id: string;
  name: string;
  media: Media[];
}

export const mediaData: { folders: Folder[], uncategorized: Media[] } = data;
