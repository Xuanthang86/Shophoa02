import React from 'react';
import { Phone, MapPin, Mail, ShieldCheck, Heart } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
  onOpenPromptStudio: () => void;
  onNavigateSection: (secId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onOpenPromptStudio,
  onNavigateSection,
}) => {
  const isVi = language === 'vi';

  return (
    <footer className="bg-stone-900 text-stone-300 text-xs border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-editorial text-2xl font-bold tracking-tight text-white block">
              L'ÉLIXIR FLORAL
            </span>
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              {isVi 
                ? 'Nhà mốt hoa tươi nghệ thuật cao cấp tại Sài Gòn. Chuyên hoa nhập khẩu loại 1, thiết kế lẵng hoa nghệ thuật và dịch vụ giao hoa hỏa tốc trong 2 giờ bằng xe lạnh bảo quản chuyên dụng.'
                : 'Bespoke Haute Floristry Atelier. Curating pristine imported Ecuadorian roses, Dutch peonies, and royal orchids with 2-hour climate-controlled VIP delivery.'}
            </p>

            <div className="pt-2 text-stone-400 text-xs space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>88 Đồng Khởi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Hotline: 1900 8888 · (028) 3822 9999</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>atelier@leixirfloral.vn</span>
              </div>
            </div>
          </div>

          {/* Nav links col 1 */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              {isVi ? 'Bộ Sưu Tập' : 'Collections'}
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => onNavigateSection('catalog')} className="hover:text-white transition-colors cursor-pointer">
                  {isVi ? 'Hoa Hồng Ecuador' : 'Ecuadorian Roses'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('catalog')} className="hover:text-white transition-colors cursor-pointer">
                  {isVi ? 'Mẫu Đơn Hà Lan' : 'Dutch Peonies'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('catalog')} className="hover:text-white transition-colors cursor-pointer">
                  {isVi ? 'Lan Hồ Điệp Hoàng Gia' : 'Royal Orchids'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('catalog')} className="hover:text-white transition-colors cursor-pointer">
                  {isVi ? 'Bình Hoa Nghệ Thuật' : 'Artisanal Vases'}
                </button>
              </li>
            </ul>
          </div>

          {/* Nav links col 2 */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              {isVi ? 'Dịch Vụ Khách Hàng' : 'Customer Care'}
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  {isVi ? 'Giao Hỏa Tốc 2 Giờ' : '2-Hour Express'}
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  {isVi ? 'Chính Sách Hoàn Tiền 100%' : '100% Satisfaction Guarantee'}
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  {isVi ? 'Hướng Dẫn Chăm Sóc Hoa' : 'Flower Care Guide'}
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  {isVi ? 'Đặt Hoa Doanh Nghiệp B2B' : 'Corporate Floral Services'}
                </span>
              </li>
            </ul>
          </div>

          {/* Master Prompt Studio CTA */}
          <div className="md:col-span-3 space-y-3 bg-stone-800/60 p-4 rounded-lg border border-stone-800">
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>{isVi ? 'Prompt Studio & Kiến Trúc' : 'Master Prompt Studio'}</span>
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              {isVi 
                ? 'Prompt kỹ sư phần mềm hoàn chỉnh cho toàn bộ hệ thống e-commerce hoa tươi có sẵn để sao chép & tích hợp.' 
                : 'Access the complete enterprise software prompt blueprint and technical specification.'}
            </p>
            <button
              onClick={onOpenPromptStudio}
              className="w-full py-2 px-3 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded transition-colors cursor-pointer"
            >
              {isVi ? 'Mở Prompt Studio' : 'Open Prompt Studio'}
            </button>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <div>
            © 2026 L'Élixir Floral Atelier. All rights reserved. {isVi ? 'Bản quyền thuộc về L\'Élixir Floral.' : ''}
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <span>MoMo</span>
            <span>·</span>
            <span>VNPay QR</span>
            <span>·</span>
            <span>Visa/Mastercard 3DS</span>
            <span>·</span>
            <span>Apple Pay</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
