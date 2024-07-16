import { Link } from "react-router-dom";
const Header = () => {
  const nav = [
    {
      path: "/",
      label: "Home",
    },
    {
      path: "/movies",
      label: "Movies",
    },
    {
      path: "/tvshows",
      label: "TV Shows",
    },
    {
      path: "/mylist",
      label: "My List",
    },
  ];
  return (
    <header className=" text-white p-4 flex justify-between items-center">
      <div className="logo   flex justify-center items-center text-[15px]">
        <img src="/logo.png" alt="" className="w-[100px] " />
      </div>
      <nav className="hidden md:flex space-x-4">
        {nav.map((item, index) => (
          <Link key={index} to={item.path} className="hover:text-[#ffffffc1]">
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
          src="/profile.jpeg"
          alt="Profile"
          className="w-9 outline outline-offset-2 outline-black outline-2 rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;
