import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { debounce } from "../../debounce";
import axios from "axios";
import SearchBox from "../SearchBox";

const Header = () => {
  const [bgcolor, setBgColor] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
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

  const fetchSearchResults = useCallback(
    debounce((query) => {
      const options = {
        method: "GET",
        url: `${import.meta.env.VITE_BASE_URL}/api/search`,
        params: { search: query },
      };

      axios.request(options).then((response) => {
        setSearchResults(response.data);
      });
    }, 500),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value === "") {
      setSearchResults([]);
    } else {
      fetchSearchResults(value);
    }
  };
  const openSearch = () => {
    document.body.classList.toggle("scroll");
    if (isOpen == true) {
      setSearchResults([]);
      setSearch("");
    }
    setIsOpen(!isOpen);
  };

  const handleWindowListener = useCallback(() => {
    if (window.scrollY > 60) {
      setBgColor(true);
    } else {
      setBgColor(false);
    }
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", handleWindowListener);

    return () => {
      window.removeEventListener("scroll", handleWindowListener);
    };
  }, []);

  return (
    <>
      {isOpen && (
        <SearchBox
          value={search}
          onchange={handleInputChange}
          searchResults={searchResults}
          set={openSearch}
          setSearchResults={setSearchResults}
          input="input"
        />
      )}

      <header
        className={` text-white p-2 sm:p-4 z-40 flex justify-between fixed w-full ${
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
          <div
            onClick={openSearch}
            className="w-[34px]  h-[34px] flex justify-center items-center cursor-pointer outline outline-2 outline-offset-2 outline-[red] bg-black group   rounded-full"
          >
            <IoIosSearch className="text-[20px] text-[#ededed] group-hover:text-white group-hover:scale-105" />
          </div>
          <img
            src="/avatar.webp"
            alt="Profile"
            className="w-9 hover:outline outline-offset-2 outline-white outline-2 rounded-md cursor-pointer"
          />
        </div>
      </header>
    </>
  );
};

export default Header;
