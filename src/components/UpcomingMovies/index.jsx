import { useEffect, useState } from "react";
import ScrollComponent from "../ScrollComponent";

const UpcomingMovies = () => {
  const [upcomingmovieData, setUpcomingMovieData] = useState([]);
  useEffect(() => {
    const data = async () => {
      const result = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const jsonData = await result.json();
      setUpcomingMovieData(jsonData.results);
    };
    data();
  }, []);
  return (
    <ScrollComponent
      data={upcomingmovieData}
      heading={"Upcoming Movies"}
      type={"movies"}
    />
  );
};

export default UpcomingMovies;
