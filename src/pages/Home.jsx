
// import Hero from '../components/Hero';
// import Gallery from '../components/Gallery';
// // import Caption from '../components/Caption';
// import Services from '../components/Services';

// const Home = () => {
//   return (
//     <>      
//       <Hero />

//       <Gallery />

//       {/* <Caption /> */}

//       <Services />
//     </>
//   )
// }

// export default Home;


import React from 'react';
import Hero from "../components/Hero.jsx";
import ImageGrid from '../components/grid/ImageGrid.jsx';
import { portfolioData } from '../data/portfolioData';
// import './App.css';

const Home = () => {
  return (
    <>
      <Hero />


      <main className="container">
        <ImageGrid items={portfolioData} />
      </main>
    </>
  );
}

export default Home;