import React from 'react';
import { X, Bell, CheckCheck, Package, Award, Sparkles, ArrowRight } from 'lucide-react';
import { Language, NotificationItem } from '../types';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onSelectOrder?: (orderId: string) => void;
  language: Language;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onSelectOrder,
  language,
}) => {
  if (!isOpen) return null;
  const isVi = language === 'vi';

  const getIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package className="w-4 h-4 text-blue-600" />;
      case 'loyalty':
        return <Award className="w-4 h-4 text-amber-700" />;
      default:
        return <Sparkles className="w-4 h-4 text-purple-600" />;
    }
  };

  const handleNotificationClick = (n: NotificationItem) => {
    if (n.orderId && onSelectOrder) {
      onSelectOrder(n.orderId);
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-stone-950/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-sm h-full shadow-2xl flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-stone-900" />
            <h3 className="font-editorial text-base font-bold text-stone-900">
              {isVi ? 'Thông Báo Thời Gian Thực' : 'Real-time Alerts'}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              className="text-[11px] text-amber-900 hover:underline flex items-center gap-1 cursor-pointer"
              title={isVi ? 'Đánh dấu tất cả đã đọc' : 'Mark all as read'}
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>{isVi ? 'Đã đọc hết' : 'Clear'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 text-stone-400 hover:text-stone-700 rounded transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notification list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-stone-400 text-xs">
              {isVi ? 'Không có thông báo mới nào.' : 'No new notifications.'}
            </div>
          ) : (
            notifications.map((n) => {
              const hasOrderLink = Boolean(n.orderId && onSelectOrder);

              return (
                <div
                  key={n.id}
                  onClick={() => hasOrderLink && handleNotificationClick(n)}
                  className={`p-3 rounded-lg border text-xs transition-all ${
                    hasOrderLink ? 'cursor-pointer hover:border-amber-400 hover:shadow-sm' : ''
                  } ${
                    n.read
                      ? 'bg-stone-50 border-stone-200/80 text-stone-600'
                      : 'bg-white border-amber-300 shadow-xs text-stone-900 ring-1 ring-amber-100'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded bg-stone-100 shrink-0">
                      {getIcon(n.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between mb-0.5">
                        <span className="font-semibold">{isVi ? n.title : n.titleEn}</span>
                        <span className="text-[10px] text-stone-400 shrink-0 ml-1">{n.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-stone-600 leading-relaxed mb-1">
                        {isVi ? n.message : n.messageEn}
                      </p>

                      {hasOrderLink && (
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-900 hover:text-amber-950 mt-1">
                          <span>{isVi ? 'Nhấn để xem hành trình đơn hàng' : 'View order tracking'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-stone-200 bg-stone-50 text-center text-[10px] text-stone-400">
          {isVi ? 'Hệ thống Smart Push & WebSocket đang hoạt động ổn định' : 'Smart Push & WebSocket stream active'}
        </div>
      </div>
    </div>
  );
};
