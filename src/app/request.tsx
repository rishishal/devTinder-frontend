import { Card, CardContent } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import { useApi } from "@/api";
import { RequestCard } from "@/components/request-card";

export const RequestPage = () => {
  const { useReceivedRequests } = useApi();
  const { data: requests, isLoading } = useReceivedRequests();

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container lg:max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Connection Requests
        </h1>
        <p className="text-muted-foreground mt-1">
          Review and respond to developers who want to connect with you
        </p>
      </div>

      {requests && requests.length > 0 ? (
        <div className="space-y-4">
          {requests.map((request) => (
            <RequestCard key={request._id} request={request} />
          ))}
        </div>
      ) : (
        <Card className="py-16">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <div className="size-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Check className="size-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-1">All caught up!</h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              You don't have any pending connection requests at the moment.
              Check back later!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
