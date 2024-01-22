export function formatCurrencyNum(currency: string, value: number): string {
  try {
    const formatter = Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    });
    return formatter.format(value);
  } catch (e) {
    console.log(e);
    // if (e instanceof RangeError) {
    //   return "formatError";
    // }
    return "-";
  }
}
