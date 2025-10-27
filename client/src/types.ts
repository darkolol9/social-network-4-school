
export interface NotificationItem {
  id: string;
  title: string;
  description?: string;
  color?: string; // any css color (hex, rgb, tailwind color) — used as background
  duration?: number; // ms; if omitted or 0 and sticky !== true, default used
  sticky?: boolean; // if true, won't auto-dismiss
}


