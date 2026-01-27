import { Button } from "@/components/ui/button";
import { Calendar, Mail, Mars, Venus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { User } from "@/types/user";
import { useApi } from "@/api";

interface ConnectionRequest {
  _id: string;
  sender: User;
  receiver: string;
  status: "interested" | "ignored" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
}

interface RequestCardProps {
  request: ConnectionRequest;
}

export const RequestCard = ({ request }: RequestCardProps) => {
  const { useRespondToConnectionRequest } = useApi();
  const respondMutation = useRespondToConnectionRequest();

  const user = request.sender;

  const handleAccept = (requestId: string) => {
    respondMutation.mutate({
      requestId,
      action: "accepted",
    });
  };

  const handleReject = (requestId: string) => {
    respondMutation.mutate({
      requestId,
      action: "rejected",
    });
  };

  console.log("RequestCard rendered for request:", request);

  return (
    <Card className="transition-all duration-200 hover:shadow-lg">
      <CardContent className="flex items-start gap-4 px-4 sm:px-6">
        <img
          src={user?.avatar ?? undefined}
          alt="User Avatar"
          className="w-16 h-16 rounded-full"
        />

        <div className="flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold leading-tight">
              {user.firstName} {user.lastName}
            </h3>
          </div>

          <p className="text-sm text-muted-foreground leading-snug line-clamp-2">
            {user.bio || "No bio provided yet."}
          </p>

          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {user.age && (
              <span className="inline-flex items-center">
                <Calendar className="size-3" /> {user.age} yrs
              </span>
            )}
            {user.gender && (
              <div className="flex items-center gap-1">
                {user.gender === "male" ? (
                  <Mars className="size-3.5" />
                ) : (
                  <Venus className="size-3.5" />
                )}{" "}
                <span className="capitalize">{user.gender}</span>
              </div>
            )}

            {user.skills?.length ? (
              <span className="inline-flex items-center gap-1">
                <Mail className="size-3" /> {user.skills[0]}
                {user.skills.length > 1
                  ? ` +${user.skills.length - 1} more`
                  : ""}
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="ghost"
            className="border border-border/60 px-4 text-foreground hover:bg-muted"
            onClick={() => handleReject(request._id)}
          >
            Ignore
          </Button>
          <Button className="px-5" onClick={() => handleAccept(request._id)}>
            Accept
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
