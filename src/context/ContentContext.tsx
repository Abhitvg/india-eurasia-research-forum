import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SiteContent, defaultContent } from '../data/siteContent';

const STORAGE_KEY = 'ierf_site_content';

// GitHub API configuration for direct content saving
const GITHUB_OWNER = 'abhisheksingh214';
const GITHUB_REPO = 'india-eurasia-research-forum';
const GITHUB_FILE_PATH = 'src/data/siteContent.ts';
const GITHUB_BRANCH = 'main';

interface SaveToGitHubResult {
  success: boolean;
  message: string;
}

interface ContentContextType {
  content: SiteContent;
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
  // Also bring in any keys from saved that aren't in defaults
  for (const key of Object.keys(saved)) {
    if (!(key in defaults)) {
      result[key] = saved[key];
    }
  }
  return result;
}

/**
 * Generate the full siteContent.ts file content by preserving the type definitions
 * and updating only the defaultContent export with new data.
 */
function generateSiteContentFile(data: SiteContent, existingFileContent: string): string {
  const splitStr = 'export const defaultContent: SiteContent = ';
  if (existingFileContent.includes(splitStr)) {
    const parts = existingFileContent.split(splitStr);
    return parts[0] + splitStr + JSON.stringify(data, null, 2) + ';\n';
  }
  throw new Error('Could not find defaultContent export in siteContent.ts');
}

/**
 * Save content to GitHub by committing the updated siteContent.ts file.
 * This triggers the GitHub Actions CI/CD pipeline for auto-deployment.
 */
async function commitToGitHub(content: SiteContent): Promise<SaveToGitHubResult> {
  const token = localStorage.getItem('ierf_github_token') || import.meta.env.VITE_GITHUB_TOKEN;
  
  if (!token) {
    return { success: false, message: 'GitHub token not configured. Please set it in Admin Settings.' };
  }

  const apiBase = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`;
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  };

  try {
    // Step 1: Get current file to obtain its SHA and existing content
    const getResp = await fetch(`${apiBase}?ref=${GITHUB_BRANCH}`, { headers });
    if (!getResp.ok) {
      const err = await getResp.json();
      return { success: false, message: `Failed to fetch file: ${err.message || getResp.statusText}` };
    }
    const fileData = await getResp.json();
    const currentSha = fileData.sha;

    // Decode existing file content (GitHub returns base64)
    const existingContent = atob(fileData.content.replace(/\n/g, ''));

    // Step 2: Generate the updated file content
    const newFileContent = generateSiteContentFile(content, existingContent);

    // Step 3: Commit the updated file
    const putResp = await fetch(apiBase, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        message: `[Admin] Update site content — ${new Date().toISOString().slice(0, 16)}`,
        content: btoa(unescape(encodeURIComponent(newFileContent))),
        sha: currentSha,
        branch: GITHUB_BRANCH,
      }),
    });

    if (!putResp.ok) {
      const err = await putResp.json();
      return { success: false, message: `Failed to commit: ${err.message || putResp.statusText}` };
    }

    return { success: true, message: 'Content saved to GitHub! Site will auto-deploy in ~2-3 minutes.' };
  } catch (err: any) {
    return { success: false, message: `Network error: ${err.message}` };
  }
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

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch (e) {
      console.warn('Failed to save content:', e);
    }
  }, [content]);

  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
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
      return true;
    } catch (e) {
      console.error('Failed to import content:', e);
      return false;
    }
  };

  const saveToGitHub = async (contentToSave: SiteContent): Promise<SaveToGitHubResult> => {
    return commitToGitHub(contentToSave);
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, resetToDefaults, exportContent, importContent, saveToGitHub }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent(): ContentContextType {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within a ContentProvider');
  return ctx;
}
