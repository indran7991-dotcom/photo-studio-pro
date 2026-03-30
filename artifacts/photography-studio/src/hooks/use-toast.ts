import { useState, useEffect } from "react";

// Simplified toast hook to avoid missing shadcn dependencies if any
export interface Toast {
  id: string;
  title?: string;
  description?: string;
  type?: "default" | "success" | "error";
}

let toastCount = 0;
type ToastFunction = (toast: Omit<Toast, "id">) => void;
let addToastFn: ToastFunction | null = null;

export const toast = (toast: Omit<Toast, "id">) => {
  if (addToastFn) {
    addToastFn(toast);
  }
};

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    addToastFn = (newToast) => {
      const id = (++toastCount).toString();
      setToasts((prev) => [...prev, { ...newToast, id }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 5000);
    };
    return () => {
      addToastFn = null;
    };
  }, []);

  return { toasts, toast };
}
