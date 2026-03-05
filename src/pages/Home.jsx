import React from 'react';
import { portfolioData } from '../data/portfolioData';
import Hero from "../components/Hero.jsx";
import ImageGrid from '../components/grid/ImageGrid.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import Services from "../components/Services.jsx";
import Testimonials from "../components/Testimonials.jsx";

const Home = () => {
  return (
    <>
      {/* <SimpleCursor /> */}
      <Hero />


      <main className="container">
        <ImageGrid items={portfolioData} />
      </main>

      <HowItWorks />

      <Services />

      <div className='py-20 text-center max-w-3xl mx-auto px-4'>
        <q className=''>
          Authenticity is the cornerstone of powerful personal branding. I specialize in working with professionals who may feel out of their element in front of the camera.         
        </q>
      </div> 

      <Testimonials />
    </>
  );
}

export default Home;