import React from 'react';
import { ShoppingBag, Stethoscope, Coffee, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenDoctor: () => void;
  fulfillmentType: 'takeaway' | 'table';
  onChangeFulfillment: (type: 'takeaway' | 'table') => void;
  tableNumber: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenDoctor,
  fulfillmentType,
  onChangeFulfillment,
  tableNumber,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF6EF]/95 backdrop-blur-md border-b border-[#E7DFCE] transition-all">
      {/* Top Banner Notice */}
      <div className="bg-[#1C1917] text-[#FAF6EF] text-xs py-1 px-4 text-center tracking-wide flex items-center justify-center gap-3">
        <span className="font-semibold text-[#E58E26]">PHARMACY CHAIWALE DISPENSARY</span>
        <span aria-hidden="true" className="text-stone-500">·</span>
        <span className="text-stone-300">Fresh morning master decoction simmering in brass degchi</span>
        <span aria-hidden="true" className="text-stone-500">·</span>
        <span className="text-[#E58E26]">100% Terracotta Kulhad · Zero Plastic</span>
      </div>

      {/* Strict 3-Zone Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a href="#" className="flex items-center gap-2 group whitespace-nowrap shrink-0">
          <div className="w-10 h-10 rounded-lg bg-[#C85A32] text-white flex items-center justify-center font-bold text-xl shadow-sm border border-[#A64522]">
            <span>वै</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#1C1917] font-display">
              PHARMACY CHAIWALE
            </span>
            <span className="text-[11px] font-medium tracking-widest text-[#C85A32] uppercase">
              The Herbal Chai Apothecary
            </span>
          </div>
        </a>

        {/* Zone 2: 4-5 Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-[#57534E]">
          <a
            href="#rx-menu"
            className="hover:text-[#C85A32] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Coffee className="w-4 h-4 text-[#C85A32]" />
            <span>Rx Menu</span>
          </a>
          <button
            onClick={onOpenDoctor}
            className="hover:text-[#C85A32] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer text-left"
          >
            <Stethoscope className="w-4 h-4 text-[#2D5A27]" />
            <span>Chai Doctor (Prescriber)</span>
          </button>
          <a
            href="#heritage"
            className="hover:text-[#C85A32] transition-colors whitespace-nowrap shrink-0"
          >
            Ayurvedic Heritage
          </a>
          <a
            href="#dispensaries"
            className="hover:text-[#C85A32] transition-colors whitespace-nowrap shrink-0"
          >
            Stalls & Hours
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action + Cart */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Fulfillment Pill Indicator */}
          <div className="hidden sm:flex items-center bg-[#ECE4D2] p-1 rounded-lg text-xs font-medium border border-[#DDD3BF]">
            <button
              onClick={() => onChangeFulfillment('takeaway')}
              className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap cursor-pointer ${
                fulfillmentType === 'takeaway'
                  ? 'bg-white text-[#1C1917] shadow-xs font-semibold'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              Takeaway Counter
            </button>
            <button
              onClick={() => onChangeFulfillment('table')}
              className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap cursor-pointer ${
                fulfillmentType === 'table'
                  ? 'bg-white text-[#1C1917] shadow-xs font-semibold'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              {tableNumber ? `Table #${tableNumber}` : 'Dine-In Table'}
            </button>
          </div>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2.5 px-4 py-2.5 bg-[#C85A32] hover:bg-[#B34B25] text-white text-sm font-semibold rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Rx Order</span>
            <span className="font-mono tabular-nums bg-[#8C3415] px-2 py-0.5 rounded text-xs">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
