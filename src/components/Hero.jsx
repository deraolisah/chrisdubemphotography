import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className='pt-14'>
      <div className='container mx-auto px-4 flex flex-col items-center justify-center flex-wrap gap-2 md:gap-4'>
        {/* <h1 className='text-2xl sm:text-4xl md:text-5xl lg:text-[64px] text-center font-medium uppercase leading-none tracking-tight'> 
          The <span className='text-blue-500'>Personal</span> Branding
          <br/>
          Photographer
        </h1> */}

        <h1 className='text-2xl sm:text-4xl md:text-5xl lg:text-[60px] text-center font-semibold md:font-medium uppercase leading-none tracking-tight mb-2'> 
          The Personal Branding
          <br/>
          Photographer
        </h1>
        <p className='hidden md:flex text-center text-sm md:text-base'> I capture authentic photography that positions you as the authority in your field. </p>

        {/* <Link to="/book"> */}
        <button onClick={() => { navigate("/book"); }} className='uppercase bg-primary text-white py-3 px-5.5 text-xs font-medium flex items-center gap-1 cursor-pointer rounded-full hover:opacity-90 transition-all duration-300 group'> 
          <span>Book An Appointment</span>
          <ArrowRight size={12} className='group-hover:translate-x-1.5 transition-all duration-300' />
        </button>
        {/* </Link> */}
      </div>

{/* 
      <div className='py-20 text-center max-w-2xl mx-auto'>
        Authenticity is the cornerstone of powerful personal branding. I specialize in working with professionals who may feel out of their element in front of the camera. By creating a calm and directed experience, I help you drop the nerves and show up as yourself. The result is a library of images that don’t just look like you—they feel like you, elevating your corporate identity with genuine confidence.
      </div> */}



      <div className='container mt-14 mb-3'>     
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