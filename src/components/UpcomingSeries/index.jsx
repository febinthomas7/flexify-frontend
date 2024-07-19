import { useEffect, useState } from "react";
import ScrollComponent from "../ScrollComponent";

const UpcomingSeries = () => {
  const [upcomingseriesData, setUpcomingSeriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const data = async () => {
      const result = await fetch(
        `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1&api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const jsonData = await result.json();
      setUpcomingSeriesData(jsonData.results);
      setLoading(false);
    };
    data();
  }, []);
  return (
    <ScrollComponent
      data={upcomingseriesData}
      heading={"Upcoming Series"}
      type={"series"}
      loading={loading}
    />
  );
};

export default UpcomingSeries;
