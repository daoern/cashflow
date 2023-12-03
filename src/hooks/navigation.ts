import { MenuEntry } from "@/types/menu";

const menuEntries: MenuEntry[] = [
  {
    label: "Dashboard",
    icon: "material-symbols:dashboard-outline-rounded",
  },
  {
    label: "Data",
    children: [
      {
        label: "Account",
        icon: "material-symbols:account-balance-outline-rounded",
      },
      {
        label: "Budget",
        icon: "material-symbols:account-balance-wallet-outline",
      },
      {
        label: "Transaction",
        icon: "material-symbols:list-alt-outline-rounded",
      },
      {
        label: "Lending",
        icon: "mdi:hand-coin-outline",
      },
    ],
  },
  {
    label: "Reports",
    children: [
      {
        label: "Account Report",
        icon: "material-symbols:account-balance-outline-rounded",
      },
    ],
  },
];

export function getNavigationMenu() {
  return menuEntries;
}
