import { Link, createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
const Home = lazy(() => import("../pages/Home"));
const Movie = lazy(() => import("../pages/Movie"));
const Profile = lazy(() => import("../pages/ProfilePage"));
const TVShowsPage = lazy(() => import("../pages/TvShows"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Home />
      </>
    ),
  },

  {
    path: "/movies",
    element: (
      <>
        <Movie />
      </>
    ),
  },
  {
    path: "/mylist",
    element: (
      <>
        <Profile />
      </>
    ),
  },
  {
    path: "/tvshows",
    element: (
      <>
        <TVShowsPage />
      </>
    ),
  },

  {
    path: "*",
    element: (
      <>
        <div className="h-screen w-full justify-center flex flex-col gap-3 items-center bg-gradient-to-b from-[#030d1b]  via-[#02070d]  to-[#000000] text-white">
          <h1 className="text-[40px] capitalize">not found</h1>
          <div className="flex flex-col  gap-2 justify-center items-center w-full sm:w-1/2">
            <div className="w-1/2 h-1 rounded-sm bg-blue-950 "></div>
            <div className="w-1/3 h-1   rounded-sm bg-blue-950"></div>{" "}
          </div>
          <Link to="/">
            <button className="ring-blue-900 ring-2 p-2 rounded-md">
              Home
            </button>
          </Link>
        </div>
      </>
    ),
  },
]);

export default router;
