import React from "react";
import { motion } from "framer-motion";

const History = () => {
  return (
    <section className="relative bg-[url('/images/wood-texture.jpg')] bg-cover bg-center bg-fixed text-white py-16 px-6 md:px-12 lg:px-24">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Overlay pour lisibilité */}

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-orange-500 mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Notre Histoire
        </motion.h2>

        <motion.p 
          className="text-lg leading-relaxed text-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Tout a commencé autour d’un feu crépitant, avec une envie commune de partager bien plus qu’une simple pizza : <strong className="text-orange-400">une expérience authentique</strong>.
          <br /><br />
          <strong className="text-orange-500">Les Pizzaiolas</strong> est née d’une opportunité unique : un four à bois ambulant, une passion pour les saveurs italiennes et l’envie d’apporter chaleur et convivialité aux gourmands de Nouvelle-Calédonie.
        </motion.p>

        <motion.p 
          className="text-lg leading-relaxed text-gray-200 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Installés au <strong className="text-orange-400">food-court du marché de Moselle</strong>, nous avons transformé chaque pizza en une invitation au voyage, mêlant tradition et innovation, avec des ingrédients frais et soigneusement sélectionnés.
        </motion.p>

        <motion.p 
          className="text-lg leading-relaxed text-gray-200 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          Aujourd’hui, nous continuons à façonner notre aventure avec créativité et engagement, en proposant des recettes inspirées du terroir et en adoptant des pratiques responsables comme nos <strong className="text-orange-400">emballages consignés</strong>. 
          <br /><br />
          <em>Parce qu’une bonne pizza, c’est bien plus qu’un repas… c’est un moment à partager.</em> 🍕❤️
        </motion.p>
      </div>
    </section>
  );
};

export default History;
