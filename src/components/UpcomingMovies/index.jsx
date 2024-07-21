import { useEffect, useState } from "react";
import ScrollComponent from "../ScrollComponent";

const UpcomingMovies = () => {
  const [upcomingmovieData, setUpcomingMovieData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const data = async () => {
      const result = await fetch(`/api/upcomingmovies`);
      const jsonData = await result.json();
      setUpcomingMovieData(jsonData);
      setLoading(false);
    };
    data();
  }, []);
  return (
    <ScrollComponent
      data={upcomingmovieData}
      heading={"Upcoming Movies"}
      type={"movie"}
      mode={"movie"}
      loading={loading}
    />
  );
};

export default UpcomingMovies;
