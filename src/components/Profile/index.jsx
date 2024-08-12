import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess, handleError } from "../../utils";
import { ToastContainer } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { IoPencilSharp } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [userName, setUserName] = useState("");

  const [editedUserName, setEditedUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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
      localStorage.setItem("background", result.background);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      !e.target.avatar.files[0] &&
      !editedUserName &&
      !e.target.background.files[0]
    ) {
      handleError("empty fields");
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("avatar", e.target.avatar.files[0]);
    formData.append("background", e.target.background.files[0]);
    formData.append("name", editedUserName);
    formData.append("email", userEmail);
    formData.append("userId", localStorage.getItem("userId"));

    fetch(`${import.meta.env.VITE_BASE_URL}/auth/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setUserName(localStorage.setItem("name", data.name));
        setBackgroundImage(localStorage.setItem("background", data.background));
        setAvatarUrl(localStorage.setItem("avatar", data.dp));
        if (data.success) {
          handleSuccess(data.message);
        } else {
          handleError(data.message);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
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
    localStorage.removeItem("background");
    handleSuccess("Logged out successfully!");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  return (
    <section
      className={` justify-center bg-[#0b0b0b] text-white p-4 pt-24 md:py-20 md:px-8   bg-cover bg-center`}
      style={{
        backgroundImage: `url(${
          backgroundImage || localStorage.getItem("background")
        })`,
      }}
    >
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
                className="w-16 h-16 object-contain bg-white rounded-full"
              />
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col justify-center items-center gap-3 text-black"
              >
                <div className="w-full flex gap-1 text-white">
                  <label htmlFor="avatar">dp:</label>
                  <input
                    type="file"
                    name="avatar"
                    className="text-white w-fit bg-red-800"
                    placeholder="Upload Avatar"
                  />
                </div>

                <div className="w-full flex gap-1 text-white">
                  <label htmlFor="background">bg:</label>
                  <input
                    type="file"
                    name="background"
                    className="text-white w-fit bg-blue-800"
                    placeholder="Upload Background"
                  />
                </div>

                <input
                  value={editedUserName}
                  onChange={(e) => setEditedUserName(e.target.value)}
                  type="text"
                  name="name"
                  placeholder="enter name"
                  className="p-1 w-full"
                />
                <button
                  className={` text-white font-bold rounded px-2 py-1 w-fit  ${
                    loading
                      ? "cursor-not-allowed bg-red-500"
                      : "cursor-pointer bg-red-800 hover:scale-105"
                  }`}
                  type="submit"
                  disabled={loading}
                >
                  save
                </button>
              </form>
            </div>
          )}

          {open ? (
            <RxCross1
              onClick={() => setOpen(!open)}
              className="text-white absolute top-1 right-1 z-20 cursor-pointer hover:scale-105"
              title="close"
            />
          ) : (
            <IoPencilSharp
              onClick={() => setOpen(!open)}
              className="text-white absolute top-1 right-1 cursor-pointer hover:scale-105"
              title="edit"
            />
          )}

          <img
            src={avatarUrl || localStorage.getItem("avatar")}
            alt={avatarUrl}
            onError={(e) => {
              e.target.src = "/avatar.webp";
            }}
            className="w-24 h-24 object-contain bg-white md:w-32 md:h-32 rounded-full"
          />
          <div className=" md:mt-0  md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold">
              {userName || localStorage.getItem("name")}
            </h1>
            <p className="mt-2">{userEmail}</p>
          </div>
        </div>
        <button
          onClick={userLogOut}
          className="rounded px-3 py-2 w-[300px] hover:scale-105 bg-red-600 duration-100 ease-in capitalize  font-bold"
        >
          Log Out
        </button>
      </div>

      <ToastContainer />
    </section>
  );
};

export default Profile;
