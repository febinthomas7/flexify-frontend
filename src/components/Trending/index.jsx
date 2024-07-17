import { useEffect, useState } from "react";
import Slider from "react-slick";

const Trending = () => {
  // const [data, setData] = useState([]);
  const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   const trend = async () => {
  //     const result = await fetch("/api/trending");
  //     const jsonData = await result.json();

  //     setData(jsonData);
  //   };
  //   trend();
  // }, []);
  useEffect(() => {
    const trend = async () => {
      const result = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const jsonData = await result.json();
      setMovies(jsonData.results);
    };
    trend();
  }, []);

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 4,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="trending  bg-black py-4">
      <h2 className="text-2xl font-bold text-white px-4">Trending Movies</h2>

      <div className="  px-8 space-x-4 mt-4">
        <Slider {...settings}>
          {movies?.map((movie, index) => (
            <div
              key={index}
              className="w-80 md:w-48  flex-shrink-0 cursor-pointer"
            >
              <img
                src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
                alt={movie.poster_path}
                className="w-full rounded"
              />
              <h3 className="mt-2 text-white text-sm md:text-base truncate">
                {movie.title}
              </h3>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Trending;
