export type CashAccount = {
  accountId: number;
  accountName: string;
  currency: string;
  userId: string;
};

export type CashAccountDTO = {
  accountId?: number;
  accountName?: string;
  currency?: string;
  userId?: string;
};
