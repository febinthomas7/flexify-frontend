import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Mylist from "../../components/Mylist";
import Profile from "../../components/Profile";

const ProfilePage = () => {
  return (
    <>
      <Header />
      <Profile />
      <Mylist />
      <Footer />
    </>
  );
};

export default ProfilePage;
