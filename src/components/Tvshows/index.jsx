import React from "react";

const Tvshows = () => {
  const tvShows = [
    {
      id: 1,
      thumbnail: "/p1.webp",
      title: "TV Show Title 1",
      description: "A brief description of TV show 1.",
    },
    {
      id: 2,
      thumbnail: "/p2.webp",
      title: "TV Show Title 2",
      description: "A brief description of TV show 2.",
    },
    // Add more TV shows here
  ];
  return (
    <section className="tvshows bg-gray-900 text-white p-4 md:p-8">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">TV Shows</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {tvShows.map((show) => (
            <div key={show.id} className="bg-gray-800 p-4 rounded-lg">
              <img
                src={show.thumbnail}
                alt={show.title}
                className="w-full rounded"
              />
              <h3 className="mt-2 text-lg font-semibold">{show.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{show.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tvshows;
