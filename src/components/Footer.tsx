import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1C1917] text-[#FAF6EF] border-t border-stone-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#C85A32] flex items-center justify-center font-bold text-white text-base">
                वै
              </div>
              <span className="text-xl font-bold font-display tracking-tight text-white">
                PHARMACY CHAIWALE
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              The herbal street chai dispensary. Prescribing whole-spice Ayurvedic kadha and fresh kulhad brews for daily vitality, respiratory clarity, and restful calm.
            </p>
            <div className="text-[11px] font-mono text-[#E58E26]">
              FSSAI LIC NO. 10024011009841 · AYUSH HERBAL COMPLIANT
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3 space-y-2 text-xs">
            <span className="font-bold text-white uppercase tracking-wider block mb-2">
              Dispensary Links
            </span>
            <ul className="space-y-1.5 text-stone-400">
              <li>
                <a href="#rx-menu" className="hover:text-white transition-colors">
                  Daily Rx Formulations
                </a>
              </li>
              <li>
                <a href="#heritage" className="hover:text-white transition-colors">
                  Spice Sourcing & Heritage
                </a>
              </li>
              <li>
                <a href="#dispensaries" className="hover:text-white transition-colors">
                  Store Hours & Locations
                </a>
              </li>
            </ul>
          </div>

          {/* Ayurvedic Disclaimer */}
          <div className="md:col-span-4 space-y-2 text-[11px] text-stone-400 bg-stone-900/60 p-4 rounded-xl border border-stone-800">
            <span className="font-bold text-stone-300 uppercase tracking-wide block">
              Ayurvedic Wellness Notice
            </span>
            <p className="leading-relaxed">
              Our botanical chai decoctions are traditional herbal dietary preparations rooted in centuries of Indian culinary Ayurveda. They are crafted for natural bodily balance and are not intended to diagnose, cure, or replace prescribed clinical medications.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>© {new Date().getFullYear()} Pharmacy Chaiwale (दवाखाना चायवाले). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-stone-400">Crafted with Pure Spices & Earthen Clay</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
