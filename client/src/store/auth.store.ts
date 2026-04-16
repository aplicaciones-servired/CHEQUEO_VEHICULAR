import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { normalizeCompanyName } from '../util/company';

export interface AuthSession {
  token?: string;
  username: string;
  raw: unknown;
}

interface AuthStore {
  session: AuthSession | null;
  company: string;
  setAuth: (nextSession: AuthSession, nextCompany?: string) => void;
  clearAuth: () => void;
}

const DEFAULT_COMPANY = 'Multired';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      session: null,
      company: DEFAULT_COMPANY,
      setAuth: (nextSession, nextCompany) => {
        set({
          session: nextSession,
          company: normalizeCompanyName(nextCompany),
        });
      },
      clearAuth: () => {
        set({
          session: null,
          company: DEFAULT_COMPANY,
        });
      },
    }),
    {
      name: 'chequeo-auth-store',
      partialize: (state) => ({
        session: state.session,
        company: state.company,
      }),
    },
  ),
);
