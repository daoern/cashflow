import { MenuEntry } from "@/types/menu";

const menuEntries: MenuEntry[] = [
  {
    label: "Dashboard",
  },
  {
    label: "Statistics",
    children: [
      {
        label: "Account Report",
      },
    ],
  },
  {
    label: "Data",
    children: [
      {
        label: "Account",
      },
      {
        label: "Transaction",
      },
    ],
  },
];

export function getNavigationMenu() {
  return menuEntries;
}
