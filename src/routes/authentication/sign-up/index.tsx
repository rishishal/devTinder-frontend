import { SignUp } from "@/app/auth/sign-up";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/authentication/sign-up/")({
  component: SignUp,
});
