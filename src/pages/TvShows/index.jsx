import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Card from "../../components/Card";
import { useQuery } from "@tanstack/react-query";
import MoreInfoComponent from "../../components/MoreInfoComponent";
import { LoadingComponentForMovieAndSeries } from "../../components/LoadingComponent";
const TvShowsPage = () => {
  const [moreInfo, setMoreInfo] = useState(false);
  const [moreInfoData, setMoreInfoData] = useState();
  const { data, isFetching } = useQuery({
    queryKey: ["ScrollSeries"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_BASE_URL}/api/series`).then((res) =>
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
          type={"tv"}
          mode={"tv"}
          moreInfoData={moreInfoData}
          MoreInfo={MoreInfo}
        />
      )}
      <div className="w-full h-full flex-wrap flex text-sm text-white gap-8  justify-center mx-auto  items-start py-20">
        {isFetching ? (
          <LoadingComponentForMovieAndSeries />
        ) : (
          data?.map((movie, index) => (
            <Card
              key={index}
              movie={movie}
              type={"tv"}
              mode={"tv"}
              MoreInfo={(e) => MoreInfo(e, movie)}
            />
          ))
        )}
      </div>

      <Footer />
    </div>
  );
};

export default TvShowsPage;
