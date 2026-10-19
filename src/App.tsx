/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { CustomizerModal } from './components/CustomizerModal';
import { SymptomDoctorModal } from './components/SymptomDoctorModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { HeritageSection } from './components/HeritageSection';
import { Footer } from './components/Footer';
import { ChaiItem, CartItem, PlacedOrder } from './types';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('pcw_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [fulfillmentType, setFulfillmentType] = useState<'takeaway' | 'table'>('takeaway');
  const [tableNumber, setTableNumber] = useState<string>('4');
  const [pickupETA, setPickupETA] = useState<string>('5 mins');

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDoctorOpen, setIsDoctorOpen] = useState(false);
  const [customizingChai, setCustomizingChai] = useState<ChaiItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('pcw_cart', JSON.stringify(cart));
    } catch {
      // Ignore localStorage quotas
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleQuickAdd = (chai: ChaiItem) => {
    const existingIndex = cart.findIndex(
      (c) =>
        c.chai.id === chai.id &&
        c.servingStyle === 'kulhad' &&
        c.sweetener === 'jaggery' &&
        c.milk === 'desi_cow' &&
        c.boosters.length === 0
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      updated[existingIndex].itemTotal = updated[existingIndex].quantity * chai.price;
      setCart(updated);
    } else {
      const newItem: CartItem = {
        cartId: `quick-${chai.id}-${Date.now()}`,
        chai,
        servingStyle: 'kulhad',
        sweetener: 'jaggery',
        milk: 'desi_cow',
        spiceIntensity: 'regular',
        boosters: [],
        quantity: 1,
        itemTotal: chai.price,
      };
      setCart((prev) => [...prev, newItem]);
    }

    showToast(`Added ${chai.name} in Clay Kulhad`);
  };

  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
    showToast(`Dispensed ${item.chai.name} (₹${item.itemTotal})`);
  };

  const handleUpdateQuantity = (cartId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.cartId === cartId) {
          const unit = item.itemTotal / item.quantity;
          return {
            ...item,
            quantity: newQty,
            itemTotal: Math.round(unit * newQty),
          };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderCompleted = (order: PlacedOrder) => {
    showToast(`Order #${order.id} confirmed! Fresh brew simmering.`);
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EF] text-[#1C1917]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1C1917] text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl border border-stone-700 flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-[#E58E26]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenDoctor={() => setIsDoctorOpen(true)}
        fulfillmentType={fulfillmentType}
        onChangeFulfillment={setFulfillmentType}
        tableNumber={tableNumber}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onOpenDoctor={() => setIsDoctorOpen(true)}
          fulfillmentType={fulfillmentType}
          onChangeFulfillment={setFulfillmentType}
          tableNumber={tableNumber}
          setTableNumber={setTableNumber}
        />

        <MenuSection
          onSelectChaiToCustomize={(chai) => setCustomizingChai(chai)}
          onQuickAdd={handleQuickAdd}
        />

        <HeritageSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Customizer Modal */}
      <CustomizerModal
        chai={customizingChai}
        onClose={() => setCustomizingChai(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Symptom Chai Doctor Prescriber Modal */}
      <SymptomDoctorModal
        isOpen={isDoctorOpen}
        onClose={() => setIsDoctorOpen(false)}
        onAddPrescriptionToCart={handleAddToCart}
        onCustomizePrescription={(chai) => setCustomizingChai(chai)}
      />

      {/* Slide-out Order / Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
        fulfillmentType={fulfillmentType}
        onChangeFulfillment={setFulfillmentType}
        tableNumber={tableNumber}
        setTableNumber={setTableNumber}
        pickupETA={pickupETA}
        setPickupETA={setPickupETA}
      />

      {/* Checkout & Brewing Tracker Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        fulfillmentType={fulfillmentType}
        tableNumber={tableNumber}
        pickupETA={pickupETA}
        onOrderCompleted={handleOrderCompleted}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
