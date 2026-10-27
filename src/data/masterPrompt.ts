export const MASTER_PROMPT_VI = `# PROMPT HOÀN CHỈNH: THIẾT KẾ & PHÁT TRIỂN NỀN TẢNG THƯƠNG MẠI ĐIỆN TỬ HOA TƯƠI CAO CẤP TOÀN DIỆN (LUXURY FLORAL ATELIER E-COMMERCE PLATFORM)

Bạn là một **Principal Full-Stack Software Architect & Luxury UI/UX Design Specialist** với hơn 15 năm kinh nghiệm xây dựng các hệ thống thương mại điện tử cấp doanh nghiệp (Enterprise E-Commerce) có lưu lượng truy cập cao, tính sẵn sàng 99.99%, và thiết kế chuẩn phong cách thời trang/nghệ thuật xa xỉ (Haute Floristry).

Nhiệm vụ của bạn là lập trình và xây dựng hoàn chỉnh **Nền Tảng Thương Mại Điện Tử Hoa Tươi Nghệ Thuật & Cao Cấp ("L'Élixir Floral Atelier")**, đáp ứng 100% các yêu cầu nghiệp vụ khắt khe, hiệu năng tối ưu, tính bảo mật cấp ngân hàng, và khả năng mở rộng (scalability) bền vững dưới đây.

---

## I. TỔNG QUAN HỆ THỐNG & ĐỊNH VỊ THƯƠNG HIỆU
1. **Tên thương hiệu:** L'Élixir Floral Atelier / Boutique Hoa Nghệ Thuật Cao Cấp.
2. **Phong cách thiết kế:** Minimalist Luxury & Editorial Aesthetics. Lấy cảm hứng từ các nhà mốt Haute Couture Pháp và nghệ thuật cắm hoa Ikebana đương đại. Màu sắc chủ đạo: Trắng ngọc trai (#FAF8F5), Than chì lì (#1C1917), Vàng Champagne ánh kim (#D4AF37), cùng ảnh chụp độ phân giải 8K chân thực.
3. **Mục tiêu cốt lõi:**
   - Chuyển đổi mua hàng tức thì (Instant Conversion Rate > 4.5%).
   - Tốc độ tải trang First Contentful Paint (FCP) < 0.8s, Lighthouse Score 98+.
   - Giao hoa hỏa tốc trong 2 giờ với hệ thống định tuyến và cập nhật thời gian thực (Real-time Order Tracking).
   - Bảo mật đa nền tảng đạt chứng chỉ tương đương PCI-DSS Level 1.

---

## II. NGĂN XẾP CÔNG NGHỆ CHUẨN DOANH NGHIỆP (TECH STACK)
- **Frontend Core:** React 19 + TypeScript (Strict Mode) + Next.js App Router (hoặc Vite SSR/SPA với Server Middlewares).
- **Styling & Animation:** Tailwind CSS v4 + Motion (Framer Motion) xử lý chuyển động mượt mà (60fps, GPU-accelerated: chỉ animate \`transform\` và \`opacity\`).
- **State Management & Data Fetching:** Zustand / TanStack Query (React Query) với chính sách Cache-and-Revalidate tối ưu.
- **Backend Architecture:** Node.js / Express micro-framework hoặc NestJS kiến trúc Clean Architecture (Domain-Driven Design).
- **Database & Storage:**
  - Relational Database: PostgreSQL cho Orders, Inventory, Users, Transactions (ACID compliance).
  - Caching & Session: Redis cho Cart session, Live Order Locks, Rate Limiting.
  - NoSQL / Real-time: Firebase Firestore / WebSockets (Socket.io) cho Live Chat & Order Tracking.
- **Offline & PWA:** Service Worker (Workbox), Cache Storage API, IndexedDB lưu trữ giỏ hàng và danh mục hoa khi mất kết nối mạng.
- **Security & Payments:** SDK chính thức của MoMo, VNPay, ZaloPay, Stripe (3D Secure 2.0), Apple Pay/Google Pay.
- **Search & Filter:** Meilisearch hoặc Algolia hỗ trợ tìm kiếm mờ (fuzzy search) thời gian phản hồi < 20ms.

---

## III. CHI TIẾT TỪNG PHÂN HỆ CHỨC NĂNG BẮT BUỘC

### 1. BỘ LỌC ĐA TIÊU CHÍ THEO NHU CẦU NGƯỜI DÙNG (SMART FACETED FILTER)
- **Lọc theo Loại hoa chủ đạo:** Hoa hồng Ecuador, Mẫu đơn Sarah Bernhardt, Lan hồ điệp hoàng gia, Hoa bách hợp Casablanca, Hoa Tulip Hà Lan, Cẩm tú cầu New Zealand, Cúc mẫu đơn.
- **Lọc theo Dịp trao tặng (Occasions):** Tình yêu & Kỷ niệm, Chúc mừng sinh nhật, Khai trương đại cát, Tri ân đối tác/VIP, Chia buồn trang trọng.
- **Lọc theo Tông màu phong thủy/thẩm mỹ:** Pastel nhẹ nhàng, Đỏ nhung quyến rũ, Trắng thanh khiết, Vàng hoàng kim vượng khí, Xanh lam huyền bí.
- **Lọc theo Tốc độ giao hàng:** Hỏa tốc 2 giờ (Express 2H) vs Giao trong ngày (Same-day standard).
- **Lọc theo Khoảng giá (Price Slider):** Phân khúc từ 500.000đ đến trên 10.000.000đ.
- **Tùy biến sắp xếp:** Mới nhất, Bán chạy nhất (Best-seller), Giá tăng dần, Giá giảm dần, Đánh giá cao nhất.

### 2. TRẢI NGHIỆM SẢN PHẨM & GIỎ HÀNG THÔNG MINH (INTERACTIVE PDP & CART)
- **Contiguous Purchase Module:**
  - Bộ chọn kích thước/phiên bản cành (Classic, Deluxe, Grand Imperial).
  - Tùy chọn nâng cấp kèm bình hoa nghệ thuật (Ceramic/Crystal Vase Add-on).
  - Tùy chọn màu ruy băng dệt thủ công (Satin Champagne, Nhung đỏ ruby, Đen cổ điển).
  - Trình soạn thiệp chúc mừng viết tay cao cấp (Handwritten Calligraphy Card) với kho gợi ý câu chúc theo ngữ cảnh AI (Lời chúc tình yêu, chúc đối tác kinh doanh, kỷ niệm ngày cưới).
- **Giỏ hàng trượt (Slide-over Cart Drawer):**
  - Cập nhật số lượng tức thì không giật màn hình (Optimistic UI updates).
  - Thanh đo tiến độ miễn phí vận chuyển hoa tươi xe lạnh ("Chỉ cần thêm 250.000đ để nhận Freeship").
  - Lưu giỏ hàng bền vững vào IndexedDB/LocalStorage, tự động đồng bộ khi khách hàng đăng nhập.
  - Lịch chọn ngày và khung giờ giao chính xác (Time-slot picker 2 tiếng: 08:00 - 10:00, 10:00 - 12:00, ...).

### 3. HỆ THỐNG THANH TOÁN BẢO MẬT ĐA NỀN TẢNG (SECURE PAYMENT GATEWAYS)
- **Ví điện tử nội địa:**
  - **MoMo E-Wallet:** Tích hợp tạo mã MoMo Dynamic QR Code tự động điền số tiền & mã đơn hàng; xử lý IPN Webhook tức thì.
  - **VNPay QR:** Hỗ trợ liên kết 34+ ứng dụng ngân hàng và ví điện tử quốc gia.
  - **ZaloPay:** Thanh toán trực tiếp trong 1 chạm qua tokenized gateway.
- **Thanh toán Thẻ Quốc Tế:**
  - Visa, Mastercard, JCB qua chuẩn mã hóa Tokenization và 3D Secure 2.0 OTP bảo vệ chống gian lận (Fraud Detection).
- **Ví di động cao cấp:** Apple Pay & Google Pay (xác thực sinh trắc học FaceID/TouchID).
- **COD (Thanh toán khi nhận hoa):** Có cơ chế xác thực số điện thoại OTP chống spam đơn hàng ảo.

### 4. QUẢN LÝ ĐƠN HÀNG & THEO DÕI THỜI GIAN THỰC (REAL-TIME ORDER TRACKING)
- **Trục thời gian 5 giai đoạn minh bạch:**
  1. *Đã tiếp nhận & Xác nhận thanh toán (Confirmed)*
  2. *Nghệ nhân đang cắm hoa thủ công (Artisan Arranging)*
  3. *Kiểm định chất lượng & Chụp ảnh thành phẩm (QC & Photo Inspection)*
  4. *Đang giao hàng xe lạnh chống sốc (Out for Delivery)*
  5. *Đã trao tận tay người nhận (Delivered)*
- **Bản đồ trực tiếp:** Tọa độ GPS shipper thời gian thực qua WebSocket.
- **Ảnh nghiệm thu:** Tự động gửi ảnh chụp lẵng hoa hoàn thiện cho người đặt trước khi shipper xuất phát.

### 5. HỆ THỐNG THÔNG BÁO THÔNG MINH (SMART PUSH & TRANSACTIONAL EMAIL)
- **Web Push Notifications:** Thông báo biến động trạng thái đơn hàng khi chạy ngầm; nhắc nhở ngày kỷ niệm đã lưu trước 3 ngày.
- **Email Transactional HTML Sang Trọng:**
  - Email xác nhận đơn hàng kèm hóa đơn VAT điện tử & mã vạch tra cứu.
  - Email thông báo ảnh nghiệm thu sản phẩm.
  - Email nhắc nhở chăm sóc hoa tươi (Floral Care Guide) sau 24h giao hàng.

### 6. TRỢ LÝ TƯ VẤN HOA 24/7 (AI FLORIST CONCIERGE & LIVE CHAT)
- Khung chat trực tuyến hoạt động 24/7 với khả năng phân tích ngữ cảnh:
  - Khách chỉ cần nhập: "Tôi muốn tặng sếp nữ 40 tuổi kỷ niệm 10 năm thành lập công ty, ngân sách 3 triệu" -> Trợ lý tự động đề xuất 2 mẫu lan hồ điệp & mẫu đơn tương thích với nút "Thêm vào giỏ" ngay trong cửa sổ chat.
  - Chuyển giao mượt mà sang nhân viên tư vấn con người (Human Agent Handover) khi phát sinh yêu cầu hoa thiết kế riêng theo chủ đề tiệc cưới.

### 7. CHƯƠNG TRÌNH KHÁCH HÀNG THÂN THIẾT & ĐÁNH GIÁ (VIP CLUB & SOCIAL PROOF)
- **Phân hạng VIP:** Silver (Bạc), Gold (Vàng), Platinum (Bạch kim), Diamond (Kim cương).
- **Cơ chế tích điểm:** Tích lũy 5% - 10% giá trị đơn hàng; đổi điểm trực tiếp thành voucher giảm giá ngay tại bước Checkout.
- **Hệ thống đánh giá chuẩn minh bạch:**
  - Chỉ người mua đã xác thực đơn hàng mới được gắn huy hiệu "Verified Purchaser".
  - Cho phép tải ảnh chụp thực tế bó hoa khi nhận.
  - Tách bạch điểm tiêu chí: Độ tươi của hoa, Độ giống mẫu thiết kế, Tốc độ phục vụ của shipper.

### 8. HỆ THỐNG QUẢN TRỊ ADMIN & DASHBOARD PHÂN TÍCH CHUYÊN SÂU
- **Real-Time Revenue Analytics:**
  - Doanh thu theo giờ, ngày, tuần, tháng (Live GMV tracker).
  - Tỷ lệ giá trị đơn trung bình (AOV - Average Order Value).
  - Tỷ lệ bỏ quên giỏ hàng (Cart Abandonment Rate) và funnel chuyển đổi từng bước.
- **Quản lý đơn hàng tập trung (Kanban & Table View):**
  - Đổi trạng thái đơn hàng 1 chạm, in phiếu xuất kho & nhãn thiệp tự động.
  - Phân bổ đơn hàng tự động cho chi nhánh gần người nhận nhất.
- **Quản lý kho hoa tươi nhập khẩu (Inventory Shelf-Life Tracker):**
  - Cảnh báo tồn kho hoa tươi theo số ngày cắt cành để đảm bảo 100% hoa xuất kho tươi mới.

### 9. CHẾ ĐỘ NGOẠI TUYẾN & TỐI ƯU PWA (OFFLINE-FIRST)
- Tự động cache danh mục hoa nổi bật và bộ sưu tập bằng Cache Storage.
- Khi người dùng rớt mạng internet: Hiển thị thanh thông báo Offline tinh tế; cho phép xem chi tiết hoa, thêm vào giỏ hàng và lưu nháp đơn hàng.
- Khi có mạng trở lại: Background Sync tự động kích hoạt và cập nhật giỏ hàng lên máy chủ.

### 10. TỐI ƯU SEO TOÀN DIỆN & TỐC ĐỘ TẢI TRANG (TECHNICAL SEO)
- Cấu trúc dữ liệu Schema.org (\`@type: Florist\`, \`@type: Product\`, \`@type: AggregateRating\`, \`@type: Offer\`).
- Thẻ OpenGraph, Twitter Cards hình ảnh tỷ lệ chuẩn 1200x630px.
- Hỗ trợ đa ngôn ngữ (\`lang="vi"\` và \`lang="en"\`) với thẻ \`rel="alternate" hreflang="vi"\`.
- Tối ưu hóa ảnh với WebP/AVIF hiện đại, lazy-loading có skeleton placeholder mượt mà.

---

## IV. ĐẶC TẢ CƠ SỞ DỮ LIỆU CHUẨN (DATABASE SCHEMA - POSTGRESQL DDL)

\`\`\`sql
-- Bảng người dùng & VIP
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(180) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'customer', -- 'customer', 'florist_artisan', 'admin'
  vip_tier VARCHAR(20) DEFAULT 'Silver',
  loyalty_points INT DEFAULT 0,
  total_spent DECIMAL(15, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bảng danh mục & sản phẩm hoa
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  name_en VARCHAR(255),
  slug VARCHAR(255) UNIQUE NOT NULL,
  flower_type VARCHAR(50) NOT NULL, -- 'rose', 'peony', 'orchid', 'lily', 'tulip', 'hydrangea'
  occasion VARCHAR(50) NOT NULL,    -- 'romance', 'birthday', 'grand_opening', 'anniversary', 'sympathy'
  price DECIMAL(15, 2) NOT NULL,
  original_price DECIMAL(15, 2),
  stem_count INT NOT NULL,
  dimensions VARCHAR(50),
  stock_quantity INT DEFAULT 0,
  is_express_2h BOOLEAN DEFAULT true,
  rating_average DECIMAL(3, 2) DEFAULT 5.0,
  review_count INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bảng đơn hàng
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(30) UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  recipient_name VARCHAR(120) NOT NULL,
  recipient_phone VARCHAR(20) NOT NULL,
  delivery_address TEXT NOT NULL,
  delivery_district VARCHAR(100) NOT NULL,
  delivery_city VARCHAR(100) NOT NULL,
  delivery_date DATE NOT NULL,
  delivery_timeslot VARCHAR(50) NOT NULL,
  subtotal DECIMAL(15, 2) NOT NULL,
  discount_amount DECIMAL(15, 2) DEFAULT 0,
  shipping_fee DECIMAL(15, 2) DEFAULT 0,
  total_amount DECIMAL(15, 2) NOT NULL,
  payment_method VARCHAR(30) NOT NULL, -- 'momo', 'vnpay', 'zalopay', 'visa', 'applepay', 'cod'
  payment_status VARCHAR(30) DEFAULT 'pending', -- 'pending', 'paid', 'failed'
  order_status VARCHAR(30) DEFAULT 'confirmed', -- 'confirmed', 'arranging', 'inspecting', 'delivering', 'completed', 'cancelled'
  greeting_card_text TEXT,
  florist_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bảng chi tiết đơn hàng
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INT NOT NULL,
  unit_price DECIMAL(15, 2) NOT NULL,
  ribbon_color VARCHAR(50),
  vase_included BOOLEAN DEFAULT false
);

-- Bảng lịch sử di chuyển đơn hàng theo thời gian thực
CREATE TABLE order_tracking_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  status VARCHAR(30) NOT NULL,
  note TEXT,
  latitude DECIMAL(9, 6),
  longitude DECIMAL(9, 6),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
\`\`\`

---

## V. HƯỚNG DẪN TRIỂN KHAI VÀ XUẤT MÃ NGUỒN (EXECUTION INSTRUCTIONS)
1. Hãy tạo mã nguồn sạch (Clean Code), phân chia module rõ ràng: \`/src/components\`, \`/src/data\`, \`/src/hooks\`, \`/src/types\`.
2. Đảm bảo giao diện 100% responsive, thiết kế chuyên biệt cho thiết bị di động (Mobile-First Thumb-Zone navigation) và máy tính để bàn chuẩn 1440px.
3. Tích hợp thanh thông báo trạng thái ngoại tuyến mượt mà và cơ chế tự động đồng bộ hóa.
4. Mọi tương tác nút bấm (Add to cart, Checkout, Apply filter, Switch language, Send message) đều có phản hồi giao diện tức thì dưới 150ms.
`;

