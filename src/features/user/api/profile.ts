import { supabase } from "@/lib/supabase";

export interface UserProfile {
  id: string;
  firstName: string | null;
  lastName: string | null;
}

export async function getProfileById(id: string): Promise<UserProfile | null> {
  const { data, error, status } = await supabase
    .from("user_profiles")
    .select()
    .eq("id", id);
  if (status == 200 && data != null) {
    const userProfileData = data[0];
    return {
      id: userProfileData.id,
      firstName: userProfileData.first_name,
      lastName: userProfileData.last_name,
    };
  }
  return null;
}
