import { useQuery } from "@tanstack/react-query";
import ScrollComponent from "../ScrollComponent";

const UpcomingMovies = () => {
  const { isPending, data } = useQuery({
    queryKey: ["ScrollUpcomingNovies"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_BASE_URL}/api/upcomingmovies`).then((res) =>
        res.json()
      ),
  });
  return (
    <ScrollComponent
      data={data}
      heading={"Upcoming Movies"}
      type={"movie"}
      mode={"movie"}
      loading={isPending}
    />
  );
};

export default UpcomingMovies;
