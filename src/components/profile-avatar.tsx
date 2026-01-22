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
import { LogOutIcon, Settings, UserRound } from "lucide-react";
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
            <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
            <AvatarFallback>
              {user?.firstName.charAt(0)}
              {user?.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link to="/profile" className="flex items-center gap-2">
              <UserRound />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            Settings
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
