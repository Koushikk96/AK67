import { useState, useEffect, useCallback } from 'react';
import { DSALanguage } from '@/types/dsa';
import { settingsRepository } from '@/db/repositories/settingsRepository';

export const PREFERRED_DSA_LANGUAGE_STORAGE_KEY = 'ak67_preferred_dsa_language';
export const PREFERRED_DSA_LANGUAGE_SETTINGS_KEY = 'preferred_dsa_language';
export const DEFAULT_DSA_LANGUAGE: DSALanguage = 'cpp';

export const VALID_DSA_LANGUAGES: readonly DSALanguage[] = ['cpp', 'python', 'java'] as const;

export function isValidDSALanguage(val: unknown): val is DSALanguage {
  return typeof val === 'string' && (val === 'cpp' || val === 'python' || val === 'java');
}

export function normalizeDSALanguage(val: unknown): DSALanguage {
  return isValidDSALanguage(val) ? val : DEFAULT_DSA_LANGUAGE;
}

export function getLanguageDisplayLabel(lang: DSALanguage): string {
  switch (lang) {
    case 'cpp':
      return 'C++';
    case 'python':
      return 'Python';
    case 'java':
      return 'Java';
    default:
      return 'C++';
  }
}

/**
 * Synchronous retrieval from localStorage with guaranteed fallback to 'cpp'
 */
export function getSavedDSALanguage(): DSALanguage {
  try {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(PREFERRED_DSA_LANGUAGE_STORAGE_KEY);
      if (isValidDSALanguage(saved)) {
        return saved;
      }
    }
  } catch {
    // Ignore storage errors in restricted contexts
  }
  return DEFAULT_DSA_LANGUAGE;
}

/**
 * Asynchronous retrieval from IndexedDB app_settings, updating localStorage if needed
 */
export async function getPersistedDSALanguage(): Promise<DSALanguage> {
  try {
    const saved = await settingsRepository.get<DSALanguage>(PREFERRED_DSA_LANGUAGE_SETTINGS_KEY);
    if (isValidDSALanguage(saved)) {
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(PREFERRED_DSA_LANGUAGE_STORAGE_KEY, saved);
        }
      } catch {}
      return saved;
    }
  } catch {}
  return getSavedDSALanguage();
}

/**
 * Unified persistence across both localStorage and IndexedDB app_settings.
 * Dispatches a 'dsa-language-changed' custom event so all active components synchronize.
 */
export async function setPreferredDSALanguage(language: unknown): Promise<DSALanguage> {
  const validLang = normalizeDSALanguage(language);
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(PREFERRED_DSA_LANGUAGE_STORAGE_KEY, validLang);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('dsa-language-changed', { detail: validLang }));
      }
    }
  } catch {}
  try {
    await settingsRepository.set(PREFERRED_DSA_LANGUAGE_SETTINGS_KEY, validLang);
  } catch {}
  return validLang;
}

/**
 * React Hook for consuming and updating preferred DSA language across any component.
 */
export function useDSALanguagePreference() {
  const [language, setLanguageState] = useState<DSALanguage>(getSavedDSALanguage);

  useEffect(() => {
    let mounted = true;
    getPersistedDSALanguage().then((lang) => {
      if (mounted) setLanguageState(lang);
    });

    const handler = (e: Event) => {
      const custom = e as CustomEvent<DSALanguage>;
      if (custom && custom.detail && isValidDSALanguage(custom.detail)) {
        setLanguageState(custom.detail);
      } else {
        setLanguageState(getSavedDSALanguage());
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('dsa-language-changed', handler);
      window.addEventListener('storage', handler);
    }
    return () => {
      mounted = false;
      if (typeof window !== 'undefined') {
        window.removeEventListener('dsa-language-changed', handler);
        window.removeEventListener('storage', handler);
      }
    };
  }, []);

  const setLanguage = useCallback((lang: unknown) => {
    const valid = normalizeDSALanguage(lang);
    setLanguageState(valid);
    setPreferredDSALanguage(valid);
  }, []);

  return { language, setLanguage };
}
