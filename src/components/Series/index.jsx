import { useEffect, useState } from "react";
import ScrollComponent from "../ScrollComponent";

const Series = () => {
  const [seriesData, setSeriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const data = async () => {
      const result = await fetch(`${import.meta.env.VITE_BASE_URL}/api/series`);
      const jsonData = await result.json();
      setSeriesData(jsonData);
      setLoading(false);
    };
    data();
  }, []);
  return (
    <ScrollComponent
      data={seriesData}
      heading={"Series"}
      type={"tv"}
      mode={"tv"}
      loading={loading}
    />
  );
};

export default Series;
