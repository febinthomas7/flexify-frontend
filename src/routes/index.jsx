import { Link, createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { Watch } from "../Context";
import Anime from "../pages/Anime";
import AnimeDetails from "../pages/AnimeDetails";
const MainPage = lazy(() => import("../pages/MainPage"));
const MovieDetails = lazy(() => import("../pages/MovieDetails"));
const SeriesDetails = lazy(() => import("../pages/SeriesDetails"));
const Login = lazy(() => import("../pages/Login"));
const Signin = lazy(() => import("../pages/Signin"));
const Home = lazy(() => import("../pages/Home"));
const Movie = lazy(() => import("../pages/Movie"));
const Profile = lazy(() => import("../pages/ProfilePage"));
const TVShowsPage = lazy(() => import("../pages/TvShows"));
const RequestReset = lazy(() => import("../pages/RequestReset"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const MessagingPage = lazy(() => import("../pages/MessagingPage"));
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" replace={false} />;
};

const RefreshHandler = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  return !isAuthenticated ? children : <Navigate to="/home" replace={false} />;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RefreshHandler>
        <MainPage />
      </RefreshHandler>
    ),
  },

  {
    path: "/login",
    element: (
      <RefreshHandler>
        <Login />
      </RefreshHandler>
    ),
  },
  {
    path: "/signin",
    element: (
      <RefreshHandler>
        <Signin />
      </RefreshHandler>
    ),
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: "/movie",
    element: (
      <PrivateRoute>
        <Movie />
      </PrivateRoute>
    ),
  },
  {
    path: "/myprofile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: "/tv",
    element: (
      <PrivateRoute>
        <TVShowsPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/tv/:id",
    element: (
      <PrivateRoute>
        <SeriesDetails />
      </PrivateRoute>
    ),
  },
  {
    path: "/movie/:id",
    element: (
      <PrivateRoute>
        <MovieDetails />
      </PrivateRoute>
    ),
  },
  {
    path: "/anime",
    element: (
      <PrivateRoute>
        <Anime />
      </PrivateRoute>
    ),
  },
  {
    path: "/request_reset",
    element: (
      <RefreshHandler>
        <RequestReset />
      </RefreshHandler>
    ),
  },
  {
    path: "/reset_password",
    element: (
      <RefreshHandler>
        <ResetPassword />
      </RefreshHandler>
    ),
  },
  {
    path: "/anime/:id",
    element: (
      <PrivateRoute>
        <AnimeDetails />
      </PrivateRoute>
    ),
  },
  {
    path: "/chat",
    element: (
      <PrivateRoute>
        <MessagingPage />
      </PrivateRoute>
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
          <Link to="/home">
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
