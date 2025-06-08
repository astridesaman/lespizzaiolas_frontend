'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';
import { featuredProducts } from '../data/FeaturedProducts';

const FeaturedProducts: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<null | typeof featuredProducts[0]>(null);

  return (
    <>
      {/* Ligne de séparation décorative */}
      <hr className="my-20 mx-auto w-1/2 border-t-2 border-orange-500 opacity-50" />

      {/* Éclairage de fond stylisé */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-400/20 via-transparent to-transparent blur-2xl pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <h2 className="text-5xl font-extrabold text-center bg-gradient-to-r from-orange-400 via-yellow-500 to-red-500 text-transparent bg-clip-text mb-16 drop-shadow-lg">
          Les Pizzas du moment
        </h2>

        {/* Grille des produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredProducts.map((pizza, index) => (
            <motion.div
              key={pizza.id}
              className="rounded-2xl backdrop-blur-xl bg-white/10 ring-1 ring-white/10 shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:-rotate-1"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Image
                src={pizza.image}
                alt={`Image de la pizza ${pizza.name}`}
                width={400}
                height={300}
                className="w-full h-60 object-cover rounded-t-2xl"
                priority
              />
              <div className="p-6 flex flex-col justify-between h-full">
                <h3 className="text-2xl font-bold text-orange-400 mb-2">{pizza.name}</h3>
                <p className="text-gray-300 mb-4">{pizza.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-semibold text-white">{pizza.price} CFP</span>
                  <button
                    onClick={() => setSelectedProduct(pizza)}
                    className="ml-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-full transition duration-300"
                    aria-label={`Ajouter ${pizza.name} au panier`}
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA vers tous les produits */}
        <div className="text-center mt-16">
          <a
            href="/products"
            className="inline-block bg-white text-black font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 hover:scale-105"
          >
            Voir tous les produits
          </a>
        </div>

        <hr className="my-20 mx-auto w-1/2 border-t-2 border-orange-500 opacity-50" />
      </div>
    </>
  );
};

export default FeaturedProducts;
