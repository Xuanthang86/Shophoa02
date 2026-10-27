import React from 'react';
import { ShoppingBag, Bell, Code, ShieldCheck, Globe, LayoutDashboard, Store } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  cartCount: number;
  unreadNotifCount: number;
  onOpenCart: () => void;
  onOpenNotifications: () => void;
  onOpenPromptStudio: () => void;
  onOpenLoyalty: () => void;
  isAdminView: boolean;
  onToggleAdminView: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  cartCount,
  unreadNotifCount,
  onOpenCart,
  onOpenNotifications,
  onOpenPromptStudio,
  onOpenLoyalty,
  isAdminView,
  onToggleAdminView,
  onNavigateSection,
}) => {
  const isVi = language === 'vi';

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <button 
            onClick={() => {
              if (isAdminView) onToggleAdminView();
              onNavigateSection('catalog');
            }}
            className="text-left group shrink-0 focus:outline-none"
          >
            <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 group-hover:text-amber-900 transition-colors whitespace-nowrap">
              L'ÉLIXIR FLORAL
            </span>
          </button>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-600">
            <button
              onClick={() => {
                if (isAdminView) onToggleAdminView();
                onNavigateSection('catalog');
              }}
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {isVi ? 'Bộ Sưu Tập' : 'Catalog'}
            </button>
            <button
              onClick={() => {
                if (isAdminView) onToggleAdminView();
                onNavigateSection('occasions');
              }}
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {isVi ? 'Dịp Tặng Hoa' : 'Occasions'}
            </button>
            <button
              onClick={onOpenLoyalty}
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer text-amber-900 font-semibold"
            >
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>{isVi ? 'Đặc Quyền VIP' : 'VIP Privilege'}</span>
            </button>
            <button
              onClick={() => {
                if (isAdminView) onToggleAdminView();
                onNavigateSection('atelier');
              }}
              className="hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {isVi ? 'Về Chúng Tôi' : 'Atelier Story'}
            </button>
          </nav>

          {/* Zone 3: 1 primary action / utility bar with Prompt Studio & Cart */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={onToggleLanguage}
              className="px-2.5 py-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200/80 rounded-md transition-colors flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
              title={isVi ? 'Chuyển sang Tiếng Anh' : 'Switch to Vietnamese'}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isVi ? 'EN' : 'VI'}</span>
            </button>

            {/* Prompt Studio Blueprint Trigger Button */}
            <button
              onClick={onOpenPromptStudio}
              className="px-3 py-1.5 text-xs font-medium text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
              title={isVi ? 'Xem & Sao chép Prompt Hoàn Chỉnh' : 'View Master Prompt Blueprint'}
            >
              <Code className="w-3.5 h-3.5 text-amber-800" />
              <span className="hidden sm:inline font-medium">{isVi ? 'Prompt Studio' : 'Master Prompt'}</span>
            </button>

            {/* Admin Toggle */}
            <button
              onClick={onToggleAdminView}
              className={`p-2 rounded-md transition-colors cursor-pointer ${
                isAdminView
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
              title={isAdminView ? (isVi ? 'Xem giao diện khách hàng' : 'Storefront') : (isVi ? 'Xem trang quản trị Admin' : 'Admin Dashboard')}
            >
              {isAdminView ? <Store className="w-4 h-4" /> : <LayoutDashboard className="w-4 h-4" />}
            </button>

            {/* Notifications */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors cursor-pointer"
              title={isVi ? 'Thông báo' : 'Notifications'}
            >
              <Bell className="w-4 h-4" />
              {unreadNotifCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-600 rounded-full" />
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">{isVi ? 'Giỏ Hàng' : 'Cart'}</span>
              <span className="font-mono-tabular px-1.5 py-0.2 bg-stone-800 text-stone-200 text-[11px] rounded">
                {cartCount}
              </span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
