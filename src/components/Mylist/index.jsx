const Mylist = () => {
  const savedMovies = [
    { id: 1, title: "Inception", thumbnail: "p3.webp" },
    { id: 2, title: "The Matrix", thumbnail: "p2.webp" },
    { id: 3, title: "Interstellar", thumbnail: "p1.webp" },
    // Add more movies as needed
  ];

  return (
    <section className="my-list  bg-black text-white p-4 md:p-8">
      <h2 className="text-2xl font-bold">My List</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {savedMovies.map((movie) => (
          <div key={movie.id} className="text-center cursor-pointer">
            <img
              src={movie.thumbnail}
              alt={movie.title}
              className="w-full rounded"
            />
            <h3 className="mt-2 text-sm md:text-base">{movie.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Mylist;
