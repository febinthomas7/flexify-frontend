import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../../utils";
import { ToastContainer } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { IoPencilSharp } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [userName, setUserName] = useState("");

  const [editedUserName, setEditedUserName] = useState();
  const [userEmail, setUserEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate("");

  const handleInputChange = async (e) => {
    try {
      const url = `${
        import.meta.env.VITE_BASE_URL
      }/auth/avatar?userId=${localStorage.getItem("userId")}`;
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();

      setAvatarUrl(result.userdp);

      setUserName(result.name);

      localStorage.setItem("name", result.name);
      localStorage.setItem("avatar", result.userdp);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleInputChange();
    setUserName(localStorage.getItem("name"));
    setUserEmail(localStorage.getItem("email"));
  }, []);
  const userLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    localStorage.removeItem("userList");
    localStorage.removeItem("avatar");
    handleSuccess("Logged out successfully!");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  return (
    <section className=" justify-center bg-[#0b0b0b] text-white p-4 pt-24 md:py-20 md:px-8 ">
      <div className="container mx-auto flex flex-col gap-5 sm:gap-6 justify-center items-center relative ">
        <div className="flex gap-6 justify-center items-center relative">
          {open && (
            <div className="absolute top-0 bg-black z-10 flex gap-3 flex-col justify-center items-center rounded py-4 px-[20px]">
              <img
                src={avatarUrl || "/avatar.webp"}
                onError={(e) => {
                  e.target.src = "/avatar.webp";
                }}
                alt="Current Avatar"
                className="w-16 h-16 object-cover rounded-full"
              />
              <form
                action={`${
                  import.meta.env.VITE_BASE_URL
                }/auth/upload?userId=${localStorage.getItem("userId")}&name=${
                  editedUserName || userName
                }&email=${userEmail}`}
                method="post"
                encType="multipart/form-data"
                className="w-full flex flex-col justify-center items-center gap-3 text-black"
              >
                <input
                  type="file"
                  name="avatar"
                  className="text-white w-fit bg-red-800"
                />
                <input
                  defaultValue={userName}
                  value={editedUserName}
                  onChange={(e) => setEditedUserName(e.target.value)}
                  type="text"
                  name="name"
                  placeholder="enter name"
                  className="p-1 w-full"
                />
                <button
                  className="bg-red-800 text-white font-bold rounded p-2 w-fit"
                  type="submit"
                >
                  save
                </button>
              </form>
            </div>
          )}

          {open ? (
            <RxCross1
              onClick={() => setOpen(!open)}
              className="text-white absolute top-1 right-1 z-20 cursor-pointer"
            />
          ) : (
            <IoPencilSharp
              onClick={() => setOpen(!open)}
              className="text-white absolute top-1 right-1 cursor-pointer"
            />
          )}

          <img
            src={avatarUrl || "/avatar.webp"}
            alt={avatarUrl}
            onError={(e) => {
              e.target.src = "/avatar.webp";
            }}
            className="w-24 h-24 object-cover md:w-32 md:h-32 rounded-full"
          />
          <div className=" md:mt-0  md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold">{userName}</h1>
            <p className="mt-2">{userEmail}</p>
          </div>
        </div>
        <button
          onClick={userLogOut}
          className="rounded px-3 py-2 w-[300px] bg-red-600 duration-100 ease-in capitalize hover:scale-105 font-bold"
        >
          Log Out
        </button>
      </div>

      <ToastContainer />
    </section>
  );
};

export default Profile;
