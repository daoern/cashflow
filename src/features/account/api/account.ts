import { InsertDto, Row, UpdateDto, supabase } from "@/lib/supabase";
import { CashAccount, CashAccountDTO } from "../types/cashAccount";

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
  if (data) {
    return data.map((e) => mapDataToCashAccount(e));
  }
  return [];
}

export async function insertNewCashAccount(account: CashAccount) {
  const { data, error, status } = await supabase
    .from("cash_accounts")
    .insert({
      account_name: account.accountName,
      currency: account.currency,
      user_id: account.userId,
    })
    .select();
  if (error) {
    throw error;
  }
  if (data) {
    return mapDataToCashAccount(data[0]);
  }
  return null;
}

export async function deleteCashAccount(accountId: number) {
  const { error, status } = await supabase
    .from("cash_accounts")
    .delete()
    .eq("id", accountId);
  if (error) {
    throw error;
  }
}

export async function updateCashAccount(account: CashAccountDTO) {
  const { data, error, status } = await supabase
    .from("cash_accounts")
    .update({ account_name: account.accountName, currency: account.currency })
    .eq("id", account.accountId ?? "")
    .select();
  if (error) {
    throw error;
  }
  if (data) {
    return mapDataToCashAccount(data[0]);
  }
}

function mapDataToCashAccount(data: Row<"cash_accounts">): CashAccount {
  return {
    accountId: data.id,
    accountName: data.account_name ?? "",
    currency: data.currency ?? "",
    userId: data.user_id ?? "",
  };
}
