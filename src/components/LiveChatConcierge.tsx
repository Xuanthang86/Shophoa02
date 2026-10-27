import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, ShoppingBag, Check } from 'lucide-react';
import { FlowerProduct, Language } from '../types';

interface LiveChatConciergeProps {
  language: Language;
  products: FlowerProduct[];
  onQuickAdd: (product: FlowerProduct) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'florist';
  text: string;
  timestamp: string;
  recommendedProduct?: FlowerProduct;
}

export const LiveChatConcierge: React.FC<LiveChatConciergeProps> = ({
  language,
  products,
  onQuickAdd,
}) => {
  const isVi = language === 'vi';
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'florist',
      text: isVi
        ? "Dạ L'Élixir Floral kính chào Quý khách! Em là Chuyên viên Nghệ nhân Florist trực tuyến 24/7. Em có thể tư vấn chọn loại hoa phù hợp theo ngân sách, độ tuổi hoặc thông điệp trao tặng của Quý khách ạ."
        : "Welcome to L'Élixir Floral! I am your 24/7 Master Florist concierge. How may I assist in curating the perfect botanical sentiment today?",
      timestamp: '13:00'
    }
  ]);

  const quickPrompts = isVi ? [
    'Tư vấn hoa tặng người yêu dịp kỷ niệm',
    'Hoa khai trương sang trọng dưới 3 triệu',
    'Hoa mẫu đơn Hà Lan tươi được mấy ngày?',
    'Cách đặt giao hỏa tốc 2 giờ'
  ] : [
    'Anniversary flowers for partner',
    'Grand opening arrangement under $150',
    'How long do Dutch peonies last?',
    'How does 2-hour express delivery work?'
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let replyText = '';
      let recommendedProduct: FlowerProduct | undefined;

      const lower = text.toLowerCase();
      if (lower.includes('người yêu') || lower.includes('kỷ niệm') || lower.includes('anniversary') || lower.includes('partner') || lower.includes('hồng')) {
        replyText = isVi
          ? "Dạ với dịp kỷ niệm ngọt ngào, em gợi ý Quý khách tác phẩm 'Scarlet Reverie' gồm 33 đóa hồng Ecuador nhung đỏ tuyết Cotopaxi biểu trưng cho tình yêu trường tồn và trân quý. Tặng kèm thiệp dập kim viết tay ạ!"
          : "For romantic milestones, I highly recommend our signature 'Scarlet Reverie' featuring 33 velvety Ecuadorian volcanic roses, accompanied by a gold-foil calligraphy card.";
        recommendedProduct = products.find(p => p.id === 'fl-01');
      } else if (lower.includes('khai trương') || lower.includes('grand opening') || lower.includes('triệu') || lower.includes('lan')) {
        replyText = isVi
          ? "Dạ lễ khai trương đại cát rất cần sự trang trọng và phong thủy thịnh vượng! Chậu 'Zenith Phalaenopsis' 9 cành lan đại hồ điệp trắng gắn lũa phong thủy tự nhiên là tác phẩm được các CEO ưa chuộng nhất."
          : "For auspicious grand openings, our 'Zenith Phalaenopsis' cascading from natural driftwood symbolizes enduring prosperity and prestige.";
        recommendedProduct = products.find(p => p.id === 'fl-03');
      } else if (lower.includes('mẫu đơn') || lower.includes('peon') || lower.includes('tươi')) {
        replyText = isVi
          ? "Mẫu đơn Sarah Bernhardt Hà Lan tại L'Élixir là hàng cành dài A+, có thời gian tươi bung nở tuyệt đẹp từ 6 đến 8 ngày trong điều kiện phòng máy lạnh 20 - 24°C ạ."
          : "Our Dutch Sarah Bernhardt peonies remain lush and radiant for 6-8 days in climate-controlled environments (20-24°C).";
        recommendedProduct = products.find(p => p.id === 'fl-02');
      } else {
        replyText = isVi
          ? "Dạ L'Élixir Floral hỗ trợ giao hoa hỏa tốc nội thành trong đúng 2 giờ bằng xe lạnh chuyên dụng giữ nhiệt 18°C. Quý khách có thể chọn thời gian giao mong muốn ngay tại bước đặt hàng ạ!"
          : "We provide 2-Hour Express VIP delivery in dedicated climate-controlled vans at 18°C. You can schedule your preferred exact time-slot seamlessly.";
        recommendedProduct = products[0];
      }

      const botMsg: ChatMessage = {
        id: `f-${Date.now()}`,
        sender: 'florist',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedProduct: recommendedProduct
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 1200);
  };

  const handleQuickAddClick = (p: FlowerProduct) => {
    onQuickAdd(p);
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 2500);
  };

  return (
    <>
      {/* Floating Chat Trigger Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-stone-900 text-amber-200 hover:text-white p-4 rounded-full shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer group"
          aria-label={isVi ? 'Mở trò chuyện với nghệ nhân hoa 24/7' : 'Open 24/7 Florist Chat'}
        >
          <MessageCircle className="w-6 h-6 group-hover:rotate-6 transition-transform" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-semibold px-0 group-hover:px-2 text-white">
            {isVi ? 'Tư Vấn Hoa 24/7' : '24/7 Florist'}
          </span>
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-96 bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col h-[520px] animate-fade-in">
          
          {/* Header */}
          <div className="p-3.5 bg-stone-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-800 text-amber-200 flex items-center justify-center font-bold text-xs">
                EF
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-editorial text-sm font-semibold">Florist Concierge 24/7</h4>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[10px] text-stone-300">
                  {isVi ? 'Nghệ nhân hoa L\'Élixir trực tuyến' : 'Master Florist On Duty'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAF8F5]/60 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-stone-900 text-white rounded-br-xs'
                      : 'bg-white text-stone-800 border border-stone-200/90 rounded-bl-xs shadow-xs'
                  }`}
                >
                  <p>{m.text}</p>

                  {/* Embedded product card in chat */}
                  {m.recommendedProduct && (
                    <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center gap-2 bg-stone-50 p-2 rounded">
                      <img
                        src={m.recommendedProduct.image}
                        alt=""
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="font-semibold text-stone-900 text-[11px] block truncate">
                          {isVi ? m.recommendedProduct.name : m.recommendedProduct.nameEn}
                        </span>
                        <span className="text-[10px] font-mono-tabular font-bold text-amber-900">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(m.recommendedProduct.price)}
                        </span>
                      </div>
                      <button
                        onClick={() => handleQuickAddClick(m.recommendedProduct!)}
                        className="p-1.5 bg-stone-900 text-white hover:bg-stone-800 rounded transition-colors cursor-pointer shrink-0"
                        title={isVi ? 'Thêm vào giỏ' : 'Add to bag'}
                      >
                        {addedId === m.recommendedProduct.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <ShoppingBag className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-stone-400 mt-0.5 px-1">{m.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-stone-400 text-xs pl-2">
                <Sparkles className="w-3 h-3 text-amber-700 animate-spin" />
                <span>{isVi ? 'Florist đang soạn tư vấn...' : 'Florist is typing...'}</span>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="p-2 bg-white border-t border-stone-100 overflow-x-auto no-scrollbar flex items-center gap-1.5">
            {quickPrompts.map((qp, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(qp)}
                className="text-[10px] text-stone-600 bg-stone-100 hover:bg-stone-200 px-2 py-1 rounded transition-colors whitespace-nowrap cursor-pointer"
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-2.5 bg-white border-t border-stone-200 flex items-center gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={isVi ? 'Hỏi chuyên viên nghệ nhân hoa...' : 'Ask your master florist...'}
              className="flex-1 text-xs px-3 py-2 bg-stone-50 border border-stone-200 rounded-md text-stone-900 focus:outline-none focus:border-stone-900"
            />
            <button
              onClick={() => handleSendMessage()}
              className="p-2 bg-stone-900 text-white hover:bg-stone-800 rounded-md transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}
    </>
  );
};
