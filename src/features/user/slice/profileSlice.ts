import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserProfile, getProfileById } from "../api/profile";
import { appStore } from "@/stores/appStore";
import { getAuthInfo } from "@/features/auth/hooks/authInfo";
interface ProfileState {
  profile: UserProfile | null;
}

const initialState: ProfileState = { profile: null };

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfile | null>) => {
      state.profile = action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
