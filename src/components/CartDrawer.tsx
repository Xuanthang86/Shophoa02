import React from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { CartItem, Language } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToCheckout: () => void;
  language: Language;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  language,
}) => {
  if (!isOpen) return null;
  const isVi = language === 'vi';

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const FREE_SHIPPING_THRESHOLD = 2000000;
  const subtotal = items.reduce((acc, item) => {
    const vaseFee = item.includeVase ? 250000 : 0;
    return acc + (item.product.price + vaseFee) * item.quantity;
  }, 0);

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-stone-900" />
            <h3 className="font-editorial text-lg font-bold text-stone-900">
              {isVi ? 'Túi Hoa Của Bạn' : 'Your Shopping Bag'}
            </h3>
            <span className="font-mono-tabular text-xs text-stone-500 bg-stone-200/60 px-2 py-0.5 rounded-full">
              {items.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="p-4 bg-amber-50/60 border-b border-amber-200/50 text-xs">
          {amountNeededForFreeShipping > 0 ? (
            <p className="text-stone-700 mb-2">
              {isVi ? (
                <>Mua thêm <strong className="font-mono-tabular text-amber-900">{formatPrice(amountNeededForFreeShipping)}</strong> để được <strong className="text-amber-900">Miễn Phí Vận Chuyển Xe Lạnh 2H</strong></>
              ) : (
                <>Add <strong className="font-mono-tabular text-amber-900">{formatPrice(amountNeededForFreeShipping)}</strong> more for <strong className="text-amber-900">Free Climate-Controlled Express Delivery</strong></>
              )}
            </p>
          ) : (
            <p className="text-emerald-800 font-semibold mb-2 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{isVi ? 'Bạn đã được Miễn Phí Vận Chuyển Hỏa Tốc Xe Lạnh!' : 'You unlocked Free Express 2H Delivery!'}</span>
            </p>
          )}

          <div className="w-full bg-amber-200/60 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-amber-800 h-full rounded-full transition-all duration-500" 
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400">
              <ShoppingBag className="w-12 h-12 stroke-1 mb-3 text-stone-300" />
              <p className="font-editorial text-base text-stone-700 mb-1">
                {isVi ? 'Túi hoa của bạn đang trống' : 'Your shopping bag is empty'}
              </p>
              <p className="text-xs text-stone-500 max-w-xs mb-4">
                {isVi ? 'Hãy chọn một tác phẩm hoa tươi nghệ thuật để trao gửi yêu thương.' : 'Discover our curated botanical collections.'}
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 rounded transition-colors cursor-pointer"
              >
                {isVi ? 'Dạo Xem Bộ Sưu Tập' : 'Browse Catalog'}
              </button>
            </div>
          ) : (
            items.map((item) => {
              const itemPrice = item.product.price + (item.includeVase ? 250000 : 0);
              return (
                <div 
                  key={item.id}
                  className="flex gap-3 pb-4 border-b border-stone-100 text-xs"
                >
                  <img
                    src={item.product.image}
                    alt={isVi ? item.product.name : item.product.nameEn}
                    className="w-18 h-18 object-cover rounded bg-stone-100 border border-stone-200 shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1 mb-0.5">
                        <h4 className="font-semibold text-stone-900 line-clamp-1">
                          {isVi ? item.product.name : item.product.nameEn}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Customization Details */}
                      <div className="text-[11px] text-stone-500 space-y-0.5">
                        {item.includeVase && (
                          <div className="text-amber-900 font-medium">+ Bình gốm nghệ thuật</div>
                        )}
                        {item.ribbonColor && (
                          <div>Nơ: {item.ribbonColor}</div>
                        )}
                        <div>Giao: {item.deliveryDate} ({item.deliveryTimeSlot.slice(0, 13)})</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1">
                      <div className="flex items-center border border-stone-200 rounded bg-stone-50">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="px-2 py-0.5 text-stone-600 hover:text-stone-900 font-bold cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2 font-mono-tabular font-bold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-stone-600 hover:text-stone-900 font-bold cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-mono-tabular font-bold text-stone-900">
                        {formatPrice(itemPrice * item.quantity)}
                      </span>
                    </div>

                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer & Checkout Trigger */}
        {items.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-stone-50/70 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-600">{isVi ? 'Tạm tính' : 'Subtotal'}:</span>
              <span className="font-mono-tabular font-bold text-base text-stone-900">
                {formatPrice(subtotal)}
              </span>
            </div>

            <p className="text-[11px] text-stone-400">
              {isVi ? 'Giá đã bao gồm VAT và thiệp thư pháp cao cấp.' : 'VAT and handwritten calligraphy card included.'}
            </p>

            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 px-4 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm group"
            >
              <span>{isVi ? 'Tiến Hành Đặt Hàng & Thanh Toán' : 'Proceed to Checkout'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
