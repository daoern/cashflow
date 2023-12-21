import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CashAccount } from "../types/cashAccount";
import { CashAccountState } from "../types/cashAccountState";
import { getCashAccountsByUserId, insertNewCashAccount } from "../api/account";

const initialState: CashAccountState = { status: "loading" };

const cashAccountSlice = createSlice({
  name: "cashAccount",
  initialState: initialState as CashAccountState,
  reducers: {
    // setCashAccounts: (state, action: PayloadAction<CashAccount[]>) => {
    //   state = { state: "success", cashAccounts: action.payload };
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAllCashAccounts.pending, (state) => {
        return { status: "loading" };
      })
      .addCase(loadAllCashAccounts.fulfilled, (state, action) => {
        return { status: "success", cashAccounts: action.payload };
      })
      .addCase(loadAllCashAccounts.rejected, (state, action) => {
        return {
          status: "error",
          errorTitle: "-",
          errorDescription: "-",
        };
      })
      .addCase(addCashAccount.fulfilled, (state, action) => {
        if (state.status === "success") {
          state.cashAccounts.push(action.payload);
        }
      });
  },
});

export const loadAllCashAccounts = createAsyncThunk(
  "cashAccount/fetch",
  async (userId: string, { rejectWithValue }) => {
    try {
      const cashAccount = await getCashAccountsByUserId(userId);
      return cashAccount;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const addCashAccount = createAsyncThunk(
  "cashAccount/add",
  async (cashAccount: CashAccount, { rejectWithValue }) => {
    try {
      await insertNewCashAccount(cashAccount);
      return cashAccount;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

// export const { setCashAccounts } = cashAccountSlice.actions;

export default cashAccountSlice.reducer;
