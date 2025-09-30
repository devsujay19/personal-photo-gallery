
'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/icons/logo';
import { LoginForm } from '@/components/auth/login-form';
import { mediaData } from '@/lib/placeholder-images';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

function LogoutToast() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    if (searchParams.get('logged_out')) {
      toast({
        title: 'Logged out',
        description: 'You have been successfully logged out.',
      });
    }
  }, [searchParams, toast]);

  return null;
}

export default function LoginPage() {
  const allMedia = [...mediaData.folders.flatMap(f => f.media), ...mediaData.uncategorized];
  const heroImage = allMedia.find(img => img.imageHint.includes('couple'));
  
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center p-4">
       <LogoutToast />
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage?.imageUrl || "https://picsum.photos/seed/lovebg/1920/1080"}
          alt="Romantic background"
          fill
          className="object-cover"
          data-ai-hint="couple romance"
          priority
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>

      <Card className="relative z-10 w-full max-w-md animate-fade-in-up border-primary/20 bg-card/80 shadow-2xl shadow-primary/10">
        <CardHeader className="items-center text-center">
          <Logo className="mb-4 h-16 w-16 text-primary" />
          <CardTitle className="font-handwriting text-6xl">
            LoveVault
          </CardTitle>
          <CardDescription className="font-body text-foreground/80">
            Us together, cherishing our beautiful moments!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
      
      <footer className="absolute bottom-4 z-10 text-center text-sm text-primary-foreground/70">
        <p>&copy; {new Date().getFullYear()} Bismi & Zayan. All rights reserved.</p>
      </footer>
    </main>
  );
}
