import { supabase } from "@/lib/supabase";

export async function signOut() {
  console.log("sss");
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
  }
  console.log("ss");
}
