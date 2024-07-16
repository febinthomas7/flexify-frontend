import Slider from "react-slick";

const Trending = () => {
  const trendingMovies = [
    {
      id: 1,
      title: "Avengers: Endgame",
      thumbnail: "/p1.webp",
    },
    {
      id: 2,
      title: "Joker",
      thumbnail: "/p2.webp",
    },
    {
      id: 3,
      title: "The Shawshank Redemption",
      thumbnail: "/p3.webp",
    },
    {
      id: 4,
      title: "Avengers: Endgame",
      thumbnail: "/p1.webp",
    },
    {
      id: 5,
      title: "Joker",
      thumbnail: "/p2.webp",
    },
    {
      id: 6,
      title: "The Shawshank Redemption",
      thumbnail: "/p3.webp",
    },
    {
      id: 2,
      title: "Joker",
      thumbnail: "/p2.webp",
    },
    {
      id: 3,
      title: "The Shawshank Redemption",
      thumbnail: "/p3.webp",
    },
    {
      id: 4,
      title: "Avengers: Endgame",
      thumbnail: "/p1.webp",
    },
    {
      id: 5,
      title: "Joker",
      thumbnail: "/p2.webp",
    },
    {
      id: 6,
      title: "The Shawshank Redemption",
      thumbnail: "/p3.webp",
    },
    // Add more movies here
  ];
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="trending  bg-black py-4">
      <h2 className="text-2xl font-bold text-white px-4">Trending Movies</h2>

      <div className="  px-8 space-x-4 mt-4">
        <Slider {...settings}>
          {trendingMovies.map((movie) => (
            <div
              key={movie.id}
              className="w-80 md:w-48  flex-shrink-0 cursor-pointer"
            >
              <img
                src={movie.thumbnail}
                alt={movie.title}
                className="w-full rounded"
              />
              <h3 className="mt-2 text-white text-sm md:text-base truncate">
                {movie.title}
              </h3>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Trending;
