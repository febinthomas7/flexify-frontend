import React from "react";

const MovieInfo = () => {
  return (
    <section className="movie-details bg-gray-900 text-white p-4 md:p-8">
      <div className="container mx-auto flex flex-col md:flex-row">
        <img
          src="/poster.webp"
          alt="Movie Poster"
          className="w-full md:w-64 h-auto rounded-md"
        />
        <div className="mt-4 md:mt-0 md:ml-8">
          <h1 className="text-2xl md:text-4xl font-bold">Movie Title</h1>
          <p className="mt-2">A brief description of the movie.</p>
          <div className="mt-4">
            <span className="text-yellow-400">⭐ 8.5/10</span>
            <span className="ml-4">Genre: Action, Adventure</span>
          </div>
          <button className="bg-red-600 py-2 px-4 rounded mt-4">
            Watch Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default MovieInfo;
