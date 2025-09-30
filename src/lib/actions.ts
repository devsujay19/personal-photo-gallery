"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const passwordSchema = z.string().min(1, "Password is required");

const correctPassword = "b!sm!_@nd_z@y@n";

type State = {
  error?: string;
  success?: boolean;
};

export async function login(
  prevState: State | undefined,
  formData: FormData
): Promise<State> {
  const password = formData.get("password");

  const validation = passwordSchema.safeParse(password);
  if (!validation.success) {
    return { error: "Password is required." };
  }

  if (validation.data === correctPassword) {
    cookies().set("auth-token", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });
    // Redirect is handled client-side on success
    return { success: true };
  } else {
    return { error: "The secret is incorrect. Try again." };
  }
}

export async function logout() {
  cookies().delete("auth-token");
  redirect("/");
}
