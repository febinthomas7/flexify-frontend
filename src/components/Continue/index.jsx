import ScrollComponent from "../ScrollComponent";
import { useState, useEffect, useContext } from "react";
import { Watch } from "../../Context";

const Continue = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { deleteContinueWatch, userContinueList, setUserContinueList } =
    useContext(Watch);

  const userWatched = async () => {
    setLoading(true);
    try {
      const url = `${
        import.meta.env.VITE_BASE_URL
      }/auth/continueList?userId=${localStorage.getItem("userId")}`;

      const response = await fetch(url);
      const result = await response.json();

      setUserContinueList(result.continue);
      setLoading(false);

      if (result.continue == undefined) {
        localStorage.setItem("userContinueList", JSON.stringify([]));
      } else {
        localStorage.setItem(
          "userContinueList",
          JSON.stringify(result.continue)
        );
      }

      setError(false);
    } catch (error) {
      localStorage.setItem("userList", JSON.stringify([]));
      setError(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    userWatched();
  }, [deleteContinueWatch]);

  return (
    <ScrollComponent
      data={userContinueList}
      heading={"Continue Watching"}
      loading={loading}
      page={"continue"}
    />
  );
};

export default Continue;
