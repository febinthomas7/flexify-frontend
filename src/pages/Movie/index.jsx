import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { LoadingComponentForMovieAndSeries } from "../../components/LoadingComponent";
const Movie = () => {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const data = async () => {
      const result = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const jsonData = await result.json();
      setMovieData(jsonData.results);
      setLoading(false);
    };
    data();
  }, []);
  return (
    <div className="bg-[#141414]  w-full  flex flex-col ">
      <Header />
      <div className="w-full h-full flex-wrap flex text-sm text-white gap-8  justify-center mx-auto  items-start py-20">
        {loading ? (
          <LoadingComponentForMovieAndSeries />
        ) : (
          movieData?.map((movie) => (
            <div to key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <div className="w-40 md:w-48 rounded-md overflow-hidden">
                  <img
                    className="w-full "
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <h2 className="truncate">{movie.title}</h2>
                  <p className="truncate">{movie.overview}</p>
                  {/* <p>{movie.release_date}</p> */}
                </div>
              </Link>
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Movie;
