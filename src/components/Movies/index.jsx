import React, { useState, useEffect } from "react";
import ScrollComponent from "../ScrollComponent";

const Movies = () => {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const data = async () => {
      const result = await fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const jsonData = await result.json();
      setMovieData(jsonData.results);
      setLoading(false);
    };
    data();
  }, []);
  return (
    <ScrollComponent
      data={movieData}
      heading={"Movies"}
      type={"movies"}
      mode={"movie"}
      loading={loading}
    />
  );
};

export default Movies;
