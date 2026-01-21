import type { LucideIcon } from "lucide-react";
import type { ReactElement } from "react";

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
}

export type Slide = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  badgeIcon: ReactElement;
  badgeColor: string;
  priceColor: string;
  buttonColor: string;
  gradient: string;
  iconBg: string;
  mainIcon: LucideIcon;
  iconTitle: string;
  iconSubtitle: string;
  features: Feature[];
}
