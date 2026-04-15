import React from 'react';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gray-900 text-white px-6">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Designing the Future
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          UX Designer at Arlo, crafting seamless digital experiences.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition">
          View My Work
        </button>
      </div>
    </section>
  );
};

export default Hero;