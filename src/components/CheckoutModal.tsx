import React, { useState } from 'react';
import { X, QrCode, CreditCard, ShieldCheck, Check, Sparkles, Smartphone, ArrowRight, Lock } from 'lucide-react';
import { CartItem, Language, LoyaltyProfile, Order, PaymentMethod } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  loyaltyProfile: LoyaltyProfile;
  language: Language;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  loyaltyProfile,
  language,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;
  const isVi = language === 'vi';

  const [customerName, setCustomerName] = useState('Nguyễn Thúy Hằng');
  const [customerPhone, setCustomerPhone] = useState('0908 123 456');
  const [customerEmail, setCustomerEmail] = useState('thuyhang.nguyen@example.com');
  const [recipientName, setRecipientName] = useState('Nguyễn Thúy Hằng');
  const [recipientPhone, setRecipientPhone] = useState('0908 123 456');
  const [deliveryAddress, setDeliveryAddress] = useState('88 Đồng Khởi, Bến Nghé');
  const [deliveryDistrict, setDeliveryDistrict] = useState('Quận 1');
  const [deliveryCity, setDeliveryCity] = useState('TP. Hồ Chí Minh');
  const [orderNotes, setOrderNotes] = useState('Gọi người nhận trước khi tới 10 phút, bảo quản hoa xe lạnh.');
  
  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('momo');
  const [isProcessing, setIsProcessing] = useState(false);
  const [redeemPoints, setRedeemPoints] = useState(true);

  // Credit card form state
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const subtotal = items.reduce((acc, item) => {
    const vaseFee = item.includeVase ? 250000 : 0;
    return acc + (item.product.price + vaseFee) * item.quantity;
  }, 0);

  const shippingFee = subtotal >= 2000000 ? 0 : 50000;
  const pointsDiscount = redeemPoints ? Math.min(subtotal, loyaltyProfile.points * 100) : 0;
  const totalAmount = Math.max(0, subtotal + shippingFee - pointsDiscount);
  const pointsEarned = Math.floor(totalAmount / 10000);

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const newOrderNum = `ELX-${Math.floor(1000 + Math.random() * 9000)}`;
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

      const createdOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: newOrderNum,
        createdAt: `Hôm nay lúc ${timeStr}`,
        customerName: recipientName || customerName,
        customerPhone: recipientPhone || customerPhone,
        customerEmail: customerEmail,
        deliveryAddress: deliveryAddress,
        deliveryDistrict: deliveryDistrict,
        deliveryCity: deliveryCity,
        items: [...items],
        subtotal: subtotal,
        discountAmount: pointsDiscount,
        shippingFee: shippingFee,
        totalAmount: totalAmount,
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        orderStatus: 'confirmed',
        loyaltyPointsEarned: pointsEarned,
        notes: orderNotes,
        trackingHistory: [
          {
            status: 'confirmed',
            label: isVi ? (paymentMethod === 'cod' ? 'Đã tiếp nhận đơn COD' : 'Đơn hàng được xác nhận') : (paymentMethod === 'cod' ? 'COD Order Placed' : 'Order Confirmed'),
            labelEn: paymentMethod === 'cod' ? 'COD Order Placed' : 'Order Confirmed',
            timestamp: timeStr,
            note: paymentMethod === 'cod'
              ? (isVi ? 'Đơn hàng COD đã tiếp nhận thành công. Quý khách thanh toán tiền mặt khi nhận hoa.' : 'COD order received. Pay cash upon delivery.')
              : (isVi ? `Thanh toán thành công qua cổng ${paymentMethod.toUpperCase()}` : `Payment verified via ${paymentMethod.toUpperCase()}`),
            noteEn: paymentMethod === 'cod' ? 'COD order received. Pay cash upon delivery.' : `Payment verified via ${paymentMethod.toUpperCase()}`,
            completed: true,
            active: false
          },
          {
            status: 'arranging',
            label: isVi ? 'Nghệ nhân cắm hoa thủ công' : 'Artisan Arranging',
            labelEn: 'Artisan Arranging',
            timestamp: 'Đang diễn ra',
            note: isVi ? 'Florist đang tuyển chọn hoa tươi và kết ruy băng lụa.' : 'Florist selecting fresh blooms and tying ribbon.',
            noteEn: 'Florist selecting fresh blooms and tying ribbon.',
            completed: false,
            active: true
          },
          {
            status: 'inspecting',
            label: isVi ? 'Kiểm tra chất lượng & Chụp ảnh' : 'Quality Inspection',
            labelEn: 'Quality Inspection',
            timestamp: 'Chờ xử lý',
            note: isVi ? 'Hệ thống sẽ chụp ảnh gửi người đặt trước khi đi giao.' : 'Photo verification sent to buyer.',
            noteEn: 'Photo verification sent to buyer.',
            completed: false,
            active: false
          },
          {
            status: 'delivering',
            label: isVi ? 'Giao hoa hỏa tốc xe lạnh' : 'Out for Delivery',
            labelEn: 'Out for Delivery',
            timestamp: 'Dự kiến sau 45 phút',
            note: isVi ? 'Shipper chuyên trách hoa tươi đang vận chuyển.' : 'VIP flower courier en route.',
            noteEn: 'VIP flower courier en route.',
            completed: false,
            active: false
          },
          {
            status: 'completed',
            label: isVi ? 'Giao hàng thành công' : 'Delivered',
            labelEn: 'Delivered',
            timestamp: 'Dự kiến hôm nay',
            note: isVi ? 'Trao tận tay người nhận kèm thiệp chúc mừng.' : 'Handed directly to recipient.',
            noteEn: 'Handed directly to recipient.',
            completed: false,
            active: false
          }
        ]
      };

      onOrderSuccess(createdOrder);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="bg-white rounded-xl shadow-2xl border border-stone-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/80">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-800" />
            <h3 className="font-editorial text-lg font-bold text-stone-900">
              {isVi ? 'Thanh Toán An Toàn & Đặt Hoa Hỏa Tốc' : 'Bank-Grade Secure Checkout & Delivery'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleCreateOrder} className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Customer & Shipping Details */}
          <div className="md:col-span-7 space-y-6">
            
            {/* Step 1: Customer & Recipient */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-1.5">
                <span>01.</span>
                <span>{isVi ? 'Thông tin người gửi & người nhận hoa' : 'Sender & Recipient Information'}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                <div>
                  <label className="block text-stone-600 mb-1">{isVi ? 'Họ và tên người đặt:' : 'Sender full name:'}</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 mb-1">{isVi ? 'Số điện thoại người đặt:' : 'Sender phone:'}</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              <div className="text-xs mb-3">
                <label className="block text-stone-600 mb-1">{isVi ? 'Email nhận hóa đơn VAT & tiến độ:' : 'Email for tracking & receipt:'}</label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full p-2 bg-stone-50 border border-stone-200 rounded text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                <div>
                  <label className="block text-stone-600 mb-1">{isVi ? 'Họ tên người nhận hoa:' : 'Recipient name:'}</label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 mb-1">{isVi ? 'Số điện thoại người nhận:' : 'Recipient phone:'}</label>
                  <input
                    type="tel"
                    required
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              <div className="text-xs mb-3">
                <label className="block text-stone-600 mb-1">{isVi ? 'Địa chỉ giao hoa chi tiết (Số nhà, Tên đường):' : 'Delivery street address:'}</label>
                <input
                  type="text"
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Ví dụ: Căn 1802 Tòa Landmark 81, 720A Điện Biên Phủ"
                  className="w-full p-2 bg-stone-50 border border-stone-200 rounded text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-stone-600 mb-1">{isVi ? 'Quận / Huyện:' : 'District:'}</label>
                  <select
                    value={deliveryDistrict}
                    onChange={(e) => setDeliveryDistrict(e.target.value)}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded text-stone-900 focus:outline-none focus:border-stone-900 cursor-pointer"
                  >
                    <option value="Quận 1">Quận 1</option>
                    <option value="Quận 3">Quận 3</option>
                    <option value="TP. Thủ Đức">TP. Thủ Đức</option>
                    <option value="Bình Thạnh">Bình Thạnh</option>
                    <option value="Phú Nhuận">Phú Nhuận</option>
                    <option value="Quận 7">Quận 7</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-600 mb-1">{isVi ? 'Thành phố:' : 'City:'}</label>
                  <input
                    type="text"
                    disabled
                    value={deliveryCity}
                    className="w-full p-2 bg-stone-100 border border-stone-200 rounded text-stone-700 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Multi-Platform Payment Selector */}
            <div className="pt-4 border-t border-stone-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center justify-between">
                <span>02. {isVi ? 'Chọn phương thức thanh toán an toàn' : 'Select Secure Payment Method'}</span>
                <span className="text-[11px] font-normal text-emerald-800 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>256-bit SSL</span>
                </span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-4">
                {/* MoMo */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('momo')}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    paymentMethod === 'momo'
                      ? 'border-pink-600 bg-pink-50/50 shadow-xs ring-1 ring-pink-600'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-pink-700">Ví MoMo</span>
                    <Smartphone className="w-4 h-4 text-pink-600" />
                  </div>
                  <span className="text-[10px] text-stone-500 block">Quét QR & Tích lũy</span>
                </button>

                {/* VNPay */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('vnpay')}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    paymentMethod === 'vnpay'
                      ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-600'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-blue-700">VNPAY QR</span>
                    <QrCode className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-[10px] text-stone-500 block">34+ Ngân Hàng</span>
                </button>

                {/* Visa / MasterCard */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('visa')}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    paymentMethod === 'visa'
                      ? 'border-stone-900 bg-stone-50 shadow-xs ring-1 ring-stone-900'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-stone-900">Visa / Master</span>
                    <CreditCard className="w-4 h-4 text-stone-700" />
                  </div>
                  <span className="text-[10px] text-stone-500 block">3D Secure 2.0</span>
                </button>

                {/* Apple Pay */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('applepay')}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    paymentMethod === 'applepay'
                      ? 'border-stone-900 bg-stone-50 shadow-xs ring-1 ring-stone-900'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-stone-900">Apple Pay</span>
                    <Smartphone className="w-4 h-4 text-stone-900" />
                  </div>
                  <span className="text-[10px] text-stone-500 block">FaceID 1 Chạm</span>
                </button>

                {/* ZaloPay */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('zalopay')}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    paymentMethod === 'zalopay'
                      ? 'border-cyan-600 bg-cyan-50/50 shadow-xs ring-1 ring-cyan-600'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-cyan-700">ZaloPay</span>
                    <Smartphone className="w-4 h-4 text-cyan-600" />
                  </div>
                  <span className="text-[10px] text-stone-500 block">Ví điện tử Zalo</span>
                </button>

                {/* COD */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-amber-700 bg-amber-50 shadow-xs ring-1 ring-amber-700'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-amber-800">Thanh toán COD</span>
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                  </div>
                  <span className="text-[10px] text-stone-500 block">Nhận hoa trả tiền</span>
                </button>
              </div>

              {/* Dynamic Payment Details Display */}
              {paymentMethod === 'momo' && (
                <div className="p-4 bg-pink-50/70 border border-pink-200 rounded-lg flex flex-col sm:flex-row items-center gap-4 text-xs">
                  <div className="w-24 h-24 bg-white p-2 rounded border border-pink-200 flex flex-col items-center justify-center shrink-0 shadow-xs">
                    <QrCode className="w-16 h-16 text-pink-700" />
                    <span className="text-[9px] font-mono font-bold text-pink-900 mt-0.5">MOMO QR</span>
                  </div>
                  <div>
                    <span className="font-bold text-pink-900 block mb-1">Thanh toán tự động bằng ứng dụng MoMo:</span>
                    <p className="text-stone-600 leading-relaxed mb-2">
                      Mở app MoMo quét mã QR trên hoặc bấm Hoàn Tất Đặt Hàng để hệ thống tự động đồng bộ hóa giao dịch sau 1 giây.
                    </p>
                    <span className="text-[11px] text-pink-700 font-mono-tabular font-medium">
                      Mã tham chiếu: ELX-MOMO-{Math.floor(100000 + Math.random() * 900000)}
                    </span>
                  </div>
                </div>
              )}

              {paymentMethod === 'vnpay' && (
                <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-lg flex flex-col sm:flex-row items-center gap-4 text-xs">
                  <div className="w-24 h-24 bg-white p-2 rounded border border-blue-200 flex flex-col items-center justify-center shrink-0 shadow-xs">
                    <QrCode className="w-16 h-16 text-blue-700" />
                    <span className="text-[9px] font-mono font-bold text-blue-900 mt-0.5">VNPAY-QR</span>
                  </div>
                  <div>
                    <span className="font-bold text-blue-900 block mb-1">Cổng thanh toán quốc gia VNPay:</span>
                    <p className="text-stone-600 leading-relaxed">
                      Chấp nhận quét QR từ ứng dụng Vietcombank, BIDV, VietinBank, Techcombank, MB, ACB và hơn 30 ngân hàng khác.
                    </p>
                  </div>
                </div>
              )}

              {paymentMethod === 'visa' && (
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg space-y-2.5 text-xs">
                  <div>
                    <label className="block text-stone-600 mb-1">Số thẻ tín dụng / ghi nợ quốc tế:</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4111 2222 3333 4444"
                      className="w-full p-2 bg-white border border-stone-300 rounded font-mono-tabular text-stone-900"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-stone-600 mb-1">Hạn hết hiệu lực (MM/YY):</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="12/28"
                        className="w-full p-2 bg-white border border-stone-300 rounded font-mono-tabular text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 mb-1">Mã bảo mật CVV:</label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="***"
                        className="w-full p-2 bg-white border border-stone-300 rounded font-mono-tabular text-stone-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'applepay' && (
                <div className="p-4 bg-stone-900 text-white rounded-lg flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold block mb-0.5">Apple Pay Sinh Trắc Học</span>
                    <span className="text-stone-300 text-[11px]">Xác nhận nhanh chóng qua FaceID / TouchID trên thiết bị.</span>
                  </div>
                  <Smartphone className="w-6 h-6 text-amber-300" />
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-stone-700">
                  <span className="font-bold text-amber-900 block mb-1">Chính sách giao hoa thu tiền (COD):</span>
                  Quý khách kiểm tra hoa tươi và thiệp trước khi thanh toán cho shipper. Hệ thống sẽ gửi tin nhắn SMS xác thực đơn hàng.
                </div>
              )}

            </div>

          </div>

          {/* Right Column: Order Summary & VIP Loyalty Redemption */}
          <div className="md:col-span-5 bg-stone-50/80 p-5 rounded-lg border border-stone-200/80 flex flex-col justify-between">
            <div>
              <h4 className="font-editorial text-base font-bold text-stone-900 mb-3 pb-2 border-b border-stone-200">
                {isVi ? 'Tóm Tắt Đơn Hoa' : 'Order Summary'}
              </h4>

              {/* Items summary */}
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.product.image}
                        alt=""
                        className="w-10 h-10 object-cover rounded border border-stone-200"
                      />
                      <div>
                        <span className="font-medium text-stone-900 line-clamp-1">
                          {isVi ? item.product.name : item.product.nameEn}
                        </span>
                        <span className="text-stone-400 font-mono-tabular">
                          {item.quantity} × {formatPrice(item.product.price + (item.includeVase ? 250000 : 0))}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono-tabular font-semibold text-stone-900 shrink-0">
                      {formatPrice((item.product.price + (item.includeVase ? 250000 : 0)) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* VIP Points Redemption Module */}
              <div className="p-3 bg-white rounded border border-amber-200/80 mb-4 text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-amber-900 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>{loyaltyProfile.tierEn} · {loyaltyProfile.points} Điểm VIP</span>
                  </span>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={redeemPoints}
                      onChange={(e) => setRedeemPoints(e.target.checked)}
                      className="rounded text-amber-800 focus:ring-0 w-3.5 h-3.5"
                    />
                    <span className="text-[11px] font-medium text-stone-700">{isVi ? 'Đổi điểm' : 'Redeem'}</span>
                  </label>
                </div>

                {redeemPoints ? (
                  <p className="text-[11px] text-emerald-700 font-medium">
                    {isVi ? `Đã áp dụng giảm ${formatPrice(pointsDiscount)} từ quỹ điểm VIP.` : `Redeemed ${formatPrice(pointsDiscount)} discount.`}
                  </p>
                ) : (
                  <p className="text-[11px] text-stone-500">
                    {isVi ? 'Tích lũy điểm cho đơn hàng tiếp theo.' : 'Save points for future purchases.'}
                  </p>
                )}
              </div>

              {/* Fee Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 pb-3 border-b border-stone-200">
                <div className="flex justify-between">
                  <span>{isVi ? 'Tiền hoa' : 'Flowers subtotal'}:</span>
                  <span className="font-mono-tabular">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isVi ? 'Phí vận chuyển xe lạnh' : 'VIP Cold-chain Shipping'}:</span>
                  <span className="font-mono-tabular">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-semibold">{isVi ? 'Miễn phí' : 'Free'}</span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>
                {pointsDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>{isVi ? 'Giảm giá VIP Club' : 'VIP Discount'}:</span>
                    <span className="font-mono-tabular">-{formatPrice(pointsDiscount)}</span>
                  </div>
                )}
              </div>

              {/* Total Row */}
              <div className="pt-3 flex items-center justify-between">
                <span className="font-bold text-stone-900 text-sm">{isVi ? 'Tổng thanh toán' : 'Grand Total'}:</span>
                <span className="font-mono-tabular font-bold text-xl text-stone-900">
                  {formatPrice(totalAmount)}
                </span>
              </div>

              <div className="mt-2 text-[11px] text-amber-800 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>{isVi ? `Bạn sẽ tích lũy thêm +${pointsEarned} điểm sau đơn này` : `Earn +${pointsEarned} loyalty points`}</span>
              </div>

            </div>

            {/* Submit Button */}
            <div className="pt-5">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 px-4 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm group disabled:opacity-75"
              >
                {isProcessing ? (
                  <span>{isVi ? 'Đang kết nối cổng thanh toán an toàn...' : 'Connecting to secure gateway...'}</span>
                ) : (
                  <>
                    <span>{isVi ? 'Hoàn Tất Đặt Hàng & Giao Hỏa Tốc' : 'Confirm Order & Deliver'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>

          </div>

        </form>

      </div>
    </div>
  );
};
