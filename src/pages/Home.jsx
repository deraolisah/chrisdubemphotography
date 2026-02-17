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

      <div className='py-20 text-center max-w-3xl mx-auto px-4'>
        Authenticity is the cornerstone of powerful personal branding. I specialize in working with professionals who may feel out of their element in front of the camera. By creating a calm and directed experience, I help you drop the nerves and show up as yourself. The result is a library of images that don’t just look like you—they feel like you, elevating your corporate identity with genuine confidence.
      </div> 
    </>
  );
}

export default Home;