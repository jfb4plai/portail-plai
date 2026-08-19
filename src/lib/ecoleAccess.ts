// src/lib/ecoleAccess.ts
import { useEffect, useState } from 'react';
import { supabase } from './supabase.js';
import type { AppItem } from '../types';

const STORAGE_KEY = 'plai_ecole_code';

export function useEcoleAccess() {
  const [unlockedAppIds, setUnlockedAppIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get('ecole');
    if (fromUrl) {
      localStorage.setItem(STORAGE_KEY, fromUrl);
    }
    const code = fromUrl || localStorage.getItem(STORAGE_KEY);

    if (!code) {
      setLoading(false);
      return;
    }

    Promise.resolve(
      supabase
        .from('portail_ecoles')
        .select('apps_debloquees')
        .eq('code', code)
        .maybeSingle()
    )
      .then(({ data, error }: { data: { apps_debloquees: string[] } | null; error: unknown }) => {
        setUnlockedAppIds(!error && data ? data.apps_debloquees ?? [] : []);
        setLoading(false);
      })
      .catch(() => {
        setUnlockedAppIds([]);
        setLoading(false);
      });
  }, []);

  return { unlockedAppIds, loading };
}

export function isAppUnlocked(app: AppItem, unlockedAppIds: string[]): boolean {
  return !app.gated || unlockedAppIds.includes(app.id);
}
