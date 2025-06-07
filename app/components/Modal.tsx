// Modal.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { products } from '../data/products';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  productId: number; // Accept product ID to display the correct product
  addToCart: (Products: { name: string; price: number; image: string }) => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, productId, addToCart }) => {
  const product = products.find((p) => p.id === productId.toString()); // Find the product by ID
  if (!product) return null; // If product is not found, return null

  const [selectedDrinks, setSelectedDrinks] = useState<(keyof typeof drinkOptions)[]>([]);
  const [selectedSides, setSelectedSides] = useState<(keyof typeof sideOptions)[]>([]);

  const drinkOptions = {
    "Coca-Cola": 500,
    "Eau": 300,
    "Jus d'orange": 400,
  };

  const sideOptions = {
    "Frites": 600,
    "Salade": 500,
    "Pain à l'ail": 400,
  };

  const handleDrinkChange = (drink: keyof typeof drinkOptions) => {
    setSelectedDrinks((prev) =>
      prev.includes(drink) ? prev.filter((item) => item !== drink) : [...prev, drink]
    );
  };

  const handleSideChange = (side: keyof typeof sideOptions) => {
    setSelectedSides((prev) =>
      prev.includes(side) ? prev.filter((item) => item !== side) : [...prev, side]
    );
  };

  const calculateTotalPrice = () => {
    const drinksTotal = selectedDrinks.reduce((total, drink) => total + (drinkOptions[drink] || 0), 0);
    const sidesTotal = selectedSides.reduce((total, side) => total + (sideOptions[side] || 0), 0);
    return Number(product.price) + drinksTotal + sidesTotal;
  };

  const totalPrice = calculateTotalPrice();

  const handleAddToCart = () => {
    addToCart({ name: product.name, price: Number(product.price), image: product.image });
    onClose(); // Close the modal after adding to the cart
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        className="bg-black rounded-3xl w-full sm:w-11/12 md:w-3/4 lg:w-[48%] xl:w-[38%] p-6 sm:p-8 relative shadow-lg overflow-y-auto max-h-[95vh] transition-all transform duration-300 ease-out"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-orange-500 hover:text-orange-700"
        >
          &times;
        </button>

        <h2 className="text-2xl font-extrabold text-orange-600 text-center mb-6">{title}</h2>

        {/* Product Image and Description */}
        <div className="flex flex-col items-center mb-6">
          <img src={product.image} alt={product.name} className="w-full h-56 object-cover rounded-xl mb-4" />
          <p className="text-white text-center mb-4">{product.description}</p>
          <p className="text-xl font-bold text-orange-500">{product.price} CFP</p>
        </div>

        {/* Boissons */}
        <div className="mb-6">
          <h3 className="text-lg text-white mb-4">Boissons :</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(Object.keys(drinkOptions) as (keyof typeof drinkOptions)[]).map((drink) => {
              const isSelected = selectedDrinks.includes(drink);
              return (
                <div
                  key={drink}
                  onClick={() => handleDrinkChange(drink)}
                  className={`cursor-pointer border rounded-xl p-4 text-center transition duration-200 ${
                    isSelected ? 'bg-orange-500 text-white border-orange-600' : 'bg-black text-white hover:bg-black-500'  
                  }`}
                >
                  <p className="font-semibold">{drink}</p>
                  <p className="text-sm">{drinkOptions[drink]} CFP</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Accompagnements */}
        <div className="mb-6">
          <h3 className="text-lg text-white mb-4">Accompagnements :</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(Object.keys(sideOptions) as (keyof typeof sideOptions)[]).map((side) => {
              const isSelected = selectedSides.includes(side);
              return (
                <div
                  key={side}
                  onClick={() => handleSideChange(side)}
                  className={`cursor-pointer border rounded-xl p-4 text-center transition duration-200 ${
                    isSelected ? 'bg-orange-500 text-white border-orange-600' : 'bg-black text-white hover:bg-black-500'
                  }`}
                >
                  <p className="font-semibold">{side}</p>
                  <p className="text-sm">{sideOptions[side]} CFP</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Total */}
        <div className="text-center mt-8">
          <p className="text-xl text-white font-bold">Total : {totalPrice} CFP</p>
          <button
            onClick={handleAddToCart}
            className="mt-4 bg-orange-500 text-white py-2 px-6 rounded-full shadow-md hover:bg-orange-600 transition-all"
          >
            Ajouter au panier
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
