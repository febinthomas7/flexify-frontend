import { useLocation, useNavigate, useParams } from "react-router-dom";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

const MovieDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigation = useNavigate();

  const goBack = () => {
    if (location.key !== "default") {
      navigation(-1);
    } else {
      navigation("/");
    }
    document.body.classList.remove("scroll");
  };
  return (
    <div className="w-full h-screen bg-[#000000f4] flex flex-col gap-4  items-center justify-center  bg-no-repeat bg-center overflow-y-auto p-6 relative bg-[url('/bgImage.svg')]">
      <Helmet>
        <title>Flexifyy</title>
        <meta name="description" content="watch movie" />
      </Helmet>
      <ToastContainer />
      <HiOutlineArrowSmallLeft
        onClick={goBack}
        className="text-white absolute left-5 sm:left-10 top-10 text-[35px] sm:text-[40px] cursor-pointer"
      />

      <div
        onClick={(e) => console.log(e)}
        className="w-full h-[500px] md:h-[700px] sm:w-[80%] sm:h-[600px]  shadow-2xl  rounded-md overflow-hidden bg-[#17171784]"
      >
        <iframe
          className="w-full h-full   rounded-md"
          src={`https://www.2embed.cc/embed/${id}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default MovieDetails;
