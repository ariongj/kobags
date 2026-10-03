// Shared input limits keep browser forms aligned with saved request validation.
export const requestFieldLimits: Record<string, number> = {
  company: 150, contact: 100, email: 150, phone: 40,
  country: 100, city: 100, date: 10, note: 3000,
  customDimensions: 100, purpose: 150,
};

export function isCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value + "T00:00:00.000Z");
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
