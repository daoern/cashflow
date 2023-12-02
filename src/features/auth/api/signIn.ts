import { supabase } from "@/lib/supabase";
import { RoutePath } from "@/routes";
import { SignInWithOAuthCredentials } from "@supabase/supabase-js";

export enum OAuthProvider {
  github = "github",
  google = "google",
}

export function getOAuthCredentials(
  provider: OAuthProvider,
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

export const signInWithOAuth = async (
  provider: OAuthProvider,
  onSuccess?: () => void,
  onError?: (errMsg: String) => void,
) => {
  let credential = getOAuthCredentials(provider);

  credential = {
    ...credential,
    options: {
      ...credential.options,
      redirectTo: window.location.origin + RoutePath.login,
    },
  };

  const { data, error } = await supabase.auth.signInWithOAuth(credential);
  if (error) {
    console.log(error);
    onError?.(error.name);
  }
  onSuccess?.();
};
