import { Session } from "@supabase/supabase-js";

export interface AuthDataState {
  status: "loading" | "completed" | "error";
  session: Session | null;
}
