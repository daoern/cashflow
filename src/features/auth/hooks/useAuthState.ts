import { RootState } from "@/stores/appStore";
import { useSelector } from "react-redux";

export default function useAuthState() {
  return useSelector((state: RootState) => state.auth.session);
}
