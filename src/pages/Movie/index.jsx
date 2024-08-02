import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useQuery } from "@tanstack/react-query";
import Card from "../../components/Card";
import MoreInfoComponent from "../../components/MoreInfoComponent";
import { LoadingComponentForMovieAndSeries } from "../../components/LoadingComponent";
const Movie = () => {
  const [moreInfo, setMoreInfo] = useState(false);
  const [moreInfoData, setMoreInfoData] = useState();
  const { data, isFetching } = useQuery({
    queryKey: ["ScrollMovies"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_BASE_URL}/api/movies`).then((res) =>
        res.json()
      ),
  });
  const MoreInfo = (e, movie) => {
    e.stopPropagation();
    setMoreInfo(true);
    document.body.classList.add("scroll");
    setMoreInfoData(movie);

    document.getElementById("backdrop").scrollIntoView();
  };

  const closeinfo = (e) => {
    e.stopPropagation();
    setMoreInfo(false);
    document.body.classList.remove("scroll");
  };

  return (
    <div className="bg-[#0b0b0b] w-full  flex flex-col ">
      <Header />
      {moreInfo && (
        <MoreInfoComponent
          closeinfo={closeinfo}
          type={"movie"}
          mode={"movie"}
          moreInfoData={moreInfoData}
          MoreInfo={MoreInfo}
        />
      )}
      <div className="w-full h-full flex-wrap flex text-sm text-white gap-4 sm:gap-8 justify-center mx-auto  items-start py-20">
        {isFetching ? (
          <LoadingComponentForMovieAndSeries />
        ) : (
          data?.map((movie, index) => (
            <Card
              key={index}
              movie={movie}
              type={"movie"}
              mode={"movie"}
              MoreInfo={(e) => MoreInfo(e, movie)}
            />
          ))
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Movie;
