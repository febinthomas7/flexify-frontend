import { useEffect, useState } from "react";
import ScrollComponent from "../ScrollComponent";

const Series = () => {
  const [seriesData, setSeriesData] = useState([]);
  useEffect(() => {
    const data = async () => {
      const result = await fetch(
        `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const jsonData = await result.json();
      setSeriesData(jsonData.results);
    };
    data();
  }, []);
  return (
    <ScrollComponent data={seriesData} heading={"Series"} type={"series"} />
  );
};

export default Series;
