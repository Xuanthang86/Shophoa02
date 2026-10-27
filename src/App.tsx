import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FilterBar } from './components/FilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLoginModal } from './components/AdminLoginModal';
import { LiveChatConcierge } from './components/LiveChatConcierge';
import { PromptStudioModal } from './components/PromptStudioModal';
import { LoyaltyModal } from './components/LoyaltyModal';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { OfflineBanner } from './components/OfflineBanner';
import { Footer } from './components/Footer';

import { 
  FlowerProduct, 
  CartItem, 
  Order, 
  OrderStatus, 
  Language, 
  FlowerType, 
  OccasionType 
} from './types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_ORDERS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_LOYALTY 
} from './data/mockData';

export default function App() {
  // Localization
  const [language, setLanguage] = useState<Language>('vi');

  // Core Data & State with LocalStorage Persistence
  const [products] = useState<FlowerProduct[]>(INITIAL_PRODUCTS);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('elixir_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('elixir_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [loyaltyProfile, setLoyaltyProfile] = useState(INITIAL_LOYALTY);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('elixir_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('elixir_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  // Modal Visibility States
  const [isPromptStudioOpen, setIsPromptStudioOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [isLoyaltyOpen, setIsLoyaltyOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<FlowerProduct | null>(null);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(null);

  // View Mode: Storefront vs Admin Console
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  // Filtering & Search
  const [selectedFlowerType, setSelectedFlowerType] = useState<FlowerType>('all');
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionType>('all');
  const [selectedSpeed, setSelectedSpeed] = useState<'all' | '2h' | 'sameday'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Dismissible Top Notification Banner
  const [showTopBanner, setShowTopBanner] = useState(true);

  // Filter products logic
  const filteredProducts = products.filter((p) => {
    if (selectedFlowerType !== 'all' && p.flowerType !== selectedFlowerType) return false;
    if (selectedOccasion !== 'all' && p.occasion !== selectedOccasion) return false;
    if (selectedSpeed !== 'all' && p.deliveryTime !== selectedSpeed) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q) || p.nameEn.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q) || p.floralNotes.some(n => n.toLowerCase().includes(q));
      if (!matchName && !matchDesc) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured
  });

  // Cart operations
  const handleAddToCart = (
    product: FlowerProduct, 
    quantity: number, 
    options: {
      includeVase: boolean;
      ribbonColor: string;
      greetingCardMessage: string;
      deliveryDate: string;
      deliveryTimeSlot: string;
    }
  ) => {
    const existingIndex = cartItems.findIndex(
      (item) => item.product.id === product.id && item.includeVase === options.includeVase && item.ribbonColor === options.ribbonColor
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        id: `ci-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        product,
        quantity,
        includeVase: options.includeVase,
        ribbonColor: options.ribbonColor,
        greetingCardMessage: options.greetingCardMessage,
        deliveryDate: options.deliveryDate,
        deliveryTimeSlot: options.deliveryTimeSlot,
      };
      setCartItems((prev) => [newItem, ...prev]);
    }

    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const handleQuickAdd = (product: FlowerProduct) => {
    handleAddToCart(product, 1, {
      includeVase: false,
      ribbonColor: 'Satin Champagne Gold',
      greetingCardMessage: '',
      deliveryDate: '2026-10-27',
      deliveryTimeSlot: '14:00 - 16:00 (Giao 2H)',
    });
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Order Placement
  const handleOrderSuccess = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    setIsCheckoutOpen(false);
    setActiveTrackingOrder(newOrder);
    setIsOrderTrackingOpen(true);

    // Update loyalty points
    setLoyaltyProfile((prev) => ({
      ...prev,
      points: prev.points + newOrder.loyaltyPointsEarned,
      totalSpent: prev.totalSpent + newOrder.totalAmount,
    }));

    // Add push notification
    const isCod = newOrder.paymentMethod === 'cod';
    const formattedAmount = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(newOrder.totalAmount);
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: isCod
        ? (language === 'vi' ? `Đơn hàng COD #${newOrder.orderNumber} đã được tiếp nhận!` : `COD Order #${newOrder.orderNumber} placed!`)
        : (language === 'vi' ? `Đơn hàng #${newOrder.orderNumber} đã đặt thành công!` : `Order #${newOrder.orderNumber} successfully placed!`),
      titleEn: isCod
        ? `COD Order #${newOrder.orderNumber} placed!`
        : `Order #${newOrder.orderNumber} successfully placed!`,
      message: isCod
        ? `Đơn hàng COD trị giá ${formattedAmount} đã được tiếp nhận. Quý khách vui lòng chuẩn bị thanh toán tiền mặt khi nhận hoa.`
        : `Thanh toán thành công ${formattedAmount}. Nghệ nhân hoa đang tiếp nhận.`,
      messageEn: isCod
        ? `COD order for ${formattedAmount} confirmed. Please pay in cash upon delivery.`
        : `Payment verified for ${formattedAmount}. Florist is now preparing your fresh blooms.`,
      timestamp: 'Vừa xong',
      read: false,
      type: 'order' as const,
      orderId: newOrder.id,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Admin order status update (supports selecting ANY status)
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        return {
          ...o,
          orderStatus: newStatus,
        };
      })
    );

    if (activeTrackingOrder && activeTrackingOrder.id === orderId) {
      setActiveTrackingOrder((prev) => prev ? { ...prev, orderStatus: newStatus } : null);
    }
  };

  // Admin payment status update (e.g. mark COD as paid)
  const handleUpdatePaymentStatus = (orderId: string, newPaymentStatus: 'paid' | 'pending' | 'failed') => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        return {
          ...o,
          paymentStatus: newPaymentStatus,
        };
      })
    );

    if (activeTrackingOrder && activeTrackingOrder.id === orderId) {
      setActiveTrackingOrder((prev) => prev ? { ...prev, paymentStatus: newPaymentStatus } : null);
    }
  };

  // Admin view toggle with authentication enforcement
  const handleToggleAdminView = () => {
    if (isAdminView) {
      setIsAdminView(false);
    } else {
      if (!isAdminAuthenticated) {
        setIsAdminLoginOpen(true);
      } else {
        setIsAdminView(true);
      }
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    try {
      sessionStorage.setItem('elixir_admin_auth', 'true');
    } catch {
      // ignore
    }
    setIsAdminLoginOpen(false);
    setIsAdminView(true);
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem('elixir_admin_auth');
    } catch {
      // ignore
    }
    setIsAdminView(false);
  };

  // Click on order notification to open tracking
  const handleSelectOrderNotification = (orderId: string) => {
    const target = orders.find((o) => o.id === orderId || o.orderNumber === orderId);
    if (target) {
      setActiveTrackingOrder(target);
      setIsOrderTrackingOpen(true);
    }
  };

  // Advance next order stage simulator
  const handleAdvanceOrderStage = (orderId: string) => {
    const targetOrder = orders.find((o) => o.id === orderId);
    if (!targetOrder) return;

    const nextStatusMap: Record<OrderStatus, OrderStatus> = {
      confirmed: 'arranging',
      arranging: 'inspecting',
      inspecting: 'delivering',
      delivering: 'completed',
      completed: 'completed',
      cancelled: 'cancelled',
    };

    const nextStatus = nextStatusMap[targetOrder.orderStatus];
    handleUpdateOrderStatus(orderId, nextStatus);
  };

  const handleMarkAllNotifsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadNotifCount = notifications.filter((n) => !n.read).length;
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900">
      
      {/* Offline PWA Network Status Banner */}
      <OfflineBanner language={language} />

      {/* Dismissible Top Announcement Banner (<= 40px height as per Section 2.C) */}
      {showTopBanner && (
        <div className="bg-stone-900 text-stone-300 text-xs py-2 px-4 flex items-center justify-between border-b border-stone-800">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-semibold">Prompt Studio:</span>
              <span>
                {language === 'vi' 
                  ? 'Bấm nút "Prompt Studio" ở góc trên để sao chép toàn bộ Prompt hoàn chỉnh cho dự án này!' 
                  : 'Click "Master Prompt" above to inspect and copy the full software engineering blueprint!'}
              </span>
            </div>
            <button
              onClick={() => setShowTopBanner(false)}
              className="text-stone-400 hover:text-white text-xs ml-4 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Top Bar Contract Navigation */}
      <Header
        language={language}
        onToggleLanguage={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
        cartCount={cartItemCount}
        unreadNotifCount={unreadNotifCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenPromptStudio={() => setIsPromptStudioOpen(true)}
        onOpenLoyalty={() => setIsLoyaltyOpen(true)}
        isAdminView={isAdminView}
        onToggleAdminView={handleToggleAdminView}
        onNavigateSection={scrollToSection}
      />

      {/* Main Content Area: Conditional Storefront vs Admin Console */}
      <main className="flex-1">
        {isAdminView ? (
          <AdminDashboard
            orders={orders}
            products={products}
            language={language}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onUpdatePaymentStatus={handleUpdatePaymentStatus}
            onViewOrder={(ord) => {
              setActiveTrackingOrder(ord);
              setIsOrderTrackingOpen(true);
            }}
            onCloseAdmin={() => setIsAdminView(false)}
            onLogoutAdmin={handleAdminLogout}
          />
        ) : (
          <>
            {/* Storefront Hero Section */}
            <HeroSection
              language={language}
              onExploreCatalog={() => scrollToSection('catalog')}
              onOpenPromptStudio={() => setIsPromptStudioOpen(true)}
            />

            {/* Faceted Filtering & Search Bar */}
            <div id="catalog">
              <FilterBar
                language={language}
                selectedFlowerType={selectedFlowerType}
                onSelectFlowerType={setSelectedFlowerType}
                selectedOccasion={selectedOccasion}
                onSelectOccasion={setSelectedOccasion}
                selectedSpeed={selectedSpeed}
                onSelectSpeed={setSelectedSpeed}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortBy={sortBy}
                onSortChange={setSortBy}
                totalResults={filteredProducts.length}
              />
            </div>

            {/* Catalog Grid Section (Section Ceiling: 3-column desktop grid with generous gap) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="flex items-baseline justify-between mb-8">
                <div>
                  <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-stone-900">
                    {language === 'vi' ? 'Tác Phẩm Hoa Tuyển Chọn' : 'Curated Floral Masterpieces'}
                  </h2>
                  <p className="text-xs text-stone-500 mt-1">
                    {language === 'vi' 
                      ? 'Từng đóa hoa đều được bảo quản trong phòng lạnh 18°C trước khi giao tới tay người nhận.' 
                      : 'Each bloom is meticulously conditioned at 18°C prior to VIP climate dispatch.'}
                  </p>
                </div>

                <button
                  onClick={() => setIsPromptStudioOpen(true)}
                  className="hidden sm:inline-flex text-xs font-semibold text-amber-900 hover:text-amber-950 underline underline-offset-4 cursor-pointer"
                >
                  {language === 'vi' ? 'Xem đặc tả kiến trúc website hoa →' : 'View full prompt blueprint →'}
                </button>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="py-16 text-center bg-white rounded-lg border border-stone-200 p-8">
                  <p className="text-stone-500 text-sm mb-3">
                    {language === 'vi' 
                      ? 'Không tìm thấy tác phẩm hoa nào phù hợp với bộ lọc hiện tại.' 
                      : 'No botanical arrangements found matching your criteria.'}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedFlowerType('all');
                      setSelectedOccasion('all');
                      setSelectedSpeed('all');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 rounded transition-colors cursor-pointer"
                  >
                    {language === 'vi' ? 'Xóa Bộ Lọc' : 'Reset Filters'}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      language={language}
                      onSelect={(p) => setSelectedProduct(p)}
                      onQuickAdd={handleQuickAdd}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Atelier Story / Craftsmanship Section (Section 3 of 4) */}
            <section id="atelier" className="border-t border-stone-200 bg-white py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6 space-y-5">
                    <span className="text-xs font-semibold uppercase tracking-widest text-amber-900">
                      {language === 'vi' ? 'Triết Lý Nhà Mốt Hoa' : 'Atelier Philosophy'}
                    </span>
                    <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-stone-900 leading-tight">
                      {language === 'vi' ? (
                        <>Không đơn thuần là hoa, <br /><span className="italic text-amber-900">đó là tuyên ngôn nghệ thuật</span>.</>
                      ) : (
                        <>More than flowers, <br /><span className="italic text-amber-900">a bespoke sculptural statement</span>.</>
                      )}
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {language === 'vi' 
                        ? 'Tại L\'Élixir Floral, mỗi bó hoa là một bản giao hưởng giữa thiên nhiên và bàn tay nghệ nhân. Chúng tôi nói không với hoa ủ kho đông lạnh, cam kết 100% cành hoa tươi mới nhập khẩu hàng không mỗi tuần từ Hà Lan và Ecuador.'
                        : 'At L\'Élixir Floral, each arrangement represents a poetic dialogue between raw nature and couture craftsmanship. Sourced directly via cold-chain air freight from Dutch auctions and Ecuadorian volcanic slopes.'}
                    </p>

                    <div className="pt-2 grid grid-cols-2 gap-4 text-xs">
                      <div className="p-3 bg-stone-50 rounded border border-stone-200">
                        <span className="font-bold text-stone-900 block font-mono-tabular">18°C Cold-Chain</span>
                        <span className="text-stone-500 text-[11px]">{language === 'vi' ? 'Vận chuyển xe lạnh chuyên dụng' : 'Climate transport'}</span>
                      </div>
                      <div className="p-3 bg-stone-50 rounded border border-stone-200">
                        <span className="font-bold text-stone-900 block font-mono-tabular">100% Handmade</span>
                        <span className="text-stone-500 text-[11px]">{language === 'vi' ? 'Thiệp thư pháp dập nổi dát kim' : 'Gold foil calligraphy'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6">
                    <div className="relative rounded-xl overflow-hidden bg-stone-100 border border-stone-200 shadow-md">
                      <img
                        src="/src/assets/images/hero_luxury_floral_atelier_1793108264766.jpg"
                        alt="Atelier Craftsmanship"
                        className="w-full h-80 object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* 24/7 AI Master Florist Concierge Live Chat */}
      <LiveChatConcierge
        language={language}
        products={products}
        onQuickAdd={handleQuickAdd}
      />

      {/* Modals & Slide-out Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        language={language}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        language={language}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        loyaltyProfile={loyaltyProfile}
        language={language}
        onOrderSuccess={handleOrderSuccess}
      />

      <OrderTrackingModal
        isOpen={isOrderTrackingOpen}
        order={activeTrackingOrder}
        onClose={() => {
          setIsOrderTrackingOpen(false);
          setActiveTrackingOrder(null);
        }}
        language={language}
        onAdvanceOrderStage={handleAdvanceOrderStage}
        onUpdateStatus={handleUpdateOrderStatus}
      />

      <PromptStudioModal
        isOpen={isPromptStudioOpen}
        onClose={() => setIsPromptStudioOpen(false)}
        language={language}
      />

      <LoyaltyModal
        isOpen={isLoyaltyOpen}
        onClose={() => setIsLoyaltyOpen(false)}
        loyaltyProfile={loyaltyProfile}
        language={language}
      />

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotifsRead}
        onSelectOrder={handleSelectOrderNotification}
        language={language}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
        language={language}
      />

      {/* Footer */}
      <Footer
        language={language}
        onOpenPromptStudio={() => setIsPromptStudioOpen(true)}
        onNavigateSection={scrollToSection}
      />

    </div>
  );
}
