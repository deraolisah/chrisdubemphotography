import { ArrowRight } from 'lucide-react';

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

        <button className='uppercase bg-blue-800 hover:bg-linear-to-tr from-gray-500/50 via-gray-200/10 to-gray-200/30 py-3 px-8 text-xs font-medium flex items-center gap-1 border border-gray-600 cursor-pointer text-white rounded-full hover:opacity-90 transition-all duration-300 group'> 
          <span> Book An Appointment </span>
          <ArrowRight size={12} className='group-hover:translate-x-3 transition duration-300' />
        </button>
      </div>


      <div className='container mt-10 md:mt-14'>        
      </div>
    </section>
  )
}

export default Hero;