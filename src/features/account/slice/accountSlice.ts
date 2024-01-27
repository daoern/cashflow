import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CashAccount,
  CashAccountInsertDTO,
  CashAccountUpdateDTO,
} from "../types/cashAccount";
import { CashAccountState } from "../types/cashAccountState";
import { accountApi } from "../api/account";

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
        if (action.payload && state.status == "success") {
          state.cashAccounts.push(action.payload);
        }
      })
      .addCase(removeCashAccount.fulfilled, (state, action) => {
        if (action.payload && state.status == "success") {
          state.cashAccounts = state.cashAccounts.filter(
            (cashAccount) => cashAccount.accountId != action.payload,
          );
        }
      })
      .addCase(updateCashAccount.fulfilled, (state, action) => {
        if (action.payload && state.status == "success") {
          state.cashAccounts = state.cashAccounts.map((cashAccount) =>
            cashAccount.accountId == action.payload.accountId
              ? action.payload.cashAccount ?? cashAccount
              : cashAccount,
          );
        }
      });
  },
});

export const loadAllCashAccounts = createAsyncThunk(
  "cashAccount/fetch",
  async (userId: string, { rejectWithValue }) => {
    try {
      const cashAccounts = await accountApi.getCashAccountsByUserId(userId);
      cashAccounts.sort((a, b) => a.createDate.localeCompare(b.createDate));
      return cashAccounts;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const addCashAccount = createAsyncThunk(
  "cashAccount/add",
  async (cashAccount: CashAccountInsertDTO, { rejectWithValue }) => {
    try {
      return await accountApi.insertNewCashAccount(cashAccount);
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const removeCashAccount = createAsyncThunk(
  "cashAccount/remove",
  async (accountId: number, { rejectWithValue }) => {
    try {
      await accountApi.deleteCashAccount(accountId);
      return accountId;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const updateCashAccount = createAsyncThunk(
  "cashAccount/update",
  async (
    args: { accountId: number; cashAccount: CashAccountUpdateDTO },
    { rejectWithValue },
  ) => {
    try {
      const cashAccount = await accountApi.updateCashAccount(
        args.accountId,
        args.cashAccount,
      );
      return { ...args, cashAccount: cashAccount };
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

// export const { setCashAccounts } = cashAccountSlice.actions;
export default cashAccountSlice.reducer;
