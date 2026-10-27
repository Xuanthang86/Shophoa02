import React, { useState } from 'react';
import { X, Star, Clock, ShieldCheck, Check, Sparkles, MessageSquare, Send } from 'lucide-react';
import { FlowerProduct, Language, Review } from '../types';
import { INITIAL_REVIEWS } from '../data/mockData';

interface ProductDetailModalProps {
  product: FlowerProduct | null;
  onClose: () => void;
  language: Language;
  onAddToCart: (
    product: FlowerProduct,
    quantity: number,
    options: {
      includeVase: boolean;
      ribbonColor: string;
      greetingCardMessage: string;
      deliveryDate: string;
      deliveryTimeSlot: string;
    }
  ) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  language,
  onAddToCart,
}) => {
  if (!product) return null;
  const isVi = language === 'vi';

  const [quantity, setQuantity] = useState(1);
  const [includeVase, setIncludeVase] = useState(false);
  const [ribbonColor, setRibbonColor] = useState('Satin Champagne Gold');
  const [greetingCardMessage, setGreetingCardMessage] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('2026-10-27');
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('14:00 - 16:00 (Giao 2H)');
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');

  // Customer reviews state
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS.filter(r => r.productId === product.id));
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const vasePrice = includeVase ? 250000 : 0;
  const unitTotal = product.price + vasePrice;
  const grandTotal = unitTotal * quantity;

  const ribbonOptions = [
    { id: 'Satin Champagne Gold', nameVi: 'Lụa Vàng Champagne', nameEn: 'Satin Champagne' },
    { id: 'Ruby Velvet Noir', nameVi: 'Nhung Đỏ Ruby', nameEn: 'Ruby Velvet' },
    { id: 'Minimalist Charcoal', nameVi: 'Lụa Xám Than Chì', nameEn: 'Charcoal Silk' },
    { id: 'Pearl White Silk', nameVi: 'Lụa Trắng Ngọc Trai', nameEn: 'Pearl White' },
  ];

  const suggestedMessages = isVi ? [
    'Chúc em mãi rạng rỡ và hạnh phúc như những đóa hoa này. Yêu em!',
    'Kính chúc Quý Công ty Khai Trương Hồng Phát, Tài Lộc Hanh Thông!',
    'Cảm ơn Mẹ vì tất cả những hy sinh và tình yêu thương vô bờ bến.',
    'Mừng kỷ niệm ngày chung đôi. Cảm ơn vì đã luôn đồng hành bên anh.'
  ] : [
    'To the most wonderful person: may your days be as radiant as these blooms.',
    'Wishing your grand venture boundless success, prosperity, and joy!',
    'Thank you for your warmth, grace, and endless kindness.',
    'Happy Anniversary! Here is to a lifetime of love and beautiful memories.'
  ];

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      author: newReviewAuthor,
      rating: newReviewRating,
      date: isVi ? 'Vừa xong' : 'Just now',
      title: isVi ? 'Đánh giá từ khách hàng đã mua' : 'Verified Buyer Feedback',
      comment: newReviewComment,
      verifiedBuyer: true,
      tags: [isVi ? 'Đã xác thực mua hàng' : 'Verified Purchase']
    };

    setReviews([newRev, ...reviews]);
    setNewReviewAuthor('');
    setNewReviewComment('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  const handleSubmitAddToCart = () => {
    onAddToCart(product, quantity, {
      includeVase,
      ribbonColor,
      greetingCardMessage,
      deliveryDate,
      deliveryTimeSlot,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="bg-white rounded-xl shadow-2xl border border-stone-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/70">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className="uppercase tracking-wider font-semibold text-stone-900">
              {isVi ? 'Chi Tiết Tác Phẩm Hoa' : 'Atelier Floral Detail'}
            </span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{product.flowerType}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: 2-column Contiguous Purchase Module */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Visual Gallery & Scent Breakdown */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-stone-100 border border-stone-200">
              <img
                src={product.image}
                alt={isVi ? product.name : product.nameEn}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Scent & Botanical notes list */}
            <div className="p-4 bg-stone-50 rounded-lg border border-stone-200/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-2">
                {isVi ? 'Thành phần hoa tuyển chọn' : 'Curated Floral Ingredients'}
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-600">
                {product.floralNotes.map((note, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-800" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dimensions & Stem Count */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-stone-50 rounded border border-stone-200">
                <span className="text-stone-400 block mb-0.5">{isVi ? 'Kích thước chuẩn:' : 'Dimensions:'}</span>
                <span className="font-semibold text-stone-900 font-mono-tabular">{product.dimensions}</span>
              </div>
              <div className="p-3 bg-stone-50 rounded border border-stone-200">
                <span className="text-stone-400 block mb-0.5">{isVi ? 'Số cành cắm:' : 'Stem count:'}</span>
                <span className="font-semibold text-stone-900 font-mono-tabular">{product.stemCount} {isVi ? 'cành loại 1' : 'A+ blooms'}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Contiguous Purchase Experience */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              {/* Rating & Fast Delivery badges */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-1.5 text-xs">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span className="font-bold text-stone-900 font-mono-tabular">{product.rating.toFixed(1)}</span>
                  <span className="text-stone-400">({product.reviewCount} {isVi ? 'đánh giá' : 'reviews'})</span>
                </div>

                <div className="flex items-center gap-1 text-xs text-amber-900 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{isVi ? 'Hỏa tốc 2 giờ' : '2H Express'}</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="font-editorial text-2xl font-bold text-stone-900 leading-tight mb-2">
                {isVi ? product.name : product.nameEn}
              </h2>

              {/* Price display */}
              <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-stone-200">
                <span className="font-mono-tabular text-2xl font-bold text-stone-900">
                  {formatPrice(unitTotal)}
                </span>
                {product.originalPrice && (
                  <span className="font-mono-tabular text-sm text-stone-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {includeVase && (
                  <span className="text-xs text-amber-800 font-medium font-mono-tabular">
                    (+250.000₫ {isVi ? 'bình gốm mờ' : 'vase'})
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-stone-600 leading-relaxed mb-5">
                {isVi ? product.description : product.descriptionEn}
              </p>

              {/* Bespoke Customizer 1: Ceramic Vase Addon */}
              <div className="mb-4">
                <label className="flex items-center gap-2 p-2.5 bg-stone-50 hover:bg-stone-100/80 rounded border border-stone-200 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={includeVase}
                    onChange={(e) => setIncludeVase(e.target.checked)}
                    className="w-4 h-4 text-stone-900 rounded border-stone-300 focus:ring-0 cursor-pointer"
                  />
                  <div className="flex-1 flex items-center justify-between text-xs">
                    <span className="font-medium text-stone-800">
                      {isVi ? 'Cắm sẵn trong bình gốm mờ nghệ thuật (+250.000₫)' : 'Upgrade to artisanal frosted vase (+250,000₫)'}
                    </span>
                    <span className="text-stone-400 text-[11px]">{isVi ? 'Sang trọng' : 'Premium'}</span>
                  </div>
                </label>
              </div>

              {/* Bespoke Customizer 2: Ribbon Selection */}
              <div className="mb-4">
                <span className="block text-xs font-semibold text-stone-800 mb-1.5">
                  {isVi ? 'Màu ruy băng lụa dệt thủ công:' : 'Artisanal Silk Ribbon Color:'}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {ribbonOptions.map((ribbon) => (
                    <button
                      key={ribbon.id}
                      type="button"
                      onClick={() => setRibbonColor(ribbon.id)}
                      className={`px-2.5 py-1.5 text-xs rounded border transition-all text-left flex items-center justify-between cursor-pointer ${
                        ribbonColor === ribbon.id
                          ? 'border-stone-900 bg-stone-900 text-white font-medium'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <span className="truncate">{isVi ? ribbon.nameVi : ribbon.nameEn}</span>
                      {ribbonColor === ribbon.id && <Check className="w-3 h-3 text-amber-400 shrink-0 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bespoke Customizer 3: Handwritten Greeting Card with AI Suggestions */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-stone-800 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>{isVi ? 'Lời chúc thiệp thư pháp dập kim (Miễn phí):' : 'Bespoke Calligraphy Card Message:'}</span>
                  </span>
                </div>

                <textarea
                  value={greetingCardMessage}
                  onChange={(e) => setGreetingCardMessage(e.target.value)}
                  placeholder={isVi ? 'Nhập thông điệp yêu thương bạn muốn nghệ nhân viết tay lên thiệp...' : 'Enter your handwritten greeting message...'}
                  rows={2}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 focus:bg-white transition-all"
                />

                {/* Quick AI suggestion chips */}
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {suggestedMessages.map((msg, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setGreetingCardMessage(msg)}
                      className="text-[10px] text-stone-600 bg-stone-100 hover:bg-stone-200 hover:text-stone-900 px-2 py-0.5 rounded transition-colors text-left truncate max-w-full cursor-pointer"
                    >
                      "{msg.slice(0, 36)}..."
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery Scheduler (Date & Time-Slot) */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">
                    {isVi ? 'Ngày giao hoa:' : 'Delivery date:'}
                  </label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full text-xs p-2 bg-stone-50 border border-stone-200 rounded text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">
                    {isVi ? 'Khung giờ hỏa tốc:' : 'Time-slot:'}
                  </label>
                  <select
                    value={deliveryTimeSlot}
                    onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                    className="w-full text-xs p-2 bg-stone-50 border border-stone-200 rounded text-stone-900 focus:outline-none focus:border-stone-900 cursor-pointer"
                  >
                    <option value="14:00 - 16:00 (Giao 2H)">14:00 - 16:00 (Giao 2H)</option>
                    <option value="16:00 - 18:00 (Giao 2H)">16:00 - 18:00 (Giao 2H)</option>
                    <option value="18:00 - 20:00 (Buổi tối)">18:00 - 20:00 (Buổi tối)</option>
                    <option value="08:00 - 10:00 (Sáng mai)">08:00 - 10:00 (Sáng mai)</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Contiguous Sticky Buy Action Bar */}
            <div className="pt-4 border-t border-stone-200 flex items-center gap-3">
              <div className="flex items-center border border-stone-300 rounded bg-stone-50">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-stone-600 hover:text-stone-900 font-semibold cursor-pointer"
                >
                  -
                </button>
                <span className="px-3 py-2 text-xs font-mono-tabular font-bold text-stone-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-stone-600 hover:text-stone-900 font-semibold cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleSubmitAddToCart}
                className="flex-1 py-3 px-4 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>{isVi ? 'Thêm Vào Giỏ Hàng' : 'Add to Shopping Bag'}</span>
                <span className="font-mono-tabular font-normal text-amber-200">
                  · {formatPrice(grandTotal)}
                </span>
              </button>
            </div>

          </div>

        </div>

        {/* Reviews Tab & Submission Form */}
        <div className="border-t border-stone-200 p-6 bg-stone-50/50">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-editorial text-base font-bold text-stone-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-800" />
              <span>{isVi ? 'Đánh Giá & Nhận Xét Từ Khách Hàng Thực Tế' : 'Verified Client Reviews & Testimonials'}</span>
            </h4>
            <span className="text-xs text-stone-500 font-mono-tabular">
              {reviews.length} {isVi ? 'nhận xét' : 'reviews'}
            </span>
          </div>

          {/* Review List */}
          <div className="space-y-3 mb-6">
            {reviews.map((rev) => (
              <div key={rev.id} className="p-3 bg-white rounded border border-stone-200 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-stone-900">{rev.author}</span>
                    {rev.verifiedBuyer && (
                      <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded flex items-center gap-0.5 border border-emerald-200">
                        <ShieldCheck className="w-3 h-3" />
                        <span>{isVi ? 'Đã mua hàng' : 'Verified'}</span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex text-amber-500">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <span className="text-stone-400 text-[10px]">{rev.date}</span>
                  </div>
                </div>
                <p className="text-stone-700 leading-relaxed">{rev.comment}</p>
              </div>
            ))}
          </div>

          {/* Submit New Review Form */}
          <form onSubmit={handleAddReview} className="bg-white p-4 rounded border border-stone-200">
            <h5 className="text-xs font-bold text-stone-900 mb-2">
              {isVi ? 'Gửi đánh giá của bạn cho tác phẩm này:' : 'Leave your feedback:'}
            </h5>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                value={newReviewAuthor}
                onChange={(e) => setNewReviewAuthor(e.target.value)}
                placeholder={isVi ? 'Họ và tên của bạn' : 'Your name'}
                required
                className="text-xs p-2 bg-stone-50 border border-stone-200 rounded focus:outline-none focus:border-stone-900"
              />
              <div className="flex items-center gap-2 px-2 py-1 bg-stone-50 border border-stone-200 rounded">
                <span className="text-xs text-stone-600">{isVi ? 'Số sao:' : 'Rating:'}</span>
                <select
                  value={newReviewRating}
                  onChange={(e) => setNewReviewRating(Number(e.target.value))}
                  className="bg-transparent text-xs font-semibold text-amber-700 focus:outline-none cursor-pointer"
                >
                  <option value={5}>5 ★★★★★ (Hoàn hảo)</option>
                  <option value={4}>4 ★★★★☆ (Rất tốt)</option>
                  <option value={3}>3 ★★★☆☆ (Tạm ổn)</option>
                </select>
              </div>
            </div>

            <textarea
              value={newReviewComment}
              onChange={(e) => setNewReviewComment(e.target.value)}
              placeholder={isVi ? 'Chia sẻ cảm nhận về độ tươi, hương thơm, bao gói và tốc độ giao hoa...' : 'Share your thoughts on freshness, fragrance, packaging, and courier...'}
              required
              rows={2}
              className="w-full text-xs p-2 bg-stone-50 border border-stone-200 rounded focus:outline-none focus:border-stone-900 mb-2"
            />

            <div className="flex items-center justify-between">
              {reviewSubmitted ? (
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>{isVi ? 'Cảm ơn bạn! Đánh giá đã được ghi nhận.' : 'Thank you! Review published.'}</span>
                </span>
              ) : <div />}

              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3 h-3" />
                <span>{isVi ? 'Gửi Đánh Giá (+250 Điểm VIP)' : 'Submit (+250 VIP Points)'}</span>
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
};
