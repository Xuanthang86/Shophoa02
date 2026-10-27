import React from 'react';
import { Search, SlidersHorizontal, Zap } from 'lucide-react';
import { FlowerType, OccasionType, Language } from '../types';

interface FilterBarProps {
  language: Language;
  selectedFlowerType: FlowerType;
  onSelectFlowerType: (type: FlowerType) => void;
  selectedOccasion: OccasionType;
  onSelectOccasion: (occ: OccasionType) => void;
  selectedSpeed: 'all' | '2h' | 'sameday';
  onSelectSpeed: (speed: 'all' | '2h' | 'sameday') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalResults: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  language,
  selectedFlowerType,
  onSelectFlowerType,
  selectedOccasion,
  onSelectOccasion,
  selectedSpeed,
  onSelectSpeed,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalResults,
}) => {
  const isVi = language === 'vi';

  const flowerTabs: { id: FlowerType; labelVi: string; labelEn: string }[] = [
    { id: 'all', labelVi: 'Tất Cả Loại Hoa', labelEn: 'All Floral' },
    { id: 'rose', labelVi: 'Hồng Ecuador', labelEn: 'Ecuadorian Rose' },
    { id: 'peony', labelVi: 'Mẫu Đơn Hà Lan', labelEn: 'Dutch Peony' },
    { id: 'orchid', labelVi: 'Lan Hồ Điệp', labelEn: 'Phalaenopsis' },
    { id: 'hydrangea', labelVi: 'Cẩm Tú Cầu', labelEn: 'Hydrangea' },
    { id: 'tulip', labelVi: 'Tulip Hoàng Gia', labelEn: 'Royal Tulip' },
    { id: 'lily', labelVi: 'Bách Hợp', labelEn: 'Lily' },
  ];

  const occasions: { id: OccasionType; labelVi: string; labelEn: string }[] = [
    { id: 'all', labelVi: 'Mọi dịp trao gửi', labelEn: 'All Occasions' },
    { id: 'romance', labelVi: 'Tình Yêu & Kỷ Niệm', labelEn: 'Romance & Anniversary' },
    { id: 'birthday', labelVi: 'Chúc Mừng Sinh Nhật', labelEn: 'Birthday Blooms' },
    { id: 'grand_opening', labelVi: 'Khai Trương Đại Cát', labelEn: 'Grand Opening' },
    { id: 'sympathy', labelVi: 'Trang Trọng & Tri Ân', labelEn: 'Sympathy & Gratitude' },
  ];

  return (
    <div className="bg-white border-b border-stone-200 sticky top-20 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        {/* Row 1: Search, Occasion Selector, Speed Toggle, and Sorting */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-3">
          
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={isVi ? 'Tìm hoa hồng, mẫu đơn, bình cắm...' : 'Search roses, peonies, vases...'}
              className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-md text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* Occasion Filter Dropdown */}
            <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 rounded-md px-2.5 py-1.5 text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
              <select
                value={selectedOccasion}
                onChange={(e) => onSelectOccasion(e.target.value as OccasionType)}
                aria-label={isVi ? 'Chọn dịp tặng hoa' : 'Filter by occasion'}
                className="bg-transparent text-stone-800 text-xs font-medium focus:outline-none cursor-pointer"
              >
                {occasions.map((occ) => (
                  <option key={occ.id} value={occ.id}>
                    {isVi ? occ.labelVi : occ.labelEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Express 2H Speed Filter */}
            <button
              onClick={() => onSelectSpeed(selectedSpeed === '2h' ? 'all' : '2h')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                selectedSpeed === '2h'
                  ? 'bg-amber-900 text-white'
                  : 'bg-stone-50 border border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>{isVi ? 'Hỏa Tốc 2H' : 'Express 2H'}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="bg-stone-50 border border-stone-200 rounded-md px-2.5 py-1.5 text-xs">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                aria-label={isVi ? 'Sắp xếp danh sách hoa' : 'Sort floral catalog'}
                className="bg-transparent text-stone-800 text-xs font-medium focus:outline-none cursor-pointer"
              >
                <option value="featured">{isVi ? 'Nổi bật nhất' : 'Featured'}</option>
                <option value="price-asc">{isVi ? 'Giá: Thấp đến Cao' : 'Price: Low to High'}</option>
                <option value="price-desc">{isVi ? 'Giá: Cao đến Thấp' : 'Price: High to Low'}</option>
                <option value="rating">{isVi ? 'Đánh giá cao nhất' : 'Highest Rated'}</option>
              </select>
            </div>
          </div>

        </div>

        {/* Row 2: Flower Type Segmented Tabs */}
        <div className="flex items-center justify-between border-t border-stone-100 pt-3 gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 min-w-max">
            {flowerTabs.map((tab) => {
              const isActive = selectedFlowerType === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectFlowerType(tab.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  {isVi ? tab.labelVi : tab.labelEn}
                </button>
              );
            })}
          </div>

          <div className="text-[11px] text-stone-500 whitespace-nowrap font-mono-tabular shrink-0 hidden sm:block">
            {totalResults} {isVi ? 'tác phẩm hoa sẵn sàng' : 'arrangements available'}
          </div>
        </div>

      </div>
    </div>
  );
};
