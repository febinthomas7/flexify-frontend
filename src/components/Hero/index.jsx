import React from "react";

const Hero = () => {
  return (
    <section
      className=" flex items-center"
      // style={{ backgroundImage: "url(/hero.webp)" }}
    >
      <div
        className="hero bg-cover w-full bg-center h-80 md:h-svh text-white flex items-center"
        style={{ backgroundImage: "url(/hero.webp)" }}
      >
        <div className="container mx-auto px-4 text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-bold">
            Featured Movie Title
          </h1>
          <p className="mt-2 max-w-md mx-auto md:mx-0">
            A brief description of the featured movie.
          </p>
          <div className="mt-4">
            <button className="bg-red-600 py-2 px-4 rounded mr-2">
              Watch Now
            </button>
            <button className="bg-gray-800 py-2 px-4 rounded">More Info</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
