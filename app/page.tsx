'use client';

import React from 'react';
import Navbar from './Sections/Navbar';
import Hero from './Sections/Hero';
import Contact from './Sections/Contact';
import Footer from './Sections/Footer';
import FeaturedProducts from './components/FeaturedProducts';
import Values from './Sections/Values';
import FoodTruckMap from './Sections/FoodTruckMap';

const App: React.FC = () => {
  return (
    <main className="max-w-7xl mx-auto relative">
      <Navbar />
      <Hero />
      <FeaturedProducts/>
      <Values/>
      <Contact/>
      <FoodTruckMap/>
      <Footer/>
    </main>
  );
};

export default App;
