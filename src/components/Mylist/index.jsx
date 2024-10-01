import { useContext, useEffect, useState } from "react";
import ScrollComponent from "../ScrollComponent";
import { Watch } from "../../Context";
import { useNavigate } from "react-router-dom";
const Mylist = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(true);
  const { deleteWatch } = useContext(Watch);
  const navigation = useNavigate();
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

      if (result.watchlist == undefined) {
        localStorage.setItem("userList", JSON.stringify([]));
        if (result.success === false) {
          window.localStorage.clear();
          navigation("/login");
        }
      } else {
        localStorage.setItem("userList", JSON.stringify(result.watchlist));
        if (result.success === false) {
          window.localStorage.clear();
          navigation("/login");
        }
      }

      setError(false);
      setTokenExpired(result.success || true);
    } catch (error) {
      localStorage.setItem("userList", JSON.stringify([]));
      setError(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    userWatched();
  }, [deleteWatch]);
  return (
    <section className="my-list  bg-black  text-white p-4 md:p-8">
      {userList?.length > 0 && (
        <ScrollComponent
          data={userList}
          heading={"Added PlayList"}
          loading={loading}
          page={"mylist"}
        />
      )}
      {loading && (
        <div className="text-white w-full h-[361px] flex justify-center items-center bg-[#0b0b0b] rounded">
          <div className="spinner">
            <div className="r1"></div>
            <div className="r2"></div>
            <div className="r3"></div>
            <div className="r4"></div>
            <div className="r5"></div>
          </div>
        </div>
      )}
      {!loading && userList?.length === 0 && !error && tokenExpired ? (
        <div className="text-white w-full h-[361px] flex flex-col justify-center items-center bg-[#0b0b0b] rounded">
          <img src="userNotLogggedIn.webp" alt="" />
          <h1 className="capitalize">nothing added yet</h1>
        </div>
      ) : null}

      {(error || !tokenExpired) && (
        <div className="text-white w-full h-[361px] flex flex-col justify-center items-center bg-[#0b0b0b] rounded">
          <img src="userNotLogggedIn.webp" alt="" />
          <h1 className="capitalize">token expired or unauthorised token</h1>
          <h1 className="capitalize">login again</h1>
        </div>
      )}
    </section>
  );
};

export default Mylist;
