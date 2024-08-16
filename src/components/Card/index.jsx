import { BsPlusCircle } from "react-icons/bs";
import { FaRegThumbsUp } from "react-icons/fa6";
import { FaRegThumbsDown } from "react-icons/fa6";
import { TfiArrowCircleDown } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import Genres from "../../Genre.json";
import { handleSuccess, handleError } from "../../utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RxCross1 } from "react-icons/rx";
import { MdDone } from "react-icons/md";
import { useState, useEffect } from "react";
const Card = ({
  movie,
  type,
  MoreInfo,
  mode,
  page,
  setDeleteWatch,
  deleteWatch,
}) => {
  const navigation = useNavigate();
  const [list, setList] = useState(false);
  const len = movie?.vote_average;
  const [movieAdded, setMovieAdded] = useState(false);
  const addwatch = async (e) => {
    e.stopPropagation();

    try {
      const url = `${import.meta.env.VITE_BASE_URL}/auth/addwatch`;
      const userId = localStorage.getItem("userId");
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movie, type, mode, userId }),
      });

      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        const url = `${
          import.meta.env.VITE_BASE_URL
        }/auth/userlist?userId=${localStorage.getItem("userId")}`;
        const headers = {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        };
        const response = await fetch(url, headers);
        const result = await response.json();

        localStorage.setItem("userList", JSON.stringify(result.watchlist));

        setMovieAdded(!movieAdded);
      } else if (error) {
        handleError(error?.details[0].message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMovieById = async (e) => {
    e.stopPropagation();
    try {
      const url = `${import.meta.env.VITE_BASE_URL}/auth/deletewatch`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: movie?._id }),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        setDeleteWatch(!deleteWatch);
      } else if (error) {
        handleError(error?.details[0].message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storedUserList = localStorage.getItem("userList");

    const userList = storedUserList ? JSON.parse(storedUserList) : [];

    const movieExists = Array.isArray(userList)
      ? userList.some((element) => element.id === movie.id)
      : false;

    setList(movieExists);
  }, [movie, movieAdded]);
  return (
    <div className="relative group h-[240px] sm:h-[265px] ">
      <div className="w-40 md:w-44  cursor-pointer group shadow-md shadow-[black] ">
        <div className="absolute bottom-0 w-full h-0  duration-150 ease-in group-hover:h-full bg-gradient-to-b from-[#1c1c1c7f] to-black cursor-pointer overflow-hidden rounded">
          {page == "mylist" && (
            <RxCross1
              onClick={deleteMovieById}
              className=" absolute top-3 right-3 cursor-pointer "
            />
          )}

          {/* <div className=" absolute top-3 left-3 cursor-pointer ">en</div> */}

          <div className="w-full absolute bottom-0    p-3">
            <div className="w-full h-8 gap-3 flex justify-between px-3 left-0  text-xs items-center  absolute top-[-20px]">
              <div className="w-10 h-7 bg-black rounded-full flex justify-center text-white text-[10px] items-center outline outline-2 outline-offset-2 outline-[red] ">
                <span>{len ? len?.toFixed(1) : "5.1"}%</span>
              </div>
              <button
                title="play"
                onClick={() => navigation(`/${type || mode}/${movie.id}`)}
                className="w-full h-7 capitalize text-[13px] hover:scale-105 duration-75 outline outline-2 outline-[#292929] outline-offset-1 ease-in bg-[#000000e8] rounded text-white"
              >
                watch now
              </button>
            </div>

            <h3
              title={movie.title || movie.name}
              className="mt-2 text-white text-sm md:text-base truncate"
            >
              {movie.title || movie.name}
            </h3>
            {(movie.release_date || movie.first_air_date) && (
              <h3
                title={movie.release_date || movie.first_air_date}
                className=" text-[#c0c0c0] text-xs"
              >
                {movie?.release_date?.split("-")[0] ||
                  movie?.first_air_date?.split("-")[0]}
              </h3>
            )}

            <div className="flex justify-between items-center text-[20px] py-3 text-[#c0c0c0]">
              <div className="flex items-center gap-3">
                {list ? (
                  <MdDone
                    onClick={(e) => e.stopPropagation()}
                    className="hover:scale-105 hover:text-white"
                    title="added "
                  />
                ) : (
                  <BsPlusCircle
                    onClick={addwatch}
                    className="hover:scale-105 hover:text-white"
                    title="add"
                  />
                )}

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
                onClick={(e) => MoreInfo(e, movie)}
              />
            </div>
            <div className="text-white  w-full flex flex-wrap gap-2">
              {movie?.genre_ids?.map((e, index) => {
                const genreName = Genres.find((g) => g.id === e)?.name || "";
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
          </div>
        </div>
        <img
          src={`https://image.tmdb.org/t/p/w400/${movie?.poster_path}`}
          onError={(e) => {
            e.target.src = "/fallback_poster-removebg-preview.png";
          }}
          alt={movie?.poster_path}
          className="w-full rounded"
          loading="lazy"
        />
        <div className=" absolute top-3 right-3 cursor-pointer group-hover:invisible text-center text-white rounded bg-black px-2 py-1 ">
          {movie.original_language}
        </div>
      </div>
    </div>
  );
};

export default Card;
