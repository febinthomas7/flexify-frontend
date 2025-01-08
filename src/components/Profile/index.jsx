import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess, handleError } from "../../utils";
import { RxCross1 } from "react-icons/rx";
import { IoPencilSharp } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";
import { MdDeleteForever } from "react-icons/md";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { Watch } from "../../Context";
import { MessagingContext } from "../../MessageContext";
const Profile = () => {
  const [userEmail, setUserEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    backgroundImage,
    setBackgroundImage,
    avatarUrl,
    setAvatarUrl,
    userName,
    setUserName,
    editedUserName,
    setEditedUserName,
    profileDelete,
    setProfileDelete,
  } = useContext(Watch);
  const { socket, setAuth, setSocket } = useContext(MessagingContext);
  const navigate = useNavigate("");

  const no_image = "/no_image.svg";
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
  const deleteOption = async (e) => {
    try {
      const url = `${
        import.meta.env.VITE_BASE_URL
      }/auth/deleteuserprofileinfo?userid=${localStorage.getItem(
        "userId"
      )}&item=${e}`;
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();

      setAvatarUrl(result.dp);
      localStorage.setItem("avatar", result.dp);
      setBackgroundImage(result.background);
      localStorage.setItem("background", result.background);
      handleSuccess(result.message);
      setProfileDelete(false);
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
        setUserName(data.name);
        localStorage.setItem("name", data.name);
        setBackgroundImage(data.background);
        localStorage.setItem("background", data.background);
        setAvatarUrl(data.dp);
        localStorage.setItem("avatar", data.dp);
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
  const userLogOut = async () => {
    const userAgent = navigator.userAgent;
    let device = "Unknown Device";

    if (/mobile/i.test(userAgent)) {
      device = "Mobile";
    } else if (/iPad|Tablet/i.test(userAgent)) {
      device = "Tablet";
    } else if (/iPhone/i.test(userAgent)) {
      device = "iPhone";
    } else if (/android/i.test(userAgent)) {
      device = "Android Device";
    } else {
      device = "Desktop";
    }

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/auth/device-logout?userid=${localStorage.getItem(
          "userId"
        )}&device=${device}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await response.json();
      await fetch(`${import.meta.env.VITE_BASE_URL}/auth/device-logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      handleSuccess("Logged out successfully!");
      setAuth(false); // User is no longer authenticated
      window.localStorage.clear();
      // Cleanup socket if it exists
      if (socket) {
        socket.disconnect();
        setSocket(null); // Reset socket state
      }

      setTimeout(() => {
        navigate("/login");
      }, 1000);

      setLoading(false);
    } catch (error) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      setLoading(false);
      console.log(error);
    }
  };

  const option = () => {
    setOpen(!open);
    setProfileDelete(false);
  };
  return (
    <section
      className={` justify-center bg-[#0b0b0b] text-white p-4 pt-24 md:py-20 md:px-8   bg-cover bg-center`}
      style={{
        backgroundImage: `url(${
          backgroundImage ||
          (localStorage.getItem("background") !== "null" &&
            localStorage.getItem("background") !== "undefined") ||
          "/bgImage.svg"
        })`,
      }}
    >
      <div className="container mx-auto flex flex-col gap-5 sm:gap-6 justify-center items-center relative ">
        <div className="flex gap-6 justify-center items-center relative">
          {open && (
            <div className="absolute top-0 bg-black z-10 flex  flex-col justify-center items-center rounded py-4 px-[5px]">
              <div className="absolute top-14 right-2 flex   justify-center items-center ">
                <MdDeleteForever
                  title="delete"
                  className="text-white cursor-pointer"
                  onClick={() => setProfileDelete(!profileDelete)}
                />
                {profileDelete && (
                  <div className="absolute right-10 z-10  text-white bg-[#000000a2] outline outline-gray-600 outline-1">
                    <button
                      onClick={() => deleteOption("dp")}
                      className="px-4 hover:bg-red-700"
                    >
                      remove_dp
                    </button>
                    <button
                      onClick={() => deleteOption("backgroundImg")}
                      className="px-4 hover:bg-red-700"
                    >
                      remove_bg
                    </button>
                  </div>
                )}
              </div>

              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col justify-center items-center gap-3 text-black"
              >
                {" "}
                <label htmlFor="avatar-input">
                  <div className="relative" title="edit">
                    {" "}
                    <img
                      src={avatarUrl || localStorage.getItem("avatar")}
                      onError={(e) => {
                        e.target.src = no_image;
                      }}
                      alt="Current Avatar"
                      className="w-16 h-16 object-contain bg-white rounded-full cursor-pointer"
                    />
                    <BiSolidMessageSquareEdit className="text-gray-300 absolute top-0 right-0 shadow-sm cursor-pointer" />
                  </div>
                </label>
                <div className="w-full  gap-1 text-white hidden ">
                  <input
                    type="file"
                    id="avatar-input"
                    name="avatar"
                    className="text-white w-fit bg-red-800"
                    placeholder="Upload Avatar"
                  />
                </div>
                <div className="w-full flex gap-1 justify-center items-end text-white">
                  <label htmlFor="name">Name:</label>
                  <input
                    autoFocus
                    value={editedUserName}
                    onChange={(e) => setEditedUserName(e.target.value)}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="your name"
                    className=" w-full bg-transparent outline-none"
                  />
                </div>
                <div className=" flex gap-1 justify-center items-end text-white">
                  <input
                    type="file"
                    id="background"
                    name="background"
                    className="text-white w-fit bg-blue-800 cursor-pointer"
                    placeholder="Upload Background"
                  />
                </div>
                <button
                  className={` text-white font-bold rounded px-2 py-1 w-fit  ${
                    loading
                      ? "cursor-not-allowed bg-red-500"
                      : "cursor-pointer bg-red-800 hover:scale-105"
                  }`}
                  type="submit"
                  title="save"
                  disabled={loading}
                >
                  save
                </button>
              </form>
            </div>
          )}

          {open ? (
            <RxCross1
              onClick={option}
              className="text-white absolute top-2 -right-2 sm:right-1  z-20 cursor-pointer hover:scale-105"
              title="close"
            />
          ) : (
            <IoPencilSharp
              onClick={option}
              className="text-white text-2xl absolute top-1 right-1 cursor-pointer hover:scale-105 bg-black p-1 rounded-md shadow-md "
              title="edit"
            />
          )}

          <img
            src={avatarUrl || localStorage.getItem("avatar")}
            alt={avatarUrl}
            onError={(e) => {
              e.target.src = no_image;
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
    </section>
  );
};

export default Profile;
