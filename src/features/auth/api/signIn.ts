import { supabase } from "@/lib/supabase";
import { SignInWithOAuthCredentials } from "@supabase/supabase-js";

export enum OAuthProvider {
  github = "github",
  google = "google",
}

export function getOAuthCredentials(
  provider: OAuthProvider
): SignInWithOAuthCredentials {
  switch (provider) {
    case OAuthProvider.github:
      return {
        provider: "github",
      };
    case OAuthProvider.google:
      return {
        provider: "google",
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      };
  }
}

export const signIn = async (
  onSuccess?: () => void,
  onError?: (errMsg: String) => void
) => {
  const { data, error } = await supabase.auth.signInWithOAuth(
    getOAuthCredentials(OAuthProvider.github)
  );
  if (error) {
    console.log(error);
    onError?.(error.name);
  }
  onSuccess?.();
};
