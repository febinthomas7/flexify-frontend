import { toast } from "react-toastify";

export const handleSuccess = (msg) => {
  toast.success(msg, {
    position: "top-right",
    autoClose: 1000,
  });
};

export const handleError = (msg) => {
  toast.error(msg, {
    position: "top-right",
    autoClose: 1000,
  });
};

export const getDeviceDetails = async () => {
  const userAgent = navigator.userAgent;
  let device = "Unknown Device";
  const screenSize = `${window.screen.width}x${window.screen.height}`;

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

  const uniqueIdentifier = btoa(`${userAgent}-${screenSize}-${device}`);

  return {
    device,
    userid: localStorage.getItem("userId"),
    uniqueIdentifier,
  };
};

export const add = async (movie, type, mode, userList, setUserList) => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/auth/addwatch`;
    const userId = localStorage.getItem("userId");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movie,
        type,
        mode,
        userId,
      }),
    });

    const result = await response.json();
    const { success, message, error, data } = result;
    if (success) {
      setUserList([...userList, data]);
      handleSuccess(message);
    } else if (error) {
      handleError(error?.details[0].message);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteMovie = async (movie, userList, setUserList) => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/auth/deletewatch`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: movie?._id }),
    });

    const result = await response.json();
    const { success, message, error } = result;
    if (success) {
      if (Array.isArray(userList)) {
        const updatedUserList = userList.filter(
          (item) => item._id !== movie._id
        );
        setUserList(updatedUserList);
      } else {
        console.error("userList is not an array:", userList);
      }
      handleSuccess(message);
    } else if (error) {
      handleError(error?.details[0].message);
    }
  } catch (error) {
    console.log(error);
  }
};

export const userData = async (setLoading, setUsers) => {
  setLoading(true);
  try {
    const url = `${
      import.meta.env.VITE_BASE_URL
    }/chat/getusers?id=${localStorage.getItem("userId")}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    setUsers(result.data);
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

export const Message = async (userId, userName, movie, type, mode) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/chat/share`,
      {
        method: "POST",
        body: JSON.stringify({
          senderId: `${localStorage.getItem("userId")}`,
          receiverId: userId,
          message: `https://flexifyy.netlify.app/${type || mode}/${movie.id}  ${
            movie.title || movie.name
          }`,
          imageUrl:
            type == "anime"
              ? movie?.thumbnail
              : `https://image.tmdb.org/t/p/w400/${movie?.poster_path}`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // const result = await response.json();

    handleSuccess(`Message sent to ${userName}`);
  } catch (error) {
    console.log(error);
  }
};

export const addLikeById = async (e) => {
  e.stopPropagation();
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/auth/likedWatch`;
    const userId = localStorage.getItem("userId");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movie,
        type,
        mode,
        userId,
      }),
    });

    const result = await response.json();
    const { success, message, error, data } = result;
    if (success) {
      setUserLike([...userlike, data]);

      handleSuccess(message);
    } else if (error) {
      handleError(error?.details[0].message);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteLikeById = async (e) => {
  e.stopPropagation();
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/auth/deletelike`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: movie?._id }),
    });

    const result = await response.json();
    const { success, message, error } = result;

    if (success) {
      handleSuccess(message);
    } else if (error) {
      handleError(error?.details[0].message);
    }
  } catch (error) {
    console.log(error);
  }
};

export const likes = async () => {
  try {
    const url = `${
      import.meta.env.VITE_BASE_URL
    }/auth/userlist?userId=${localStorage.getItem("userId")}`;
    const headers = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    const response = await fetch(url, headers);
    const result = await response.json();

    setUserLike(result.likedlist);
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};
