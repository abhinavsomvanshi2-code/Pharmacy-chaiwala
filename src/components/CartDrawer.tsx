import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Clock, Utensils, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartId: string, newQty: number) => void;
  onRemoveItem: (cartId: string) => void;
  onProceedToCheckout: () => void;
  fulfillmentType: 'takeaway' | 'table';
  onChangeFulfillment: (type: 'takeaway' | 'table') => void;
  tableNumber: string;
  setTableNumber: (val: string) => void;
  pickupETA: string;
  setPickupETA: (val: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  fulfillmentType,
  onChangeFulfillment,
  tableNumber,
  setTableNumber,
  pickupETA,
  setPickupETA,
}) => {
  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.itemTotal, 0);
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = subtotal + tax;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#FAF6EF] h-full shadow-2xl flex flex-col justify-between border-l border-[#DFD3BE]">
        
        {/* Drawer Header */}
        <div className="bg-[#1C1917] text-white p-5 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#E58E26]" />
            <div>
              <h3 className="font-bold text-base font-display text-white">
                Your Rx Tea Dispensary Order
              </h3>
              <p className="text-[11px] text-stone-400 font-mono">
                {cart.length} unique formulation{cart.length === 1 ? '' : 's'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Fulfillment Mode Selector */}
        <div className="bg-[#F3ECE0] p-4 border-b border-[#DFD3BE]">
          <span className="text-[10px] font-bold text-[#78716C] uppercase tracking-wider block mb-2">
            Order Fulfillment Type:
          </span>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <button
              type="button"
              onClick={() => onChangeFulfillment('takeaway')}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                fulfillmentType === 'takeaway'
                  ? 'bg-white text-[#1C1917] shadow-xs border border-[#C85A32]'
                  : 'bg-transparent text-[#57534E] hover:bg-white/50 border border-transparent'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>Takeaway Counter</span>
            </button>
            <button
              type="button"
              onClick={() => onChangeFulfillment('table')}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                fulfillmentType === 'table'
                  ? 'bg-white text-[#1C1917] shadow-xs border border-[#C85A32]'
                  : 'bg-transparent text-[#57534E] hover:bg-white/50 border border-transparent'
              }`}
            >
              <Utensils className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>Dine-In Table</span>
            </button>
          </div>

          {fulfillmentType === 'takeaway' ? (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#57534E] whitespace-nowrap">Ready in:</span>
              <div className="flex items-center gap-1.5">
                {['5 mins', '10 mins', '15 mins'].map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setPickupETA(time)}
                    className={`px-2 py-1 rounded text-xs font-medium cursor-pointer ${
                      pickupETA === time
                        ? 'bg-[#1C1917] text-white font-bold'
                        : 'bg-white text-[#57534E] border border-[#DDD3BF]'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#57534E] whitespace-nowrap">Table Number:</span>
              <input
                type="text"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder="e.g. 5"
                className="w-20 px-2 py-1 bg-white border border-[#C85A32] rounded text-xs font-bold text-center text-[#1C1917] focus:outline-none"
              />
              <span className="text-[11px] text-[#78716C]">(on your bench)</span>
            </div>
          )}
        </div>

        {/* Itemized List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#78716C]">
              <div className="w-16 h-16 rounded-full bg-[#F3ECE0] flex items-center justify-center mb-3 text-2xl">
                ☕
              </div>
              <p className="font-bold text-[#1C1917] text-sm">Your order is currently empty</p>
              <p className="text-xs text-[#78716C] mt-1 max-w-xs">
                Select a signature Ayurvedic chai or consult the Chai Doctor to receive a tailored herbal prescription.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 bg-[#C85A32] text-white rounded-lg text-xs font-bold cursor-pointer"
              >
                Browse Chai Formulary
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartId}
                className="bg-white p-3.5 rounded-xl border border-[#E7DFCE] shadow-xs flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <span className="text-[10px] font-bold text-[#C85A32] block uppercase tracking-wider">
                      {item.chai.hindiName}
                    </span>
                    <h4 className="font-bold text-sm text-[#1C1917] font-display">
                      {item.chai.name}
                    </h4>

                    {/* Specifications */}
                    <div className="mt-1 text-[11px] text-[#78716C] space-y-0.5">
                      <p>
                        Vessel: <strong className="text-[#1C1917] capitalize">{item.servingStyle}</strong> · Milk: <strong className="text-[#1C1917] capitalize">{item.milk.replace('_', ' ')}</strong>
                      </p>
                      <p>
                        Sweetener: <strong className="text-[#1C1917] capitalize">{item.sweetener}</strong> · Spice: <strong className="text-[#1C1917] capitalize">{item.spiceIntensity}</strong>
                      </p>
                      {item.boosters.length > 0 && (
                        <p className="text-[#2D5A27]">
                          + Boosters: {item.boosters.map((b) => b.name).join(', ')}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.cartId)}
                    className="text-stone-400 hover:text-red-600 p-1 rounded transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Counter & Price */}
                <div className="mt-3 pt-2.5 border-t border-[#F3ECE0] flex items-center justify-between">
                  <div className="flex items-center bg-[#FAF6EF] border border-[#DFD3BE] rounded-md">
                    <button
                      onClick={() => onUpdateQuantity(item.cartId, item.quantity - 1)}
                      className="p-1.5 text-[#57534E] hover:text-[#1C1917] cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-7 text-center font-mono font-bold text-xs text-[#1C1917] tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
                      className="p-1.5 text-[#57534E] hover:text-[#1C1917] cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="font-mono font-extrabold text-sm text-[#1C1917] tabular-nums">
                    ₹{item.itemTotal}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Calculations */}
        {cart.length > 0 && (
          <div className="p-4 bg-[#F3ECE0] border-t border-[#DFD3BE] space-y-3">
            <div className="space-y-1.5 text-xs text-[#57534E]">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-mono tabular-nums text-[#1C1917] font-semibold">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Ayurvedic FSSAI / GST (5%):</span>
                <span className="font-mono tabular-nums text-[#1C1917]">₹{tax}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-[#1C1917] pt-2 border-t border-[#DFD3BE]">
                <span>Total Amount Payable:</span>
                <span className="font-mono tabular-nums text-[#C85A32]">₹{grandTotal}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onProceedToCheckout}
              className="w-full py-3 bg-[#C85A32] hover:bg-[#B34B25] text-white font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Dispense Order & Pay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
