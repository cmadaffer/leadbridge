export function normalizePhone(p) {
  if (!p) return "";
  const digits = p.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.length === 10) return `+1${digits}`;
  return digits; // best effort
}
