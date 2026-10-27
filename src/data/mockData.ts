import { FlowerProduct, LoyaltyProfile, NotificationItem, Order, Review } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_luxury_floral_atelier_1793108264766.jpg';

export const INITIAL_PRODUCTS: FlowerProduct[] = [
  {
    id: 'fl-01',
    name: 'Scarlet Reverie – Bó Hồng Ecuador Hoàng Gia',
    nameEn: 'Scarlet Reverie – Royal Ecuadorian Roses',
    flowerType: 'rose',
    occasion: 'romance',
    price: 1850000,
    originalPrice: 2200000,
    image: '/src/assets/images/product_rose_bouquet_1793108266051.jpg',
    tagline: '33 cành hồng nhung Ecuador tuyển chọn cùng lá bạch đàn bạc',
    taglineEn: '33 Selected velvet Ecuadorian red & blush roses with silver eucalyptus',
    description: 'Thiết kế tinh xảo kết hợp giữa hoa hồng nhung đỏ thẫm nhập khẩu trực tiếp từ vùng núi lửa Cotopaxi (Ecuador) cùng hồng phấn pastel. Bao bọc bởi lớp giấy lụa đen matte sang trọng và ruy băng lụa dệt tay.',
    descriptionEn: 'An exquisite sculptural bouquet marrying deep velvety Ecuadorian roses cultivated in volcanic volcanic soil with gentle blush accents, wrapped in matte archival paper with hand-tied satin ribbon.',
    floralNotes: ['Hồng nhung Ecuador 70cm', 'Hồng Ohara thơm ngát', 'Bạch đàn Baby Blue', 'Cỏ đuôi thỏ khô'],
    dimensions: '60cm x 75cm',
    stemCount: 33,
    stock: 12,
    rating: 4.95,
    reviewCount: 48,
    isBestseller: true,
    deliveryTime: '2h'
  },
  {
    id: 'fl-02',
    name: 'Sarah Bernhardt – Bình Mẫu Đơn & Bách Hợp Trắng',
    nameEn: 'Sarah Bernhardt – Peony & Casablanca Lilies',
    flowerType: 'peony',
    occasion: 'anniversary',
    price: 2650000,
    originalPrice: 2900000,
    image: '/src/assets/images/product_peony_lilies_1793108266361.jpg',
    tagline: 'Mẫu đơn Hà Lan cành lớn và hoa loa kèn trắng thanh khiết',
    taglineEn: 'Large Holland Sarah Bernhardt peonies with pristine white lilies',
    description: 'Bình hoa gốm mờ nghệ thuật gồm những đóa mẫu đơn Sarah Bernhardt viền hồng phớt bung nở kiêu sa, điểm xuyết loa kèn Casablanca thơm dịu dàng. Món quà hoàn hảo để tôn vinh tình cảm sâu sắc.',
    descriptionEn: 'Presented in a matte frosted artisanal ceramic vessel, this arrangement features ethereal Sarah Bernhardt peonies alongside fragrant Casablanca lilies, radiating timeless elegance.',
    floralNotes: ['Mẫu đơn hồng Sarah Bernhardt (Hà Lan)', 'Hoa loa kèn Casablanca', 'Thủy tiên trắng', 'Lá mimosa'],
    dimensions: '50cm x 65cm',
    stemCount: 21,
    stock: 8,
    rating: 4.98,
    reviewCount: 36,
    isBestseller: true,
    deliveryTime: '2h'
  },
  {
    id: 'fl-03',
    name: 'Zenith Phalaenopsis – Chậu Lan Hồ Điệp Hoàng Gia',
    nameEn: 'Zenith Phalaenopsis – Imperial White Orchid Cascade',
    flowerType: 'orchid',
    occasion: 'grand_opening',
    price: 3850000,
    originalPrice: 4200000,
    image: '/src/assets/images/product_orchid_monochrome_1793108266579.jpg',
    tagline: '9 cành đại hồ điệp trắng trong chậu đá mài mộc thủ công',
    taglineEn: '9 cascades of pristine imperial Phalaenopsis in artisanal stone urn',
    description: 'Tác phẩm hoa lấy cảm hứng từ nghệ thuật cắm hoa Ikebana Nhật Bản. 9 cành lan hồ điệp A+ cánh dày, độ bền từ 6 đến 8 tuần, tượng trưng cho tài lộc, trường tồn và sự khởi đầu viên mãn.',
    descriptionEn: 'Sculptural Japanese Ikebana-inspired masterpiece featuring 9 pristine Phalaenopsis stems gracefully cascading from an organic textured stoneware vessel. Lasts 6-8 weeks.',
    floralNotes: ['Lan hồ điệp trắng Đà Lạt tuyển A+', 'Cành lũa phong thủy tự nhiên', 'Rêu rừng tươi Tây Bắc'],
    dimensions: '65cm x 90cm',
    stemCount: 9,
    stock: 5,
    rating: 5.0,
    reviewCount: 29,
    isNew: true,
    deliveryTime: '2h'
  },
  {
    id: 'fl-04',
    name: 'L’Aura Pastel – Hộp Hoa Cẩm Tú Cầu & Hoa Hồng Vườn',
    nameEn: 'L’Aura Pastel – Garden Roses & Hydrangea Velvet Box',
    flowerType: 'hydrangea',
    occasion: 'birthday',
    price: 1650000,
    originalPrice: 1950000,
    image: '/src/assets/images/hero_luxury_floral_atelier_1793108264766.jpg',
    tagline: 'Sự pha trộn mềm mại giữa cẩm tú cầu lam tím và hồng kem dâu',
    taglineEn: 'A soft symphony of blue-violet hydrangeas and French garden garden roses',
    description: 'Hộp hoa tròn nhung cao cấp với điểm nhấn cẩm tú cầu nhập khẩu New Zealand cùng hoa hồng David Austin Juliet đắt giá. Mang hương thơm trà xanh dịu nhẹ lan tỏa không gian sống.',
    descriptionEn: 'A bespoke round velvet box filled with rare New Zealand hydrangeas, peach Juliet garden roses, and delicate spray carnations, diffusing a subtle calming green tea fragrance.',
    floralNotes: ['Cẩm tú cầu New Zealand', 'Hồng Juliet David Austin', 'Cát tường viền tím', 'Lá bạc silver dollar'],
    dimensions: '45cm x 50cm',
    stemCount: 28,
    stock: 14,
    rating: 4.91,
    reviewCount: 42,
    isBestseller: true,
    deliveryTime: 'sameday'
  },
  {
    id: 'fl-05',
    name: 'Golden Radiance – Bình Hoa Hướng Dương & Tulip Vàng',
    nameEn: 'Golden Radiance – Dutch Tulips & Premium Sunflowers',
    flowerType: 'tulip',
    occasion: 'grand_opening',
    price: 1450000,
    image: '/src/assets/images/product_peony_lilies_1793108266361.jpg',
    tagline: 'Sắc vàng hoàng kim mang lại vượng khí và niềm vui hân hoan',
    taglineEn: 'Radiant golden Dutch tulips and pristine sunflower accents for prosperity',
    description: 'Sự kết hợp hoàn hảo giữa những bông Tulip nhập khẩu Hà Lan thân cứng cáp và hướng dương mini đài sen. Thiết kế mang ý nghĩa thịnh vượng, hanh thông cho các buổi lễ khai trương và chúc mừng.',
    descriptionEn: 'Curated bouquet of vivid Dutch yellow tulips and miniature velvet sunflowers, curated to celebrate monumental business milestones, new beginnings, and vibrant joy.',
    floralNotes: ['Tulip vàng Hà Lan', 'Hướng dương mini Nhật', 'Hồng vàng vĩnh cửu', 'Cỏ đồng tiền'],
    dimensions: '40cm x 55cm',
    stemCount: 18,
    stock: 9,
    rating: 4.88,
    reviewCount: 22,
    isNew: true,
    deliveryTime: '2h'
  },
  {
    id: 'fl-06',
    name: 'Seraphic Grace – Kệ Hoa Lan & Bách Hợp Tri Ân',
    nameEn: 'Seraphic Grace – Elegant White Lilies & Dendrobium',
    flowerType: 'lily',
    occasion: 'sympathy',
    price: 2450000,
    image: '/src/assets/images/product_orchid_monochrome_1793108266579.jpg',
    tagline: 'Sắc trắng thanh khiết thay lời chia sẻ trang trọng và an yên',
    taglineEn: 'Pristine white blooms offering solemn comfort and timeless serenity',
    description: 'Thiết kế trang trọng với hoa ly kép trắng ngần nhập khẩu, lan dendro trắng tinh khiết kết hợp lá trầu bà kim cương, gửi gắm lời nguyện cầu an lành và sự kính trọng sâu sắc.',
    descriptionEn: 'A tasteful and solemn composition of double-petal white lilies, dendrobium orchids, and glossy tropical foliage, expressing heartfelt condolences and enduring peace.',
    floralNotes: ['Ly kép trắng Tây Ban Nha', 'Lan Dendro trắng', 'Hoa baby trắng phau', 'Lá monstera'],
    dimensions: '70cm x 110cm',
    stemCount: 35,
    stock: 6,
    rating: 5.0,
    reviewCount: 18,
    deliveryTime: '2h'
  }
];

