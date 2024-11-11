import { BsPlusCircle } from "react-icons/bs";
import { TfiArrowCircleDown } from "react-icons/tfi";
// import { GoHeart, GoHeartFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import Genres from "../../Genre.json";
// import { handleSuccess, handleError } from "../../utils";
import "react-toastify/dist/ReactToastify.css";
import { RxCross1 } from "react-icons/rx";
import { MdDone } from "react-icons/md";
import { useState, useEffect, useContext } from "react";
import { IoMdShareAlt } from "react-icons/io";
import { LoadingComponentForchatUsers } from "../LoadingComponent";
import { add, deleteMovie, userData, Message } from "../../utils";
import { Watch } from "../../Context";
import {
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

const Card = ({ movie, type, MoreInfo, mode, page }) => {
  const navigation = useNavigate();
  const [list, setList] = useState(false);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [like, setLike] = useState(false);
  const { deleteWatch, setDeleteWatch, movieAdded, userList, setUserList } =
    useContext(Watch);

  const len = movie?.vote_average;
  const shareUrl = `https://flexifyy.netlify.app/${type || mode}/${movie.id}`;

  const addwatch = async (e) => {
    e.stopPropagation();
    add(movie, type, mode, userList, setUserList);
  };

  const deleteMovieById = async (e) => {
    e.stopPropagation();
    console.log(userList);
    deleteMovie(movie, userList, setUserList);
  };
  const share = () => {
    userData(setLoading, setUsers);
    setOpen(true);
  };

  const sendMessage = (userId, userName) => {
    Message(userId, userName, movie, type, mode);
  };

  useEffect(() => {
    const List = userList ? userList : [];

    const movieExists = Array.isArray(List)
      ? userList.some((element) =>
          element.id ? element.id === movie.id : element.title === movie.title
        )
      : false;

    setList(movieExists);
  }, [movie, movieAdded, userList]);
  // useEffect(() => {
  //   likes();
  // }, []);

  // useEffect(() => {
  //   const likeExist = Array.isArray(userlike)
  //     ? userlike.some((element) =>
  //         element.id ? element.id === movie.id : element.title === movie.title
  //       )
  //     : false;

  //   setLike(likeExist);
  // }, [userlike]);

  // console.log(list);

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

          {open && (
            <div className="w-full h-full bg-white text-black z-50 top-0 right-0 absolute overflow-y-auto  flex flex-col ">
              <div className="w-full h-11 bg-black text-white  ">
                <RxCross1
                  onClick={() => setOpen(!open)}
                  className=" absolute top-3 right-3 cursor-pointer "
                />{" "}
              </div>

              <div className="w-full h-16 flex justify-center gap-2 sm:gap-3 items-center bg-black p-2">
                <FacebookShareButton
                  url={shareUrl}
                  title={`${movie.title || movie.name}`}
                  hashtag={"#Flexifyy"}
                  className="hover:scale-105"
                  media={
                    type == "anime"
                      ? movie?.thumbnail
                      : `https://image.tmdb.org/t/p/w400/${movie?.poster_path}`
                  }
                >
                  <FacebookIcon size={28} round={true} />
                </FacebookShareButton>

                <WhatsappShareButton
                  url={shareUrl}
                  title={`${movie.title || movie.name}`}
                  hashtag={"#Flexifyy"}
                  className="hover:scale-105"
                  media={
                    type == "anime"
                      ? movie?.thumbnail
                      : `https://image.tmdb.org/t/p/w400/${movie?.poster_path}`
                  }
                >
                  <WhatsappIcon size={28} round={true} />
                </WhatsappShareButton>

                <TelegramShareButton
                  url={shareUrl}
                  title={`${movie.title || movie.name}`}
                  hashtag={"#Flexifyy"}
                  className="hover:scale-105"
                  media={
                    type == "anime"
                      ? movie?.thumbnail
                      : `https://image.tmdb.org/t/p/w400/${movie?.poster_path}`
                  }
                >
                  <TelegramIcon size={28} round={true} />
                </TelegramShareButton>

                <TwitterShareButton
                  url={shareUrl}
                  title={`${movie.title || movie.name}`}
                  hashtags={"#Flexifyy"}
                  className="hover:scale-105"
                  media={
                    type == "anime"
                      ? movie?.thumbnail
                      : `https://image.tmdb.org/t/p/w400/${movie?.poster_path}`
                  }
                >
                  <TwitterIcon size={28} round={true} />
                </TwitterShareButton>
              </div>

              <div className="w-full h-full bg-[#0e0e0e] text-white overflow-y-auto pt-2 pb-5 px-2 flex flex-col gap-3">
                {loading && <LoadingComponentForchatUsers />}
                {users?.map((e, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => sendMessage(e._id, e.name)}
                      className={`w-full rounded p-3 flex gap-2 truncate bg-[#c4c4c475] items-center cursor-pointer sm:hover:scale-105`}
                    >
                      {e?.name}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="w-full absolute bottom-0    p-3">
            <div className="w-full h-8 gap-3 flex justify-between px-3 left-0  text-xs items-center  absolute top-[-20px]">
              <div className="w-10 h-7 bg-black rounded-full flex justify-center text-white text-[10px] items-center outline outline-2 outline-offset-2 outline-[red] ">
                <span>{len ? len?.toFixed(1) : "5.1"}%</span>
              </div>
              <button
                title="play"
                onClick={() =>
                  navigation(
                    `/${type || mode}/${
                      movie.id || movie?.embed_url?.split("embed/")[1]
                    }`
                  )
                }
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
            {(movie.release_date || movie.first_air_date || movie.year) && (
              <h3
                title={movie.release_date || movie.first_air_date || movie.year}
                className=" text-[#c0c0c0] text-xs"
              >
                {movie?.release_date?.split("-")[0] ||
                  movie?.first_air_date?.split("-")[0] ||
                  movie.year}
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

                <IoMdShareAlt
                  className="hover:scale-105 hover:text-white"
                  title="share"
                  onClick={share}
                />
                {/* {like ? (
                  <GoHeartFill
                    className="hover:scale-105  text-red-600"
                    title="liked"
                    onClick={deleteLikeById}
                  />
                ) : (
                  <GoHeart
                    className="hover:scale-105 hover:text-white"
                    title="like"
                    onClick={addLike}
                  />
                )} */}
              </div>

              <TfiArrowCircleDown
                className="hover:scale-105 hover:text-white"
                title="more info"
                onClick={(e) => MoreInfo(e, movie)}
              />
            </div>
            <div className="text-white  w-full flex flex-wrap gap-2">
              {type == "anime" ? (
                <h1 className="before:content-['.'] text-[10px] drop-shadow-lg hover:text-[#c0c0c0]">
                  {movie?.genres || movie?.genre_ids}
                </h1>
              ) : (
                movie?.genre_ids?.map((e, index) => {
                  const genreName = Genres.find((g) => g.id === e)?.name || "";
                  return (
                    <h1
                      key={index}
                      className="before:content-['.'] text-[10px] drop-shadow-lg hover:text-[#c0c0c0]"
                    >
                      {genreName}
                    </h1>
                  );
                })
              )}
            </div>
          </div>
        </div>
        {type == "anime" ? (
          <img
            src={`${movie?.thumbnail || movie?.poster_path}`}
            onError={(e) => {
              e.target.src = "/fallback_poster-removebg-preview.png";
            }}
            alt={movie?.thumbnail}
            className="w-full rounded h-[240px] sm:h-[264px]"
            loading="lazy"
          />
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/w400/${movie?.poster_path}`}
            onError={(e) => {
              e.target.src = "/fallback_poster-removebg-preview.png";
            }}
            alt={movie?.poster_path}
            className="w-full rounded h-[240px] sm:h-[264px]"
            loading="lazy"
          />
        )}

        <div className=" absolute top-3 right-3 cursor-pointer group-hover:invisible text-center text-white rounded bg-black px-2 py-1 ">
          {movie.original_language || "Ja"}
        </div>
      </div>
    </div>
  );
};

export default Card;
