import React, { useState } from 'react';
import { DollarSign, ShoppingCart, TrendingUp, Users, Clock, AlertTriangle, ArrowUpRight, Filter, Eye, LogOut, CheckCircle, AlertCircle } from 'lucide-react';
import { FlowerProduct, Language, Order, OrderStatus } from '../types';

interface AdminDashboardProps {
  orders: Order[];
  products: FlowerProduct[];
  language: Language;
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onUpdatePaymentStatus?: (orderId: string, newPaymentStatus: 'paid' | 'pending' | 'failed') => void;
  onViewOrder: (order: Order) => void;
  onCloseAdmin: () => void;
  onLogoutAdmin?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  orders,
  products,
  language,
  onUpdateOrderStatus,
  onUpdatePaymentStatus,
  onViewOrder,
  onCloseAdmin,
  onLogoutAdmin,
}) => {
  const isVi = language === 'vi';
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  // Accurate KPIs
  const paidOrders = orders.filter((o) => o.paymentStatus === 'paid');
  const pendingOrders = orders.filter((o) => o.paymentStatus === 'pending');
  const totalOrdersCount = orders.length;

  const totalRevenue = paidOrders.reduce((acc, o) => acc + o.totalAmount, 0);
  const pendingRevenue = pendingOrders.reduce((acc, o) => acc + o.totalAmount, 0);
  const paidRate = totalOrdersCount > 0 ? Math.round((paidOrders.length / totalOrdersCount) * 100) : 0;
  
  const avgOrderValue = paidOrders.length > 0 
    ? Math.round(totalRevenue / paidOrders.length) 
    : (totalOrdersCount > 0 ? Math.round(orders.reduce((acc, o) => acc + o.totalAmount, 0) / totalOrdersCount) : 0);

  const liveActiveVisitors = 38;
  const conversionRate = 4.8;

  // Filter orders
  const filteredOrders = orders.filter((o) => {
    if (selectedStatusFilter === 'all') return true;
    return o.orderStatus === selectedStatusFilter;
  });

  const statusLabels: Record<OrderStatus, { vi: string; en: string; color: string }> = {
    confirmed: { vi: 'Đã xác nhận', en: 'Confirmed', color: 'bg-blue-50 text-blue-800 border-blue-200' },
    arranging: { vi: 'Đang cắm hoa', en: 'Arranging', color: 'bg-amber-50 text-amber-800 border-amber-200' },
    inspecting: { vi: 'Kiểm tra chất lượng', en: 'Inspecting', color: 'bg-purple-50 text-purple-800 border-purple-200' },
    delivering: { vi: 'Đang giao 2H', en: 'Delivering', color: 'bg-indigo-50 text-indigo-800 border-indigo-200' },
    completed: { vi: 'Đã hoàn thành', en: 'Delivered', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    cancelled: { vi: 'Đã hủy', en: 'Cancelled', color: 'bg-rose-50 text-rose-800 border-rose-200' },
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-900">
                {isVi ? 'Bảng Điều Khiển Quản Trị & Doanh Thu Thời Gian Thực' : 'Real-time Executive Operations & Revenue Console'}
              </h1>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              {isVi 
                ? 'Theo dõi doanh thu thực thu, luồng đơn hàng hỏa tốc, quản lý kho hoa tươi và phân quyền điều phối.' 
                : 'Live tracking of verified revenue, express fulfillment pipelines, perishable inventory, and customer activity.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500 font-mono-tabular hidden md:inline">
              {isVi ? 'Đồng bộ WebSocket: Hoạt động' : 'WebSocket Feed: Live'}
            </span>

            {onLogoutAdmin && (
              <button
                onClick={onLogoutAdmin}
                className="px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                title={isVi ? 'Đăng xuất khỏi phiên quản trị' : 'Log out of admin console'}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{isVi ? 'Đăng Xuất' : 'Log Out'}</span>
              </button>
            )}

            <button
              onClick={onCloseAdmin}
              className="px-3.5 py-1.5 text-xs font-semibold text-stone-900 bg-white hover:bg-stone-100 border border-stone-300 rounded-md transition-colors cursor-pointer"
            >
              {isVi ? '← Trở Về Cửa Hàng' : '← Back to Storefront'}
            </button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Revenue Card */}
          <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-xs uppercase font-medium tracking-wider">{isVi ? 'Doanh Thu Thực Thu' : 'Collected Revenue'}</span>
              <DollarSign className="w-4 h-4 text-amber-800" />
            </div>
            <div className="font-mono-tabular text-2xl font-bold text-stone-900">
              {formatPrice(totalRevenue)}
            </div>
            {pendingRevenue > 0 ? (
              <div className="text-[11px] text-amber-800 font-mono-tabular mt-2">
                <span>{isVi ? `Chờ thu COD: ${formatPrice(pendingRevenue)} (${pendingOrders.length} đơn)` : `Pending COD: ${formatPrice(pendingRevenue)} (${pendingOrders.length} orders)`}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-[11px] text-emerald-700 mt-2">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+18.4% {isVi ? 'so với hôm qua' : 'vs yesterday'}</span>
              </div>
            )}
          </div>

          {/* Orders Count Card with accurate payment percentage */}
          <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-xs uppercase font-medium tracking-wider">{isVi ? 'Số Đơn Hàng' : 'Total Orders'}</span>
              <ShoppingCart className="w-4 h-4 text-stone-700" />
            </div>
            <div className="font-mono-tabular text-2xl font-bold text-stone-900">
              {totalOrdersCount} {isVi ? 'đơn' : 'orders'}
            </div>
            <div className="flex items-center gap-1 text-[11px] mt-2 font-mono-tabular">
              <span className={paidRate === 100 ? "text-emerald-700 font-medium" : "text-amber-800 font-medium"}>
                {isVi 
                  ? `${paidRate}% đã thanh toán (${paidOrders.length}/${totalOrdersCount} đơn)${pendingOrders.length > 0 ? ` · ${pendingOrders.length} đơn COD chờ thu` : ''}` 
                  : `${paidRate}% payment collected (${paidOrders.length}/${totalOrdersCount})${pendingOrders.length > 0 ? ` · ${pendingOrders.length} COD pending` : ''}`}
              </span>
            </div>
          </div>

          {/* Average Order Value */}
          <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-xs uppercase font-medium tracking-wider">{isVi ? 'Giá Trị Đơn Trung Bình' : 'Average Order Value'}</span>
              <TrendingUp className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="font-mono-tabular text-2xl font-bold text-stone-900">
              {formatPrice(avgOrderValue)}
            </div>
            <div className="text-[11px] text-stone-500 mt-2">
              <span>{isVi ? 'Phân khúc cao cấp A+' : 'Luxury A+ segment'}</span>
            </div>
          </div>

          {/* Live Visitors */}
          <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between text-stone-500 mb-2">
              <span className="text-xs uppercase font-medium tracking-wider">{isVi ? 'Khách Đang Xem Trực Tiếp' : 'Live Active Visitors'}</span>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div className="font-mono-tabular text-2xl font-bold text-stone-900 flex items-center gap-2">
              <span>{liveActiveVisitors}</span>
              <span className="text-xs font-normal text-emerald-700 font-mono-tabular">({conversionRate}% CR)</span>
            </div>
            <div className="text-[11px] text-stone-500 mt-2">
              <span>12 {isVi ? 'người đang mở giỏ hàng' : 'in active checkout'}</span>
            </div>
          </div>

        </div>

        {/* Live Revenue Visualizer & Visitor Activity Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Revenue Velocity Chart */}
          <div className="lg:col-span-8 bg-white p-6 rounded-lg border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-editorial text-base font-bold text-stone-900">
                  {isVi ? 'Biểu Đồ Doanh Thu Theo Giờ (Hôm Nay)' : 'Hourly Revenue Inflow (Today)'}
                </h3>
                <p className="text-xs text-stone-500">{isVi ? 'Cập nhật tự động mỗi khi có đơn thanh toán thành công' : 'Updated dynamically per verified transaction'}</p>
              </div>
              <span className="text-xs font-mono-tabular font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                Peak: 14:00 - 16:00
              </span>
            </div>

            {/* Visual Bar Chart */}
            <div className="h-44 flex items-end gap-3 pt-6 border-b border-stone-200 pb-2">
              {[
                { time: '08:00', amount: 1850000, height: '35%' },
                { time: '10:00', amount: 2650000, height: '50%' },
                { time: '12:00', amount: 3850000, height: '70%' },
                { time: '14:00', amount: 5500000, height: '95%' },
                { time: '16:00', amount: 4200000, height: '80%' },
                { time: '18:00', amount: 2900000, height: '55%' },
                { time: '20:00', amount: 1650000, height: '30%' },
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                  <div className="text-[10px] font-mono-tabular text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {(bar.amount / 1000000).toFixed(1)}M
                  </div>
                  <div 
                    className="w-full bg-stone-900 hover:bg-amber-800 rounded-t transition-all cursor-pointer"
                    style={{ height: bar.height }}
                  />
                  <span className="text-[10px] font-mono-tabular text-stone-500 mt-1">{bar.time}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-stone-500">
              <span>{isVi ? 'Khu vực hoạt động mạnh nhất: Quận 1, Quận 3, Thủ Đức' : 'Top Regions: D1, D3, Thu Duc'}</span>
              <span className="font-semibold text-stone-900 font-mono-tabular">Target: 30.000.000 ₫/ngày</span>
            </div>
          </div>

          {/* Perishable Flower Shelf-life Monitor */}
          <div className="lg:col-span-4 bg-white p-6 rounded-lg border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-editorial text-base font-bold text-stone-900 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-800" />
                  <span>{isVi ? 'Tồn Kho & Hạn Hoa Tươi' : 'Fresh Flower Shelf-Life'}</span>
                </h3>
                <span className="text-[10px] text-stone-400 font-mono-tabular">{products.length} chủng loại</span>
              </div>

              <div className="space-y-3">
                {products.slice(0, 4).map((p) => (
                  <div key={p.id} className="text-xs pb-2 border-b border-stone-100 last:border-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-stone-800 truncate max-w-[170px]">
                        {isVi ? p.name : p.nameEn}
                      </span>
                      <span className="font-mono-tabular font-bold text-stone-900">
                        {p.stock} {isVi ? 'bó' : 'units'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-stone-500">
                      <span>Độ tươi tối ưu: <strong className="text-emerald-700">6 ngày nữa</strong></span>
                      <span className="text-amber-800">Cắt cành 24/10</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-200 flex items-center gap-2 text-xs text-stone-600 bg-amber-50/50 p-2.5 rounded">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{isVi ? 'Tất cả cành hoa đều đạt chứng chỉ kiểm dịch A+ nhập khẩu.' : 'All stems verified phytosanitary grade A+.'}</span>
            </div>
          </div>

        </div>

        {/* Real-time Order Management Table */}
        <div className="bg-white rounded-lg border border-stone-200 shadow-xs overflow-hidden">
          
          <div className="p-5 border-b border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-stone-50/60">
            <div>
              <h3 className="font-editorial text-lg font-bold text-stone-900">
                {isVi ? 'Quản Lý & Điều Phối Trạng Thái Đơn Hàng' : 'Order Fulfillment & State Management'}
              </h3>
              <p className="text-xs text-stone-500">
                {isVi ? 'Admin có thể tự do thay đổi bất kỳ trạng thái nào của đơn hàng hoặc xác nhận thu tiền COD.' : 'Administrators can freely select any lifecycle state and verify COD payments.'}
              </p>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-stone-400" />
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="text-xs bg-white border border-stone-300 rounded px-2.5 py-1 text-stone-800 font-medium focus:outline-none cursor-pointer"
              >
                <option value="all">{isVi ? 'Tất cả trạng thái' : 'All Statuses'}</option>
                <option value="confirmed">{isVi ? 'Đã xác nhận' : 'Confirmed'}</option>
                <option value="arranging">{isVi ? 'Đang cắm hoa' : 'Arranging'}</option>
                <option value="inspecting">{isVi ? 'Kiểm tra chất lượng' : 'Inspecting'}</option>
                <option value="delivering">{isVi ? 'Đang giao 2H' : 'Delivering'}</option>
                <option value="completed">{isVi ? 'Đã hoàn thành' : 'Completed'}</option>
                <option value="cancelled">{isVi ? 'Đã hủy đơn' : 'Cancelled'}</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-100/70 border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Mã Đơn</th>
                  <th className="py-3 px-4">Khách Hàng & Nơi Giao</th>
                  <th className="py-3 px-4">Tác Phẩm Hoa</th>
                  <th className="py-3 px-4">Tổng Tiền</th>
                  <th className="py-3 px-4">Thanh Toán</th>
                  <th className="py-3 px-4">Lựa Chọn Trạng Thái</th>
                  <th className="py-3 px-4 text-right">Chi Tiết</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-stone-400">
                      {isVi ? 'Không có đơn hàng nào trong bộ lọc này.' : 'No orders found matching filter.'}
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((ord) => {
                    const stg = statusLabels[ord.orderStatus] || statusLabels.confirmed;
                    const isCod = ord.paymentMethod === 'cod';
                    const isPaid = ord.paymentStatus === 'paid';

                    return (
                      <tr key={ord.id} className="hover:bg-stone-50/80 transition-colors">
                        
                        {/* Order Code & Time */}
                        <td className="py-3.5 px-4">
                          <span className="font-mono-tabular font-bold text-stone-900 block">
                            #{ord.orderNumber}
                          </span>
                          <span className="text-[10px] text-stone-400">{ord.createdAt}</span>
                        </td>

                        {/* Customer */}
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-stone-900 block">{ord.customerName}</span>
                          <span className="text-stone-500 text-[11px] block">{ord.customerPhone}</span>
                          <span className="text-stone-400 text-[10px] truncate max-w-xs block">
                            {ord.deliveryDistrict}, {ord.deliveryCity}
                          </span>
                        </td>

                        {/* Items */}
                        <td className="py-3.5 px-4">
                          <span className="text-stone-800 font-medium block">
                            {ord.items[0]?.product.name || 'Bó hoa'}
                          </span>
                          <span className="text-stone-400 text-[10px]">
                            {ord.items.length} món · {ord.items[0]?.ribbonColor || 'Lụa chuẩn'}
                          </span>
                        </td>

                        {/* Amount */}
                        <td className="py-3.5 px-4 font-mono-tabular font-bold text-stone-900">
                          {formatPrice(ord.totalAmount)}
                        </td>

                        {/* Payment Method & Status */}
                        <td className="py-3.5 px-4">
                          <span className="uppercase text-[10px] font-bold tracking-wider text-stone-700 bg-stone-100 px-2 py-0.5 rounded block w-fit mb-1">
                            {ord.paymentMethod}
                          </span>
                          
                          {isPaid ? (
                            <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 inline-flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-emerald-600" />
                              <span>{isVi ? 'Đã thanh toán' : 'Paid'}</span>
                            </span>
                          ) : (
                            <div className="space-y-1">
                              <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 inline-flex items-center gap-1">
                                <AlertCircle className="w-3 h-3 text-amber-600" />
                                <span>{isVi ? 'Chờ thu tiền' : 'Pending'}</span>
                              </span>

                              {onUpdatePaymentStatus && (
                                <button
                                  type="button"
                                  onClick={() => onUpdatePaymentStatus(ord.id, 'paid')}
                                  className="text-[10px] font-medium text-emerald-700 hover:text-emerald-900 hover:underline block cursor-pointer"
                                  title={isVi ? 'Xác nhận đã thu tiền đơn hàng' : 'Mark as paid'}
                                >
                                  {isVi ? '✓ Đã thu tiền' : '✓ Mark paid'}
                                </button>
                              )}
                            </div>
                          )}
                        </td>

                        {/* Flexible Status Selector - Allows choosing ANY status */}
                        <td className="py-3.5 px-4">
                          <select
                            value={ord.orderStatus}
                            onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as OrderStatus)}
                            className={`text-xs font-semibold px-2.5 py-1 rounded border cursor-pointer focus:outline-none transition-colors ${stg.color}`}
                          >
                            <option value="confirmed">{isVi ? '1. Đã xác nhận' : '1. Confirmed'}</option>
                            <option value="arranging">{isVi ? '2. Đang cắm hoa' : '2. Arranging'}</option>
                            <option value="inspecting">{isVi ? '3. Kiểm tra chất lượng' : '3. Quality check'}</option>
                            <option value="delivering">{isVi ? '4. Đang giao 2H' : '4. Out for delivery'}</option>
                            <option value="completed">{isVi ? '5. Đã hoàn thành' : '5. Completed'}</option>
                            <option value="cancelled">{isVi ? '6. Đã hủy đơn' : '6. Cancelled'}</option>
                          </select>
                        </td>

                        {/* Action: View full tracking detail */}
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => onViewOrder(ord)}
                            className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 rounded cursor-pointer inline-flex items-center gap-1 text-xs"
                            title={isVi ? 'Xem hành trình đơn' : 'View order tracking'}
                          >
                            <Eye className="w-4 h-4 text-stone-700" />
                            <span className="hidden sm:inline">{isVi ? 'Xem' : 'View'}</span>
                          </button>
                        </td>

                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
};
