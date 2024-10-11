import { toast } from "react-toastify";
import { useState, useEffect, useContext } from "react";

// const {
//   deleteWatch,
//   setDeleteWatch,
//   movieAdded,
//   userList,
//   setUserList,
//   userlike,
//   setUserLike,
// } = useContext(Watch);
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

// export const addwatch = async (e, movie, type, mode) => {
//   e.stopPropagation();

//   try {
//     const url = `${import.meta.env.VITE_BASE_URL}/auth/addwatch`;
//     const userId = localStorage.getItem("userId");
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         movie,
//         type,
//         mode,
//         userId,
//       }),
//     });

//     const result = await response.json();
//     const { success, message, error, data } = result;
//     if (success) {
//       setUserList([...userList, data]);
//       // console.log(userList);
//       handleSuccess(message);
//     } else if (error) {
//       handleError(error?.details[0].message);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
