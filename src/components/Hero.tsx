import React from 'react';
import { Stethoscope, ArrowRight, Flame, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';

interface HeroProps {
  onOpenDoctor: () => void;
  fulfillmentType: 'takeaway' | 'table';
  onChangeFulfillment: (type: 'takeaway' | 'table') => void;
  tableNumber: string;
  setTableNumber: (val: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenDoctor,
  fulfillmentType,
  onChangeFulfillment,
  tableNumber,
  setTableNumber,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF6EF] border-b border-[#E7DFCE] pt-8 pb-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Brand Story & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Unboxed Metadata Header (Zero pills) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#8C3415] mb-4 uppercase tracking-wider">
              <span>Authentic Ayurvedic Apothecary</span>
              <span aria-hidden="true">·</span>
              <span>100% Single-Origin Assam CTC</span>
              <span aria-hidden="true">·</span>
              <span>Fresh Whole Spices Only</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1C1917] leading-[1.1] mb-6 font-display" style={{ textWrap: 'balance' }}>
              Where Grandma's Kadha Meets the Street Chai Tapri.
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-[#57534E] leading-relaxed mb-8 max-w-2xl font-normal">
              For centuries in India, every cold, stomach ache, and sluggish morning was cured at home with steaming pots of spiced tea. Pharmacy Chaiwale dispenses handcrafted herbal remedies in traditional earthen <span className="font-semibold text-[#C85A32]">kulhads</span>—brewed for fast street pickup or table delivery.
            </p>

            {/* Express Fulfillment Mode Box */}
            <div className="bg-[#F3ECE0] rounded-xl p-5 border border-[#DFD3BE] mb-8 max-w-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#1C1917] uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#C85A32]" />
                  Select Your Pickup Method
                </span>
                <span className="text-xs text-[#78716C] font-mono">
                  {fulfillmentType === 'takeaway' ? 'Avg. prep: 4 mins' : 'Table Service Available'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <button
                  type="button"
                  onClick={() => onChangeFulfillment('takeaway')}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    fulfillmentType === 'takeaway'
                      ? 'bg-white border-[#C85A32] shadow-sm'
                      : 'bg-transparent border-[#DFD3BE] hover:bg-white/50 text-[#78716C]'
                  }`}
                >
                  <div className="font-semibold text-sm text-[#1C1917] flex items-center justify-between">
                    <span>Takeaway Counter</span>
                    {fulfillmentType === 'takeaway' && (
                      <span className="w-2 h-2 rounded-full bg-[#C85A32]" />
                    )}
                  </div>
                  <p className="text-xs text-[#78716C] mt-1">Tap & collect at express dispensary</p>
                </button>

                <button
                  type="button"
                  onClick={() => onChangeFulfillment('table')}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    fulfillmentType === 'table'
                      ? 'bg-white border-[#C85A32] shadow-sm'
                      : 'bg-transparent border-[#DFD3BE] hover:bg-white/50 text-[#78716C]'
                  }`}
                >
                  <div className="font-semibold text-sm text-[#1C1917] flex items-center justify-between">
                    <span>Dine-In Table</span>
                    {fulfillmentType === 'table' && (
                      <span className="w-2 h-2 rounded-full bg-[#C85A32]" />
                    )}
                  </div>
                  <p className="text-xs text-[#78716C] mt-1">We bring steaming kulhads to your bench</p>
                </button>
              </div>

              {fulfillmentType === 'table' && (
                <div className="flex items-center gap-3 pt-2 border-t border-[#DFD3BE]">
                  <label htmlFor="table-input" className="text-xs font-semibold text-[#1C1917] whitespace-nowrap">
                    Enter Table Number:
                  </label>
                  <input
                    id="table-input"
                    type="text"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="e.g. 7"
                    className="w-24 px-3 py-1.5 bg-white border border-[#C85A32] rounded text-sm font-bold text-center text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
                  />
                  <span className="text-xs text-[#78716C]">
                    (Check brass plate on your wooden table)
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#rx-menu"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#C85A32] hover:bg-[#B34B25] text-white font-bold rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer active:scale-98"
              >
                <span>Browse Rx Formulations</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenDoctor}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-[#F3ECE0] text-[#1C1917] font-bold rounded-lg border border-[#DDD3BF] shadow-xs transition-all whitespace-nowrap cursor-pointer"
              >
                <Stethoscope className="w-4 h-4 text-[#2D5A27]" />
                <span>Consult Chai Doctor</span>
              </button>
            </div>

            {/* Proof Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-8 mt-8 border-t border-[#E7DFCE]">
              <div>
                <p className="text-2xl font-extrabold text-[#1C1917] font-mono tabular-nums">24,800+</p>
                <p className="text-xs text-[#78716C] font-medium mt-0.5">Kulhads Dispensed</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[#1C1917] font-mono tabular-nums">100%</p>
                <p className="text-xs text-[#78716C] font-medium mt-0.5">Whole Raw Spices</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[#1C1917] font-mono tabular-nums">4.2 min</p>
                <p className="text-xs text-[#78716C] font-medium mt-0.5">Average Brew & Serve</p>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Apothecary Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#DFD3BE] bg-[#1C1917]">
              <img
                src="/src/assets/images/hero_kulhad_chai_1792404796098.jpg"
                alt="Artisanal steaming kadha chai in a traditional clay kulhad earthenware cup with ginger, cardamom, and tulsi"
                className="w-full h-[440px] sm:h-[480px] object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Gradient scrim for readable overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 text-xs font-mono text-[#E58E26] mb-1">
                  <span>DISPENSARY POT #01</span>
                  <span>·</span>
                  <span>SIMMERING AT 94°C</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-display">
                  Adrak Tulsi Kadha Brew (अदरक तुलसी काढ़ा)
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Crushed Krishna Tulsi, Wayanad Ginger, Tellicherry Pepper, and Assam Black Tea boiled in open brass vessels to extract water-soluble Ayurvedic polyphenols.
                </p>

                <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs text-stone-300">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#E58E26]" />
                    Clay Terroir Infusion
                  </span>
                  <span className="font-bold text-white font-mono tabular-nums">From ₹65</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
