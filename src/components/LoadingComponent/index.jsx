import React from "react";

export const LoadingComponentForScroll = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <>
      {data?.map((e) => (
        <div
          key={e}
          className=" w-[160px] h-[235px] sm:w-[192px] sm:h-[288px] text-center   bg-[#0d1015ed] rounded "
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
  const data = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <>
      {data?.map((e) => (
        <div
          key={e}
          className=" w-[160px] h-[235px] sm:w-[192px] sm:h-[288px] text-center   bg-[#0d1015ed] rounded "
        >
          <h1 className="invisible">
            LOADING......................................
          </h1>
        </div>
      ))}
    </>
  );
};
