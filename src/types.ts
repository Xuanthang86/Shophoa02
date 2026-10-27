export type FlowerType = 'all' | 'rose' | 'peony' | 'orchid' | 'lily' | 'tulip' | 'hydrangea';

export type OccasionType = 'all' | 'romance' | 'birthday' | 'grand_opening' | 'anniversary' | 'sympathy';

export interface FlowerProduct {
  id: string;
  name: string;
  nameEn: string;
  flowerType: 'rose' | 'peony' | 'orchid' | 'lily' | 'tulip' | 'hydrangea';
  occasion: 'romance' | 'birthday' | 'grand_opening' | 'anniversary' | 'sympathy';
  price: number;
  originalPrice?: number;
  image: string;
  tagline: string;
  taglineEn: string;
  description: string;
  descriptionEn: string;
  floralNotes: string[];
  dimensions: string;
  stemCount: number;
  stock: number;
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
  isNew?: boolean;
  deliveryTime: '2h' | 'sameday';
}

export interface CartItem {
  id: string;
  product: FlowerProduct;
  quantity: number;
  greetingCardMessage?: string;
  ribbonColor?: string;
  includeVase: boolean;
  deliveryDate: string;
  deliveryTimeSlot: string;
}

export type PaymentMethod = 'momo' | 'vnpay' | 'zalopay' | 'visa' | 'applepay' | 'cod';

export type OrderStatus = 'confirmed' | 'arranging' | 'inspecting' | 'delivering' | 'completed' | 'cancelled';

export interface OrderTrackingStep {
  status: OrderStatus;
  label: string;
  labelEn: string;
  timestamp: string;
  note: string;
  noteEn: string;
  completed: boolean;
  active: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryAddress: string;
  deliveryDistrict: string;
  deliveryCity: string;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending' | 'failed';
  orderStatus: OrderStatus;
  loyaltyPointsEarned: number;
  notes?: string;
  trackingHistory: OrderTrackingStep[];
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedBuyer: boolean;
  tags?: string[];
}

export interface LoyaltyProfile {
  tier: 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  tierEn: string;
  points: number;
  totalSpent: number;
  nextTierThreshold: number;
  discountPercentage: number;
  memberSince: string;
  freeShippingVouchers: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  titleEn: string;
  message: string;
  messageEn: string;
  timestamp: string;
  read: boolean;
  type: 'order' | 'loyalty' | 'promo' | 'system';
  orderId?: string;
}

export type Language = 'vi' | 'en';