export const INITIAL_LOYALTY: LoyaltyProfile = {
  tier: 'Platinum',
  tierEn: 'Platinum VIP',
  points: 1250,
  totalSpent: 12500000,
  nextTierThreshold: 20000000,
  discountPercentage: 10,
  memberSince: '12/2024',
  freeShippingVouchers: 3
};

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-0',
    title: 'Đơn hàng COD #ELX-8760 đang chờ thu tiền',
    titleEn: 'COD Order #ELX-8760 awaiting cash payment',
    message: 'Đơn hàng giao hỏa tốc tại Quận 3 (Số tiền cần thu: 2.650.000 ₫). Shipper đang chuẩn bị.',
    messageEn: 'Express COD delivery in District 3 (Amount due: 2,650,000 VND). Courier preparing.',
    timestamp: '10 phút trước',
    read: false,
    type: 'order',
    orderId: 'ord-8760'
  },
  {
    id: 'notif-1',
    title: 'Đơn hàng #ELX-8902 đã xuất phát',
    titleEn: 'Order #ELX-8902 is out for delivery',
    message: 'Nghệ nhân đã hoàn tất cắm hoa và bàn giao cho shipper VIP hỏa tốc.',
    messageEn: 'Our master florist has finished your arrangement and handed it to VIP courier.',
    timestamp: '5 phút trước',
    read: false,
    type: 'order',
    orderId: 'ord-8902'
  },
  {
    id: 'notif-2',
    title: 'Điểm thưởng VIP Platinum đã cập nhật',
    titleEn: 'VIP Platinum Points updated',
    message: 'Bạn được tặng thêm 250 điểm loyalty sau lần đánh giá sản phẩm gần nhất.',
    messageEn: 'You received 250 bonus loyalty points after your recent verified review.',
    timestamp: '2 giờ trước',
    read: false,
    type: 'loyalty'
  },
  {
    id: 'notif-3',
    title: 'Đặc quyền thành viên: Tặng thiệp dập nổi kim',
    titleEn: 'Member Privilege: Free Gold-Foil Calligraphy Card',
    message: 'Miễn phí nâng cấp thiệp thiệp dát vàng cao cấp cho mọi đơn hàng trong tuần này.',
    messageEn: 'Free complimentary gold-foil calligraphy card with every purchase this week.',
    timestamp: '1 ngày trước',
    read: true,
    type: 'promo'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-8902',
    orderNumber: 'ELX-8902',
    createdAt: '2026-10-27 13:15',
    customerName: 'Nguyễn Thúy Hằng',
    customerPhone: '0908 123 456',
    customerEmail: 'thuyhang.nguyen@example.com',
    deliveryAddress: 'Căn hộ 1802, Tháp Aqua 1, Vinhomes Golden River',
    deliveryDistrict: 'Quận 1',
    deliveryCity: 'TP. Hồ Chí Minh',
    items: [
      {
        id: 'ci-1',
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        greetingCardMessage: 'Chúc mừng kỷ niệm 5 năm ngày cưới tình yêu của anh!',
        ribbonColor: 'Champagne Gold',
        includeVase: true,
        deliveryDate: '2026-10-27',
        deliveryTimeSlot: '15:00 - 17:00'
      }
    ],
    subtotal: 1850000,
    discountAmount: 185000,
    shippingFee: 0,
    totalAmount: 1665000,
    paymentMethod: 'momo',
    paymentStatus: 'paid',
    orderStatus: 'delivering',
    loyaltyPointsEarned: 166,
    notes: 'Gọi trước cho người nhận 15 phút, giao nhẹ tay.',
    trackingHistory: [
      {
        status: 'confirmed',
        label: 'Đơn hàng được xác nhận',
        labelEn: 'Order Confirmed',
        timestamp: '13:15',
        note: 'Hệ thống đã nhận thanh toán thành công qua Ví MoMo.',
        noteEn: 'Payment verified via MoMo E-Wallet.',
        completed: true,
        active: false
      },
      {
        status: 'arranging',
        label: 'Nghệ nhân cắm hoa thủ công',
        labelEn: 'Artisanal Floristry',
        timestamp: '13:30',
        note: 'Florist tuyển chọn từng cành hồng Ecuador tươi nở đồng đều.',
        noteEn: 'Florist selecting fresh premium blooms.',
        completed: true,
        active: false
      },
      {
        status: 'inspecting',
        label: 'Kiểm định chất lượng & Đóng gói',
        labelEn: 'Quality Inspection',
        timestamp: '14:10',
        note: 'Đã hoàn tất hộp giữ ẩm và thiệp mừng viết tay.',
        noteEn: 'Hydration wrap and handwritten note secured.',
        completed: true,
        active: false
      },
      {
        status: 'delivering',
        label: 'Đang giao hoa hỏa tốc',
        labelEn: 'Out for Delivery',
        timestamp: '14:25',
        note: 'Shipper chuyên trách hoa tươi đang trên đường giao tới Quận 1.',
        noteEn: 'VIP flower courier en route to recipient.',
        completed: false,
        active: true
      },
      {
        status: 'completed',
        label: 'Giao hàng thành công',
        labelEn: 'Delivered',
        timestamp: 'Dự kiến 15:10',
        note: 'Chờ khách hàng nhận hoa và ký nhận.',
        noteEn: 'Awaiting recipient confirmation.',
        completed: false,
        active: false
      }
    ]
  },
  {
    id: 'ord-8899',
    orderNumber: 'ELX-8899',
    createdAt: '2026-10-27 11:40',
    customerName: 'Trần Minh Quân',
    customerPhone: '0912 345 678',
    customerEmail: 'minhquan.tran@vietcapital.com',
    deliveryAddress: 'Tầng 25, Bitexco Financial Tower, Số 2 Hải Triều',
    deliveryDistrict: 'Quận 1',
    deliveryCity: 'TP. Hồ Chí Minh',
    items: [
      {
        id: 'ci-2',
        product: INITIAL_PRODUCTS[2],
        quantity: 1,
        greetingCardMessage: 'Chúc Công ty Vạn Hưng Phát Khai Trương Hồng Phát, Tài Lộc Vạn Dặm!',
        ribbonColor: 'Royal Red',
        includeVase: true,
        deliveryDate: '2026-10-27',
        deliveryTimeSlot: '13:00 - 15:00'
      }
    ],
    subtotal: 3850000,
    discountAmount: 0,
    shippingFee: 0,
    totalAmount: 3850000,
    paymentMethod: 'vnpay',
    paymentStatus: 'paid',
    orderStatus: 'completed',
    loyaltyPointsEarned: 385,
    notes: 'Khai trương công ty, giao đúng giờ đẹp trước 14:00.',
    trackingHistory: [
      {
        status: 'confirmed',
        label: 'Đơn hàng được xác nhận',
        labelEn: 'Order Confirmed',
        timestamp: '11:40',
        note: 'Thanh toán thành công qua VNPay QR.',
        noteEn: 'VNPay payment confirmed.',
        completed: true,
        active: false
      },
      {
        status: 'arranging',
        label: 'Cắm hoa lan nghệ thuật',
        labelEn: 'Arranging',
        timestamp: '12:00',
        note: 'Lan hồ điệp 9 cành A+ được gắn lũa tự nhiên.',
        noteEn: 'Arranging orchids on driftwood.',
        completed: true,
        active: false
      },
      {
        status: 'inspecting',
        label: 'Kiểm tra độ tươi & Nơ lụa',
        labelEn: 'Quality Inspection',
        timestamp: '12:45',
        note: 'Chụp ảnh nghiệm thu gửi khách hàng kiểm tra trước khi giao.',
        noteEn: 'Photo confirmation sent to buyer.',
        completed: true,
        active: false
      },
      {
        status: 'delivering',
        label: 'Đang vận chuyển xe hơi chuyên dụng',
        labelEn: 'Out for Delivery',
        timestamp: '13:05',
        note: 'Vận chuyển bằng xe lạnh giữ nhiệt độ 18°C.',
        noteEn: 'Temperature-controlled transport.',
        completed: true,
        active: false
      },
      {
        status: 'completed',
        label: 'Đã bàn giao cho lễ tân công ty',
        labelEn: 'Successfully Delivered',
        timestamp: '13:42',
        note: 'Khách hàng rất hài lòng với kích thước và vẻ sang trọng của bình lan.',
        noteEn: 'Recipient delighted with arrangement.',
        completed: true,
        active: false
      }
    ]
  },
  {
    id: 'ord-8760',
    orderNumber: 'ELX-8760',
    createdAt: '2026-10-27 12:20',
    customerName: 'Phạm Quốc Tuấn',
    customerPhone: '0938 777 999',
    customerEmail: 'quoctuan.pham@saigonhub.vn',
    deliveryAddress: '15 Lê Duẩn, Phường Bến Nghé',
    deliveryDistrict: 'Quận 1',
    deliveryCity: 'TP. Hồ Chí Minh',
    items: [
      {
        id: 'ci-3',
        product: INITIAL_PRODUCTS[1],
        quantity: 1,
        greetingCardMessage: 'Mừng sinh nhật mẹ yêu, chúc mẹ luôn an vui mạnh khỏe!',
        ribbonColor: 'Pearl White Silk',
        includeVase: false,
        deliveryDate: '2026-10-27',
        deliveryTimeSlot: '16:00 - 18:00'
      }
    ],
    subtotal: 2650000,
    discountAmount: 0,
    shippingFee: 0,
    totalAmount: 2650000,
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    orderStatus: 'arranging',
    loyaltyPointsEarned: 265,
    notes: 'Khách yêu cầu mang theo máy POS hoặc thu tiền mặt đúng 2.650.000 ₫.',
    trackingHistory: [
      {
        status: 'confirmed',
        label: 'Đã tiếp nhận đơn COD',
        labelEn: 'COD Order Placed',
        timestamp: '12:20',
        note: 'Đơn hàng COD đã tiếp nhận. Khách sẽ thanh toán tiền mặt 2.650.000 ₫ khi nhận hoa.',
        noteEn: 'COD order confirmed. Cash payable upon delivery.',
        completed: true,
        active: false
      },
      {
        status: 'arranging',
        label: 'Nghệ nhân đang cắm hoa',
        labelEn: 'Arranging',
        timestamp: '12:45',
        note: 'Florist tuyển chọn mẫu đơn Sarah Bernhardt thơm ngát.',
        noteEn: 'Florist selecting fresh peonies.',
        completed: true,
        active: true
      },
      {
        status: 'inspecting',
        label: 'Kiểm tra chất lượng & Chụp ảnh',
        labelEn: 'Quality Inspection',
        timestamp: 'Chờ xử lý',
        note: 'Chuẩn bị thiệp viết tay và gói giấy lụa cao cấp.',
        noteEn: 'Packaging and calligraphy note.',
        completed: false,
        active: false
      },
      {
        status: 'delivering',
        label: 'Đang giao hoa hỏa tốc xe lạnh',
        labelEn: 'Out for Delivery',
        timestamp: 'Dự kiến 16:15',
        note: 'Shipper chuẩn bị xuất phát kèm phiếu thu tiền mặt.',
        noteEn: 'Courier dispatch with cash receipt.',
        completed: false,
        active: false
      },
      {
        status: 'completed',
        label: 'Đã thu tiền & Trao hoa',
        labelEn: 'Delivered & Paid',
        timestamp: 'Dự kiến hôm nay',
        note: 'Thu 2.650.000 ₫ tiền mặt và bàn giao hoa.',
        noteEn: 'Cash collection upon handover.',
        completed: false,
        active: false
      }
    ]
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'fl-01',
    author: 'Hoàng Anh Khôi',
    rating: 5,
    date: 'Hôm qua',
    title: 'Đẳng cấp vượt trội, hoa tươi suốt 8 ngày',
    comment: 'Tôi đặt tặng kỷ niệm ngày cưới cho vợ. Hoa giao đúng 45 phút sau khi đặt, thơm ngát mùi hoa hồng tự nhiên chứ không phải hương liệu xịt. Vợ tôi cực kỳ ưng ý!',
    verifiedBuyer: true,
    tags: ['Giao hỏa tốc 2H', 'Hoa tươi hơn mong đợi', 'Thiệp viết tay nắn nót']
  },
  {
    id: 'rev-2',
    productId: 'fl-02',
    author: 'Lê Minh Thảo',
    rating: 5,
    date: '3 ngày trước',
    title: 'Mẫu đơn to bằng bàn tay, bình gốm tuyệt đẹp',
    comment: 'Mẫu đơn Sarah Bernhardt nở bung từng lớp cánh dày mượt, bình gốm mờ để phòng khách cực kỳ sang. Rất đáng giá từng đồng!',
    verifiedBuyer: true,
    tags: ['Đóng gói chống sốc kỹ', 'Chất lượng 5 sao']
  },
  {
    id: 'rev-3',
    productId: 'fl-03',
    author: 'Đặng Tuấn Kiệt',
    rating: 5,
    date: 'Tuần trước',
    title: 'Chậu lan hồ điệp khai trương cực kỳ hoành tráng',
    comment: 'Đối tác nhận hoa khen nức nở. Cành lan cong tự nhiên kết hợp gỗ lũa mộc, khác biệt hoàn toàn với kiểu cắm cồng kềnh ngoài chợ hoa.',
    verifiedBuyer: true,
    tags: ['Chuẩn phong thủy', 'Hài lòng 100%']
  }
];
