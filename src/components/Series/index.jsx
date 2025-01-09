import { useQuery } from "@tanstack/react-query";
import ScrollComponent from "../ScrollComponent";

const Series = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["ScrollSeries"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_BASE_URL}/api/series`).then((res) =>
        res.json()
      ),
  });
  return (
    <ScrollComponent
      data={data?.results || []}
      heading={"Series"}
      type={"tv"}
      mode={"tv"}
      loading={isFetching}
    />
  );
};

export default Series;
