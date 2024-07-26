import { BsPlusCircle } from "react-icons/bs";
import { FaRegThumbsUp } from "react-icons/fa6";
import { FaRegThumbsDown } from "react-icons/fa6";
import { TfiArrowCircleDown } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import Genres from "../../Genre.json";
const Card = ({ movie, type, MoreInfo, mode }) => {
  const navigation = useNavigate();
  const len = movie?.vote_average;

  return (
    <div
      className="relative group h-[240px] sm:h-[265px] "
      onClick={() => navigation(`/${type || mode}/${movie.id}`)}
    >
      <div className="w-40 md:w-44  cursor-pointer group shadow-md shadow-[black] ">
        <div className="absolute bottom-0 w-full h-0  duration-150 ease-in group-hover:h-full bg-gradient-to-b from-[#1c1c1c7f] to-black cursor-pointer overflow-hidden rounded">
          <div className="w-full absolute bottom-0    p-3">
            <div className="w-8 h-8 bg-black rounded-full flex justify-center text-white text-xs items-center outline outline-2 outline-offset-2 outline-[red] absolute top-[-20px]">
              <span>{len?.toFixed(1)}%</span>
            </div>
            <h3
              title={movie.title || movie.name}
              className="mt-2 text-white text-sm md:text-base truncate"
            >
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
            e.target.src = "/fallback_poster.png";
          }}
          alt={movie?.poster_path}
          className="w-full rounded"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Card;
