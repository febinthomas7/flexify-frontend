import React from "react";

export const LoadingComponentForScroll = () => {
  return (
    <>
      {Array.from({ length: 8 }, (_, i) => i)?.map((e) => (
        <div
          key={e}
          className=" w-[160px] h-[240px] sm:w-[192px] sm:h-[288px] text-center   bg-[#0d1015ed] rounded "
        >
          <h1 className="invisible">
            LOADING......................................
          </h1>
        </div>
      ))}
    </>
  );
};

export const LoadingComponentForMovieAndSeries = () => {
  return (
    <>
      {Array.from({ length: 8 }, (_, i) => i)?.map((e) => (
        <div
          key={e}
          className=" w-[160px] h-[240px] sm:w-[192px] sm:h-[288px] text-center   bg-[#0d1015ed] rounded "
        ></div>
      ))}
    </>
  );
};
