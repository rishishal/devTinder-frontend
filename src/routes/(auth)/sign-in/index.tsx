import { SignIn } from "@/app/auth/sign-in";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/sign-in/")({
  component: SignIn,
});
