import React, { useState } from 'react';

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
    image: '/img/Leonardo_Phoenix_09_A_mouthwatering_goldenbrown_Neapolitanstyl_0.jpg',
    category: 'classique',
  },
  {
    id: '2',
    name: 'La Pancetta',
    description: 'Pizza gourmande avec pancetta, fromage fondu et roquette.',
    price: 1800,
    image: '/img/Leonardo_Phoenix_09_A_rustic_goldenbrown_pizza_adorned_with_cr_3.jpg',
    category: 'classique',
  },
  {
    id: '3',
    name: 'La Broussarde',
    description: 'Pizza savoureuse avec viande de cerf, fromage et légumes frais.',
    price: 2450,
    image: '/img/Leonardo_Phoenix_09_A_rustic_candlelit_dinner_scene_featuring_1.jpg',
    category: 'signature',
  },
  {
    id: '4',
    name: 'La Venezia',
    description: 'Pizza aux fruits de mer, mozzarella et sauce tomate maison.',
    price: 2450,
    image: '/img/Leonardo_Phoenix_09_A_rustic_woodfired_ovenbaked_pizza_aux_fru_0.jpg',
    category: 'signature',
  },
  {
    id: '5',
    name: 'Pizza au Nutella',
    description: 'Pizza sucrée avec Nutella et fruits frais.',
    price: 1900,
    image: '/img/Leonardo_Phoenix_09_A_vibrant_and_inviting_still_life_image_of_0.jpg',
    category: 'sucree',
  },
  {
    id: '6',
    name: 'Pizza aux Fruits Rouges',
    description: 'Pizza sucrée avec fruits rouges et crème chantilly.',
    price: 2100,
    image: '/img/Leonardo_Phoenix_09_A_vibrant_and_enticing_still_life_of_a_ric_3.jpg',
    category: 'sucree',
  },
];

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'classique' | 'signature' | 'sucree'>('classique');

  const filteredProducts = allProducts.filter((product) => product.category === selectedCategory);

  return (
    <section id="carte" className="py-12">
      {/* Sélection des catégories */}
      <div className="flex justify-center gap-6 mb-10">
        {['classique', 'signature', 'sucree'].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category as 'classique' | 'signature' | 'sucree')}
            className={`py-2 px-6 rounded-full text-lg font-semibold ${
              selectedCategory === category
                ? 'bg-orange-500 text-white shadow-lg'
                : 'text-gray-300'
            } transition-transform duration-300 transform hover:scale-105`}
            aria-label={`Afficher les pizzas ${category}`}
          >
            {category === 'classique' && 'Classiques'}
            {category === 'signature' && 'Signatures'}
            {category === 'sucree' && 'Sucrées'}
          </button>
        ))}
      </div>

      {/* Grille des produits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="product-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover rounded-t-2xl"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-orange-400 mb-3">{product.name}</h3>
              <p className="text-gray-400 mb-4">{product.description}</p>
              <p className="text-xl text-white font-bold mb-4">{product.price} CFP</p>
              <a
                href="#order"
                className="inline-block bg-orange-500 text-white py-3 px-5 rounded-lg shadow-md hover:bg-orange-600 transition-colors duration-300"
              >
                Commander
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
