import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { FaRegThumbsUp } from "react-icons/fa6";
import { FaRegThumbsDown } from "react-icons/fa6";
import { TfiArrowCircleDown } from "react-icons/tfi";
import { LoadingComponentForScroll } from "../LoadingComponent";
const ScrollComponent = ({ data, heading, type, loading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hide = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle("scroll");
  };

  const Genres = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },

    {
      id: 10759,
      name: "Action & Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 10762,
      name: "Kids",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10763,
      name: "News",
    },
    {
      id: 10764,
      name: "Reality",
    },
    {
      id: 10765,
      name: "Sci-Fi & Fantasy",
    },
    {
      id: 10766,
      name: "Soap",
    },
    {
      id: 10767,
      name: "Talk",
    },
    {
      id: 10768,
      name: "War & Politics",
    },
    {
      id: 37,
      name: "Western",
    },
  ];
  return (
    <>
      {isOpen && (
        <div
          className="fixed w-full h-screen top-0 z-40 justify-center flex  bg-[#00000050]"
          onClick={hide}
        >
          <div className="w-[80%] flex flex-wrap gap-6 justify-center overflow-x-auto bg-white p-10 mt-10">
            {data?.map((movie, index) => (
              <div key={index}>
                <Link to={`/${type}/${movie.id}`}>
                  <div key={index} className="relative group overflow-hidden">
                    <Link to={`/${type}/${movie.id}`}>
                      <div className="w-40 md:w-48  cursor-pointer group shadow-md shadow-[black] ">
                        <div className="absolute top-0 w-full h-0 duration-150 ease-in group-hover:h-full bg-[#1c1c1c7f] cursor-pointer overflow-hidden rounded">
                          <div className="w-full absolute bottom-0 bg-[#141414] p-3">
                            <h3 className="mt-2 text-white text-sm md:text-base truncate">
                              {movie.title || movie.name}
                            </h3>
                            <div className="flex justify-between items-center text-[20px] py-3 text-[#c0c0c0]">
                              <div className="flex items-center gap-3">
                                <BsPlusCircle
                                  className="hover:scale-105 hover:text-white"
                                  title="add"
                                />
                                <FaRegThumbsUp
                                  className="hover:scale-105 hover:text-white"
                                  title="like"
                                />
                                <FaRegThumbsDown
                                  className="hover:scale-105 hover:text-white"
                                  title="dislike"
                                />
                              </div>

                              <TfiArrowCircleDown
                                className="hover:scale-105 hover:text-white"
                                title="more info"
                              />
                            </div>
                            <div className="text-white  w-full flex flex-wrap gap-2">
                              {movie?.genre_ids?.map((e, index) => {
                                const genreName =
                                  Genres.find((g) => g.id === e)?.name || "";
                                return (
                                  <h1
                                    key={index}
                                    className="before:content-['.'] text-[10px]"
                                  >
                                    {genreName}
                                  </h1>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        <img
                          src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
                          alt={movie.poster_path}
                          className="w-full rounded"
                          loading="lazy"
                        />
                      </div>
                    </Link>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      <section className=" bg-[#141414] py-4 text-white">
        <div className="flex items-baseline  group  px-8">
          {loading ? (
            <div className="w-[81px] h-[32px] bg-[#0d1015ed] rounded "></div>
          ) : (
            <div
              className="flex items-baseline cursor-pointer group/item"
              onClick={hide}
            >
              <h2 className="text-2xl  font-bold text-white group-hover/item:underline decoration-2 duration-150 ease-in underline-offset-2 ">
                {heading}
              </h2>
              <span className="flex items-center text-[12px] invisible font-semibold  group-hover:visible text-[#b01818]">
                <h1 className="group-hover:translate-x-4 duration-200 ease-in">
                  Explore All
                </h1>

                <IoIosArrowForward className="translate-x-1 group-hover:translate-x-4 duration-75 ease-in text-[14px]" />
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto i px-8 space-x-4 mt-4 pb-[15px] hide">
          {loading ? (
            <LoadingComponentForScroll />
          ) : (
            data?.map((movie, index) => (
              <div key={index} className="relative group">
                <Link to={`/${type}/${movie.id}`}>
                  <div className="w-40 md:w-48  cursor-pointer group shadow-md shadow-[black] bg-black">
                    <div className="absolute top-0 w-full h-0 duration-150 ease-in group-hover:h-full bg-[#1c1c1c7f] cursor-pointer overflow-hidden rounded">
                      <div className="w-full absolute bottom-0 bg-[#141414] p-3">
                        <h3 className="mt-2 text-white text-sm md:text-base truncate">
                          {movie.title || movie.name}
                        </h3>
                        <div className="flex justify-between items-center text-[20px] py-3 text-[#c0c0c0]">
                          <div className="flex items-center gap-3">
                            <BsPlusCircle
                              className="hover:scale-105 hover:text-white"
                              title="add"
                            />
                            <FaRegThumbsUp
                              className="hover:scale-105 hover:text-white"
                              title="like"
                            />
                            <FaRegThumbsDown
                              className="hover:scale-105 hover:text-white"
                              title="dislike"
                            />
                          </div>

                          <TfiArrowCircleDown
                            className="hover:scale-105 hover:text-white"
                            title="more info"
                          />
                        </div>
                        <div className="  w-full flex flex-wrap gap-2">
                          {movie?.genre_ids?.map((e, index) => {
                            const genreName =
                              Genres.find((g) => g.id === e)?.name || "";
                            return (
                              <h1
                                key={index}
                                className="before:content-['.'] text-[10px]"
                              >
                                {genreName}
                              </h1>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <img
                      src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
                      alt={movie.poster_path}
                      className="w-full rounded"
                      loading="lazy"
                    />
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default ScrollComponent;
