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

        <button className='uppercase bg-gray-700 hover:bg-linear-to-tr from-gray-500/50 via-gray-200/10 to-gray-200/30 py-3 px-5.5 text-xs font-medium flex items-center gap-1 border border-gray-600 cursor-pointer text-white rounded-sm hover:opacity-90 transition-all duration-300 group'> 
          <span> Book An Appointment </span>
          <ArrowRight size={12} className='group-hover:translate-x-1.5 transition duration-300' />
        </button>
      </div>


      <div className='container md:mt-14 mt-10 my-3'>     
        <div className='flex items-center justify-between gap-1 text-xs md:text-sm uppercase'>
          <div className='w-full text-start'> 7+ YEARS EXPERIENCE </div>
          <div className='w-full text-center'> 70+ Photos CAPTURED </div>
          <div className='w-full text-end uppercase'> Basel, Switzerland </div>
        </div>   
      </div>
    </section>
  )
}

export default Hero;