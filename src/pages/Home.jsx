import React from 'react';
import { portfolioData } from '../data/portfolioData';
import Hero from "../components/Hero.jsx";
import ImageGrid from '../components/grid/ImageGrid.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import Services from "../components/Services.jsx";

const Home = () => {
  return (
    <>
      <Hero />


      <main className="container">
        <ImageGrid items={portfolioData} />
      </main>

      <HowItWorks />

      <Services />
    </>
  );
}

export default Home;