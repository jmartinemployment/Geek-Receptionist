/** The four plans, as GeekAPI bills them (GeekBackend docs/Geek-Receptionist.md, section 5 item 2). The home page and its schema both read this. */
export type Plan = { code: string; name: string; priceUsd: number; minutes: number };

export const PLANS: Plan[] = [
  { code: "STARTER", name: "Starter", priceUsd: 30, minutes: 90 },
  { code: "STANDARD", name: "Standard", priceUsd: 48, minutes: 250 },
  { code: "PRO", name: "Pro", priceUsd: 148, minutes: 1000 },
  { code: "PREMIUM", name: "Premium", priceUsd: 298, minutes: 2000 },
];

/** What each minute above a plan's included minutes costs, on every plan. */
export const OVERAGE_RATE_USD = 0.5;

export function formatMinutes(minutes: number): string {
  return minutes.toLocaleString("en-US");
}

export function formatOverageRate(): string {
  return `$${OVERAGE_RATE_USD.toFixed(2)}`;
}
