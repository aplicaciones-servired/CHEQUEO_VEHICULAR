export type CompanyName = 'Multired' | 'Servired';

export function normalizeCompanyName(value?: string | null): CompanyName {
  const normalized = (value ?? 'Multired').trim().toLowerCase();

  if (normalized.includes('servired')) {
    return 'Servired';
  }

  return 'Multired';
}
