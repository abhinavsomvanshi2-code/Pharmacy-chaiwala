import React, { useState, useEffect } from 'react';
import { X, CheckCircle, QrCode, CreditCard, Banknote, Clock, Sparkles, Printer, RefreshCw, Flame } from 'lucide-react';
import { CartItem, OrderFulfillment, PlacedOrder } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  fulfillmentType: 'takeaway' | 'table';
  tableNumber: string;
  pickupETA: string;
  onOrderCompleted: (order: PlacedOrder) => void;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  fulfillmentType,
  tableNumber,
  pickupETA,
  onOrderCompleted,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cash_counter' | 'card'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<PlacedOrder | null>(null);
  const [brewStageIndex, setBrewStageIndex] = useState(0);

  const subtotal = cart.reduce((acc, item) => acc + item.itemTotal, 0);
  const tax = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + tax;

  const BREWING_STAGES = [
    { title: 'Grinding Raw Herbs', desc: 'Crushing fresh ginger & Krishna Tulsi in stone mortar' },
    { title: 'Simmering in Brass Pot', desc: 'Extracting medicinal polyphenols at 94°C' },
    { title: 'Straining & Terracotta Pour', desc: 'Decanting into hot porous clay kulhads' },
    { title: 'Dispensed & Ready!', desc: fulfillmentType === 'table' ? `Serving directly to Table #${tableNumber || '1'}` : 'Counter Pickup Ready at Dispensary' },
  ];

  // Advance stages when order placed
  useEffect(() => {
    let timer: any;
    if (confirmedOrder && brewStageIndex < 3) {
      timer = setTimeout(() => {
        setBrewStageIndex((prev) => prev + 1);
      }, 3500);
    }
    return () => clearTimeout(timer);
  }, [confirmedOrder, brewStageIndex]);

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const newOrder: PlacedOrder = {
        id: `PCW-${Math.floor(100000 + Math.random() * 900000)}`,
        rxNumber: `RX-${Math.floor(1000 + Math.random() * 9000)}-AYUR`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        items: [...cart],
        subtotal,
        tax,
        total: grandTotal,
        fulfillment: {
          type: fulfillmentType,
          tableNumber: fulfillmentType === 'table' ? tableNumber || '7' : undefined,
          pickupETA: fulfillmentType === 'takeaway' ? pickupETA : undefined,
          customerName: customerName.trim() || 'Desi Chai Lover',
          phone: phone.trim() || '+91 98000 12345',
        },
        paymentMethod,
        status: 'brewing',
      };

      setConfirmedOrder(newOrder);
      setIsProcessing(false);
      onOrderCompleted(newOrder);
      onClearCart();
    }, 1200);
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF6EF] w-full max-w-xl rounded-2xl border border-[#DFD3BE] shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-[#1C1917] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#C85A32] flex items-center justify-center font-bold text-white text-base">
              वै
            </div>
            <div>
              <h3 className="font-bold text-base font-display text-white">
                {confirmedOrder ? 'Dispensing Prescription Slip' : 'Dispense & Checkout'}
              </h3>
              <p className="text-[11px] text-stone-400">
                {confirmedOrder ? confirmedOrder.rxNumber : 'Pharmacy Chaiwale Official Dispensary'}
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

        {confirmedOrder ? (
          /* Confirmation & Live Brewing Stage Tracker View */
          <div className="p-6 space-y-6">
            
            {/* Status Header */}
            <div className="text-center bg-[#F3ECE0] p-4 rounded-xl border border-[#DFD3BE]">
              <span className="text-[11px] font-mono text-[#C85A32] font-bold block mb-1">
                ORDER {confirmedOrder.id} · TOKEN {confirmedOrder.rxNumber}
              </span>
              <h4 className="text-xl font-extrabold text-[#1C1917] font-display">
                {brewStageIndex === 3 ? '🎉 Your Chai is Ready!' : 'Brewing in Progress...'}
              </h4>
              <p className="text-xs text-[#57534E] mt-1">
                {fulfillmentType === 'table'
                  ? `Delivering piping hot to Table #${confirmedOrder.fulfillment.tableNumber}`
                  : `Collect at Express Counter in ~${confirmedOrder.fulfillment.pickupETA || '5 mins'}`}
              </p>
            </div>

            {/* Simulated 4-Stage Brewing Progress */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-[#1C1917] mb-2">
                <span className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-[#C85A32]" />
                  Live Tapri Preparation Tracker:
                </span>
                <span className="font-mono text-[#C85A32] tabular-nums">
                  Stage {brewStageIndex + 1} of 4
                </span>
              </div>

              <div className="space-y-2">
                {BREWING_STAGES.map((stage, idx) => {
                  const isDone = idx < brewStageIndex;
                  const isCurrent = idx === brewStageIndex;
                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border text-xs flex items-center justify-between transition-all ${
                        isCurrent
                          ? 'bg-white border-[#C85A32] shadow-xs ring-1 ring-[#C85A32]'
                          : isDone
                          ? 'bg-[#EBF3E8] border-[#A8CE9E] text-[#2D5A27]'
                          : 'bg-[#FAF6EF] border-[#DFD3BE] text-[#A8A29E]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                            isDone
                              ? 'bg-[#2D5A27] text-white'
                              : isCurrent
                              ? 'bg-[#C85A32] text-white'
                              : 'bg-[#DDD3BF] text-stone-600'
                          }`}
                        >
                          {isDone ? '✓' : idx + 1}
                        </div>
                        <div>
                          <p className="font-bold text-[#1C1917]">{stage.title}</p>
                          <p className="text-[10px] text-[#78716C]">{stage.desc}</p>
                        </div>
                      </div>
                      {isCurrent && (
                        <span className="text-[10px] font-mono font-bold text-[#C85A32] animate-pulse">
                          Active...
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Itemized Receipt Summary */}
            <div className="bg-white p-4 rounded-xl border border-[#DFD3BE] text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-[#1C1917] border-b border-[#F3ECE0] pb-2">
                <span>Customer: {confirmedOrder.fulfillment.customerName}</span>
                <span className="font-mono tabular-nums">Paid: ₹{confirmedOrder.total}</span>
              </div>
              <div className="space-y-1">
                {confirmedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-[#57534E]">
                    <span>
                      {item.quantity}x {item.chai.name} ({item.servingStyle}, {item.sweetener})
                    </span>
                    <span className="font-mono tabular-nums font-semibold text-[#1C1917]">
                      ₹{item.itemTotal}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrintSlip}
                className="flex-1 py-2.5 bg-white hover:bg-stone-100 text-[#1C1917] border border-[#DDD3BF] rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Rx Slip</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 bg-[#C85A32] hover:bg-[#B34B25] text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Done</span>
              </button>
            </div>

          </div>
        ) : (
          /* Checkout Input & Payment Simulator */
          <form onSubmit={handleConfirmPayment} className="p-6 space-y-5">
            
            {/* Customer Details */}
            <div>
              <span className="text-xs font-bold text-[#1C1917] uppercase tracking-wider block mb-2">
                1. Patient / Customer Information
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-[#57534E] block mb-1">
                    Your Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Vikram Sharma"
                    className="w-full px-3 py-2 bg-white border border-[#DDD3BF] rounded-lg text-xs text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#57534E] block mb-1">
                    Phone (for pickup SMS):
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 bg-white border border-[#DDD3BF] rounded-lg text-xs text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <span className="text-xs font-bold text-[#1C1917] uppercase tracking-wider block mb-2">
                2. Select Payment Method
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'upi', label: 'Instant UPI', icon: QrCode },
                  { id: 'cash_counter', label: 'Cash at Counter', icon: Banknote },
                  { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
                ].map((pm) => {
                  const Icon = pm.icon;
                  const isSelected = paymentMethod === pm.id;
                  return (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'bg-white border-[#C85A32] shadow-xs ring-1 ring-[#C85A32]'
                          : 'bg-[#F3ECE0] border-[#DFD3BE] text-[#57534E]'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-[#C85A32]' : 'text-[#78716C]'}`} />
                      <span className="text-xs font-bold text-[#1C1917]">{pm.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* UPI Simulator Box */}
              {paymentMethod === 'upi' && (
                <div className="mt-3 bg-white p-3.5 rounded-xl border border-[#DFD3BE] flex items-center gap-3">
                  <div className="w-16 h-16 bg-[#1C1917] rounded-lg p-1.5 flex items-center justify-center shrink-0">
                    <QrCode className="w-full h-full text-white" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-[#1C1917]">UPI ID: pharmacychaiwale@okhdfcbank</p>
                    <p className="text-[11px] text-[#78716C]">
                      Compatible with GPay, PhonePe, Paytm, and BHIM UPI.
                    </p>
                    <span className="text-[10px] text-[#2D5A27] font-semibold mt-1 block">
                      ✓ Instant zero-fee verification
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Bill Summary */}
            <div className="bg-[#F3ECE0] p-4 rounded-xl border border-[#DFD3BE] space-y-1.5 text-xs text-[#57534E]">
              <div className="flex justify-between">
                <span>Total Items:</span>
                <span className="font-mono tabular-nums text-[#1C1917] font-semibold">
                  {cart.reduce((a, b) => a + b.quantity, 0)} Kulhads
                </span>
              </div>
              <div className="flex justify-between">
                <span>Fulfillment:</span>
                <span className="font-bold text-[#1C1917]">
                  {fulfillmentType === 'table' ? `Table Delivery (#${tableNumber || '1'})` : `Counter Express (~${pickupETA})`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-[#1C1917] pt-2 border-t border-[#DFD3BE]">
                <span>Total Payable:</span>
                <span className="font-mono tabular-nums text-[#C85A32]">₹{grandTotal}</span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 bg-[#C85A32] hover:bg-[#B34B25] disabled:opacity-50 text-white font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Transmitting Prescription to Brass Pot...</span>
                </>
              ) : (
                <>
                  <span>Confirm Order & Pay ₹{grandTotal}</span>
                </>
              )}
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
