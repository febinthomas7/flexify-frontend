import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { LoadingComponentForScroll } from "../LoadingComponent";
import { LoadingComponentForMovieAndSeries } from "../LoadingComponent";
import MoreInfoComponent from "../MoreInfoComponent";
import Card from "../Card";
const ScrollComponent = ({ data, heading, type, mode, loading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [moreInfo, setMoreInfo] = useState(false);
  const [moreInfoData, setMoreInfoData] = useState();
  const explore = (e) => {
    e.stopPropagation();
    setIsOpen(true);
    document.body.classList.add("scroll");
  };

  const MoreInfo = (e, movie) => {
    e.stopPropagation();
    setMoreInfo(true);
    document.body.classList.add("scroll");
    setMoreInfoData(movie);
    setIsOpen(false);
    document.getElementById("backdrop")?.scrollIntoView(0);
  };

  const closeinfo = (e) => {
    e.stopPropagation();
    setMoreInfo(false);
    document.body.classList.remove("scroll");
  };
  const closeExplore = (e) => {
    e.stopPropagation();
    setIsOpen(false);
    document.body.classList.remove("scroll");
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed w-full h-screen top-0 z-40 justify-center flex shadow-md shadow-[black] bg-[#000000b3]"
          onClick={closeExplore}
        >
          <div className="w-[70%] flex flex-wrap gap-6 justify-center rounded overflow-y-auto bg-[#000000f4] p-10 mt-24 relative">
            <RxCrossCircled className="absolute right-4 top-4 text-gray-300 cursor-pointer hover:scale-105 hover:text-white z-30 text-[30px]" />

            {loading ? (
              <LoadingComponentForMovieAndSeries />
            ) : (
              data?.map((movie, index) => (
                <Card
                  key={index}
                  movie={movie}
                  type={movie?.media_type || type}
                  mode={mode}
                  MoreInfo={(e) => MoreInfo(e, movie)}
                />
              ))
            )}
          </div>
        </div>
      )}

      {moreInfo && (
        <MoreInfoComponent
          closeinfo={closeinfo}
          type={type}
          mode={mode}
          moreInfoData={moreInfoData}
          MoreInfo={MoreInfo}
        />
      )}

      <section className=" bg-[#0b0b0b] py-4 text-white">
        <div className="flex items-baseline  group  px-8">
          {loading ? (
            <div className="w-[81px] h-[32px] bg-[#0d1015ed] rounded "></div>
          ) : (
            <div
              className="flex items-baseline cursor-pointer group/item"
              onClick={explore}
            >
              <h2 className="text-2xl  font-bold text-white group-hover/item:underline decoration-2 duration-150 ease-in underline-offset-2  ">
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
              <Card
                key={index}
                movie={movie}
                type={movie?.media_type || type}
                mode={mode}
                MoreInfo={(e) => MoreInfo(e, movie)}
              />
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default ScrollComponent;
