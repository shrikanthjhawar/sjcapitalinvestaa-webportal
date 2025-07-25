/**
 * Formats a number into a string representing Indian currency.
 * It uses Lakhs (L) and Crores (Cr) for larger numbers.
 *
 * @param value The number to format.
 * @returns A formatted string (e.g., "₹1.50 L", "₹2.25 Cr", "₹50,000").
 */
export const formatIndianCurrency = (value: number): string => {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
  // Fallback for values less than 1 Lakh
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
};