import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import MoreInfoComponent from "../MoreInfoComponent";
import Genres from "../../Genre.json";
import { useLocation, useNavigate } from "react-router-dom";
const Hero = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["ScrollSeries"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_BASE_URL}/api/topratedmovies`).then((res) =>
        res.json()
      ),
  });

  const [moreInfoData, setMoreInfoData] = useState();
  const [moreInfo, setMoreInfo] = useState(false);
  const navigation = useNavigate();
  const location = useLocation();

  const hero = (index) => {
    navigation(`/#${index}`);
  };

  const MoreInfo = (e, movie) => {
    e.stopPropagation();
    setMoreInfo(true);
    document.body.classList.add("scroll");
    setMoreInfoData(movie);

    document.getElementById("backdrop")?.scrollIntoView(0);
  };

  const closeinfo = (e) => {
    e.stopPropagation();
    setMoreInfo(false);
    document.body.classList.remove("scroll");
  };
  useEffect(() => {
    navigation(`/`);
  }, []);

  return (
    <section className="w-[100%] sm:h-svh relative   ">
      {moreInfo && (
        <MoreInfoComponent
          closeinfo={closeinfo}
          type={"movie"}
          mode={"movie"}
          moreInfoData={moreInfoData}
          MoreInfo={MoreInfo}
        />
      )}
      <div
        className={` w-[100%] overflow-auto scroll-smooth flex h-full snap-x hide`}
      >
        {data
          ?.filter((e, index) => index < 4)
          ?.map((e, index) => {
            return (
              <img
                key={index}
                id={index}
                className={`w-full h-full flex-shrink-0 flex-grow-0 object-cover  snap-center`}
                src={`https://image.tmdb.org/t/p/w500/${e?.backdrop_path}`}
                alt={index}
              />
            );
          })}
      </div>
      <div className="absolute w-full h-[30px] flex  justify-center gap-4 items-center bg-black bottom-0 right-0">
        {data
          ?.filter((e, index) => index < 4)
          ?.map((e, index) => {
            return (
              <div
                key={e.id}
                className={`flex items-center justify-center w-[10px] h-[10px] ${
                  location.hash == `#${index}` ||
                  (location.hash == "" && index == 0)
                    ? "bg-red-700"
                    : "bg-gray-600"
                }    rounded-full cursor-pointer`}
              >
                <a className="w-[10px] h-[10px]" href={`#${index}`}></a>
              </div>
            );
          })}
      </div>
      <div className="absolute bottom-6 w-full h-full px-6 sm:pl-6 text-white bg-gradient-to-b from-[#1c1c1c4a] to-black">
        {data
          ?.filter((e, index) => index < 4)
          .map((movie, index) => {
            return (
              <div
                key={movie?.id}
                className={`${
                  location.hash == `#${index}` ||
                  (location.hash == "" && index == 0)
                    ? null
                    : "hidden"
                } flex flex-col gap-1 sm:gap-3 px-6 sm:pl-6 left-0 absolute bottom-0`}
              >
                <h1 className="text-[20px] sm:text-[40px]  font-extrabold">
                  {movie?.title}
                </h1>
                <p className="w-[300px] sm:w-full max-[420px]:truncate text-[12px] sm:text-[16px]">
                  {movie?.overview}
                </p>
                <div className="text-white  w-full flex flex-wrap gap-2">
                  {movie?.genre_ids?.map((e, index) => {
                    const genreName =
                      Genres.find((g) => g.id === e)?.name || "";
                    return (
                      <h1
                        key={index}
                        className="before:content-['.'] text-[10px] drop-shadow-lg hover:text-[#c0c0c0]"
                      >
                        {genreName}
                      </h1>
                    );
                  })}
                </div>
                <div
                  type="button"
                  onClick={(e) => MoreInfo(e, movie)}
                  className="text-[10px] p-1 sm:p-2 sm:text-[15px] rounded bg-red-700 w-fit hover:scale-105 text-white cursor-pointer"
                >
                  moreInfo
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default Hero;
