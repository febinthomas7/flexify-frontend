import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Card from "../../components/Card";
import MoreInfoComponent from "../../components/MoreInfoComponent";
import { LoadingComponentForMovieAndSeries } from "../../components/LoadingComponent";
const TvShowsPage = () => {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [moreInfo, setMoreInfo] = useState(false);
  const [moreInfoData, setMoreInfoData] = useState();
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
  useEffect(() => {
    const data = async () => {
      const result = await fetch(`/api/series`);
      const jsonData = await result.json();
      setMovieData(jsonData);
      setLoading(false);
    };
    data();
  }, []);
  return (
    <div className="bg-[#0b0b0b] w-full  flex flex-col ">
      <Header />
      {moreInfo && (
        <MoreInfoComponent
          closeinfo={closeinfo}
          type={"series"}
          mode={"tv"}
          moreInfoData={moreInfoData}
          MoreInfo={MoreInfo}
        />
      )}
      <div className="w-full h-full flex-wrap flex text-sm text-white gap-8  justify-center mx-auto  items-start py-20">
        {loading ? (
          <LoadingComponentForMovieAndSeries />
        ) : (
          movieData?.map((movie, index) => (
            <Card
              key={index}
              movie={movie}
              type={"series"}
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
