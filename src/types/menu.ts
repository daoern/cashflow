export type MenuItem = {
  label: string;
  url?: string;
  icon?: string;
  onClick?: () => void;
};

export type MenuGroup = MenuItem & {
  children: MenuEntry[];
};

export type MenuEntry = MenuItem | MenuGroup;

export function isMenuGroup(entry: MenuEntry): entry is MenuGroup {
  return "children" in entry;
}

export function isMenuItem(entry: MenuEntry): entry is MenuItem {
  return true;
}
