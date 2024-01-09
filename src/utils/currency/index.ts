import { currencies } from "./dataset";

export type CurrencyDataset = {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
};

export function getCurrencyList(): CurrencyDataset[] {
  return Object.values(currencies);
}
