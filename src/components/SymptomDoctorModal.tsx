import React, { useState } from 'react';
import { X, Stethoscope, CheckCircle2, ArrowRight, Sparkles, Shield, HeartPulse } from 'lucide-react';
import { SYMPTOM_PRESETS, CHAI_CATALOG, HERBAL_BOOSTERS } from '../data/chaiData';
import { ChaiItem, CartItem, HerbalBooster } from '../types';

interface SymptomDoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPrescriptionToCart: (item: CartItem) => void;
  onCustomizePrescription: (chai: ChaiItem) => void;
}

export const SymptomDoctorModal: React.FC<SymptomDoctorModalProps> = ({
  isOpen,
  onClose,
  onAddPrescriptionToCart,
  onCustomizePrescription,
}) => {
  if (!isOpen) return null;

  const [selectedSymptomId, setSelectedSymptomId] = useState<string>(SYMPTOM_PRESETS[0].id);

  const activePreset = SYMPTOM_PRESETS.find((p) => p.id === selectedSymptomId) || SYMPTOM_PRESETS[0];
  const matchedChai = CHAI_CATALOG.find((c) => c.id === activePreset.recommendedChaiId) || CHAI_CATALOG[0];
  const matchedBooster = HERBAL_BOOSTERS.find((b) => b.id === activePreset.recommendedBoosterId);

  const totalPrescriptionPrice = matchedChai.price + (matchedBooster ? matchedBooster.price : 0);

  const handle1ClickPrescribe = () => {
    const cartItem: CartItem = {
      cartId: `rx-prescribed-${matchedChai.id}-${Date.now()}`,
      chai: matchedChai,
      servingStyle: 'kulhad',
      sweetener: 'jaggery',
      milk: 'desi_cow',
      spiceIntensity: 'regular',
      boosters: matchedBooster ? [matchedBooster] : [],
      quantity: 1,
      itemTotal: totalPrescriptionPrice,
    };
    onAddPrescriptionToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF6EF] w-full max-w-3xl rounded-2xl border border-[#DFD3BE] shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-[#1C1917] text-white p-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#2D5A27] text-white flex items-center justify-center font-bold text-2xl shadow-sm border border-[#3E7337]">
              <span>⚕</span>
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#E58E26]">
                <span>THE CHAI VAIDYA RX</span>
                <span>·</span>
                <span>AYURVEDIC SYMPTOM DIAGNOSIS</span>
              </div>
              <h2 className="text-2xl font-bold font-display text-white">
                Chai Doctor Prescriber
              </h2>
              <p className="text-xs text-stone-300">
                Tell us what ails your body today. We dispense the exact herbal decoction prescribed in Indian folk medicine.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Two-Column Diagnosis Area */}
        <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[#DFD3BE]">
          
          {/* Left Column: Select Symptom List */}
          <div className="md:col-span-5 p-5 bg-[#F3ECE0] space-y-2.5 max-h-[60vh] overflow-y-auto">
            <span className="text-[11px] font-bold text-[#1C1917] uppercase tracking-wider block mb-2">
              Select Your Current Discomfort:
            </span>
            {SYMPTOM_PRESETS.map((preset) => {
              const isSelected = preset.id === selectedSymptomId;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setSelectedSymptomId(preset.id)}
                  className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#C85A32] shadow-sm ring-1 ring-[#C85A32]'
                      : 'bg-[#FAF6EF] border-[#DFD3BE] text-[#57534E] hover:bg-white'
                  }`}
                >
                  <span className="text-xs font-bold text-[#1C1917] block">
                    {preset.symptomTitle}
                  </span>
                  <span className="text-[11px] font-medium text-[#C85A32] block mt-0.5">
                    {preset.hindiAilment}
                  </span>
                  <p className="text-[10px] text-[#78716C] mt-1 line-clamp-2">
                    {preset.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Simulated Vintage Apothecary Prescription Slip */}
          <div className="md:col-span-7 p-6 bg-[#FFFDF9] flex flex-col justify-between">
            <div className="space-y-4">
              
              {/* Prescription Header Slip */}
              <div className="border-b-2 border-dashed border-[#DFD3BE] pb-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#78716C]">
                  <span>DISPENSARY REG: #PCW-7749</span>
                  <span className="text-[#C85A32] font-bold">RX TOKEN VERIFIED</span>
                </div>
                <h3 className="text-xl font-extrabold text-[#1C1917] font-display mt-1">
                  Vaidya Prescription Slip
                </h3>
                <p className="text-xs text-[#57534E]">
                  Ailment Profile: <strong className="text-[#1C1917]">{activePreset.symptomTitle}</strong>
                </p>
              </div>

              {/* Recommended Chai Box */}
              <div className="bg-[#FAF6EF] p-4 rounded-xl border border-[#E7DFCE]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D5A27] block">
                      Primary Rx Formulation:
                    </span>
                    <h4 className="text-base font-bold text-[#1C1917] font-display">
                      {matchedChai.name} ({matchedChai.hindiName})
                    </h4>
                    <p className="text-xs text-[#78716C] mt-0.5">
                      {matchedChai.tagline} · {matchedChai.dosha}
                    </p>
                  </div>
                  <span className="text-base font-extrabold font-mono text-[#1C1917] tabular-nums">
                    ₹{matchedChai.price}
                  </span>
                </div>

                {/* Recommended Booster */}
                {matchedBooster && (
                  <div className="mt-3 pt-3 border-t border-[#DFD3BE] flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] font-semibold text-[#C85A32] uppercase">
                        + Recommended Extra Shot:
                      </span>
                      <p className="font-bold text-[#1C1917]">
                        {matchedBooster.name} ({matchedBooster.hindi})
                      </p>
                      <p className="text-[10px] text-[#78716C]">{matchedBooster.benefit}</p>
                    </div>
                    <span className="font-mono font-bold text-[#C85A32] tabular-nums">
                      +₹{matchedBooster.price}
                    </span>
                  </div>
                )}
              </div>

              {/* Clinical Vaidya Notes */}
              <div className="bg-[#F3ECE0]/70 p-3.5 rounded-lg border border-[#DFD3BE] text-xs space-y-1.5">
                <span className="font-bold text-[#1C1917] uppercase tracking-wider text-[10px] block flex items-center gap-1.5">
                  <HeartPulse className="w-3.5 h-3.5 text-[#C85A32]" />
                  Apothecary Pharmacological Action:
                </span>
                <p className="text-[#57534E] leading-relaxed text-[11px]">
                  {activePreset.vaidyaNotes}
                </p>
                <div className="pt-1 text-[11px] text-[#1C1917]">
                  <strong>Regimen:</strong> {activePreset.quickDosage}
                </div>
              </div>

            </div>

            {/* Prescriber Actions */}
            <div className="mt-6 pt-4 border-t border-[#DFD3BE] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-left">
                <span className="text-[10px] text-[#78716C] uppercase block">Prescription Total:</span>
                <span className="text-xl font-extrabold font-mono text-[#1C1917] tabular-nums">
                  ₹{totalPrescriptionPrice}
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    onCustomizePrescription(matchedChai);
                    onClose();
                  }}
                  className="px-3.5 py-2.5 bg-white hover:bg-stone-100 text-[#1C1917] border border-[#DDD3BF] rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  Modify Brew
                </button>

                <button
                  type="button"
                  onClick={handle1ClickPrescribe}
                  className="flex-1 sm:flex-none px-5 py-2.5 bg-[#2D5A27] hover:bg-[#23481F] text-white rounded-lg text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap active:scale-98"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Dispense to Rx Order</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
