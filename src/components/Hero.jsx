import { ArrowRight } from 'lucide-react';
// import heroImg from "../assets/hero-img.png";

const Hero = () => {
  return (
    <section className='pt-10 md:pt-14'>
      <div className='container mx-auto px-4 flex flex-col items-center justify-center flex-wrap gap-2'>
        {/* <h1 className='text-2xl sm:text-4xl md:text-5xl lg:text-[64px] text-center font-medium uppercase leading-none tracking-tight'> 
          The <span className='text-blue-500'>Personal</span> Branding
          <br/>
          Photographer
        </h1> */}

        <h1 className='text-2xl sm:text-4xl md:text-5xl lg:text-[64px] text-center font-medium uppercase leading-none tracking-tight mb-2'> 
          The Personal Branding
          <br/>
          Photographer
        </h1>

        {/* <hr className='my-4 bg-gray-400 w-full flex' />
        <h1 className='text-2xl sm:text-4xl md:text-5xl lg:text-[64px] text-center font-medium uppercase leading-none tracking-tight'> 
          The Photographer for
          <br/>
          <span className='text-blue-800'>Corporate</span> Branding
        </h1>
        <hr className='my-4 bg-gray-400 w-full flex' />
        <h1 className='text-2xl sm:text-4xl md:text-5xl lg:text-[64px] text-center font-medium uppercase leading-none tracking-tight'> 
          The Photographer for
          <br/>
          <span className='text-blue-800'>Personal</span> Branding
        </h1> */}

        <button className='uppercase bg-blue-800 hover:bg-linear-to-tr from-gray-500/50 via-gray-200/10 to-gray-200/30 py-3 px-8 text-xs font-medium flex items-center gap-1 border border-gray-600 cursor-pointer text-white rounded-full hover:opacity-90 transition-all duration-300 group'> 
          <span> Book An Appointment </span>
          <ArrowRight size={12} className='group-hover:translate-x-3 transition duration-300' />
        </button>

        {/* <div className='w-fit uppercase text-sm leading-6  whitespace-nowrap'>
          <p> Executive Headshots </p>
          <p> Corporate & Personal <br/> Branding </p>
          <p> Family photography </p>

          <button className='uppercase bg-linear-to-r from-black/50 via-black/10 to-black/30 p-2 text-xs font-medium flex items-center gap-1 mt-8 border-b cursor-pointer'> 
            Book An Appointment 
            <ArrowRight size={12} />
          </button>
        </div> */}
      </div>


      <div className='container mt-10 md:mt-14'>
        

        {/* <div className='bg-gray-400 w-full h-48 md:h-80 lg:h-111 object-center object-cover mt-2 border-0 outline-0' /> */}

        {/* <img src={heroImg} alt='' className='w-full h-48 md:h-80 lg:h-111 object-cover object-center' /> */}
      </div>
    </section>
  )
}

export default Hero;