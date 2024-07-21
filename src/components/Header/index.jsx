import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
const Header = () => {
  const [bgcolor, setBgColor] = useState(false);
  const navigation = useLocation();

  const nav = [
    {
      path: "/",
      label: "Home",
    },
    {
      path: "/movie",
      label: "Movies",
    },
    {
      path: "/tv",
      label: "TvShows",
    },
    {
      path: "/mylist",
      label: "My List",
    },
  ];

  window.addEventListener("scroll", (e) => {
    if (window.scrollY > 60) {
      setBgColor(true);
    } else {
      setBgColor(false);
    }
  });
  return (
    <header
      className={` text-white p-2 sm:p-4 z-50 flex justify-between fixed w-full ${
        bgcolor ? "bg-[#000000b1]" : null
      } items-center duration-75 ease-in`}
    >
      <Link to="/">
        <div className="logo   flex justify-center items-center text-[15px]">
          <img src="/logo.png" alt="" className="w-[100px] " />
        </div>
      </Link>

      <nav className="hidden md:flex space-x-4">
        {nav.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`hover:text-[#b01818] font-semibold ${
              navigation.pathname == item.path
                ? "text-[#b01818]"
                : "text-[#c5c5c5c1]"
            } `}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="hidden md:block p-1  bg-[#000000cf] border border-gray-700"
        />
        <img
          src="/avatar.webp"
          alt="Profile"
          className="w-9 hover:outline outline-offset-2 outline-white outline-2 rounded-md cursor-pointer"
        />
      </div>
    </header>
  );
};

export default Header;
