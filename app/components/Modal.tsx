'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { useCartStore } from './cartStore';
import { toast } from 'react-hot-toast';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  productId: number;
  children?: React.ReactNode; 
}


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

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, productId }) => {
  const product = products.find((p) => p.id === productId.toString());
  const addToCart = useCartStore((state) => state.addToCart);

  const [selectedDrinks, setSelectedDrinks] = useState<(keyof typeof drinkOptions)[]>([]);
  const [selectedSides, setSelectedSides] = useState<(keyof typeof sideOptions)[]>([]);

  if (!product || !isOpen) return null;

  const handleDrinkChange = (drink: keyof typeof drinkOptions) => {
    setSelectedDrinks((prev) =>
      prev.includes(drink) ? prev.filter((d) => d !== drink) : [...prev, drink]
    );
  };

  const handleSideChange = (side: keyof typeof sideOptions) => {
    setSelectedSides((prev) =>
      prev.includes(side) ? prev.filter((s) => s !== side) : [...prev, side]
    );
  };

  const calculateTotalPrice = () => {
    const drinksTotal = selectedDrinks.reduce((total, d) => total + drinkOptions[d], 0);
    const sidesTotal = selectedSides.reduce((total, s) => total + sideOptions[s], 0);
    return Number(product.price) + drinksTotal + sidesTotal;
  };

 const [isAdding, setIsAdding] = useState(false);

const handleAddToCart = async () => {
  setIsAdding(true);

  const descriptionExtras = [
    ...selectedDrinks.map((d) => `Boisson: ${d}`),
    ...selectedSides.map((s) => `Accompagnement: ${s}`),
  ].join(', ');

  // Simuler un délai (ex: appel API ou UX fluide)
  await new Promise((res) => setTimeout(res, 800));

  addToCart({
    id: product.id + '-' + Math.random().toString(36).substring(2, 6),
    name: `${product.name} ${descriptionExtras ? '(' + descriptionExtras + ')' : ''}`,
    price: calculateTotalPrice(),
    image: product.image,
    description: product.description,
  });

  toast.success(`🍕 ${product.name} ajouté au panier !`, {
    duration: 3000,
    style: {
      background: '#1a1a1a',
      color: '#fff',
      border: '1px solid orange',
    },
  });

  setIsAdding(false);

  // Fermer le modal juste après le toast ou légèrement après
  setTimeout(onClose, 300);

};

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="bg-black rounded-3xl w-full sm:w-11/12 md:w-3/4 lg:w-[48%] xl:w-[38%] p-6 sm:p-8 relative shadow-lg overflow-y-auto max-h-[95vh]"
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

        <div className="flex flex-col items-center mb-6">
          <img src={product.image} alt={product.name} className="w-full h-56 object-cover rounded-xl mb-4" />
          <p className="text-white text-center mb-4">{product.description}</p>
          <p className="text-xl font-bold text-orange-500">{product.price} CFP</p>
        </div>

        {/* Boissons */}
        <div className="mb-6">
          <h3 className="text-lg text-white mb-4">Boissons :</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.keys(drinkOptions).map((drink) => {
              const selected = selectedDrinks.includes(drink as keyof typeof drinkOptions);
              return (
                <div
                  key={drink}
                  onClick={() => handleDrinkChange(drink as keyof typeof drinkOptions)}
                  className={`cursor-pointer border rounded-xl p-4 text-center transition duration-200 ${
                    selected
                      ? 'bg-orange-500 text-white border-orange-600'
                      : 'bg-black text-white hover:bg-black-500'
                  }`}
                >
                  <p className="font-semibold">{drink}</p>
                  <p className="text-sm">{drinkOptions[drink as keyof typeof drinkOptions]} CFP</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Accompagnements */}
        <div className="mb-6">
          <h3 className="text-lg text-white mb-4">Accompagnements :</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.keys(sideOptions).map((side) => {
              const selected = selectedSides.includes(side as keyof typeof sideOptions);
              return (
                <div
                  key={side}
                  onClick={() => handleSideChange(side as keyof typeof sideOptions)}
                  className={`cursor-pointer border rounded-xl p-4 text-center transition duration-200 ${
                    selected
                      ? 'bg-orange-500 text-white border-orange-600'
                      : 'bg-black text-white hover:bg-black-500'
                  }`}
                >
                  <p className="font-semibold">{side}</p>
                  <p className="text-sm">{sideOptions[side as keyof typeof sideOptions]} CFP</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Total + Bouton */}
        <div className="text-center mt-8">
          <p className="text-xl text-white font-bold">Total : {calculateTotalPrice()} CFP</p>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`mt-4 py-2 px-6 rounded-full shadow-md transition-all text-white ${
              isAdding
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-orange-500 hover:bg-orange-600'
            }`}
          >
            {isAdding ? 'Ajout en cours...' : 'Ajouter au panier'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
