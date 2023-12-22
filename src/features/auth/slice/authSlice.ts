import { supabase } from "@/lib/supabase";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";
import { AuthDataState } from "../types/authDataState";

const initialState: AuthDataState = { status: "loading", session: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.status = "completed";
      state.session = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSession.pending, (state) => {
        state.status = "loading";
        state.session = null;
      })
      .addCase(loadSession.fulfilled, (state, action) => {
        return { status: "completed", session: action.payload };
      })
      .addCase(loadSession.rejected, (state, action) => {
        return {
          status: "error",
          session: null,
        };
      });
  },
});

export const loadSession = createAsyncThunk(
  "auth/loadSession",
  async (_: unknown, { rejectWithValue }) => {
    console.log("fetchInitialSession");
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return rejectWithValue(error);
    }
    return data.session;
  },
);

export const { setSession } = authSlice.actions;

export default authSlice.reducer;
