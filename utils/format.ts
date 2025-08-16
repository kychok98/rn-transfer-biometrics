export function formatCurrency(n: number) {
  try {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
    }).format(n);
  } catch {
    return `RM ${n.toFixed(2)}`;
  }
}
