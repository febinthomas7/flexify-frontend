import React, { useState, useEffect } from "react";
import ScrollComponent from "../ScrollComponent";

const Movies = () => {
  const [movieData, setMovieData] = useState([]);
  useEffect(() => {
    const data = async () => {
      const result = await fetch(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=ecc3e9c5cba652d1c2a54be405ebd4d2"
      );
      const jsonData = await result.json();
      setMovieData(jsonData.results);
    };
    data();
  }, []);
  return (
    <ScrollComponent data={movieData} heading={"Movies"} type={"movies"} />
  );
};

export default Movies;
