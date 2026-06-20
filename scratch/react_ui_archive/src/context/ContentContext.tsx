import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SiteContent, defaultContent } from '../data/siteContent';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const STORAGE_KEY = 'ierf_site_content';

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
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return deepMerge(defaultContent, parsed);
      }
    } catch (e) {
      console.warn('Failed to load saved content:', e);
    }
    return defaultContent;
  });

  const [loading, setLoading] = useState(true);

  // Load content from Firestore on mount
  useEffect(() => {
    async function loadFirestoreContent() {
      try {
        const docRef = doc(db, 'site_data', 'content');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const remoteData = docSnap.data() as SiteContent;
          const merged = deepMerge(defaultContent, remoteData);
          setContent(merged);
          // Sync with local storage
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        } else {
          // Initialize Firestore with defaultContent if document doesn't exist
          await setDoc(docRef, defaultContent);
        }
      } catch (err) {
        console.error('Failed to load content from Firestore:', err);
      } finally {
        setLoading(false);
      }
    }
    loadFirestoreContent();
  }, []);

  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
    } catch (e) {
      console.warn('Failed to save content:', e);
    }
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
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
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      } catch (e) {
        console.warn('Failed to save content:', e);
      }
      return true;
    } catch (e) {
      console.error('Failed to import content:', e);
      return false;
    }
  };

  // We keep the signature saveToGitHub but save to Firestore instead to prevent compile/runtime errors
  const saveToGitHub = async (contentToSave: SiteContent): Promise<SaveToGitHubResult> => {
    try {
      const docRef = doc(db, 'site_data', 'content');
      await setDoc(docRef, contentToSave);
      // Update local state and storage as well
      updateContent(contentToSave);
      return { success: true, message: 'Content saved to Firebase successfully! Changes are live immediately.' };
    } catch (err: any) {
      console.error('Failed to save content to Firestore:', err);
      return { success: false, message: `Firebase Save Error: ${err.message}` };
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

