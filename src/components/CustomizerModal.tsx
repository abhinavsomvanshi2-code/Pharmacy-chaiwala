import React, { useState } from 'react';
import { X, Check, Plus, Minus, Sparkles, Shield, Flame } from 'lucide-react';
import { ChaiItem, ServingStyle, Sweetener, MilkChoice, SpiceIntensity, HerbalBooster, CartItem } from '../types';
import { HERBAL_BOOSTERS } from '../data/chaiData';

interface CustomizerModalProps {
  chai: ChaiItem | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  chai,
  onClose,
  onAddToCart,
}) => {
  if (!chai) return null;

  const [servingStyle, setServingStyle] = useState<ServingStyle>('kulhad');
  const [sweetener, setSweetener] = useState<Sweetener>('jaggery');
  const [milk, setMilk] = useState<MilkChoice>('desi_cow');
  const [spiceIntensity, setSpiceIntensity] = useState<SpiceIntensity>('regular');
  const [selectedBoosters, setSelectedBoosters] = useState<HerbalBooster[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  // Price calculation
  const containerExtra = servingStyle === 'flask' ? 45 : 0;
  const milkExtra = milk === 'oat' ? 25 : 0;
  const sweetenerExtra = sweetener === 'honey' ? 10 : 0;
  const boostersTotal = selectedBoosters.reduce((acc, b) => acc + b.price, 0);

  const unitPrice = chai.price + containerExtra + milkExtra + sweetenerExtra + boostersTotal;
  const totalPrice = unitPrice * quantity;

  const toggleBooster = (booster: HerbalBooster) => {
    if (selectedBoosters.some((b) => b.id === booster.id)) {
      setSelectedBoosters(selectedBoosters.filter((b) => b.id !== booster.id));
    } else {
      setSelectedBoosters([...selectedBoosters, booster]);
    }
  };

  const handleAdd = () => {
    const cartItem: CartItem = {
      cartId: `${chai.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      chai,
      servingStyle,
      sweetener,
      milk,
      spiceIntensity,
      boosters: selectedBoosters,
      quantity,
      itemTotal: totalPrice,
    };
    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF6EF] w-full max-w-2xl rounded-2xl border border-[#DFD3BE] shadow-2xl overflow-hidden my-8">
        
        {/* Header Bar */}
        <div className="bg-[#1C1917] text-white p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#C85A32] flex items-center justify-center font-bold text-white text-lg">
              वै
            </div>
            <div>
              <span className="text-xs font-mono text-[#E58E26] block">
                RX DOSAGE CUSTOMIZER
              </span>
              <h3 className="text-xl font-bold font-display text-white">
                {chai.name}
              </h3>
              <p className="text-xs text-stone-300">{chai.hindiName} · {chai.dosha}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Customization Options */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          
          {/* Step 1: Serving Vessel */}
          <div>
            <label className="text-xs font-bold text-[#1C1917] uppercase tracking-wider block mb-3">
              1. Choose Serving Vessel
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'kulhad',
                  title: 'Clay Kulhad',
                  desc: 'Traditional terracotta, porous smoky earth flavor',
                  extra: '+₹0',
                },
                {
                  id: 'glass',
                  title: 'Cutting Glass',
                  desc: 'Roadside tapri glass, heat resilient',
                  extra: '+₹0',
                },
                {
                  id: 'flask',
                  title: 'Eco Flask',
                  desc: 'Brass-insulated takeaway bottle for travel',
                  extra: '+₹45',
                },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setServingStyle(c.id as ServingStyle)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    servingStyle === c.id
                      ? 'bg-white border-[#C85A32] shadow-sm ring-1 ring-[#C85A32]'
                      : 'bg-[#F3ECE0] border-[#DFD3BE] text-[#57534E] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-sm text-[#1C1917]">
                    <span>{c.title}</span>
                    <span className="text-xs font-mono text-[#C85A32]">{c.extra}</span>
                  </div>
                  <p className="text-[11px] text-[#78716C] mt-1">{c.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Milk Base */}
          <div>
            <label className="text-xs font-bold text-[#1C1917] uppercase tracking-wider block mb-3">
              2. Milk Base (Doodh)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'desi_cow', name: 'Desi Cow Milk (A2)', note: 'Light & digestable' },
                { id: 'buffalo', name: 'Buffalo Milk', note: 'Thick creamy kadak' },
                { id: 'oat', name: 'Oat Milk (+₹25)', note: 'Plant-based silky' },
                { id: 'water_decoction', name: 'Black Kadha', note: 'Zero dairy decoction' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMilk(m.id as MilkChoice)}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                    milk === m.id
                      ? 'bg-white border-[#C85A32] font-bold text-[#1C1917] ring-1 ring-[#C85A32]'
                      : 'bg-[#F3ECE0] border-[#DFD3BE] text-[#57534E]'
                  }`}
                >
                  <p className="font-semibold">{m.name}</p>
                  <p className="text-[10px] text-[#78716C] mt-0.5">{m.note}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Sweetener Preference */}
          <div>
            <label className="text-xs font-bold text-[#1C1917] uppercase tracking-wider block mb-3">
              3. Ayurvedic Sweetener (Meetha)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: 'jaggery', name: 'Desi Gur (Jaggery)', note: 'Recommended' },
                { id: 'honey', name: 'Wild Honey (+₹10)', note: 'Added post-boil' },
                { id: 'stevia', name: 'Stevia Leaves', note: 'Zero Calories' },
                { id: 'raw_sugar', name: 'Brown Khandsari', note: 'Raw cane sugar' },
                { id: 'no_sugar', name: 'Phika (No Sugar)', note: 'Pure herbs only' },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSweetener(s.id as Sweetener)}
                  className={`p-2 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                    sweetener === s.id
                      ? 'bg-white border-[#C85A32] font-bold text-[#1C1917] ring-1 ring-[#C85A32]'
                      : 'bg-[#F3ECE0] border-[#DFD3BE] text-[#57534E]'
                  }`}
                >
                  <p className="font-semibold truncate">{s.name}</p>
                  <p className="text-[10px] text-[#78716C] mt-0.5">{s.note}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Kadak Spice Strength */}
          <div>
            <label className="text-xs font-bold text-[#1C1917] uppercase tracking-wider block mb-3">
              4. Kadak Spice Level (तीखापन)
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'mild', title: 'Mild & Gentle', desc: 'Subtle cardamom aroma' },
                { id: 'regular', title: 'Street Balanced', desc: 'Classic ginger punch' },
                { id: 'kadak', title: 'Extra Kadak Tapri', desc: 'Heavy crushed ginger & black pepper' },
              ].map((sp) => (
                <button
                  key={sp.id}
                  type="button"
                  onClick={() => setSpiceIntensity(sp.id as SpiceIntensity)}
                  className={`p-3 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                    spiceIntensity === sp.id
                      ? 'bg-white border-[#C85A32] font-bold text-[#1C1917] ring-1 ring-[#C85A32]'
                      : 'bg-[#F3ECE0] border-[#DFD3BE] text-[#57534E]'
                  }`}
                >
                  <p className="font-semibold text-xs">{sp.title}</p>
                  <p className="text-[10px] text-[#78716C] mt-0.5">{sp.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 5: Botanical Herbal Boosters */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-[#1C1917] uppercase tracking-wider block">
                5. Add Extra Botanical Boosters (Vaidya Extracts)
              </label>
              <span className="text-[11px] text-[#78716C]">Select any to infuse</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {HERBAL_BOOSTERS.map((booster) => {
                const isSelected = selectedBoosters.some((b) => b.id === booster.id);
                return (
                  <button
                    key={booster.id}
                    type="button"
                    onClick={() => toggleBooster(booster)}
                    className={`p-3 rounded-xl border text-left text-xs flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white border-[#2D5A27] ring-1 ring-[#2D5A27] shadow-xs'
                        : 'bg-[#F3ECE0] border-[#DFD3BE] text-[#57534E] hover:bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-[#1C1917]">
                        <span>{booster.name}</span>
                        <span className="text-[10px] text-[#78716C]">({booster.hindi})</span>
                      </div>
                      <p className="text-[10px] text-[#78716C] mt-0.5">{booster.benefit}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono font-bold text-[#C85A32] text-xs">
                        +₹{booster.price}
                      </span>
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center border ${
                          isSelected
                            ? 'bg-[#2D5A27] text-white border-[#2D5A27]'
                            : 'border-[#A8A29E]'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer: Quantity + Add CTA */}
        <div className="p-5 bg-[#F3ECE0] border-t border-[#DFD3BE] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-[#57534E]">Quantity:</span>
            <div className="flex items-center bg-white border border-[#DDD3BF] rounded-lg">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 text-[#57534E] hover:text-[#1C1917] cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-mono font-bold text-sm text-[#1C1917] tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 text-[#57534E] hover:text-[#1C1917] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="text-left ml-2">
              <span className="text-[11px] text-[#78716C] block">Total Dose Price:</span>
              <span className="text-xl font-extrabold font-mono text-[#1C1917] tabular-nums">
                ₹{totalPrice}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 bg-white hover:bg-stone-100 text-[#57534E] rounded-lg text-xs font-bold border border-[#DDD3BF] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAdd}
              className="w-1/2 sm:w-auto px-6 py-2.5 bg-[#C85A32] hover:bg-[#B34B25] text-white rounded-lg text-xs font-bold shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>Add to Rx Order</span>
              <span className="font-mono tabular-nums bg-[#8C3415] px-1.5 py-0.5 rounded text-[10px]">
                ₹{totalPrice}
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
