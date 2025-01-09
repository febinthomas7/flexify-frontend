import ScrollComponent from "../ScrollComponent";
import { useState, useEffect, useCallback, useContext } from "react";
const Recommendation = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const url = `${
        import.meta.env.VITE_BASE_URL
      }/auth/user-recommendation?id=${localStorage.getItem("userId")}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setRecommendations(data.recommendations);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <ScrollComponent
      data={recommendations || []}
      heading={"Recommendation"}
      loading={loading}
    />
  );
};

export default Recommendation;
