'use client';
import React from 'react';
import { useCartStore } from './cartStore';

const CartIcon: React.FC = () => {
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.getTotal());

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-full shadow-lg">
        Panier ({items.length}) – {total} CFP
      </button>
    </div>
  );    
};

export default CartIcon;
