import React, { useState, useEffect } from 'react';
import { WifiOff, RefreshCw, CheckCircle, Database } from 'lucide-react';
import { Language } from '../types';

interface OfflineBannerProps {
  language: Language;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ language }) => {
  const isVi = language === 'vi';
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showSyncSuccess, setShowSyncSuccess] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowSyncSuccess(true);
      setTimeout(() => setShowSyncSuccess(false), 4000);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (showSyncSuccess) {
    return (
      <div className="bg-emerald-800 text-white text-xs py-2 px-4 flex items-center justify-center gap-2 shadow-sm animate-fade-in">
        <CheckCircle className="w-3.5 h-3.5" />
        <span>{isVi ? 'Đã kết nối lại mạng Internet! Dữ liệu giỏ hàng và danh mục đã tự động đồng bộ.' : 'Back online! Cart and catalog synchronized.'}</span>
      </div>
    );
  }

  if (isOnline) return null;

  return (
    <div className="bg-stone-900 text-amber-200 text-xs py-2.5 px-4 border-b border-amber-900/60 flex items-center justify-between">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            {isVi 
              ? 'Chế độ ngoại tuyến (PWA Offline Active): Bạn vẫn có thể xem danh mục hoa, tùy chỉnh thiệp và thêm vào giỏ hàng bình thường.'
              : 'PWA Offline Mode Active: You can continue browsing arrangements and managing your cart offline.'}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-stone-300 bg-stone-800 px-2 py-0.5 rounded border border-stone-700 font-mono-tabular shrink-0">
          <Database className="w-3 h-3 text-amber-300" />
          <span>IndexedDB Cache Ready</span>
        </div>
      </div>
    </div>
  );
};
