import React, { useEffect, useRef, useState } from 'react';
import { RefreshCw, X } from 'lucide-react';

export default function AutoUpdateCheck() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const initialBuildTime = useRef<number | null>(null);

  const checkVersion = async () => {
    try {
      // Fetch with cache-busting query parameter
      const res = await fetch(`/version.json?t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        const serverBuildTime = data.buildTime;

        if (initialBuildTime.current === null) {
          initialBuildTime.current = serverBuildTime;
        } else if (serverBuildTime > initialBuildTime.current) {
          setUpdateAvailable(true);
        }
      }
    } catch (e) {
      console.warn('Failed to check for app updates:', e);
    }
  };

  useEffect(() => {
    // Check version immediately on mount
    checkVersion();

    // Check periodically (every 2 minutes)
    const interval = setInterval(checkVersion, 120000);

    // Also check when page becomes visible again
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkVersion();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleRefresh = () => {
    // Hard reload to bypass cache
    window.location.reload();
  };

  if (!updateAvailable) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] max-w-sm w-full bg-[#0A192F] border-2 border-[#E87722] rounded-2xl shadow-[0_10px_50px_rgba(232,119,34,0.3)] p-5 text-white animate-bounce-subtle">
      <div className="flex items-start gap-4">
        <div className="p-2.5 bg-[#E87722]/15 text-[#E87722] rounded-xl flex items-center justify-center shrink-0">
          <RefreshCw className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
        </div>
        <div className="flex-1">
          <h4 className="font-black text-sm tracking-tight">Website Updated</h4>
          <p className="text-white/60 text-[11px] mt-1 leading-relaxed">
            A new version of IERF is available with latest features and content.
          </p>
          <div className="flex gap-2.5 mt-3.5">
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-[#E87722] hover:bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all shadow-md hover:shadow-[#E87722]/20"
            >
              Update Now
            </button>
            <button
              onClick={() => setUpdateAvailable(false)}
              className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
