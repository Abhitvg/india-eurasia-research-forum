"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { SiteContent, defaultContent } from '../data/siteContent';

const STORAGE_KEY = 'ierf_site_content_v2';

interface SaveToGitHubResult {
  success: boolean;
  message: string;
}

interface ContentContextType {
  content: SiteContent;
  loading: boolean;
  updateContent: (newContent: SiteContent) => void;
  resetToDefaults: () => void;
  exportContent: () => void;
  importContent: (json: string) => boolean;
  saveToGitHub: (contentToSave: SiteContent) => Promise<SaveToGitHubResult>;
}

const ContentContext = createContext<ContentContextType | null>(null);

function deepMerge(defaults: any, saved: any): any {
  if (saved === null || saved === undefined) return defaults;
  if (typeof defaults !== 'object' || Array.isArray(defaults)) return saved;
  const result: any = { ...defaults };
  for (const key of Object.keys(defaults)) {
    if (key in saved) {
      if (typeof defaults[key] === 'object' && !Array.isArray(defaults[key]) && defaults[key] !== null) {
        result[key] = deepMerge(defaults[key], saved[key]);
      } else {
        result[key] = saved[key];
      }
    }
  }
  for (const key of Object.keys(saved)) {
    if (!(key in defaults)) {
      result[key] = saved[key];
    }
  }
  return result;
}

export function ContentProvider({ children }: { children: ReactNode }) {
  // Initialize with perfectly SSR'd JSON content.
  // Use localStorage as an optimistic UI cache so the user sees changes immediately after saving
  // while waiting for Vercel to rebuild.
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = (typeof window !== 'undefined' ? localStorage.getItem.bind(localStorage) : () => null)(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return deepMerge(defaultContent, parsed);
      }
    } catch (e) {
      console.warn('Failed to load saved content:', e);
    }
    return defaultContent;
  });

  const [loading, setLoading] = useState(false);

  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
    try {
      (typeof window !== 'undefined' ? localStorage.setItem.bind(localStorage) : () => {})(STORAGE_KEY, JSON.stringify(newContent));
    } catch (e) {
      console.warn('Failed to save content:', e);
    }
  };

  const resetToDefaults = () => {
    (typeof window !== 'undefined' ? localStorage.removeItem.bind(localStorage) : () => {})(STORAGE_KEY);
    setContent(defaultContent);
  };

  const exportContent = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ierf-content-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importContent = (json: string): boolean => {
    try {
      const parsed = JSON.parse(json);
      const merged = deepMerge(defaultContent, parsed);
      setContent(merged);
      try {
        (typeof window !== 'undefined' ? localStorage.setItem.bind(localStorage) : () => {})(STORAGE_KEY, JSON.stringify(merged));
      } catch (e) {
        console.warn('Failed to save content:', e);
      }
      return true;
    } catch (e) {
      console.error('Failed to import content:', e);
      return false;
    }
  };

  // Save to GitHub via Next.js API Route
  const saveToGitHub = async (contentToSave: SiteContent): Promise<SaveToGitHubResult> => {
    try {
      const res = await fetch('/api/github/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: contentToSave }),
      });
      
      const data = await res.json();
      
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Unknown error');
      }

      // Optimistically update local state and storage
      updateContent(contentToSave);
      
      return { success: true, message: 'Content saved to GitHub! Vercel is deploying the changes automatically. They will be live in ~45 seconds.' };
    } catch (err: any) {
      console.error('Failed to save content to GitHub:', err);
      return { success: false, message: `Save Error: ${err.message}` };
    }
  };

  return (
    <ContentContext.Provider value={{ content, loading, updateContent, resetToDefaults, exportContent, importContent, saveToGitHub }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent(): ContentContextType {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within a ContentProvider');
  return ctx;
}
