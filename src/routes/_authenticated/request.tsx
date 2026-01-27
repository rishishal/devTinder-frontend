import { RequestPage } from "@/app/request";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/request")({
  component: RequestPage,
});
