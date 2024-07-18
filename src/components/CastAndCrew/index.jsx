const CastAndCrew = () => {
  const castAndCrew = [
    {
      id: 1,
      name: "John Doe",
      role: "Director",
      photo: "/a1.webp",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Actor",
      photo: "/a2.webp",
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "Actor",
      photo: "/a3.webp",
    },
    {
      id: 4,
      name: "Sarah Lee",
      role: "Actress",
      photo: "/a4.webp",
    },
    {
      id: 5,
      name: "David Gordon",
      role: "Actor",
      photo: "/a5.webp",
    },
    {
      id: 6,
      name: "Daniel Craig",
      role: "Actor",
      photo: "/a6.webp",
    },
  ];
  return (
    <section className=" cast-crew  bg-[#101010b8] text-white p-4 md:p-8">
      <h2 className="text-2xl font-bold">Cast & Crew</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {castAndCrew.map((member) => (
          <div key={member.id} className="text-center cursor-pointer">
            <img
              src={member.photo}
              alt={member.name}
              className="w-20 h-20 md:w-32 md:h-32 rounded-full mx-auto"
            />
            <h3 className="mt-2 text-sm md:text-base">{member.name}</h3>
            <p className="text-xs md:text-sm text-gray-400">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CastAndCrew;
