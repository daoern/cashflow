import { RootState } from "@/stores/appStore";
import { useSelector } from "react-redux";
import { UserProfile } from "../api/profile";

export interface UserInfo {
  profile: UserProfile | null;
  getName(): string;
  getNameInitials(maxLen?: number): string;
}

function createUserInfo(profile: UserProfile | null): UserInfo {
  function getName() {
    if (profile == null) {
      return "";
    }
    return `${profile?.firstName} ${profile?.lastName}`;
  }

  function getNameInitials(maxLen?: number) {
    return getName()
      .split(" ")
      .slice(0, maxLen ?? 2)
      .map((e) => e.charAt(0).toUpperCase())
      .join("");
  }

  return {
    profile: profile,
    getName: getName,
    getNameInitials: getNameInitials,
  };
}

export function useUserInfo(): UserInfo {
  const profile = useSelector((state: RootState) => state.user.profile);
  return createUserInfo(profile);
}
