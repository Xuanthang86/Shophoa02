import React from 'react';
import { X, ShieldCheck, Award, Gift, Sparkles, Check } from 'lucide-react';
import { Language, LoyaltyProfile } from '../types';

interface LoyaltyModalProps {
  isOpen: boolean;
  onClose: () => void;
  loyaltyProfile: LoyaltyProfile;
  language: Language;
}

export const LoyaltyModal: React.FC<LoyaltyModalProps> = ({
  isOpen,
  onClose,
  loyaltyProfile,
  language,
}) => {
  if (!isOpen) return null;
  const isVi = language === 'vi';

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const progressPercent = Math.min(
    100,
    Math.round((loyaltyProfile.totalSpent / loyaltyProfile.nextTierThreshold) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-xl shadow-2xl border border-stone-200 w-full max-w-xl max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-800 text-amber-200 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-editorial text-lg font-bold">L'Élixir VIP Atelier Club</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                  {loyaltyProfile.tierEn}
                </span>
              </div>
              <p className="text-xs text-stone-300">
                {isVi ? `Thành viên thân thiết từ ${loyaltyProfile.memberSince}` : `Distinguished member since ${loyaltyProfile.memberSince}`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto text-xs text-stone-700">
          
          {/* Card: Points & Progress */}
          <div className="p-4 bg-stone-50 rounded-lg border border-stone-200">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-stone-500 font-medium">{isVi ? 'Quỹ Điểm VIP Khả Dụng:' : 'Available Loyalty Points:'}</span>
              <span className="font-mono-tabular font-bold text-2xl text-amber-900">
                {loyaltyProfile.points} <span className="text-xs font-normal text-stone-500">pts</span>
              </span>
            </div>

            <div className="text-[11px] text-stone-500 mb-3 flex justify-between">
              <span>{isVi ? 'Tương đương giảm giá:' : 'Redeemable value:'} <strong className="text-stone-900 font-mono-tabular">{formatPrice(loyaltyProfile.points * 100)}</strong></span>
              <span>100 pts = 10.000 ₫</span>
            </div>

            {/* Next tier progress */}
            <div className="pt-2 border-t border-stone-200">
              <div className="flex justify-between text-[11px] mb-1">
                <span>{isVi ? 'Tiến độ lên hạng Kim Cương (Diamond):' : 'Progress to Diamond Tier:'}</span>
                <span className="font-mono-tabular font-semibold text-stone-900">{progressPercent}%</span>
              </div>
              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-800 h-full rounded-full" style={{ width: `${progressPercent}%` }} />
              </div>
              <span className="text-[10px] text-stone-400 mt-1 block">
                {isVi ? `Chi tiêu thêm ${formatPrice(loyaltyProfile.nextTierThreshold - loyaltyProfile.totalSpent)} để nâng hạng.` : `Spend ${formatPrice(loyaltyProfile.nextTierThreshold - loyaltyProfile.totalSpent)} more to upgrade.`}
              </span>
            </div>
          </div>

          {/* Member Privileges List */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-800" />
              <span>{isVi ? 'Đặc quyền dành riêng cho hạng Platinum của bạn' : 'Your Platinum VIP Privileges'}</span>
            </h4>

            <div className="space-y-2.5">
              <div className="p-3 bg-white rounded border border-stone-200 flex items-start gap-2.5">
                <div className="w-6 h-6 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="text-stone-900 block">{isVi ? 'Giảm 10% trên mọi đơn hoa tươi' : '10% Lifetime Discount on All Blooms'}</strong>
                  <span className="text-stone-500 text-[11px]">{isVi ? 'Tự động áp dụng hoặc cộng dồn điểm thưởng.' : 'Applied seamlessly at checkout.'}</span>
                </div>
              </div>

              <div className="p-3 bg-white rounded border border-stone-200 flex items-start gap-2.5">
                <div className="w-6 h-6 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="text-stone-900 block">{isVi ? 'Ưu tiên giao hỏa tốc 2 giờ không tính phụ phí' : 'Priority Express 2H Dispatch with Zero Surcharge'}</strong>
                  <span className="text-stone-500 text-[11px]">{isVi ? 'Xe lạnh chuyên dụng luôn ưu tiên đơn hàng của bạn trước.' : 'Dedicated climate transport priority queue.'}</span>
                </div>
              </div>

              <div className="p-3 bg-white rounded border border-stone-200 flex items-start gap-2.5">
                <div className="w-6 h-6 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="text-stone-900 block">{isVi ? 'Tặng thiệp nghệ thuật dát vàng dập nổi cao cấp' : 'Free Gold-Foil Embossed Calligraphy Cards'}</strong>
                  <span className="text-stone-500 text-[11px]">{isVi ? 'Nghệ nhân viết tay từng nét chữ chúc mừng.' : 'Handwritten by our in-house master calligrapher.'}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded transition-colors cursor-pointer"
          >
            {isVi ? 'Đã Hiểu' : 'Understood'}
          </button>
        </div>
      </div>
    </div>
  );
};
