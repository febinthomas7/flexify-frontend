import { Link, createBrowserRouter } from "react-router-dom";
import { lazy, useState } from "react";
const MainPage = lazy(() => import("../pages/MainPage"));
const MovieDetails = lazy(() => import("../pages/MovieDetails"));
const SeriesDetails = lazy(() => import("../pages/SeriesDetails"));
const Login = lazy(() => import("../pages/Login"));
const Signin = lazy(() => import("../pages/Signin"));
const Home = lazy(() => import("../pages/Home"));
const Movie = lazy(() => import("../pages/Movie"));
const Profile = lazy(() => import("../pages/ProfilePage"));
const TVShowsPage = lazy(() => import("../pages/TvShows"));
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" />;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <MainPage />
      </>
    ),
  },

  {
    path: "/login",
    element: (
      <>
        <Login />
      </>
    ),
  },
  {
    path: "/signin",
    element: (
      <>
        <Signin />
      </>
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
