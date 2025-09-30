import { Logo } from "@/components/icons/logo";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

export function GalleryHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/gallery" className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <span className="font-handwriting text-4xl font-bold text-foreground">
            LoveVault
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/logout">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
