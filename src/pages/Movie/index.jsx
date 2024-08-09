import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useQuery } from "@tanstack/react-query";
import Card from "../../components/Card";
import MoreInfoComponent from "../../components/MoreInfoComponent";
import { LoadingComponentForMovieAndSeries } from "../../components/LoadingComponent";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

const Movie = () => {
  const [moreInfo, setMoreInfo] = useState(false);
  const [moreInfoData, setMoreInfoData] = useState();
  const [page, setPage] = useState(1);
  const fetchProjects = (page = 1) =>
    fetch(`${import.meta.env.VITE_BASE_URL}/api/movies?page=${page}`).then(
      (res) => res.json()
    );

  const { data, isFetching } = useQuery({
    queryKey: ["Movie", page],
    queryFn: () => fetchProjects(page),
    placeholderData: true,
  });

  const MoreInfo = (e, movie) => {
    e.stopPropagation();
    setMoreInfo(true);
    document.body.classList.add("scroll");
    setMoreInfoData(movie);

    document.getElementById("backdrop").scrollIntoView();
  };
  console.log(data);

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
          data.results?.map((movie, index) => (
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

      <div className="flex justify-center items-center gap-3">
        <button
          className={`text-white w-auto p-2 ${
            page === 1 ? "bg-red-400 cursor-not-allowed" : "bg-red-600"
          } bg-red-600 rounded`}
          onClick={() => setPage((old) => old - 1)}
          disabled={page === 1}
        >
          <MdKeyboardArrowLeft />
        </button>
        <span className="text-white">
          {page} .... {data?.total_pages}
        </span>
        <button
          className="text-white w-auto p-2 bg-red-600 rounded"
          onClick={() => {
            setPage((old) => old + 1);
          }}
        >
          <MdKeyboardArrowRight />
        </button>
      </div>
      {isFetching ? <span className="text-white"> Loading...</span> : null}

      <Footer />
    </div>
  );
};

export default Movie;
