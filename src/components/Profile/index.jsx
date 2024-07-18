const Profile = () => {
  return (
    <section className="profile bg-[#06081d] text-white p-4 md:py-20 md:px-8">
      <div className="container mx-auto flex flex-col items-center md:flex-row">
        <img
          src="/avatar.webp"
          alt="User Avatar"
          className="w-24 h-24 md:w-32 md:h-32 rounded-full"
        />
        <div className="mt-4 md:mt-0 md:ml-8 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold">Bindass</h1>
          <p className="mt-2">xxx@gmail.com</p>
          <p className="mt-2">Subscription: Premium</p>
        </div>
      </div>
    </section>
  );
};

export default Profile;
