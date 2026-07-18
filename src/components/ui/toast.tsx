"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { cn } from "@/lib/utils";

type Toast = {
  id: string;
  title: string;
  variant?: "default" | "success" | "error";
};

type ToastContextValue = {
  toast: (t: Omit<Toast, "id">) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Toast[]>([]);

  const toast = useCallback((t: Omit<Toast, "id">) => {
    const id = crypto.randomUUID();
    setItems((prev) => [...prev, { ...t, id }]);
    setTimeout(() => {
      setItems((prev) => prev.filter((x) => x.id !== id));
    }, 3200);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[min(100%,20rem)] flex-col gap-2">
        {items.map((item) => (
          <div
            key={item.id}
            role="status"
            className={cn(
              "pointer-events-auto rounded-xl border px-4 py-3 text-sm shadow-lg",
              item.variant === "success" &&
                "border-success/40 bg-card text-success",
              item.variant === "error" &&
                "border-danger/40 bg-card text-danger",
              (!item.variant || item.variant === "default") &&
                "border-card-border bg-card text-foreground",
            )}
          >
            {item.title}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
