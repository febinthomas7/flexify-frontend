import React, { useState, useEffect } from "react";
import ScrollComponent from "../ScrollComponent";

const Movies = () => {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const data = async () => {
      const result = await fetch(`${import.meta.env.VITE_BASE_URL}/api/movies`);
      const jsonData = await result.json();
      setMovieData(jsonData);
      setLoading(false);
    };
    data();
  }, []);
  return (
    <ScrollComponent
      data={movieData}
      heading={"Movies"}
      type={"movie"}
      mode={"movie"}
      loading={loading}
    />
  );
};

export default Movies;
