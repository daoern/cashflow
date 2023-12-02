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
import { MenuEntry, isMenuGroup } from "@/types/menu";

interface AvatarDropdownMenuProps {
  avatarUrl: string;
  avatarFallback: string;
  dropdownHeaderLabel: string;
  dropdownHeaderSublabel: string;
  dropdownMenuEntries: MenuEntry[];
}

function AvatarDropdownMenu(props: AvatarDropdownMenuProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={props.avatarUrl} alt="User avatar" />
            <AvatarFallback>{props.avatarFallback}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {props.dropdownHeaderLabel}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {props.dropdownHeaderSublabel}
            </p>
          </div>
        </DropdownMenuLabel>
        {props.dropdownMenuEntries.map((entry, index) => {
          if (isMenuGroup(entry)) {
            return (
              <div key={index}>
                <DropdownMenuSeparator />
                {entry.children.map((childEntry, childIndex) => {
                  return (
                    <DropdownMenuItem
                      key={childIndex}
                      onClick={childEntry.onClick}
                    >
                      {childEntry.label}
                    </DropdownMenuItem>
                  );
                })}
              </div>
            );
          }
          return <></>;
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AvatarDropdownMenu;
