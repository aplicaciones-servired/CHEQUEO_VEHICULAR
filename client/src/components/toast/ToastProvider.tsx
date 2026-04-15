import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading';

export interface ToastInput {
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
}

interface ToastItem extends Required<Omit<ToastInput, 'description'>> {
  id: string;
  description?: string;
}

interface ToastContextValue {
  show: (input: ToastInput) => string;
  success: (input: Omit<ToastInput, 'type'>) => string;
  error: (input: Omit<ToastInput, 'type'>) => string;
  warning: (input: Omit<ToastInput, 'type'>) => string;
  info: (input: Omit<ToastInput, 'type'>) => string;
  loading: (input: Omit<ToastInput, 'type' | 'duration'>) => string;
  dismiss: (id: string) => void;
  clear: () => void;
}

const DEFAULT_DURATION = 4500;
const TOAST_LIMIT = 5;

const ToastContext = createContext<ToastContextValue | null>(null);

const paletteByType: Record<ToastType, string> = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  error: 'border-rose-200 bg-rose-50 text-rose-900',
  warning: 'border-amber-200 bg-amber-50 text-amber-900',
  info: 'border-sky-200 bg-sky-50 text-sky-900',
  loading: 'border-indigo-200 bg-indigo-50 text-indigo-900',
};

const badgeByType: Record<ToastType, string> = {
  success: 'bg-emerald-200 text-emerald-900',
  error: 'bg-rose-200 text-rose-900',
  warning: 'bg-amber-200 text-amber-900',
  info: 'bg-sky-200 text-sky-900',
  loading: 'bg-indigo-200 text-indigo-900',
};

const labelByType: Record<ToastType, string> = {
  success: 'OK',
  error: 'ERROR',
  warning: 'ALERTA',
  info: 'INFO',
  loading: 'CARGA',
};

function getDuration(type: ToastType, duration?: number): number {
  if (duration !== undefined) return duration;
  if (type === 'loading') return 0;
  return DEFAULT_DURATION;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timersRef = useRef<Record<string, number>>({});

  const dismiss = useCallback((id: string) => {
    const timerId = timersRef.current[id];
    if (timerId) {
      window.clearTimeout(timerId);
      delete timersRef.current[id];
    }
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback((input: ToastInput) => {
    const type = input.type ?? 'info';
    const id = crypto.randomUUID();
    const duration = getDuration(type, input.duration);

    const nextToast: ToastItem = {
      id,
      title: input.title,
      description: input.description,
      type,
      duration,
    };

    setToasts((current) => [nextToast, ...current].slice(0, TOAST_LIMIT));

    if (duration > 0) {
      timersRef.current[id] = window.setTimeout(() => {
        dismiss(id);
      }, duration);
    }

    return id;
  }, [dismiss]);

  const clear = useCallback(() => {
    Object.values(timersRef.current).forEach((timerId) => window.clearTimeout(timerId));
    timersRef.current = {};
    setToasts([]);
  }, []);

  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach((timerId) => window.clearTimeout(timerId));
    };
  }, []);

  const contextValue = useMemo<ToastContextValue>(() => ({
    show,
    success: (input) => show({ ...input, type: 'success' }),
    error: (input) => show({ ...input, type: 'error' }),
    warning: (input) => show({ ...input, type: 'warning' }),
    info: (input) => show({ ...input, type: 'info' }),
    loading: (input) => show({ ...input, type: 'loading' }),
    dismiss,
    clear,
  }), [clear, dismiss, show]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      <div className="pointer-events-none fixed right-4 top-4 z-70 flex w-[min(92vw,28rem)] flex-col gap-3 sm:right-6 sm:top-6">
        {toasts.map((toast) => (
          <article
            key={toast.id}
            role="status"
            aria-live="polite"
            className={`pointer-events-auto rounded-3xl border px-4 py-3 shadow-[0_20px_50px_rgba(93,112,133,0.18)] backdrop-blur ${paletteByType[toast.type]}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold tracking-[0.16em] ${badgeByType[toast.type]}`}>
                    {labelByType[toast.type]}
                  </span>
                  <p className="text-sm font-semibold leading-5">{toast.title}</p>
                </div>
                {toast.description ? (
                  <p className="text-sm/5 opacity-90">{toast.description}</p>
                ) : null}
              </div>

              <button
                type="button"
                onClick={() => dismiss(toast.id)}
                className="rounded-full border border-current/20 px-2 py-0.5 text-xs font-semibold opacity-80 transition hover:opacity-100"
              >
                Cerrar
              </button>
            </div>
          </article>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast debe usarse dentro de ToastProvider');
  }

  return context;
}
