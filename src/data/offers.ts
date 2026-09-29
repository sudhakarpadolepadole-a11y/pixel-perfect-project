export type Offer = {
  code: string;
  title: string;
  subtitle: string;
  emoji: string;
  type: "flat" | "percent" | "freeship";
  value: number;
  minOrder: number;
};

export const offers: Offer[] = [
  { code: "FRESH100", title: "Flat ₹100 off", subtitle: "On orders above ₹599", emoji: "🎁", type: "flat", value: 100, minOrder: 599 },
  { code: "FREESHIP", title: "Free delivery", subtitle: "On orders above ₹199", emoji: "🛵", type: "freeship", value: 0, minOrder: 199 },
  { code: "SAVE15", title: "15% cashback", subtitle: "Up to ₹75 on UPI", emoji: "💸", type: "percent", value: 15, minOrder: 299 },
];

export const FREE_DELIVERY_THRESHOLD = 199;
export const DELIVERY_FEE = 29;
export const HANDLING_FEE = 9;
