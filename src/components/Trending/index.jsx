import { useEffect, useState } from "react";
import ScrollComponent from "../ScrollComponent";

const Trending = () => {
  const [trendingShowsandMovies, setTrendingShowsandMovies] = useState([]);

  useEffect(() => {
    const data = async () => {
      const result = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${
          import.meta.env.VITE_API_KEY
        }&append_to_response=videos,images`
      );
      const jsonData = await result.json();
      setTrendingShowsandMovies(jsonData.results);
    };
    data();
  }, []);

  return (
    <ScrollComponent
      data={trendingShowsandMovies}
      heading={"Trending Movies/Shows"}
      type={"movies"}
    />
  );
};

export default Trending;
