import { Row, supabase } from "@/lib/supabase";
import {
  CashAccount,
  CashAccountUpdateDTO,
  CashAccountInsertDTO,
} from "../types/cashAccount";

async function getCashAccountsByUserId(id: string): Promise<CashAccount[]> {
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

async function insertNewCashAccount(account: CashAccountInsertDTO) {
  const { data, error, status } = await supabase
    .from("cash_accounts")
    .insert({
      id: account.accountId,
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

async function deleteCashAccount(accountId: number) {
  const { error, status } = await supabase
    .from("cash_accounts")
    .delete()
    .eq("id", accountId);
  if (error) {
    throw error;
  }
}

async function updateCashAccount(
  accountId: number,
  account: CashAccountUpdateDTO,
) {
  const { data, error, status } = await supabase
    .from("cash_accounts")
    .update({ account_name: account.accountName, currency: account.currency })
    .eq("id", accountId)
    .select();
  if (error) {
    throw error;
  }
  if (data) {
    return mapDataToCashAccount(data[0]);
  }
}

function mapDataToCashAccount(data: Row<"cash_accounts">): CashAccount {
  console.log(data.created_at);
  return {
    accountId: data.id,
    accountName: data.account_name ?? "",
    currency: data.currency ?? "",
    userId: data.user_id ?? "",
    createDate: data.created_at,
  };
}

export const accountApi = {
  getCashAccountsByUserId,
  insertNewCashAccount,
  deleteCashAccount,
  updateCashAccount,
} as const;
