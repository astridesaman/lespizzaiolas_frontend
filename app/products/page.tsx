'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Modal from '../components/Modal';
import Navbar from '../Sections/Navbar';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: { name: string };
}

interface CategoryWithProducts {
  id: number;
  name: string;
  pizzas: Product[];
}

const ProductsPage: React.FC = () => {
  const [categories, setCategories] = useState<CategoryWithProducts[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories/');
        const data = await res.json();
        setCategories(data);
        if (data.length > 0) setSelectedCategoryId(data[0].id); // Sélectionne la première par défaut
      } catch (err) {
        console.error('Erreur lors du chargement des catégories avec produits:', err);
      }
    };

    fetchCategories();
  }, []);

  const selectedCategory = categories.find((cat) => cat.id === selectedCategoryId);

  return (
    <>
      <Navbar />
      <section className="pt-32 pb-20 px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white text-center mb-10 drop-shadow-md">
          Nos pizzas artisanales cuites au feu de bois 🍕🔥
        </h1>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategoryId(category.id)}
              className={`py-2 px-6 rounded-full text-lg font-semibold capitalize ${
                selectedCategoryId === category.id
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-orange-400/20'
              } transition-all duration-300`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {!selectedCategory ? (
          <p className="text-center text-gray-400">Chargement...</p>
        ) : selectedCategory.pizzas.length === 0 ? (
          <p className="text-center text-gray-400">Aucune pizza dans cette catégorie.</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {selectedCategory.pizzas.map((product, index) => (
              <motion.div
                key={product.id}
                onClick={() => {
                  setSelectedProduct(product);
                  setIsModalOpen(true);
                }}
                className="cursor-pointer rounded-2xl overflow-hidden bg-white/10 ring-1 ring-white/10 shadow-md hover:shadow-xl transform transition-all duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Image
                  src={product.imageUrl}
                  alt={`Image de la pizza ${product.name}`}
                  width={400}
                  height={224}
                  className="w-full h-56 object-cover rounded-t-2xl"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-orange-400 mb-2">{product.name}</h3>
                  <p className="text-gray-300 mb-3">{product.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-white font-bold text-xl">{product.price} CFP</span>
                    <motion.span
                      className="inline-block bg-orange-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-orange-600 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Voir détails
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {selectedProduct && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => {
              setSelectedProduct(null);
              setIsModalOpen(false);
            }}
            title={selectedProduct.name}
            productId={selectedProduct.id}
          >
            <div className="flex flex-col items-center">
              {selectedProduct.imageUrl && (
                <Image
                  src={selectedProduct.imageUrl}
                  alt={`Image détaillée de ${selectedProduct.name}`}
                  width={400}
                  height={224}
                  className="rounded-xl mb-4 shadow-md"
                />
              )}
              <p className="text-gray-700 text-center mb-3">{selectedProduct.description}</p>
              <p className="text-xl font-bold text-orange-500 mb-6">{selectedProduct.price} CFP</p>
              <motion.button
                onClick={() => console.log('Ajout au panier:', selectedProduct)}
                className="bg-orange-500 text-white py-2 px-6 rounded-full shadow-md hover:bg-orange-600 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ajouter au panier
              </motion.button>
            </div>
          </Modal>
        )}
      </section>
    </>
  );
};

export default ProductsPage;
