// types/toast.types.ts
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
    id: string;
    type: ToastType;
    message: string[] | string;
    duration?: number;
}

export interface ToastContextType {
    toasts: Toast[];
    showToast: (type: ToastType, message: string[] | string, duration?: number) => void;
    removeToast: (id: string) => void;
}