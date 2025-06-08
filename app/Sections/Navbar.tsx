'use client';

import React, { useState } from 'react';
import { navLinks } from '../constants';
import Image from 'next/image';
import { useCartStore } from '../components/cartStore';
import CartPreview from '../components/CartPreview';

const NavItems: React.FC<{ onClick?: () => void }> = ({ onClick = () => {} }) => {
  const totalQuantity = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const [showPreview, setShowPreview] = useState(false);

  return (
    <ul className="nav-ul flex items-center gap-6">
      {navLinks.map((item) => (
        <li key={item.id} className="nav-li">
          <a
            href={item.href}
            className={`nav-li_a ${item.name === 'Commander' ? 'btn-commander' : ''}`}
            onClick={onClick}
          >
            {item.name}
          </a>
        </li>
      ))}

      <li>
        <div
          className="relative ml-6"
          onMouseEnter={() => setShowPreview(true)}
          onMouseLeave={() => setShowPreview(false)}
        >
          <a href="/cart">
            <Image
              src="/assets/cart.png"
              alt="Panier"
              width={28}
              height={28}
              className="invert"
            />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                {totalQuantity}
              </span>
            )}
          </a>

          {/* Aperçu du panier au survol */}
          {showPreview && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-black border border-gray-700 p-4 rounded-xl shadow-lg z-50">
              <CartPreview />
            </div>
          )}
        </div>
      </li>
    </ul>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          <a
            href="/"
            className="text-neutral-400 font-bold text-xl hover:text-white transition-colors"
          >
            <Image
              alt="Les Pizzaiolas Logo"
              src="/logos/Les_Pizzaiolas_Logo_Branding.png"
              width={70}
              height={70}
            />
          </a>

          <button
            onClick={toggleMenu}
            className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex"
            aria-label="Toggle menu"
          >
            <Image
              src={isOpen ? '/assets/close.svg' : '/assets/menu.svg'}
              alt="toggle"
              width={24}
              height={24}
            />
          </button>

          <nav className="sm:flex hidden">
            <NavItems />
          </nav>
        </div>
      </div>

      <div className={`nav-sidebar ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <nav className="p-5">
          <NavItems onClick={closeMenu} />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
