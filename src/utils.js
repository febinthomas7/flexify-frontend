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
