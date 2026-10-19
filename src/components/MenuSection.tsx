import React, { useState, useMemo } from 'react';
import { Search, Flame, Sparkles, Plus, SlidersHorizontal, Info, Check } from 'lucide-react';
import { ChaiItem, HealthCategory } from '../types';
import { CHAI_CATALOG } from '../data/chaiData';

interface MenuSectionProps {
  onSelectChaiToCustomize: (chai: ChaiItem) => void;
  onQuickAdd: (chai: ChaiItem) => void;
}

const CATEGORIES: { id: HealthCategory; label: string; icon: string }[] = [
  { id: 'all', label: 'All Formulations', icon: '☕' },
  { id: 'immunity', label: 'Immunity & Seasonal Defense', icon: '🛡️' },
  { id: 'throat', label: 'Throat, Voice & Cough', icon: '🌿' },
  { id: 'digestion', label: 'Digestion & Metabolism (Agni)', icon: '🔥' },
  { id: 'calm', label: 'Stress Relief & Deep Sleep', icon: '🌙' },
  { id: 'energy', label: 'High Energy & Focus', icon: '⚡' },
];

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectChaiToCustomize,
  onQuickAdd,
}) => {
  const [activeCategory, setActiveCategory] = useState<HealthCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpiceFilter, setSelectedSpiceFilter] = useState<number | 'all'>('all');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return CHAI_CATALOG.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Spice level filter
      if (selectedSpiceFilter !== 'all' && item.spiceLevel !== selectedSpiceFilter) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesHindi = item.hindiName.includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesBotanicals = item.botanicals.some(
          (b) =>
            b.name.toLowerCase().includes(query) ||
            b.hindi.includes(query) ||
            b.role.toLowerCase().includes(query)
        );
        const matchesAction = item.ayurvedicAction.toLowerCase().includes(query);
        if (!matchesName && !matchesHindi && !matchesDesc && !matchesBotanicals && !matchesAction) {
          return false;
        }
      }
      return true;
    });
  }, [activeCategory, searchQuery, selectedSpiceFilter]);

  const handleQuickAddClick = (item: ChaiItem) => {
    onQuickAdd(item);
    setJustAddedId(item.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1200);
  };

  return (
    <section id="rx-menu" className="py-16 bg-[#FAF6EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-bold text-[#C85A32] uppercase tracking-wider mb-2">
            <span>The Dispensary Formulary</span>
            <span aria-hidden="true">·</span>
            <span>Handcrafted In Small Batches</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] tracking-tight font-display">
            Ayurvedic Rx Chai Menu
          </h2>
          <p className="text-base text-[#57534E] mt-3">
            Every blend is calibrated with specific botanical herbs, whole spices, and adaptogens to address everyday bodily ailments. Served piping hot in clay kulhads or cutting glasses.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-4 mb-8">
          
          {/* Category Tabs (Segmented Buttons) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#1C1917] text-white shadow-xs'
                    : 'bg-[#ECE4D2] text-[#57534E] hover:text-[#1C1917] hover:bg-[#E2D8C3]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Search & Spice Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#F3ECE0] p-3 rounded-xl border border-[#DFD3BE]">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#78716C] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search herbs (Tulsi, Adrak, Mulethi), benefits, or brew names..."
                className="w-full pl-9 pr-4 py-2 bg-white rounded-lg border border-[#DDD3BF] text-xs sm:text-sm text-[#1C1917] placeholder-[#A8A29E] focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
              />
            </div>

            {/* Spice Filter */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#57534E] font-medium flex items-center gap-1 whitespace-nowrap">
                <Flame className="w-3.5 h-3.5 text-[#C85A32]" />
                Spice Heat:
              </span>
              <div className="flex items-center bg-white p-1 rounded-lg border border-[#DDD3BF]">
                <button
                  onClick={() => setSelectedSpiceFilter('all')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                    selectedSpiceFilter === 'all'
                      ? 'bg-[#C85A32] text-white'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedSpiceFilter(1)}
                  className={`px-2 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                    selectedSpiceFilter === 1
                      ? 'bg-[#C85A32] text-white'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                  title="Mild Spice"
                >
                  Mild (🌶️)
                </button>
                <button
                  onClick={() => setSelectedSpiceFilter(3)}
                  className={`px-2 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                    selectedSpiceFilter === 3
                      ? 'bg-[#C85A32] text-white'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                  title="Kadak Spiced"
                >
                  Kadak (🌶️🌶️🌶️)
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#78716C] mb-6 font-medium">
          <span>
            Showing <strong className="text-[#1C1917] font-mono tabular-nums">{filteredItems.length}</strong> apothecary formulations
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#C85A32] hover:underline font-semibold cursor-pointer"
            >
              Clear search filter
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-[#F3ECE0] rounded-xl p-12 text-center border border-[#DFD3BE]">
            <p className="text-lg font-bold text-[#1C1917]">No apothecary formulations match your filter.</p>
            <p className="text-sm text-[#78716C] mt-2">
              Try searching for common herbs like "Ginger", "Tulsi", "Saffron", or reset your category.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setSelectedSpiceFilter('all');
              }}
              className="mt-4 px-4 py-2 bg-[#C85A32] text-white rounded-lg text-xs font-bold cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-[#E7DFCE] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Card Visual Header */}
                  <div className="relative h-52 bg-[#1C1917] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Top unboxed tag */}
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-[#FAF6EF] text-[11px] font-mono px-2.5 py-1 rounded">
                      {item.dosha}
                    </div>

                    {/* Bottom overlay info */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                      <div>
                        <span className="text-xs font-semibold text-[#E58E26] block">
                          {item.hindiName}
                        </span>
                        <h3 className="text-lg font-bold font-display leading-tight">
                          {item.name}
                        </h3>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-extrabold font-mono tabular-nums text-white">
                          ₹{item.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    {/* Unboxed Metadata (Zero-pill discipline) */}
                    <div className="flex items-center gap-2 text-xs text-[#78716C] font-medium mb-3">
                      <span>{item.caffeine} Caffeine</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.steepTime}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#C85A32]">Spice {item.spiceLevel}/4</span>
                    </div>

                    <p className="text-xs font-bold text-[#8C3415] mb-1.5 uppercase tracking-wide">
                      {item.tagline}
                    </p>

                    <p className="text-xs text-[#57534E] leading-relaxed line-clamp-3 mb-4">
                      {item.description}
                    </p>

                    {/* Botanical Breakdown Table */}
                    <div className="bg-[#FAF6EF] rounded-lg p-3 border border-[#E7DFCE] mb-4">
                      <span className="text-[11px] font-bold text-[#1C1917] uppercase tracking-wider block mb-2">
                        Active Herbs & Action:
                      </span>
                      <div className="space-y-1.5">
                        {item.botanicals.slice(0, 3).map((botanical, bIdx) => (
                          <div
                            key={bIdx}
                            className="flex items-center justify-between text-[11px] text-[#57534E]"
                          >
                            <span className="font-semibold text-[#1C1917]">
                              {botanical.name} ({botanical.hindi})
                            </span>
                            <span className="text-right text-[#78716C] truncate max-w-[55%]">
                              {botanical.role}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-[11px] text-[#78716C] mb-2">
                      <span className="font-semibold text-[#1C1917]">Ideal timing:</span> {item.idealTime}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectChaiToCustomize(item)}
                    className="w-full py-2.5 px-3 bg-[#FAF6EF] hover:bg-[#F3ECE0] text-[#1C1917] border border-[#DDD3BF] rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#C85A32]" />
                    <span>Customize Dose</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickAddClick(item)}
                    className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                      justAddedId === item.id
                        ? 'bg-[#2D5A27] text-white'
                        : 'bg-[#C85A32] hover:bg-[#B34B25] text-white'
                    }`}
                  >
                    {justAddedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Kulhad</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