export const MASTER_PROMPT_EN = `# MASTER PROMPT: PRODUCTION-GRADE LUXURY FLORAL E-COMMERCE ECOSYSTEM

You are a **Principal Enterprise Solutions Architect & Luxury E-Commerce Creative Director**.
Your objective is to engineer a bespoke, mission-critical, full-featured luxury floral boutique web application (**L'Élixir Floral Atelier**).

The application must combine the uncompromising aesthetic elegance of a Paris Haute Floristry boutique with a high-performance e-commerce engine:
1. **Faceted Filtering & Needs-based Catalog:** Filter by botanical species, sentimental occasions, color palettes, and 2-Hour Express Delivery.
2. **Contiguous PDP & Bespoke Customizer:** Add-on vases, artisanal silk ribbons, scheduled delivery slot picker, and handwritten greeting card composer.
3. **Multi-Platform Secure Payment Gateway:** MoMo QR, VNPay, ZaloPay, Visa/Mastercard (3D Secure 2.0 tokenization), Apple Pay, and COD verification.
4. **Real-time Order Lifecycle & GPS Courier Tracking:** 5-step transparent timeline with photo quality control inspection.
5. **Smart Web Push & Automated Transactional HTML Emails:** Order confirmation, delivery notifications, and flower care guides.
6. **24/7 AI Florist Concierge & Live Chat:** Contextual floral advice with in-chat product preview and 1-click cart insertion.
7. **Verified Customer Reviews & VIP Loyalty Rewards:** Multi-tier membership (Silver, Gold, Platinum, Diamond) with instant point redemption.
8. **Real-time Admin Analytics & Operations Dashboard:** Live revenue ticker, conversion funnels, Kanban order management, and perishable flower shelf-life tracker.
9. **Offline-First PWA Capabilities:** Service Worker caching, offline catalog browsing, and synchronized cart storage via IndexedDB.
10. **State-of-the-Art Security & Technical SEO:** Role-based access control (RBAC), PCI-DSS compliance, and Schema.org Florist structured data.
`;
