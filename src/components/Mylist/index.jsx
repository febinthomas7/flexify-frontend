import { useEffect, useState } from "react";
import ScrollComponent from "../ScrollComponent";

const Mylist = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const userWatched = async () => {
    try {
      const url = `${import.meta.env.VITE_BASE_URL}/auth/userlist`;
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      setLoading(false);
      setUserList(result);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    userWatched();
  }, []);
  console.log(userList);
  return (
    <section className="my-list  bg-black text-white p-4 md:p-8">
      <ScrollComponent
        data={userList}
        heading={"Recently Watched"}
        type={"movie"}
        mode={"movie"}
        loading={loading}
      />
    </section>
  );
};

export default Mylist;
