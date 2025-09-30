import { GalleryHeader } from "./gallery-header";

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <GalleryHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}
