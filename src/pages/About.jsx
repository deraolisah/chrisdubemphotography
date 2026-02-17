const About = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 uppercase">
            About
          </h2>

          <p className="text-gray-300 mb-4 leading-relaxed">
            I specialize in personal branding and corporate photography for professionals who want to look confident, credible, and approachable. Many of my clients come to me believing they are not photogenic — and that’s completely fine.
          </p>

          <p className="text-gray-300 mb-4 leading-relaxed">
            My sessions are calm, structured, and fully guided. You are never left wondering what to do. I help you with posture, expression, and direction so you can relax and show up naturally.
          </p>

          <p className="text-gray-300 leading-relaxed">
            The goal is simple: create authentic images that reflect who you are and strengthen how your brand is perceived.
          </p>
        </div>

        <div className="border border-gray-700 h-95 rounded-sm flex items-center justify-center text-gray-500">
          Photographer Image Here
        </div>

      </div>
    </section>
  );
};

export default About;