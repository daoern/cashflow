import { signOut } from "@/features/auth/api/signOut";
import { useAuthInfo } from "@/features/auth/hooks/authInfo";
import { useUserInfo } from "@/features/user/hooks/userInfo";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/lib/shadcnUi";

function UserNav() {
  function onLogoutClicked() {
    signOut();
  }

  const authManager = useAuthInfo();
  const userManager = useUserInfo();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="todo.png" alt="User avatar" />
            <AvatarFallback>{userManager.getNameInitials()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {authManager?.isAuthenticated()
                ? userManager.getName()
                : "Not logged in"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {authManager?.session?.user?.email ?? "-"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogoutClicked}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserNav;
