export enum Page {
  HOME = "HOME",
  DONATE = "DONATE",
  COMMUNITY = "COMMUNITY",
  RULES = "RULES",
  TERMS = "TERMS",
  PRIVACY = "PRIVACY",
  RULES = "OFFER",
}

export interface NavItem {
  label: string;
  page: Page;
}

export interface Rank {
  id: string;
  name: string;
  price: number;
  features: string[];
  color: string;
  popular?: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}
