import React from "react";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import Trending from "../../components/Trending";
import Footer from "../../components/Footer";
const Home = () => {
  return (
    <>
      <div className="fixed w-full ">
        <Header />
      </div>

      <Hero />

      <Trending />
      <Footer />
    </>
  );
};

export default Home;
