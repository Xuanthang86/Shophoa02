import React, { useState } from 'react';
import { X, Copy, Check, Download, Terminal, Layers, Database, CreditCard, Sparkles, FileText } from 'lucide-react';
import { MASTER_PROMPT_VI, MASTER_PROMPT_EN } from '../data/masterPrompt';
import { Language } from '../types';

interface PromptStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const PromptStudioModal: React.FC<PromptStudioModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [activeTab, setActiveTab] = useState<'full' | 'tech' | 'db' | 'payment' | 'en'>('full');
  const [copied, setCopied] = useState(false);
  const [brandName, setBrandName] = useState("L'Élixir Floral Atelier");
  const [deliverySpeed, setDeliverySpeed] = useState("2 giờ (Express 2H)");

  if (!isOpen) return null;

  // Dynamic customized prompt with customized parameters
  const currentPromptVI = MASTER_PROMPT_VI
    .replace(/L'Élixir Floral Atelier/g, brandName)
    .replace(/2 giờ \(Express 2H\)/g, deliverySpeed);

  const handleCopy = () => {
    const textToCopy = activeTab === 'en' ? MASTER_PROMPT_EN : currentPromptVI;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const textToDownload = activeTab === 'en' ? MASTER_PROMPT_EN : currentPromptVI;
    const element = document.createElement('a');
    const file = new Blob([textToDownload], { type: 'text/markdown;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = activeTab === 'en' ? 'MASTER_PROMPT_LUXURY_FLORAL_ECOSYSTEM.md' : 'PROMPT_HOAN_CHINH_WEBSITE_BAN_HOA_CAO_CAP.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-xl shadow-2xl border border-stone-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-stone-900 text-amber-400 flex items-center justify-center shadow-xs">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-editorial text-lg font-bold text-stone-900">
                  {language === 'vi' ? 'Studio Prompt Kỹ Sư Phần Mềm Hoàn Chỉnh' : 'Master Prompt & System Architecture Studio'}
                </h3>
                <span className="text-xs font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  v2.4 Production-Ready
                </span>
              </div>
              <p className="text-xs text-stone-500">
                {language === 'vi' 
                  ? 'Prompt chuẩn kiến trúc sư hệ thống chứa 100% tính năng e-commerce hoa tươi cao cấp, sẵn sàng sao chép và thực thi.' 
                  : 'Exhaustive prompt specifications covering all floral e-commerce features, ready to copy and deploy.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                copied 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-stone-900 text-white hover:bg-stone-800'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (language === 'vi' ? 'Đã Sao Chép!' : 'Copied!') : (language === 'vi' ? 'Sao Chép Toàn Bộ Prompt' : 'Copy Full Prompt')}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-white hover:bg-stone-100 border border-stone-300 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Tải về file .md"
            >
              <Download className="w-3.5 h-3.5 text-stone-600" />
              <span className="hidden sm:inline">.MD</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Parameter Customizer Strip */}
        <div className="bg-amber-50/50 border-b border-amber-200/60 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-700">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span className="font-medium text-stone-900">
              {language === 'vi' ? 'Tùy biến nhanh tham số vào Prompt:' : 'Quick parameter customization:'}
            </span>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="text-stone-500">{language === 'vi' ? 'Tên thương hiệu:' : 'Brand name:'}</span>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="bg-white border border-stone-300 rounded px-2 py-0.5 text-stone-900 text-xs w-44 focus:outline-none focus:border-amber-700"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-stone-500">{language === 'vi' ? 'Tốc độ giao:' : 'Speed:'}</span>
              <select
                value={deliverySpeed}
                onChange={(e) => setDeliverySpeed(e.target.value)}
                className="bg-white border border-stone-300 rounded px-2 py-0.5 text-stone-900 text-xs focus:outline-none focus:border-amber-700"
              >
                <option value="2 giờ (Express 2H)">2 giờ (Express 2H)</option>
                <option value="90 phút (Super Speed)">90 phút (Super Speed)</option>
                <option value="Trong ngày (Same-day)">Trong ngày (Same-day)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-stone-200 bg-white">
          <button
            onClick={() => setActiveTab('full')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-t-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'full'
                ? 'text-amber-900 border-b-2 border-amber-800 bg-amber-50/40'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{language === 'vi' ? 'Toàn Bộ Prompt (Bản Tiếng Việt)' : 'Full Master Prompt (VI)'}</span>
          </button>
          
          <button
            onClick={() => setActiveTab('tech')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-t-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'tech'
                ? 'text-amber-900 border-b-2 border-amber-800 bg-amber-50/40'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{language === 'vi' ? 'Kiến Trúc & Tech Stack' : 'Tech Stack Architecture'}</span>
          </button>

          <button
            onClick={() => setActiveTab('db')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-t-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'db'
                ? 'text-amber-900 border-b-2 border-amber-800 bg-amber-50/40'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>{language === 'vi' ? 'Schema PostgreSQL' : 'Database Schema'}</span>
          </button>

          <button
            onClick={() => setActiveTab('payment')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-t-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'payment'
                ? 'text-amber-900 border-b-2 border-amber-800 bg-amber-50/40'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>{language === 'vi' ? 'Cổng Ví MoMo & VNPay' : 'Payment Gateways'}</span>
          </button>

          <button
            onClick={() => setActiveTab('en')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-t-md transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'en'
                ? 'text-amber-900 border-b-2 border-amber-800 bg-amber-50/40'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>English Version</span>
          </button>
        </div>

        {/* Content Body with Code Pre */}
        <div className="flex-1 overflow-y-auto p-6 bg-stone-900 text-stone-200 font-mono text-xs leading-relaxed selection:bg-amber-600 selection:text-white">
          {activeTab === 'full' && (
            <pre className="whitespace-pre-wrap break-words">{currentPromptVI}</pre>
          )}

          {activeTab === 'tech' && (
            <div className="space-y-4">
              <div className="p-3 bg-stone-800/80 rounded border border-stone-700">
                <span className="text-amber-400 font-bold block mb-1">Architecture Pattern:</span>
                Clean Architecture / Domain-Driven Design (DDD) with Event-Driven Real-time WebSockets.
              </div>
              <pre className="whitespace-pre-wrap break-words">
{`=== CẤU TRÚC THƯ MỤC CHUẨN DỰ ÁN (PROJECT DIRECTORY TREE) ===

luxury-floral-platform/
├── apps/
│   ├── web/                    # React 19 / Next.js Storefront & PWA
│   │   ├── src/
│   │   │   ├── components/     # Catalog, CartDrawer, PaymentGateway, Tracking
│   │   │   ├── hooks/          # useCart, useOfflineSync, useSocketOrders
│   │   │   ├── services/       # momoClient, vnpayClient, analyticsTracker
│   │   │   └── sw.ts           # Service Worker with Workbox offline cache
│   └── admin/                  # Realtime Operations & Analytics Console
├── services/
│   ├── api-gateway/            # Rate limiting, Reverse proxy & SSL termination
│   ├── order-service/          # Order lifecycle, Inventory locks, WebSocket push
│   ├── payment-service/        # Webhook receivers for MoMo, VNPay, Stripe
│   └── notification-service/   # WebPush, SendGrid transactional emails, SMS OTP
├── packages/
│   ├── database/               # Drizzle/Prisma PostgreSQL models & migrations
│   └── shared-types/           # TypeScript DTOs and event payloads
└── docker-compose.yml          # Local infra (Postgres 16, Redis 7, Meilisearch)`}
              </pre>
            </div>
          )}

          {activeTab === 'db' && (
            <pre className="whitespace-pre-wrap break-words text-emerald-400">
{`-- POSTGRESQL PRODUCTION DDL FOR LUXURY FLORISTRY PLATFORM --

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(180) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'customer',
  vip_tier VARCHAR(20) DEFAULT 'Silver',
  loyalty_points INT DEFAULT 0,
  total_spent DECIMAL(15, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  flower_type VARCHAR(50) NOT NULL,
  occasion VARCHAR(50) NOT NULL,
  price DECIMAL(15, 2) NOT NULL,
  stem_count INT NOT NULL,
  stock_quantity INT DEFAULT 0,
  is_express_2h BOOLEAN DEFAULT true,
  rating_average DECIMAL(3, 2) DEFAULT 5.0,
  review_count INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(30) UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id),
  recipient_name VARCHAR(120) NOT NULL,
  recipient_phone VARCHAR(20) NOT NULL,
  delivery_address TEXT NOT NULL,
  delivery_date DATE NOT NULL,
  delivery_timeslot VARCHAR(50) NOT NULL,
  total_amount DECIMAL(15, 2) NOT NULL,
  payment_method VARCHAR(30) NOT NULL,
  payment_status VARCHAR(30) DEFAULT 'pending',
  order_status VARCHAR(30) DEFAULT 'confirmed',
  greeting_card_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`}
            </pre>
          )}

          {activeTab === 'payment' && (
            <pre className="whitespace-pre-wrap break-words text-amber-300">
{`// MO-MO & VNPAY PAYMENT GATEWAY INTEGRATION CONTRACT //

// 1. MoMo Dynamic QR Generator Endpoint:
POST /api/payments/momo/create-qr
Request:
{
  "orderId": "ELX-8902",
  "amount": 1850000,
  "orderInfo": "Thanh toan don hoa L'Elixir Floral #ELX-8902",
  "redirectUrl": "https://leixirfloral.vn/order/success",
  "ipnUrl": "https://api.leixirfloral.vn/webhooks/momo"
}

// 2. MoMo IPN Secure Webhook Verification (HMAC-SHA256):
const rawSignature = \`accessKey=\${accessKey}&amount=\${amount}&extraData=\${extraData}&message=\${message}&orderId=\${orderId}&orderInfo=\${orderInfo}&orderType=\${orderType}&partnerCode=\${partnerCode}&payType=\${payType}&requestId=\${requestId}&responseTime=\${responseTime}&resultCode=\${resultCode}&transId=\${transId}\`;
const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

// 3. VNPay QR URL Generator:
POST /api/payments/vnpay/create-url
Params: { vnp_Version: '2.1.0', vnp_Command: 'pay', vnp_TmnCode: '...', vnp_CurrCode: 'VND' }`}
            </pre>
          )}

          {activeTab === 'en' && (
            <pre className="whitespace-pre-wrap break-words">{MASTER_PROMPT_EN}</pre>
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-6 py-3 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>{language === 'vi' ? 'Prompt hoàn chỉnh được biên soạn kỹ thuật chuyên sâu theo tiêu chuẩn Enterprise' : 'Enterprise grade master prompt ready for execution'}</span>
          </div>
          <button
            onClick={handleCopy}
            className="text-amber-900 font-semibold hover:underline cursor-pointer flex items-center gap-1"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{language === 'vi' ? 'Nhấn để copy ngay' : 'Click to copy now'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
