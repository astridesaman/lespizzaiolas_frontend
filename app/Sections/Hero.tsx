'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { section } from 'framer-motion/client';

const Hero: React.FC = () => {
  return (
    <section className="relative flex items-center justify-center min-h-screen text-white overflow-hidden">
      {/* Arrière-plan animé avec effet de zoom doux */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 10,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          <Image
            src="/background.jpg"
            alt="Fond de pizza au feu de bois"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      </div>



      {/* Contenu principal avec animation d’entrée */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.h1
          className="text-3xl sm:text-5xl font-bold text-white drop-shadow-xl"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          L'authenticité de nos pizzas cuites au feu de bois
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-white mt-6 max-w-xl drop-shadow-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Retrouvez-nous principalement au marché de Moselle, mais aussi dans d'autres lieux
          <span role="img" aria-label="pizza"> 🍕</span>
          <span role="img" aria-label="feu">🔥</span>
        </motion.p>

        {/* Bouton d'action animé */}
        <motion.a
          href="/menu.pdf"
          download
          className="mt-8 bg-orange-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-orange-700 transition duration-300 focus:ring-4 focus:ring-orange-300"
          aria-label="Télécharger notre menu au format PDF"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
        >
          Télécharger le menu
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
