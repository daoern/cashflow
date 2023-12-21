import { createClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/database.types";

const supabaseUrl = "https://wcekzpytuakudczqcfwl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjZWt6cHl0dWFrdWRjenFjZndsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk2NzM4NzQsImV4cCI6MjAxNTI0OTg3NH0.q823XYnp0gOIJgALg-wqbOPRYYFZtrmPO2wQmx6wTpQ";
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
