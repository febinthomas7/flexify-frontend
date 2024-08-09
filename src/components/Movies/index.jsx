import ScrollComponent from "../ScrollComponent";
import { useQuery } from "@tanstack/react-query";
const Movies = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["Movies"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_BASE_URL}/api/movies`).then((res) =>
        res.json()
      ),
  });

  return (
    <ScrollComponent
      data={data?.results}
      heading={"Movies"}
      type={"movie"}
      mode={"movie"}
      loading={isFetching}
    />
  );
};

export default Movies;
