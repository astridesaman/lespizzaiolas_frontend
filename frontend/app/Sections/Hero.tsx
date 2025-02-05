import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center text-center text-white">
      {/* Overlay sombre pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col items-center px-4">
        <h1 className="text-3xl sm:text-5xl font-bold drop-shadow-lg animate-fadeIn">
          L'authenticité de nos pizzas cuites au feu de bois&nbsp;
        </h1>
        <p className="text-lg sm:text-xl mt-4 max-w-2xl">
          Découvrez nos pizzas artisanales préparées avec passion et cuites au feu de bois pour un goût inégalé. <span role="img" aria-label="pizza">🍕</span>
          <span role="img" aria-label="feu">🔥</span>
        </p>
        
        {/* Bouton d'action */}
        <a href="#menu" className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300">
          Commander maintenant
        </a>
      </div>

      {/* Image de fond */}
      <img
        src="DSC_1943.jpeg"
        alt="Four à bois"
        className="absolute inset-0 w-full h-full object-cover z-[-1] bg-fixed"
/>

    </section>
  );
};

export default Hero;
