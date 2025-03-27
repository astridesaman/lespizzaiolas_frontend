import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'classique' | 'signature' | 'sucree';
}

const allProducts: Product[] = [
  {
    id: '1',
    name: 'La Napoli',
    description: 'Pizza classique avec sauce tomate, mozzarella et anchois.',
    price: 1600,
    image: '/img/napoli.jpg',
    category: 'classique',
  },
  {
    id: '2',
    name: 'La Pancetta',
    description: 'Pizza gourmande avec pancetta, fromage fondu et roquette.',
    price: 1800,
    image: '/img/pancetta.jpg',
    category: 'classique',
  },
  {
    id: '3',
    name: 'La Broussarde',
    description: 'Pizza savoureuse avec viande de cerf, fromage et légumes frais.',
    price: 2450,
    image: '/img/broussarde.jpg',
    category: 'signature',
  },
  {
    id: '4',
    name: 'La Venezia',
    description: 'Pizza aux fruits de mer, mozzarella et sauce tomate maison.',
    price: 4450,
    image: '/img/venezia.jpg',
    category: 'signature',
  },
  {
    id: '5',
    name: 'Pizza au Nutella',
    description: 'Pizza sucrée avec Nutella et fruits frais.',
    price: 1900,
    image: '/img/nutella.jpg',
    category: 'sucree',
  },
  {
    id: '6',
    name: 'Pizza aux Fruits Rouges',
    description: 'Pizza sucrée avec fruits rouges et crème chantilly.',
    price: 2100,
    image: '/img/fruits-rouges.jpg',
    category: 'sucree',
  },
];

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'classique' | 'signature' | 'sucree'>('classique');

  const filteredProducts = allProducts.filter((product) => product.category === selectedCategory);

  return (
    <section id="carte" className="py-12">
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
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            className="product-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Image
              src={product.image}
              alt={`Image de ${product.name}`}
              width={400}  // Ajuste la taille de l'image selon tes besoins
              height={224} // Ajuste la taille de l'image selon tes besoins
              className="w-full h-56 object-cover rounded-t-2xl"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-orange-400 mb-3">{product.name}</h3>
              <p className="text-gray-400 mb-4">{product.description}</p>
              <p className="text-xl text-white font-bold mb-4">{product.price} CFP</p>
              <motion.a
                href="#order"
                className="inline-block bg-orange-500 text-white py-3 px-5 rounded-lg shadow-md hover:bg-orange-600 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ajouter au panier
              </motion.a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Products;
