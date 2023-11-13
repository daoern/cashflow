import { getAuthInfo } from "@/features/auth/hooks/authInfo";
import { getProfileById } from "../api/profile";
import { appStore } from "@/stores/appStore";
import { setProfile } from "../slice/profileSlice";

export async function updateProfileState() {
  const authManager = getAuthInfo();
  const profile = authManager.isAuthenticated()
    ? await getProfileById(authManager.getId() ?? "")
    : null;
  appStore.dispatch(setProfile(profile));
}
