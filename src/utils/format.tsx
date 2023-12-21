export function formatCurrencyNum(currency: string, value: number): string {
  const formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  });
  return formatter.format(value);
}
