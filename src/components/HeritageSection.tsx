import React from 'react';
import { ShieldCheck, MapPin, Clock, Phone, Sparkles, HeartHandshake } from 'lucide-react';
import { STALL_LOCATIONS } from '../data/chaiData';

export const HeritageSection: React.FC = () => {
  return (
    <section id="heritage" className="py-16 bg-[#F3ECE0] border-t border-[#DFD3BE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Heritage Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#C85A32] uppercase tracking-wider">
              <span>Origin & Philosophy</span>
              <span aria-hidden="true">·</span>
              <span>The Healing Tapri</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] tracking-tight font-display">
              Why We Call Ourselves "Pharmacy Chaiwale"
            </h2>

            <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
              In traditional Indian households, nobody ran to a pharmacy for a minor throat scratch, an upset stomach, or afternoon exhaustion. Grandmothers simply crushed fresh ginger into hot water, plucked four tulsi leaves from the courtyard pot, threw in black peppercorn, and brought it to a roaring boil.
            </p>

            <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
              We formalized this ancestral science at street corner chai stalls. Instead of artificial tea syrups or mystery premixes, every single cup at Pharmacy Chaiwale is decocted from scratch using pharmacopoeia-grade Ayurvedic botanicals.
            </p>

            {/* Sourcing Points */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#DFD3BE]">
              <div>
                <h4 className="font-bold text-sm text-[#1C1917]">Upper Assam CTC</h4>
                <p className="text-xs text-[#78716C] mt-1">Single-estate black tea harvested during the rich second flush.</p>
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#1C1917]">Idukki Cardamom</h4>
                <p className="text-xs text-[#78716C] mt-1">8mm jumbo green pods retaining raw volatile essential oils.</p>
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#1C1917]">Lakadong Turmeric</h4>
                <p className="text-xs text-[#78716C] mt-1">Grown in Meghalaya hills with unmatched 7.8% natural curcumin.</p>
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#1C1917]">Baked Terracotta</h4>
                <p className="text-xs text-[#78716C] mt-1">100% biodegradable earthen clay cups that return to the soil.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#DFD3BE] bg-[#1C1917]">
              <img
                src="/src/assets/images/apothecary_tea_stall_1792404798991.jpg"
                alt="Vintage Indian herbal tea stall and apothecary shop with brass tea kettles and apothecary spice jars"
                className="w-full h-[400px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div>
                  <span className="text-xs font-mono text-[#E58E26]">THE BRASS SAMOVAR TRADITION</span>
                  <p className="text-sm text-white font-semibold mt-1">
                    Authentic decoctions brewed continuously over controlled low flame to preserve delicate botanical terpenes.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Claim-to-Proof Testimonials (Adjacent external proof) */}
        <div className="pt-10 border-t border-[#DFD3BE]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#2D5A27] uppercase tracking-wider">
              Verified Daily Regulars
            </span>
            <h3 className="text-2xl font-extrabold text-[#1C1917] font-display mt-1">
              "No Throat Sprays Needed All Winter"
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  'I sing classical Hindustani vocals and have rehearsals 4 hours a day. The Mulethi Elaichi Vocal Soother in a clay kulhad coats my vocal chords better than any pharmaceutical lozenge.',
                name: 'Ananya Deshmukh',
                role: 'Classical Vocalist & Sitar Player',
                location: 'Indiranagar Dispensary',
              },
              {
                quote:
                  'Our engineering team works late hours. Instead of chugging synthetic energy drinks, we order the Doctor’s Kadak Tapri Masala with Nagori Ashwagandha. Zero caffeine jitters.',
                name: 'Karan Mehra',
                role: 'Lead Architect, FinTech Systems',
                location: 'Connaught Place Stall',
              },
              {
                quote:
                  'The Adrak Tulsi Kadha knocked out my winter head chills within 20 minutes of sipping. The smoky clay flavor of the kulhad makes it taste like pure nostalgia.',
                name: 'Dr. Rajeshwari Nair',
                role: 'Ayurvedic Practitioner (BAMS)',
                location: 'Bandra Reclamation Bar',
              },
            ].map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl border border-[#DFD3BE] shadow-xs flex flex-col justify-between"
              >
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed italic mb-4">
                  "{t.quote}"
                </p>
                <div className="pt-3 border-t border-[#F3ECE0]">
                  <p className="font-bold text-xs text-[#1C1917]">{t.name}</p>
                  <p className="text-[11px] text-[#78716C]">{t.role}</p>
                  <p className="text-[10px] text-[#C85A32] font-mono mt-0.5">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dispensary Stalls & Operating Hours */}
        <div id="dispensaries" className="pt-10 border-t border-[#DFD3BE]">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-[#C85A32] uppercase tracking-wider block mb-1">
                Physical Chai Dispensaries
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1C1917] font-display">
                Drop In For A Steaming Kulhad
              </h3>
            </div>
            <span className="text-xs text-[#78716C]">
              Express Tap & Collect available at all 3 counters
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STALL_LOCATIONS.map((loc) => (
              <div
                key={loc.id}
                className="bg-white p-5 rounded-xl border border-[#DFD3BE] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#2D5A27] font-bold mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#2D5A27]" />
                    <span>OPEN DAILY</span>
                  </div>
                  <h4 className="font-bold text-base text-[#1C1917] font-display">
                    {loc.name}
                  </h4>
                  <p className="text-xs text-[#57534E] mt-2 flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                    <span>{loc.address}</span>
                  </p>
                  <p className="text-xs text-[#57534E] mt-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#78716C] shrink-0" />
                    <span>{loc.hours}</span>
                  </p>
                  <p className="text-xs text-[#57534E] mt-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#78716C] shrink-0" />
                    <span className="font-mono">{loc.phone}</span>
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F3ECE0] flex items-center justify-between text-xs text-[#78716C]">
                  <span>{loc.tablesCount} Wooden Benches</span>
                  <span className="font-mono text-[#C85A32] font-semibold">
                    Avg. Wait: {loc.avgWaitTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
