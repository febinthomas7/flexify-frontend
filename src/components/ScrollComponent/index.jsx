import React from "react";
import { Link } from "react-router-dom";

const ScrollComponent = ({ data, heading, type }) => {
  console.log(data[0]?.media_type, heading);
  return (
    <section className="trending  bg-black py-4">
      <h2 className="text-2xl font-bold text-white px-8">{heading}</h2>

      <div className="flex gap-2 overflow-auto px-8 space-x-4 mt-4 hide">
        {data?.map((movie, index) => (
          <div key={index}>
            <Link to={`/${type}/${movie.id}`}>
              <div className="w-40 md:w-48  flex-shrink-0 cursor-pointer ">
                <img
                  src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
                  alt={movie.poster_path}
                  className="w-full rounded"
                  loading="lazy"
                />
                <h3 className="mt-2 text-white text-sm md:text-base truncate">
                  {movie.title || movie.name}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScrollComponent;
