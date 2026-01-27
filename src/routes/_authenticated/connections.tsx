import { ConnectionsPage } from "@/app/connections";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/connections")({
  component: ConnectionsPage,
});
