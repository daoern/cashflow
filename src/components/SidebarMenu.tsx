import { Button } from "@/lib/shadcnUi";
import { MenuEntry, isMenuGroup } from "@/types/menu";

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
                {entry.children.map((childEntry, index) => {
                  return (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start"
                    >
                      <div className="mr-2 h-4 w-4 border"></div>
                      {childEntry.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          );
        }
        return (
          <div key={index} className="px-3 py-2">
            <Button variant="ghost" className="w-full justify-start">
              <div className="mr-2 h-4 w-4 border"></div>
              {entry.label}
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export default SidebarMenu;
