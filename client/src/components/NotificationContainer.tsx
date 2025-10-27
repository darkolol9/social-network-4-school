import React from "react";
import type { NotificationItem } from "../types";

// if you don't have heroicons, use a simple "×" instead of the svg

export const NotificationContainer: React.FC<{
  items: NotificationItem[];
  onHide: (id: string) => void;
}> = ({ items, onHide }) => {
  return (
    <div
      aria-live="polite"
      className="fixed inset-0 pointer-events-none flex items-start px-4 py-6 sm:p-6 z-50"
      style={{ justifyContent: "flex-end" }}
    >
      <div className="w-full max-w-sm space-y-2">
        {items.map((it) => (
          <NotificationCard key={it.id} item={it} onClose={() => onHide(it.id)} />
        ))}
      </div>
    </div>
  );
};

const NotificationCard: React.FC<{ item: NotificationItem; onClose: () => void }> = ({ item, onClose }) => {
  // fallbacks for accessible text color based on background brightness could be added
  const bg = item.color ?? "#111827"; // default gray-900
  const textColor = "#fff"; // assume white works for most custom colors; you can extend logic

  return (
    <div
      className="pointer-events-auto rounded-lg shadow-lg overflow-hidden transform transition-all duration-200 ease-out"
      style={{ background: bg, color: textColor }}
      role="status"
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-1">
            <div className="font-semibold text-sm">{item.title}</div>
            {item.description && <div className="text-xs mt-1 opacity-90">{item.description}</div>}
          </div>

          <div className="ml-3 flex-shrink-0">
            <button
              aria-label="Close notification"
              onClick={onClose}
              className="inline-flex rounded-md p-1 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white"
              style={{ color: textColor }}
            >
              {/* if you don't have heroicons, replace below with × */}
              {/* <XMarkIcon className="h-5 w-5" /> */}
              <span className="text-lg font-bold">×</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

