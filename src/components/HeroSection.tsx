import React from 'react';
import { ArrowRight, Clock, ShieldCheck, HeartHandshake, Sparkles, Terminal } from 'lucide-react';
import { Language } from '../types';
import { HERO_IMAGE } from '../data/mockData';

interface HeroSectionProps {
  language: Language;
  onExploreCatalog: () => void;
  onOpenPromptStudio: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onExploreCatalog,
  onOpenPromptStudio,
}) => {
  const isVi = language === 'vi';

  return (
    <section className="relative border-b border-stone-200/80 bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        
        {/* Split Hero: 2-column balanced layout with items-stretch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Editorial Headline & High-Converting Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Quiet 1-line text kicker (NO pill boxes) */}
            <div className="flex items-center gap-2 text-xs font-medium text-stone-500 uppercase tracking-widest mb-4">
              <span>Haute Floristry Atelier</span>
              <span aria-hidden="true">·</span>
              <span>Saigon 2026</span>
              <span aria-hidden="true">·</span>
              <span>Express 2H</span>
            </div>

            {/* Display headline with text-wrap: balance */}
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-stone-900 leading-[1.12] mb-6 [text-wrap:balance]">
              {isVi ? (
                <>
                  Nghệ thuật hoa tươi <br />
                  <span className="italic font-normal text-amber-900">chạm đến cảm xúc</span> xa xỉ.
                </>
              ) : (
                <>
                  The Art of Bespoke <br />
                  <span className="italic font-normal text-amber-900">Haute Floristry</span> & Emotion.
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl mb-8">
              {isVi 
                ? 'Tuyển chọn những đóa hồng Ecuador nhung tuyết, mẫu đơn Sarah Bernhardt Hà Lan và lan hồ điệp hoàng gia. Giao hoa hỏa tốc trong 2 giờ với xe lạnh chuyên dụng và thiệp thư pháp dập kim.'
                : 'Curated royal Ecuadorian roses, Dutch Sarah Bernhardt peonies, and pristine Phalaenopsis orchids. Delivered in 2 hours with climate-controlled transport and bespoke gold-foil calligraphy.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onExploreCatalog}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm group whitespace-nowrap shrink-0"
              >
                <span>{isVi ? 'Khám Phá Bộ Sưu Tập' : 'Explore Floral Catalog'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenPromptStudio}
                className="px-5 py-3.5 text-sm font-medium text-stone-900 bg-white hover:bg-stone-50 border border-stone-300 rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
              >
                <Terminal className="w-4 h-4 text-amber-800" />
                <span>{isVi ? 'Xem Prompt Hoàn Chỉnh' : 'Inspect Master Prompt'}</span>
              </button>
            </div>

            {/* Trust endorsement line */}
            <div className="mt-8 pt-6 border-t border-stone-200/70 flex items-center gap-4 text-xs text-stone-500">
              <div className="flex -space-x-1.5 overflow-hidden">
                <span className="inline-block w-6 h-6 rounded-full ring-2 ring-white bg-amber-800 text-white text-[10px] font-bold flex items-center justify-center">L</span>
                <span className="inline-block w-6 h-6 rounded-full ring-2 ring-white bg-stone-700 text-white text-[10px] font-bold flex items-center justify-center">E</span>
                <span className="inline-block w-6 h-6 rounded-full ring-2 ring-white bg-emerald-800 text-white text-[10px] font-bold flex items-center justify-center">F</span>
              </div>
              <div>
                <span className="font-semibold text-stone-900 font-mono-tabular">4.96/5.0</span>
                <span> · {isVi ? 'từ 1.250+ khách hàng tinh hoa & doanh nghiệp' : 'from 1,250+ verified luxury clients'}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Showcase Image (High-res generated image) */}
          <div className="lg:col-span-6 flex">
            <div className="relative w-full rounded-xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-md group">
              <img
                src={HERO_IMAGE}
                alt="L'Élixir Floral Atelier Luxury Arrangement"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover min-h-[380px] lg:min-h-[460px] group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-stone-950/10 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[11px] font-medium tracking-wider uppercase text-amber-200/90 block mb-1">
                  {isVi ? 'Tác Phẩm Đặc Tuyển Tháng Này' : 'Atelier Masterpiece of the Month'}
                </span>
                <h3 className="font-editorial text-xl sm:text-2xl font-semibold leading-snug">
                  {isVi ? 'L’Aura Royale – Cẩm Tú Cầu Lam & Hồng Juliet' : 'L’Aura Royale – Blue Hydrangeas & Juliet Roses'}
                </h3>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column Trust Strip below hero split */}
        <div className="mt-12 pt-8 border-t border-stone-200 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-md bg-stone-100 text-amber-900 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-stone-900 mb-0.5">
                {isVi ? 'Hỏa Tốc 2 Giờ Nội Thành' : '2-Hour Express Delivery'}
              </h4>
              <p className="text-[11px] text-stone-500 leading-normal">
                {isVi ? 'Vận chuyển xe lạnh giữ nhiệt 18°C hoàn hảo' : 'Climate-controlled VIP courier'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-md bg-stone-100 text-amber-900 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-stone-900 mb-0.5">
                {isVi ? '100% Hoa Nhập Khẩu Loại 1' : '100% Grade A+ Fresh Blooms'}
              </h4>
              <p className="text-[11px] text-stone-500 leading-normal">
                {isVi ? 'Độ tươi cam kết bền từ 5 - 8 ngày' : 'Guaranteed 5-8 days vibrant freshness'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-md bg-stone-100 text-amber-900 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-stone-900 mb-0.5">
                {isVi ? 'Thanh Toán Bảo Mật Đa Kênh' : 'Bank-Grade Multi-Gateway'}
              </h4>
              <p className="text-[11px] text-stone-500 leading-normal">
                {isVi ? 'MoMo, VNPay QR, Visa 3D Secure, COD' : 'MoMo, VNPay, 3D Secure & COD'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-md bg-stone-100 text-amber-900 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-stone-900 mb-0.5">
                {isVi ? 'Thiệp Thư Pháp Dát Kim' : 'Handcrafted Foil Card'}
              </h4>
              <p className="text-[11px] text-stone-500 leading-normal">
                {isVi ? 'Tặng kèm thiệp viết tay & nơ lụa satin' : 'Complimentary satin ribbon & message'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
