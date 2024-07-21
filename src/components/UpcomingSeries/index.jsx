import { useEffect, useState } from "react";
import ScrollComponent from "../ScrollComponent";

const UpcomingSeries = () => {
  const [upcomingseriesData, setUpcomingSeriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const data = async () => {
      const result = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/upcomingseries`
      );
      const jsonData = await result.json();
      setUpcomingSeriesData(jsonData);
      setLoading(false);
    };
    data();
  }, []);
  return (
    <ScrollComponent
      data={upcomingseriesData}
      heading={"Upcoming Series"}
      type={"tv"}
      mode={"tv"}
      loading={loading}
    />
  );
};

export default UpcomingSeries;
