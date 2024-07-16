import React from "react";
import MovieInfo from "../../components/MovieInfo";
import CastAndCrew from "../../components/CastAndCrew";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
const Movie = () => {
  return (
    <>
      <Header />
      <MovieInfo />
      <CastAndCrew />
      <Footer />
    </>
  );
};

export default Movie;
