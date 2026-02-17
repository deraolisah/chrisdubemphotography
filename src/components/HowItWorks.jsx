const HowItWorks = () => {
  const steps = [
    {
      title: "Discovery & Planning",
      text: "We start with a short consultation to understand your brand, goals, audience, and how you want to be perceived."
    },
    {
      title: "Session Preparation",
      text: "You receive guidance on outfits, locations, poses, and mood so you arrive confident and fully prepared."
    },
    {
      title: "Guided Photoshoot",
      text: "During the session, I direct you every step of the way so you feel relaxed — no modeling experience needed."
    },
    {
      title: "Selection & Delivery",
      text: "You select your favorite images and receive professionally edited photos ready for web, press, and marketing."
    }
  ];

  return (
    <section className="pt-16 md:pt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 uppercase">
          How It Works
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {steps.map((step, i) => (
            <div key={i} className="border border-gray-700 p-6 rounded-sm">
              <div className="text-sm text-gray-400 mb-2">
                Step {i + 1}
              </div>
              <h3 className="font-medium text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-gray-300">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;