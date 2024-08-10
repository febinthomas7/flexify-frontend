import { useEffect, useState } from "react";
import ScrollComponent from "../ScrollComponent";

const Mylist = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteWatch, setDeleteWatch] = useState(false);
  const userWatched = async () => {
    try {
      const url = `${
        import.meta.env.VITE_BASE_URL
      }/auth/userlist?userId=${localStorage.getItem("userId")}`;
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      setLoading(false);
      setUserList(result.watchlist);
      localStorage.setItem("userList", JSON.stringify(result.watchlist));
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    userWatched();
  }, [deleteWatch]);
  return (
    <section className="my-list  bg-black text-white p-4 md:p-8">
      {userList?.length > 0 ? (
        <ScrollComponent
          data={userList}
          heading={"Added PlayList"}
          loading={loading}
          page={"mylist"}
          setDeleteWatch={setDeleteWatch}
          deleteWatch={deleteWatch}
        />
      ) : (
        <div className="text-white w-full h-[361px] flex justify-center items-center bg-[#0b0b0b] rounded">
          <h1>nothing added yet</h1>
        </div>
      )}
    </section>
  );
};

export default Mylist;
