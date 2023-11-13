import { updateProfileState } from "@/features/user/utils/profile";
import { supabase } from "@/lib/supabase";
import { appStore } from "@/stores/appStore";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";

interface AuthState {
  session: Session | null;
}

const initialState: AuthState = { session: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload;
    },
  },
});

const { setSession } = authSlice.actions;

export default authSlice.reducer;

// const dispatch = useDispatch();
supabase.auth.onAuthStateChange((event, session) => {
  console.log(event);
  appStore.dispatch(setSession(session));

  updateProfileState();
});

async function fetchInitialSession() {
  console.log("fetchInitialSession");
  const { data, error } = await supabase.auth.getSession();
  appStore.dispatch(setSession(data.session));
}

fetchInitialSession();
