import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { RxCrossCircled } from "react-icons/rx";
import { handleError, handleSuccess } from "../../utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);
      const { name, email, password } = data;

      if (!name || !email || !password) {
        return handleError("All fields are required");
      }

      const url = `${import.meta.env.VITE_BASE_URL}/auth/signin`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      const { sucess, message, error } = result;
      if (sucess) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        handleError(error?.details[0].message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" w-full h-svh flex justify-center items-center  bg-black bg-[url('/mainpage_bg.jpg')]">
      <div className=" w-full h-svh flex justify-center items-center fixed bg-gradient-to-b from-[#000000ad] via-[#1c1c1c7f] to-[#000000ad] z-10"></div>
      <header
        className={` text-white  sm:px-10 sm:py-2 z-40 flex top-0 justify-between fixed w-full  items-center duration-75 ease-in`}
      ></header>
      <ToastContainer />
      <div className="flex justify-center items-center w-full z-40 ">
        <div className="bg-[#000000a7] p-8 rounded-lg shadow-lg w-full max-w-md relative mx-5 ">
          <Link to="/">
            <div className="logo   flex justify-center items-center">
              <img src="/logo.png" alt="" className="w-[120px] sm:w-[180px] " />
            </div>
          </Link>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="name"
                id="name"
                name="name"
                className="w-full p-3 rounded bg-[#39393938] outline outline-white text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 rounded bg-[#39393938] outline outline-white text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-400 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-3 rounded bg-[#39393938] text-white  outline outline-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-700  hover:scale-105 duration-100 ease-in text-white font-bold py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Sign In
            </button>
            <div>
              <p className="text-gray-400 mt-4">
                already have an account?{" "}
                <Link to="/login" className="text-red-700 hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
