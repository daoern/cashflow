import { Button } from "@/lib/shadcnUi";
import { MenuEntry, MenuItem, isMenuGroup } from "@/types/menu";
import { Icon } from "@iconify/react/dist/iconify.js";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  menuEntries: MenuEntry[];
}

function SidebarMenu(props: SidebarProps) {
  return (
    <div className="space-y-4 py-4">
      {props.menuEntries.map((entry, index) => {
        if (isMenuGroup(entry)) {
          return (
            <div key={index} className="px-3 py-2">
              <h2 className="text-md mb-2 px-4 font-semibold tracking-tight">
                {entry.label}
              </h2>
              <div className="space-y-1">
                {entry.children.map((childEntry, childIndex) => {
                  return (
                    <MenuItemButton key={childIndex} menuItem={childEntry} />
                  );
                })}
              </div>
            </div>
          );
        }
        return (
          <div key={index} className="px-3 py-2">
            <MenuItemButton menuItem={entry} />
          </div>
        );
      })}
    </div>
  );
}

export default SidebarMenu;

interface MenuItemButtonProps {
  menuItem: MenuItem;
}

function MenuItemButton(props: MenuItemButtonProps) {
  return (
    <NavLink to={props.menuItem.url ?? ""}>
      {({ isActive, isPending, isTransitioning }) => {
        return (
          <Button
            variant={props.menuItem.url && isActive ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => {
              props.menuItem.onClick?.();
            }}
            tabIndex={-1}
          >
            {props.menuItem.icon == null ? (
              <div className="b mr-2 h-4 w-4"></div>
            ) : (
              <Icon className="mr-2 h-4 w-4" icon={props.menuItem.icon} />
            )}
            {props.menuItem.label}
          </Button>
        );
      }}
    </NavLink>
  );
}
