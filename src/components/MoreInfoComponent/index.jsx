import { BsPlusCircle } from "react-icons/bs";
import { FaRegThumbsUp } from "react-icons/fa6";
import { FaRegThumbsDown } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DownloadFilesForMovies from "../DownloadFilesForMovies";
import { LoadingComponentForMovieAndSeries } from "../LoadingComponent";
import axios from "axios";
import Card from "../Card";
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
const MoreInfoComponent = ({
  closeinfo,
  type,
  moreInfoData,
  mode,
  MoreInfo,
}) => {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigate();

  useEffect(() => {
    const options = {
      method: "GET",
      url: `${import.meta.env.BASE_URL}/api/recommendations`,
      params: {
        id: moreInfoData?.id,
        mode: moreInfoData?.media_type,
        mode2: mode,
      },
    };

    axios
      .request(options)
      .then((response) => {
        setMovieData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  return (
    <div
      className="fixed w-full h-screen top-0 z-40 justify-center flex shadow-md shadow-[black] bg-[#000000b3]"
      onClick={closeinfo}
    >
      <div className=" w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%] flex flex-col gap-6  overflow-x-auto bg-[#000000f4] rounded mt-24 relative">
        <RxCrossCircled className="absolute right-4 top-4 text-gray-300 cursor-pointer hover:scale-105 hover:text-white z-30 text-[30px] drop-shadow-lg" />
        <div className="w-full h-[420px] relative ">
          <img
            className="w-full h-full object-cover blur-[2px]"
            id="backdrop"
            src={`https://image.tmdb.org/t/p/w500/${moreInfoData?.backdrop_path}`}
            alt={moreInfoData?.title || moreInfoData?.name}
          />
          <div className="absolute bottom-0 p-4">
            <h1 className=" font-extrabold text-[20px] sm:text-[30px] invert drop-shadow-lg">
              {moreInfoData?.title || moreInfoData?.name}
            </h1>
            <div className="flex justify-between items-center text-[20px] py-3 text-[#c0c0c0]">
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    navigation(
                      `/${moreInfoData?.media_type || type}/${moreInfoData?.id}`
                    )
                  }
                  type="button"
                  className="text-[15px] px-5 py-1 font-bold text-black rounded bg-white hover:bg-slate-100 drop-shadow-lg"
                >
                  Play
                </button>
                <BsPlusCircle
                  className="hover:scale-105 hover:text-white drop-shadow-lg"
                  title="add"
                />
                <FaRegThumbsUp
                  className="hover:scale-105 hover:text-white drop-shadow-lg"
                  title="like"
                />
                <FaRegThumbsDown
                  className="hover:scale-105 hover:text-white drop-shadow-lg"
                  title="dislike"
                />
              </div>
            </div>
            <div className="text-white  w-full flex flex-wrap gap-2">
              {moreInfoData?.genre_ids?.map((e, index) => {
                const genreName = Genres.find((g) => g.id === e)?.name || "";
                return (
                  <h1 key={index} className="before:content-['.'] text-[10px]">
                    {genreName}
                  </h1>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-3">
          <p className="text-gray-500 text-justify text-sm">
            {" "}
            <span className="text-white">Description: </span>
            {moreInfoData?.overview}
          </p>
        </div>
        {mode == "movie" && <DownloadFilesForMovies id={moreInfoData?.id} />}

        <div className="text-white capitalize text-center">
          Recommended {moreInfoData?.media_type || type}
        </div>
        <div className="w-full flex flex-wrap justify-center gap-6">
          {loading ? (
            <LoadingComponentForMovieAndSeries />
          ) : (
            movieData?.map((movie, index) => (
              <Card
                key={index}
                movie={movie}
                type={movie.media_typ || type}
                mode={mode}
                MoreInfo={(e) => MoreInfo(e, movie)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MoreInfoComponent;
