import { useQuery } from "@tanstack/react-query";
import ScrollComponent from "../ScrollComponent";

const Trending = () => {
  const { isPending, data } = useQuery({
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
      loading={isPending}
    />
  );
};

export default Trending;
