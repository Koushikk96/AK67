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
 * In-memory active preference cache and versioning to prevent async race conditions
 */
let memoryLanguage: DSALanguage | null = null;
let preferenceVersion = 0;

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
    } else if (memoryLanguage) {
      return memoryLanguage;
    }
  } catch {
    // Ignore storage errors in restricted contexts
  }
  return memoryLanguage || DEFAULT_DSA_LANGUAGE;
}

/**
 * Asynchronous retrieval from IndexedDB app_settings.
 * Resolves safely without overwriting newer in-memory or localStorage user selections.
 */
export async function getPersistedDSALanguage(): Promise<DSALanguage> {
  const localVal = getSavedDSALanguage();
  try {
    const saved = await settingsRepository.get<DSALanguage>(PREFERRED_DSA_LANGUAGE_SETTINGS_KEY);
    if (isValidDSALanguage(saved)) {
      // If IndexedDB has a valid setting and localStorage is unset or matches default, sync
      if (localVal === DEFAULT_DSA_LANGUAGE && saved !== DEFAULT_DSA_LANGUAGE) {
        try {
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(PREFERRED_DSA_LANGUAGE_STORAGE_KEY, saved);
          }
        } catch {}
        memoryLanguage = saved;
      }
      return saved;
    } else if (localVal !== DEFAULT_DSA_LANGUAGE) {
      // If localStorage has a user preference but IndexedDB does not, populate IndexedDB
      await settingsRepository.set(PREFERRED_DSA_LANGUAGE_SETTINGS_KEY, localVal);
    }
  } catch {}
  return localVal;
}

/**
 * Unified persistence across both localStorage and IndexedDB app_settings.
 * Dispatches a 'dsa-language-changed' custom event so all active components synchronize immediately.
 * Avoids redundant writes and duplicate event emissions if the value has not changed.
 */
export async function setPreferredDSALanguage(language: unknown, forceNotify = false): Promise<DSALanguage> {
  const validLang = normalizeDSALanguage(language);
  const previous = memoryLanguage;
  
  preferenceVersion++;
  memoryLanguage = validLang;

  let changed = previous !== validLang || forceNotify;

  try {
    if (typeof localStorage !== 'undefined') {
      const currentStored = localStorage.getItem(PREFERRED_DSA_LANGUAGE_STORAGE_KEY);
      if (currentStored !== validLang) {
        localStorage.setItem(PREFERRED_DSA_LANGUAGE_STORAGE_KEY, validLang);
        changed = true;
      }
      if (changed && typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('dsa-language-changed', { detail: validLang }));
      }
    }
  } catch {}

  try {
    const currentDb = await settingsRepository.get<DSALanguage>(PREFERRED_DSA_LANGUAGE_SETTINGS_KEY);
    if (currentDb !== validLang) {
      await settingsRepository.set(PREFERRED_DSA_LANGUAGE_SETTINGS_KEY, validLang);
    }
  } catch {}

  return validLang;
}

/**
 * React Hook for consuming and updating preferred DSA language across any component.
 * Features race-condition prevention: asynchronous DB reads can never overwrite
 * a newer user selection.
 */
export function useDSALanguagePreference() {
  const [language, setLanguageState] = useState<DSALanguage>(() => {
    return memoryLanguage || getSavedDSALanguage();
  });

  useEffect(() => {
    let mounted = true;
    const versionAtMount = preferenceVersion;

    getPersistedDSALanguage().then((persistedLang) => {
      // Only apply if the user has not made a newer selection since mount
      if (mounted && preferenceVersion === versionAtMount) {
        setLanguageState(persistedLang);
      }
    });

    const handler = (e: Event) => {
      if (e.type === 'storage') {
        const storageEvent = e as StorageEvent;
        // Ignore storage events for unrelated keys
        if (storageEvent.key && storageEvent.key !== PREFERRED_DSA_LANGUAGE_STORAGE_KEY) {
          return;
        }
        const newVal = storageEvent.newValue;
        const normalized = normalizeDSALanguage(newVal);
        preferenceVersion++;
        memoryLanguage = normalized;
        setLanguageState(normalized);
        return;
      }

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
