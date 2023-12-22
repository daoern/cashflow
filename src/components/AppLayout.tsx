import { getNavigationMenu } from "@/hooks/navigation";
import AvatarDropdownMenu from "./AvatarDropdownMenu";
import SidebarMenu from "@/components/SidebarMenu";
import { useUserInfo } from "@/features/user/hooks/userInfo";
import { useAuthInfo } from "@/features/auth/hooks/authInfo";
import { MenuEntry } from "@/types/menu";
import { signOut } from "@/features/auth/api/signOut";
import { useTranslation } from "react-i18next";

function onSignOutButtonClicked() {
  signOut();
}

function AppLayout(props: React.PropsWithChildren) {
  const { t } = useTranslation();

  const navigationMenuEntries = getNavigationMenu();

  const authInfo = useAuthInfo();
  const userInfo = useUserInfo();

  const userAvatarDropdownMenu: MenuEntry[] = [
    {
      label: "",
      children: [
        {
          label: t("sign.out"),
          onClick: onSignOutButtonClicked,
        },
      ],
    },
  ];

  const { userName, userHandle } = authInfo?.isSignedOut()
    ? {
        userName: userInfo?.getName(),
        userHandle: authInfo?.getEmail(),
      }
    : {
        userName: null,
        userHandle: null,
      };

  return (
    <div className="flex h-full flex-col ">
      <header className="sticky top-0 z-40 w-full border-b bg-white/60 backdrop-blur">
        <div className="flex h-12 items-center px-4">
          {/* App name */}
          <div className="ml-auto flex items-center space-x-4">
            <AvatarDropdownMenu
              avatarUrl={""}
              avatarFallback={userInfo.getNameInitials()}
              dropdownHeaderLabel={userName ?? "-"}
              dropdownHeaderSublabel={userHandle ?? "-"}
              dropdownMenuEntries={userAvatarDropdownMenu}
            />
          </div>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)]">
        <div className="top-14 z-30 -ml-2 w-full pb-12 md:sticky md:block">
          <SidebarMenu menuEntries={navigationMenuEntries} />
        </div>

        <div className="h-full space-y-4 p-8 pt-6 lg:border-l">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
