export const PRICING = {
  INSPECTION_FEE: 25, // €25 for vehicle inspection
  CURRENCY: "eur",
  DESCRIPTION: "Vehicle Inspection Service",
} as const;

export type PricingType = typeof PRICING;
