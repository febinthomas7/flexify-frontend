import { useEffect, useState } from "react";
import ScrollComponent from "../ScrollComponent";

const Trending = () => {
  const [trendingShowsandMovies, setTrendingShowsandMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const data = async () => {
      const result = await fetch(`/api/trending`);
      const jsonData = await result.json();
      setTrendingShowsandMovies(jsonData);
      setLoading(false);
    };
    data();
  }, []);

  return (
    <ScrollComponent
      data={trendingShowsandMovies}
      heading={"Trending Movies/Shows"}
      // type={"movie"}
      // mode={"movie"}
      loading={loading}
    />
  );
};

export default Trending;
