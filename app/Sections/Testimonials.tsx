'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../Sections/Navbar';

type Testimonial = {
  id: number;
  name: string;
  role: string;
  avatarUrl: string;
  comment: string;
  type: 'particulier' | 'entreprise';
};

const testimonials: Testimonial[] = [
  {
    id: 0,
    name: 'Astride S.',
    role: 'Fondatrice, ePacific',
    avatarUrl: '/images/testimonials/Astride.png',
    comment: 'Nos clients apprécient l’expérience fluide et l’impact positif de chaque commande !',
    type: 'entreprise',
  },
  {
    id: 1,
    name: 'Léa T.',
    role: 'Cliente fidèle',
    avatarUrl: '/images/testimonials/Lea.png',
    comment: 'Les pizzas sont délicieuses et l’accueil toujours chaleureux. Une vraie pépite locale !',
    type: 'particulier',
  },
  {
    id: 2,
    name: 'Marc D.',
    role: 'Partenaire local',
    avatarUrl: '/images/testimonials/Marc.png',
    comment: 'Une collaboration conviviale et professionnelle. L’équipe est engagée et passionnée.',
    type: 'entreprise',
  },
];

const typeColors = {
  particulier: '#b02e2e',
  entreprise: '#d4af37',
};

const typeLabels = {
  particulier: '👤 Particulier',
  entreprise: '🏢 Entreprise',
};

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  const accentColor = typeColors[testimonial.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative bg-[#1f1f1f] border border-[#2a2a2a] rounded-2xl p-6 shadow-xl w-full max-w-md hover:scale-[1.01] hover:shadow-2xl transition-transform duration-300"
    >
      <div className="absolute top-0 left-0 w-full h-1 rounded-t-xl" style={{ backgroundColor: accentColor }} />

      <div className="flex items-center gap-4 mb-4 mt-2">
        <img
          src={testimonial.avatarUrl}
          alt={testimonial.name}
          className="w-14 h-14 rounded-full border-2 border-neutral-300 object-cover"
        />
        <div>
          <h4 className="text-neutral-100 font-semibold text-lg">{testimonial.name}</h4>
          <p className="text-sm text-neutral-400">{testimonial.role}</p>
        </div>
      </div>

      <p className="text-neutral-200 italic leading-relaxed mb-4">“{testimonial.comment}”</p>

      <span
        className="inline-block text-xs font-medium px-3 py-1 rounded-full"
        style={{
          backgroundColor: accentColor,
          color: '#121212',
        }}
      >
        {typeLabels[testimonial.type]}
      </span>
    </motion.div>
  );
};

const TestimonialsPage: React.FC = () => {
  const [filter, setFilter] = useState<'tous' | 'particulier' | 'entreprise'>('tous');

  const filteredTestimonials =
    filter === 'tous' ? testimonials : testimonials.filter((t) => t.type === filter);

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />

      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-neutral-100 drop-shadow">
            💬 Ce que disent nos clients
          </h1>
          <p className="text-neutral-400 max-w-xl mx-auto">
            Particuliers ou professionnels, nos clients nous font confiance pour la qualité, le service et la passion.
          </p>
        </div>

        <div className="flex justify-center gap-4 flex-wrap mb-10">
          {(['tous', 'particulier', 'entreprise'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 text-sm rounded-full border transition-all duration-200 ${
                filter === type
                  ? 'bg-neutral-100 text-black font-semibold'
                  : 'text-neutral-300 border-neutral-600 hover:bg-neutral-800'
              }`}
            >
              {type === 'tous'
                ? 'Tous'
                : type === 'particulier'
                ? 'Particuliers'
                : 'Entreprises'}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center"
        >
          <AnimatePresence>
            {filteredTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
};

export default TestimonialsPage;
