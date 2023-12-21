import { ErrorState, LoadingState, SuccessState } from "@/types/state";
import { CashAccount } from "./cashAccount";

export type CashAccountState =
  | ({
      cashAccounts: CashAccount[];
    } & SuccessState)
  | LoadingState
  | ErrorState;
