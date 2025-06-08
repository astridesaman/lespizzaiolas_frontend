'use client';

import React, { useState } from 'react';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Modal from '../components/Modal';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;  
  image: string;
  category: 'classique' | 'signature' | 'sucree';  
}

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'classique' | 'signature' | 'sucree'>('classique');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

 const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const res = await fetch(`/api/pizzas?category=${selectedCategory}`);
          const data = await res.json();
          setProducts(data);
        } catch (err) {
          console.error('Erreur de chargement:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }, [selectedCategory]);


  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section id="carte" className="py-20">
      <h1 className="text-white text-4xl font-extrabold text-center mb-8">
        Nos pizzas artisanales cuites au feu de bois !
      </h1>

      <div className="flex justify-center gap-6 mb-10">
        {['classique', 'signature', 'sucree'].map((category) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category as 'classique' | 'signature' | 'sucree')}
            className={`py-2 px-6 rounded-full text-lg font-semibold ${selectedCategory === category ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-300 hover:text-white'} transition-transform duration-300`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Afficher les pizzas ${category}`}
          >
            {category === 'classique' && 'Classiques'}
            {category === 'signature' && 'Signatures'}
            {category === 'sucree' && 'Sucrées'}
          </motion.button>
        ))}
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="product-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => handleOpenModal(product)}
          >
            <Image
              src={product.image}
              alt={`Image de ${product.name}`}
              width={400}
              height={224}
              className="w-full h-56 object-cover rounded-t-2xl"
            />
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              <h3 className="text-2xl font-bold text-orange-400 mb-3">{product.name}</h3>
              <p className="text-gray-400 mb-4">{product.description}</p>
              <p className="text-xl text-white font-bold mb-4">{product.price} CFP</p>
              <motion.span
                className="inline-block bg-[#ff6700] text-white py-3 px-5 rounded-lg shadow-md hover:bg-orange-600 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Voir détails
              </motion.span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal d'affichage du produit sélectionné */}
      {selectedProduct && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={selectedProduct?.name || 'Produit non sélectionné'}
          productId={Number(selectedProduct?.id)} 

        >
          <div className="flex flex-col items-center">
            {selectedProduct?.image && (
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.name}
                width={400}
                height={224}
                className="rounded-xl mb-4"
              />
            )}
            <p className="text-gray-700 text-center mb-4">{selectedProduct?.description}</p>
            <p className="text-xl font-bold text-orange-500 mb-4">{selectedProduct?.price} CFP</p>
            <motion.a
              href="#order"
              className="bg-orange-500 text-white py-2 px-6 rounded-full shadow-md hover:bg-orange-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ajouter au panier
            </motion.a>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default Products;
