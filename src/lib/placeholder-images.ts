import data from './placeholder-images.json';

export type Media = {
  id: string;
  type: 'image' | 'video';
  description: string;
  imageUrl: string;
  videoUrl?: string;
  imageHint: string;
};

export const mediaData: Media[] = data.placeholderImages;
