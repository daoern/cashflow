export type CashAccount = {
  accountId: number;
  accountName: string;
  currency: string;
  userId: string;
  createDate: string;
};

export type CashAccountInsertDTO = {
  accountId?: number;
  accountName: string;
  currency: string;
  userId: string;
};

export type CashAccountUpdateDTO = {
  accountId?: number;
  accountName?: string;
  currency?: string;
  userId?: string;
};
