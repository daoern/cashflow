import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { supabase } from "./lib/supabase";
import { useDispatch } from "react-redux";
import { setSession } from "./features/auth/slice/authSlice";
import { updateProfileState } from "./features/user/utils/profile";
import { getAuthInfo } from "./features/auth/hooks/authInfo";
import { deepEqual } from "./utils/compare";
import { AuthChangeEvent } from "@supabase/supabase-js";
import { Toaster } from "./lib/shadcnUi/components/toaster";

const App = () => {
  const dispatch = useDispatch();
  const lastAuthEventRef = useRef<AuthChangeEvent>();

  useEffect(() => {
    const authStateListener = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (
          (lastAuthEventRef.current === event || event === "SIGNED_IN") &&
          deepEqual(getAuthInfo().state.session, session)
        ) {
          return;
        }
        lastAuthEventRef.current = event;
        dispatch(setSession(session));
        updateProfileState();
      },
    );

    // supabase.auth.getSession().then(({ data: { session } }) => {
    //   if (!deepEqual(getAuthInfo().state.session, session)) {
    //     dispatch(setSession(session));
    //   }
    // });

    return () => {
      authStateListener.data.subscription.unsubscribe();
    };
  }, []);
  return (
    <div className="h-full">
      <Outlet></Outlet>
      <Toaster />
    </div>
  );
};

export default App;
