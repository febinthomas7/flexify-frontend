import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import LoadingComponent from "../LoadingComponent";
const ScrollComponent = ({ data, heading, type, loading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hide = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle("scroll");
  };
  return (
    <>
      {isOpen && (
        <div
          className="fixed w-full h-screen top-0 justify-center flex  bg-[#00000050]"
          onClick={hide}
        >
          <div className="w-[80%] flex flex-wrap gap-6 justify-center overflow-x-auto bg-white p-10 mt-10">
            {data?.map((movie, index) => (
              <div key={index}>
                <Link to={`/${type}/${movie.id}`}>
                  <div className="w-40 md:w-48   cursor-pointer ">
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
        </div>
      )}

      <section className=" bg-black py-4 text-white">
        <div className="flex items-baseline  group px-8">
          {loading ? (
            <div className="w-[81px] h-[32px] bg-[#0d1015ed] rounded "></div>
          ) : (
            <div className="flex items-baseline cursor-pointer" onClick={hide}>
              <h2 className="text-2xl  font-bold text-white">{heading}</h2>
              <span className="flex items-center text-[12px] invisible font-semibold  group-hover:visible text-[#b01818]">
                <h1 className="group-hover:translate-x-4 duration-200 ease-in">
                  Explore All
                </h1>

                <IoIosArrowForward className="translate-x-1 group-hover:translate-x-4 duration-75 ease-in text-[14px]" />
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto i px-8 space-x-4 mt-4 hide">
          {loading ? (
            <LoadingComponent />
          ) : (
            data?.map((movie, index) => (
              <div key={index} className="hover:scale-150">
                <Link to={`/${type}/${movie.id}`}>
                  <div className="w-40 md:w-48  cursor-pointer ">
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
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default ScrollComponent;
