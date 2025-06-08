'use client';
import React from 'react';
import { useCartStore } from './cartStore';

const CartPreview = () => {
  const items = useCartStore((state) => state.items);

  if (items.length === 0) return <p className="text-sm text-gray-400">Panier vide</p>;

  return (
    <div className="space-y-2 text-sm text-white">
      {items.slice(0, 3).map((item) => (
        <div key={item.id} className="flex justify-between items-center">
          <span>{item.name}</span>
          <span className="text-orange-400 font-semibold">{item.quantity}x</span>
        </div>
      ))}
      {items.length > 3 && (
        <p className="text-xs text-gray-400">+ {items.length - 3} autres</p>
      )}
    </div>
  );
};

export default CartPreview;
