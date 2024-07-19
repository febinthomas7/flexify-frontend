import { Link, useParams } from "react-router-dom";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
const MovieDetails = () => {
  const { id } = useParams();
  return (
    <div
      className="w-full h-screen bg-black flex flex-col gap-4  items-center justify-center  bg-no-repeat bg-center overflow-y-auto p-6 relative"
      style={{ backgroundImage: "url(/bgImage.svg)" }}
    >
      <Link to="/">
        {" "}
        <HiOutlineArrowSmallLeft className="text-white absolute left-10 top-10 text-[40px] cursor-pointer" />
      </Link>
      <div className="w-full h-[300px] sm:w-[80%] sm:h-[600px]  shadow-2xl  rounded-md overflow-hidden bg-[#17171784]">
        <iframe
          className="w-full h-full   rounded-md"
          src={`https://vidsrc.to/embed/movie/${id}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default MovieDetails;
