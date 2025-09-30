"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { login } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Heart } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full font-bold" disabled={pending}>
      {pending ? (
        "Unlocking..."
      ) : (
        <>
          Enter <Heart className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(login, undefined);
  const router = useRouter();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: "destructive",
        title: "There's a problem. Try again.",
        description: state.error,
      });
    }
    if (state?.success) {
      toast({
        title: "Welcome!",
        description: "Welcome to our gallery!",
      });
      router.push("/gallery");
    }
  }, [state, router, toast]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter the passcode..."
          required
          className="bg-background/50 text-center"
        />
      </div>
      <SubmitButton />
    </form>
  );
}
