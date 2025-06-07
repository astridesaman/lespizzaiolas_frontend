'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';
import { featuredProducts } from '../data/FeaturedProducts';

const FeaturedProducts: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<{
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
  } | null>(null);

  return (
    <>
      {/* Ligne de séparation stylisée */}
      <hr className="my-20 border-t-2 border-orange-500 w-1/2 mx-auto opacity-50" />

      {/* Éclairage visuel de fond */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ff6700]/20 via-transparent to-transparent opacity-30 pointer-events-none z-0 blur-2xl" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <h2 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-500 to-red-500 mb-16 drop-shadow-lg">
          Les Pizzas du moment
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredProducts.map((pizza, index) => (
            <motion.div
              key={pizza.id}
              className="rounded-2xl backdrop-blur-xl bg-white/10 ring-1 ring-white/10 shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-[1.03] hover:-rotate-1"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <Image
                src={pizza.image}
                alt={pizza.name}
                width={400}
                height={300}
                className="w-full h-60 object-cover rounded-t-2xl"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-orange-400 mb-2">{pizza.name}</h3>
                <p className="text-gray-300 mb-4">{pizza.description}</p>
                <p className="text-xl font-semibold text-white mb-4">{pizza.price} CFP</p>
                <button
                  onClick={() => setSelectedProduct(pizza)}
                  className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-full transition duration-300"
                >
                  Ajouter au panier
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Voir tous les produits : une seule fois */}
        <div className="text-center mt-16">
          <a
            href="/products"
            className="inline-block bg-white text-black font-bold py-3 px-6 rounded-full shadow-lg transition duration-300"
          >
            Voir tous les produits
          </a>
        </div>

        {/* Ligne de séparation stylisée */}
        <hr className="my-20 border-t-2 border-orange-500 w-1/2 mx-auto opacity-50" />
      </div>
    </>
  );
};

export default FeaturedProducts;
