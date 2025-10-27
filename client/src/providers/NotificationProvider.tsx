import React, { createContext, useContext, useState, useCallback } from "react";
import type { NotificationItem } from "../types";
import { NotificationContainer } from "../components/NotificationContainer";

interface NotificationContextType {
  show: (n: Omit<NotificationItem, "id">) => string;
  hide: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotification = (): NotificationContextType => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotification must be used within NotificationProvider");
  return ctx;
};

const DEFAULT_DURATION = 4000;

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<NotificationItem[]>([]);

  const hide = useCallback((id: string) => {
    setItems((s) => s.filter((i) => i.id !== id));
  }, []);

  const show = useCallback((n: Omit<NotificationItem, "id">) => {
    const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
    const item: NotificationItem = {
      id,
      title: n.title,
      description: n.description,
      color: n.color,
      sticky: !!n.sticky,
      duration: n.duration ?? DEFAULT_DURATION,
    };

    setItems((s) => [item, ...s]);

    // auto-hide if not sticky
    if (!item.sticky) {
      const timeout = item.duration ?? DEFAULT_DURATION;
      setTimeout(() => hide(id), timeout);
    }

    return id;
  }, [hide]);

  return (
    <NotificationContext.Provider value={{ show, hide }}>
      {children}
      <NotificationContainer items={items} onHide={hide} />
    </NotificationContext.Provider>
  );
};

