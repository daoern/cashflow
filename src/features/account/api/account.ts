import { supabase } from "@/lib/supabase";
import { CashAccount } from "../types/cashAccount";

export async function getCashAccountsByUserId(
  id: string,
): Promise<CashAccount[]> {
  const { data, error, status } = await supabase
    .from("cash_accounts")
    .select()
    .eq("user_id", id);
  if (error) {
    throw error;
  }
  if (status === 200 && data != null) {
    return data.map((e) => {
      return {
        accountId: e.id,
        accountName: e.account_name ?? "",
        currency: e.currency ?? "",
        userId: e.user_id ?? "",
      };
    });
  }
  return [];
}

export async function insertNewCashAccount(account: CashAccount) {
  const { error, status } = await supabase.from("cash_accounts").insert({
    account_name: account.accountName,
    currency: account.currency,
    user_id: account.userId,
  });
  if (status !== 200 || error) {
    throw error;
  }
  return null;
}
