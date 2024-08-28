import { BsPlusCircle } from "react-icons/bs";
import { FaRegThumbsUp } from "react-icons/fa6";
import { FaRegThumbsDown } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DownloadFilesForMovies from "../DownloadFilesForMovies";
import { LoadingComponentForMovieAndSeries } from "../LoadingComponent";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import axios from "axios";
import Card from "../Card";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

import Genres from "../../Genre.json";
import ScrollForCastAndCrew from "../ScrollForCastAndCrew";

const MoreInfoComponent = ({
  closeinfo,
  type,
  moreInfoData,
  mode,
  MoreInfo,
}) => {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seeTrailer, setSeeTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState();

  const navigation = useNavigate();

  const { data, isFetching } = useQuery({
    queryKey: ["cast"],
    queryFn: () =>
      fetch(
        `${import.meta.env.VITE_BASE_URL}/api/credits?id=${
          moreInfoData?.id
        }&mode=${mode || type}`
      ).then((res) => res.json()),
  });

  useEffect(() => {
    const options = {
      method: "GET",
      url: `${import.meta.env.VITE_BASE_URL}/api/recommendations`,
      params: {
        id: moreInfoData?.id,
        mode: moreInfoData?.media_type || moreInfoData?.type,
        mode2: mode || moreInfoData?.mode,
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
  }, [moreInfoData?.id]);
  useEffect(() => {
    const options = {
      method: "GET",
      url: `${import.meta.env.VITE_BASE_URL}/api/trailer`,
      params: {
        id: moreInfoData?.id,
        mode: moreInfoData?.media_type || moreInfoData?.mode,
        mode2: type || moreInfoData?.type || moreInfoData?.media_type,
      },
    };

    axios
      .request(options)
      .then((response) => {
        setTrailerKey(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [moreInfoData?.id]);

  const seeMore = (e) => {
    e.stopPropagation();
    navigation(
      `/${
        moreInfoData?.media_type ||
        type ||
        moreInfoData?.type ||
        moreInfoData?.mode
      }`
    );
    document.body.classList.remove("scroll");
  };
  return (
    <div
      className="fixed w-full h-screen top-0 z-40 justify-center  flex shadow-md shadow-[black] bg-[#000000b3]"
      onClick={closeinfo}
    >
      <Helmet>
        <title>{moreInfoData?.title || moreInfoData?.name}</title>
        <meta name="description" content={moreInfoData?.overview} />
      </Helmet>
      <div
        onClick={(e) => e.stopPropagation()}
        className=" w-[80%] sm:w-[70%] md:w-[60%] lg:w-[50%] flex flex-col gap-6  overflow-x-hidden overflow-y-auto bg-[#000000f4] rounded mt-24 relative"
      >
        <div className="w-full h-[420px] relative ">
          <img
            className="w-full h-full object-cover blur-[2px]"
            id="backdrop"
            onError={(e) => {
              e.target.src = "/fallback_bg.png";
            }}
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
                      `/${
                        moreInfoData?.media_type ||
                        type ||
                        moreInfoData?.type ||
                        moreInfoData?.mode
                      }/${moreInfoData?.id}`
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

          {seeTrailer &&
            trailerKey
              ?.filter((e) => e.type == "Trailer")
              .map((e) => {
                return (
                  <iframe
                    key={e.key}
                    type="text/html"
                    className="w-full h-full object-contain absolute top-0"
                    src={`//www.youtube.com/embed/${e.key}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                );
              })}
        </div>
        <div className="w-full px-3">
          <button
            className="outline outline-1 font-semibold p-2 text-sm rounded gap-2 group text-white outline-red-700 flex justify-center text-center items-center"
            onClick={() => setSeeTrailer(!seeTrailer)}
          >
            Trailer{" "}
            {seeTrailer ? (
              <FaPause className=" group-hover:scale-105" />
            ) : (
              <FaPlay className="group-hover:scale-105" />
            )}
          </button>
        </div>

        <div className="p-3">
          <p className="text-gray-500 text-justify text-sm">
            {" "}
            <span className="text-white">Description: </span>
            {moreInfoData?.overview}
          </p>
        </div>

        {data?.cast.length != 0 && (
          <ScrollForCastAndCrew
            data={data}
            loading={isFetching}
            heading={"cast"}
          />
        )}

        {(mode ||
          type ||
          moreInfoData?.media_type ||
          moreInfoData?.type ||
          moreInfoData?.mode) == "movie" && (
          <DownloadFilesForMovies id={moreInfoData?.id} />
        )}

        <div className="text-white capitalize text-center">
          Similar{" "}
          {moreInfoData?.media_type ||
            type ||
            mode ||
            moreInfoData?.type ||
            moreInfoData?.mode}
        </div>
        <div className="w-full flex flex-wrap justify-center gap-6">
          {loading ? (
            <LoadingComponentForMovieAndSeries />
          ) : (
            movieData?.map((movie, index) => {
              return (
                <Card
                  key={index}
                  movie={movie}
                  type={
                    movie?.media_type ||
                    type ||
                    moreInfoData?.type ||
                    moreInfoData?.mode
                  }
                  mode={mode || moreInfoData?.type || moreInfoData?.mode}
                  MoreInfo={(e) => MoreInfo(e, movie)}
                  // setDeleteWatch={setDeleteWatch}
                  // deleteWatch={deleteWatch}
                />
              );
            })
          )}
        </div>

        <div className="w-full p-4 flex justify-center">
          <div
            onClick={seeMore}
            className="bg-red-700 text-white rounded p-1 cursor-pointer"
          >
            see more
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreInfoComponent;
