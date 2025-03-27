import React from "react";
import { motion } from "framer-motion";

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center text-center text-white">
      {/* Overlay sombre pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      {/* Contenu principal avec animations */}
      <motion.div
        className="relative z-10 flex flex-col items-center px-6 sm:px-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-3xl sm:text-5xl font-bold drop-shadow-lg">
          L'authenticité de nos pizzas cuites au feu de bois&nbsp;
        </h1>
        <p className="text-lg sm:text-xl mt-4 max-w-lg">
          Découvrez nos pizzas artisanales préparées avec passion et cuites au feu de bois pour un goût inégalé. <span role="img" aria-label="pizza">🍕</span>
          <span role="img" aria-label="feu">🔥</span>
        </p>

        {/* Bouton d'action amélioré */}
        <a
          href="/menu.pdf"
          download
          className="mt-6 bg-orange-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300 hover:bg-orange-700 focus:ring-4 focus:ring-orange-400"
          aria-label="Télécharger notre menu au format PDF"
        >
          Commandez maintenant 
        </a>
      </motion.div>

      {/* Image de fond */}
      <img
        src="DSC_1943.jpeg"
        alt="Four à bois"
        className="absolute inset-0 w-full h-full object-cover z-[-1] bg-fixed"
        loading="lazy"
        aria-hidden="true"
      />
    </section>
  );
};

export default Hero;
