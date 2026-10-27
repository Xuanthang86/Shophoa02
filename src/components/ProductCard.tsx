import React from 'react';
import { Star, Clock } from 'lucide-react';
import { FlowerProduct, Language } from '../types';

interface ProductCardProps {
  product: FlowerProduct;
  language: Language;
  onSelect: (product: FlowerProduct) => void;
  onQuickAdd: (product: FlowerProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  language,
  onSelect,
  onQuickAdd,
}) => {
  const isVi = language === 'vi';

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div 
      className="group relative flex flex-col bg-white border border-stone-200/90 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
      onClick={() => onSelect(product)}
    >
      {/* Product Image Slot (65-75% visual weight, 4:3 aspect ratio) */}
      <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
        <img
          src={product.image}
          alt={isVi ? product.name : product.nameEn}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
          onError={(e) => {
            // Zero broken image fallback
            e.currentTarget.style.display = 'none';
          }}
        />

        {/* Quiet text label (NO pill candy badges) */}
        {product.isBestseller && (
          <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded">
            {isVi ? 'Đặc Tuyển' : 'Signature'}
          </div>
        )}

        {product.deliveryTime === '2h' && (
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-stone-900 text-[11px] font-medium px-2 py-0.5 rounded flex items-center gap-1 shadow-xs">
            <Clock className="w-3 h-3 text-amber-800" />
            <span>{isVi ? 'Giao 2H' : '2H Delivery'}</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Metadata: clean unboxed text with typographic separator (Rule 1.A) */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
            <span className="capitalize">{product.flowerType}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular">{product.stemCount} {isVi ? 'cành' : 'stems'}</span>
            <span aria-hidden="true">·</span>
            <div className="flex items-center gap-0.5 text-stone-700">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span className="font-mono-tabular font-medium">{product.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-editorial text-base sm:text-lg font-semibold text-stone-900 group-hover:text-amber-900 transition-colors line-clamp-1 mb-1.5">
            {isVi ? product.name : product.nameEn}
          </h3>

          {/* Tagline / Subtitle */}
          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-4">
            {isVi ? product.tagline : product.taglineEn}
          </p>
        </div>

        {/* Price & Action row */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="font-mono-tabular text-sm sm:text-base font-bold text-stone-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="font-mono-tabular text-xs text-stone-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd(product);
            }}
            className="px-3 py-1.5 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-900 hover:text-white rounded-md transition-colors cursor-pointer shrink-0"
          >
            {isVi ? 'Đặt Nhanh' : 'Quick Order'}
          </button>
        </div>

      </div>
    </div>
  );
};
