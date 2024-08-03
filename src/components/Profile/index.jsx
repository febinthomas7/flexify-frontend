import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../../utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Profile = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUserName(localStorage.getItem("name"));
    setUserEmail(localStorage.getItem("email"));
  }, []);
  const userLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    handleSuccess("Logged out successfully!");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  return (
    <section className=" justify-center bg-[#0b0b0b] text-white p-4 pt-16 md:py-20 md:px-8">
      <div className="container mx-auto flex flex-col gap-2 sm:gap-6 justify-center items-center ">
        <div className="flex gap-6 justify-center items-center">
          <img
            src="/avatar.webp"
            alt="User Avatar"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full"
          />
          <div className=" md:mt-0  md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold">{userName}</h1>
            <p className="mt-2">{userEmail}</p>
            <p className="mt-2">Subscription: Premium</p>
          </div>
        </div>
        <button
          onClick={userLogOut}
          className="rounded px-3 py-2 w-[300px] bg-red-600 duration-100 ease-in capitalize hover:scale-105 font-bold"
        >
          Log Out
        </button>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Profile;
