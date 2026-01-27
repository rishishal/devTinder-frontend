import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Link } from "@tanstack/react-router";
import { Bell, LogOutIcon, Send, UserRound } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { useApi } from "@/api";

export function ProfileAvatar() {
  const { useLogout } = useApi();
  const { auth } = useAuthStore();
  const user = auth.user;
  const logoutMutation = useLogout();

  const handleSignOut = () => {
    logoutMutation.mutate();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage src={user?.avatar ?? undefined} alt="User Avatar" />
            <AvatarFallback>
              {user?.firstName?.[0] ?? ""}
              {user?.lastName?.[0] ?? ""}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link to="/request" className="flex items-center gap-2">
              <Bell />
              Notification
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/connections" className="flex items-center gap-2">
              <Send />
              Messages
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/profile" className="flex items-center gap-2">
              <UserRound />
              Profile
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <Button
            disabled={logoutMutation.isPending}
            variant="ghost"
            className="w-full justify-start p-0!"
          >
            <LogOutIcon />
            {logoutMutation.isPending ? "Signing out..." : "Sign Out"}
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
