import React, { useState } from 'react';
import { X, CheckCircle2, Clock, Truck, ShieldCheck, Mail, MapPin, Phone, Eye, AlertCircle } from 'lucide-react';
import { Language, Order, OrderStatus } from '../types';

interface OrderTrackingModalProps {
  isOpen?: boolean;
  order: Order | null;
  onClose: () => void;
  language: Language;
  onAdvanceOrderStage?: (orderId: string) => void;
  onUpdateStatus?: (orderId: string, newStatus: OrderStatus) => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen = true,
  order,
  onClose,
  language,
  onAdvanceOrderStage,
  onUpdateStatus,
}) => {
  if (!isOpen || !order) return null;
  const isVi = language === 'vi';
  const isCod = order.paymentMethod === 'cod';
  const [activeTab, setActiveTab] = useState<'timeline' | 'email'>('timeline');

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const stages: { key: OrderStatus; labelVi: string; labelEn: string; descVi: string; descEn: string }[] = [
    { 
      key: 'confirmed', 
      labelVi: isCod ? '1. Đã Tiếp Nhận Đơn COD' : '1. Đã Tiếp Nhận & Xác Nhận', 
      labelEn: isCod ? '1. COD Order Received' : '1. Order Confirmed', 
      descVi: isCod 
        ? 'Đơn hàng COD đã được tiếp nhận thành công và lưu vào hệ thống điều phối. Quý khách sẽ thanh toán khi nhận hoa.'
        : 'Đơn hàng đã được thanh toán an toàn và lưu vào hệ thống điều phối.',
      descEn: isCod
        ? 'COD order successfully placed and assigned to dispatcher. Payment will be collected upon delivery.'
        : 'Payment verified and registered in allocation center.'
    },
    { 
      key: 'arranging', 
      labelVi: '2. Nghệ Nhân Đang Cắm Hoa', 
      labelEn: '2. Artisan Arranging', 
      descVi: 'Florist tuyển chọn từng cành hoa nhập khẩu tươi nhất, cắt tỉa và vào form.',
      descEn: 'Master florist selecting freshest blooms and assembling arrangement.'
    },
    { 
      key: 'inspecting', 
      labelVi: '3. Kiểm Định & Chụp Ảnh Nghiệm Thu', 
      labelEn: '3. Quality Inspection & Photo', 
      descVi: 'Đo độ bung cánh, cấp ẩm gốc hoa, viết thiệp dập kim và chụp ảnh lưu hồ sơ.',
      descEn: 'Hydration check, calligraphy note verification, and archive photo shot.'
    },
    { 
      key: 'delivering', 
      labelVi: '4. Đang Giao Hỏa Tốc Xe Lạnh', 
      labelEn: '4. Out for VIP Delivery', 
      descVi: isCod
        ? 'Shipper mang hoa xe lạnh và phiếu thu tiền mặt tới địa chỉ người nhận.'
        : 'Vận chuyển trong khoang xe nhiệt độ 18°C chống sốc, hướng tới người nhận.',
      descEn: isCod
        ? 'Courier en route with climate van and cash collection receipt.'
        : 'Courier en route in climate-controlled suspension vehicle.'
    },
    { 
      key: 'completed', 
      labelVi: isCod ? '5. Đã Thu Tiền & Trao Hoa Tận Tay' : '5. Đã Trao Hoa Tận Tay', 
      labelEn: isCod ? '5. Payment Collected & Delivered' : '5. Successfully Delivered', 
      descVi: isCod
        ? 'Người nhận đã nhận hoa, kiểm tra ưng ý và hoàn tất thanh toán tiền mặt.'
        : 'Hoa đã trao tận tay người nhận với nụ cười và lời chúc trân trọng.',
      descEn: isCod
        ? 'Recipient received blooms, verified quality, and completed cash payment.'
        : 'Handed directly to recipient with signature confirmation.'
    },
  ];

  const getStageIndex = (status: OrderStatus) => {
    const map: Record<OrderStatus, number> = {
      confirmed: 0,
      arranging: 1,
      inspecting: 2,
      delivering: 3,
      completed: 4,
      cancelled: -1,
    };
    return map[status] ?? 0;
  };

  const currentIdx = getStageIndex(order.orderStatus);

  const handleCloseModal = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/60 backdrop-blur-sm overflow-y-auto animate-fade-in"
      onClick={handleCloseModal}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl border border-stone-200 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-editorial text-lg font-bold text-stone-900">
                {isVi ? 'Hành Trình Đơn Hoa' : 'Real-time Flower Tracking'}
              </span>
              <span className="font-mono-tabular text-xs font-bold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded border border-amber-300">
                #{order.orderNumber}
              </span>
            </div>
            <p className="text-[11px] text-stone-500">
              {isVi 
                ? `Đặt lúc: ${order.createdAt} · Phương thức: ${isCod ? 'Thanh toán khi nhận hàng (COD)' : order.paymentMethod.toUpperCase()}` 
                : `Placed: ${order.createdAt} · Method: ${isCod ? 'Cash on Delivery (COD)' : order.paymentMethod.toUpperCase()}`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'timeline' ? 'email' : 'timeline')}
              className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded hover:bg-stone-50 transition-colors flex items-center gap-1 cursor-pointer"
            >
              {activeTab === 'timeline' ? <Mail className="w-3.5 h-3.5 text-amber-800" /> : <Eye className="w-3.5 h-3.5 text-stone-600" />}
              <span>{activeTab === 'timeline' ? (isVi ? 'Xem Email Xác Nhận' : 'View Email Receipt') : (isVi ? 'Xem Tiến Độ Giao' : 'View Tracking')}</span>
            </button>

            <button
              type="button"
              onClick={handleCloseModal}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-md transition-colors cursor-pointer"
              aria-label={isVi ? 'Đóng cửa sổ' : 'Close modal'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab 1: Live 5-Step Order Timeline */}
        {activeTab === 'timeline' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* COD Payment Notice Banner */}
            {isCod && (
              <div className="p-3 bg-amber-50/80 border border-amber-300 rounded-lg flex items-center justify-between text-xs text-amber-950">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-800 shrink-0" />
                  <span>
                    {isVi 
                      ? <>Đơn hàng sử dụng phương thức <strong>Thanh toán khi nhận hàng (COD)</strong>. Số tiền cần thanh toán cho shipper: <strong className="font-mono-tabular">{formatPrice(order.totalAmount)}</strong>.</>
                      : <>Payment Method: <strong>Cash on Delivery (COD)</strong>. Total payable to courier: <strong className="font-mono-tabular">{formatPrice(order.totalAmount)}</strong>.</>}
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded shrink-0 ml-2">
                  {isVi ? 'Chưa Thu Tiền' : 'Pending Payment'}
                </span>
              </div>
            )}

            {/* Direct State Selector & Stage Simulator */}
            <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-1.5 text-stone-700">
                <Clock className="w-4 h-4 text-amber-800 shrink-0" />
                <span className="font-semibold text-stone-900">{isVi ? 'Tùy chọn trực tiếp trạng thái đơn:' : 'Directly select order stage:'}</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {onUpdateStatus && (
                  <select
                    value={order.orderStatus}
                    onChange={(e) => onUpdateStatus(order.id, e.target.value as OrderStatus)}
                    className="flex-1 sm:flex-none text-xs font-semibold px-2.5 py-1.5 bg-white border border-stone-300 rounded shadow-xs cursor-pointer focus:outline-none text-stone-900"
                  >
                    <option value="confirmed">{isVi ? '1. Đã xác nhận' : '1. Confirmed'}</option>
                    <option value="arranging">{isVi ? '2. Đang cắm hoa' : '2. Arranging'}</option>
                    <option value="inspecting">{isVi ? '3. Kiểm định chất lượng' : '3. Quality check'}</option>
                    <option value="delivering">{isVi ? '4. Đang giao hỏa tốc 2H' : '4. Out for delivery'}</option>
                    <option value="completed">{isVi ? '5. Đã giao thành công' : '5. Completed'}</option>
                    <option value="cancelled">{isVi ? '6. Đã hủy đơn' : '6. Cancelled'}</option>
                  </select>
                )}

                {onAdvanceOrderStage && currentIdx < 4 && (
                  <button
                    type="button"
                    onClick={() => onAdvanceOrderStage(order.id)}
                    className="px-2.5 py-1.5 text-xs font-medium text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded transition-colors cursor-pointer shrink-0"
                    title={isVi ? 'Chuyển sang bước tiếp theo' : 'Advance next stage'}
                  >
                    {isVi ? '+1 Bước →' : 'Next Step →'}
                  </button>
                )}
              </div>
            </div>

            {/* Stages Timeline */}
            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
              {stages.map((stg, i) => {
                const isCompleted = i <= currentIdx;
                const isCurrent = i === currentIdx;

                return (
                  <div key={stg.key} className="relative text-xs">
                    {/* Step Icon */}
                    <div 
                      className={`absolute -left-6 top-0 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                        isCurrent
                          ? 'bg-amber-800 text-white ring-4 ring-amber-100'
                          : isCompleted
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-200 text-stone-400'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <span className="text-[10px] font-bold">{i + 1}</span>
                      )}
                    </div>

                    {/* Step Body */}
                    <div className={`p-3 rounded-lg border transition-all ${
                      isCurrent
                        ? 'bg-amber-50/40 border-amber-300'
                        : isCompleted
                        ? 'bg-stone-50 border-stone-200'
                        : 'bg-white border-stone-100 opacity-60'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-bold ${isCurrent ? 'text-amber-900' : isCompleted ? 'text-stone-900' : 'text-stone-400'}`}>
                          {isVi ? stg.labelVi : stg.labelEn}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                            {isVi ? 'Đang tiến hành' : 'In Progress'}
                          </span>
                        )}
                        {isCompleted && !isCurrent && (
                          <span className="text-[10px] text-emerald-700 font-medium">
                            {isVi ? 'Hoàn tất' : 'Done'}
                          </span>
                        )}
                      </div>
                      <p className="text-stone-600 text-[11px] leading-relaxed">
                        {isVi ? stg.descVi : stg.descEn}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recipient & Courier Card */}
            <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 text-xs grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-stone-400 block mb-1 uppercase tracking-wider text-[10px]">
                  {isVi ? 'Địa chỉ giao hoa:' : 'Delivery address:'}
                </span>
                <p className="font-semibold text-stone-900 flex items-start gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                  <span>{order.deliveryAddress}, {order.deliveryDistrict}, {order.deliveryCity}</span>
                </p>
                <p className="text-stone-500 mt-1 pl-5">
                  {isVi ? 'Người nhận:' : 'Recipient:'} <strong>{order.customerName}</strong> ({order.customerPhone})
                </p>
              </div>

              <div>
                <span className="text-stone-400 block mb-1 uppercase tracking-wider text-[10px]">
                  {isVi ? 'Dịch vụ vận chuyển:' : 'Courier fleet:'}
                </span>
                <p className="font-semibold text-stone-900 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-stone-700" />
                  <span>VIP Climate Van (18°C)</span>
                </p>
                <p className="text-stone-500 mt-1 pl-5">
                  {isVi ? 'Tài xế chuyên trách hoa tươi: Nguyễn Văn Tuấn' : 'Designated floral courier: Tuan Nguyen'}
                </p>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Simulated Email Receipt (Transactional HTML) */}
        {activeTab === 'email' && (
          <div className="flex-1 overflow-y-auto p-6 bg-stone-100">
            <div className="bg-white max-w-xl mx-auto rounded-lg shadow-sm border border-stone-200 p-6 text-xs text-stone-700 font-sans space-y-4">
              
              {/* Email Header */}
              <div className="border-b border-stone-200 pb-4 text-center">
                <span className="font-editorial text-xl font-bold tracking-tight text-stone-900 block mb-1">
                  L'ÉLIXIR FLORAL ATELIER
                </span>
                <span className="text-[11px] text-stone-400">
                  88 Dong Khoi, District 1, Ho Chi Minh City · Hotline: 1900 8888
                </span>
              </div>

              {/* Email Greeting block - Explicitly differentiated between COD and online payment */}
              <div className="bg-stone-50 p-3.5 rounded border border-stone-200">
                <p className="font-semibold text-stone-900 mb-1.5">
                  {isVi ? `Kính gửi Quý khách ${order.customerName},` : `Dear ${order.customerName},`}
                </p>
                <p className="text-stone-600 leading-relaxed text-[11px]">
                  {isCod ? (
                    isVi ? (
                      <>
                        Cảm ơn Quý khách đã tin tưởng lựa chọn hoa tươi nghệ thuật tại L'Élixir Floral. Đơn hàng <strong>#{order.orderNumber}</strong> (Hình thức: <strong>Thanh toán khi nhận hàng - COD</strong>) đã được tiếp nhận thành công và chuyển tới nghệ nhân cắm hoa. Quý khách vui lòng chuẩn bị số tiền <strong>{formatPrice(order.totalAmount)}</strong> để thanh toán cho nhân viên giao hoa khi nhận tác phẩm.
                      </>
                    ) : (
                      <>
                        Thank you for choosing L'Élixir Floral Atelier. Order <strong>#{order.orderNumber}</strong> (Payment method: <strong>Cash on Delivery - COD</strong>) has been successfully received and forwarded to our master florist. Please prepare <strong>{formatPrice(order.totalAmount)}</strong> in cash to complete payment upon receiving your floral arrangement.
                      </>
                    )
                  ) : (
                    isVi ? (
                      <>
                        Cảm ơn Quý khách đã tin tưởng lựa chọn hoa tươi nghệ thuật tại L'Élixir Floral. Đơn hàng <strong>#{order.orderNumber}</strong> đã được thanh toán trực tuyến thành công qua cổng <strong>{order.paymentMethod.toUpperCase()}</strong> và chuyển tới nghệ nhân.
                      </>
                    ) : (
                      <>
                        Thank you for choosing L'Élixir Floral Atelier. Order <strong>#{order.orderNumber}</strong> has been successfully verified via <strong>{order.paymentMethod.toUpperCase()}</strong> and forwarded to our master florist.
                      </>
                    )
                  )}
                </p>
              </div>

              {/* Order breakdown */}
              <div>
                <h5 className="font-bold text-stone-900 mb-2 border-b border-stone-200 pb-1">
                  {isVi ? 'Chi Tiết Đơn Hàng' : 'Order Breakdown'}
                </h5>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-1 border-b border-stone-100">
                      <div>
                        <span className="font-semibold text-stone-900">
                          {isVi ? item.product.name : item.product.nameEn}
                        </span>
                        <div className="text-[10px] text-stone-400">
                          SL: {item.quantity} · {item.includeVase ? (isVi ? 'Kèm bình gốm' : 'With vase') : (isVi ? 'Bó hoa' : 'Bouquet')}
                        </div>
                      </div>
                      <span className="font-mono-tabular font-semibold text-stone-900">
                        {formatPrice((item.product.price + (item.includeVase ? 250000 : 0)) * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 space-y-1 text-right text-[11px]">
                  <div>Tạm tính: <span className="font-mono-tabular">{formatPrice(order.subtotal)}</span></div>
                  {order.discountAmount > 0 && (
                    <div className="text-emerald-700">Giảm giá VIP: -<span className="font-mono-tabular">{formatPrice(order.discountAmount)}</span></div>
                  )}
                  <div>Vận chuyển hỏa tốc: <span className="font-mono-tabular">{formatPrice(order.shippingFee)}</span></div>
                  <div className="font-bold text-sm text-stone-900 pt-1 border-t border-stone-200">
                    Tổng cộng: <span className="font-mono-tabular">{formatPrice(order.totalAmount)}</span>
                  </div>
                  <div className="text-[11px] font-medium pt-1">
                    {isCod ? (
                      <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block mt-1">
                        {isVi ? 'Hình thức: COD (Thu tiền mặt khi nhận hoa)' : 'Method: Cash on Delivery (Pay on receipt)'}
                      </span>
                    ) : (
                      <span className="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block mt-1">
                        {isVi ? `Đã thanh toán qua ${order.paymentMethod.toUpperCase()}` : `Paid via ${order.paymentMethod.toUpperCase()}`}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Calligraphy card message */}
              {order.items[0]?.greetingCardMessage && (
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded text-[11px]">
                  <strong className="text-amber-900 block mb-0.5">Lời chúc viết tay trên thiệp:</strong>
                  <p className="italic text-stone-700">"{order.items[0].greetingCardMessage}"</p>
                </div>
              )}

              <div className="pt-4 border-t border-stone-200 text-center text-[10px] text-stone-400">
                Email tự động được gửi từ hệ thống L'Élixir Floral Notification Service.
              </div>

            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-3 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-600">
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-amber-800" />
            <span>Hotline hỗ trợ 24/7: <strong>1900 8888</strong></span>
          </div>

          <button
            type="button"
            onClick={handleCloseModal}
            className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded transition-colors cursor-pointer shadow-xs"
          >
            {isVi ? 'Đóng Cửa Sổ' : 'Close Window'}
          </button>
        </div>

      </div>
    </div>
  );
};
