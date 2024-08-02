import Header from "../../components/Header";
import Hero from "../../components/Hero";
import Trending from "../../components/Trending";
import Footer from "../../components/Footer";
import Movies from "../../components/Movies";
import Series from "../../components/Series";
import UpcomingMovies from "../../components/UpcomingMovies";
import UpcomingSeries from "../../components/UpcomingSeries";
const Home = () => {
  return (
    <div className="overflow-hidden">
      <Header />
      <Hero />
      <Trending />
      <Movies />
      <Series />
      <UpcomingMovies />
      <UpcomingSeries />
      <Footer />
    </div>
  );
};

export default Home;
