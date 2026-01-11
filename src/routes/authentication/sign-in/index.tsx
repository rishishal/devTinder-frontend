import { SignIn } from "@/app/auth/sign-in";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/authentication/sign-in/")({
  component: SignIn,
});
