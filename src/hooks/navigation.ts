import { RoutePath } from "@/routes";
import { MenuEntry } from "@/types/menu";
import { redirect } from "react-router-dom";

function createUrlMenuEntry(entry: MenuEntry & { url: string }): MenuEntry {
  return {
    ...entry,
    onClick() {
      redirect(entry.url);
    },
  };
}

export function getNavigationMenu(): MenuEntry[] {
  const menuEntries: MenuEntry[] = [
    createUrlMenuEntry({
      label: "Dashboard",
      icon: "material-symbols:dashboard-outline-rounded",
      url: RoutePath.dashboard,
    }),
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
  return menuEntries;
}
