import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Mylist from "../../components/Mylist";
import Profile from "../../components/Profile";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";

const ProfilePage = () => {
  return (
    <>
      <ToastContainer />

      <Helmet>
        <title>Profile - Flexifyy</title>
        <meta name="description" content="user profile" />
      </Helmet>
      <Header />
      <Profile />
      <Mylist />
      <Footer />
    </>
  );
};

export default ProfilePage;
