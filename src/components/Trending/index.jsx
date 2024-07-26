import { useQuery } from "@tanstack/react-query";
import ScrollComponent from "../ScrollComponent";

const Trending = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["ScrollTrending"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_BASE_URL}/api/trending`).then((res) =>
        res.json()
      ),
  });
  return (
    <ScrollComponent
      data={data}
      heading={"Trending Movies/Shows"}
      loading={isFetching}
    />
  );
};

export default Trending;
