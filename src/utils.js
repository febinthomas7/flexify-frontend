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
  console.log(userAgent);
  let ipAddress = "Unknown IP";

  try {
    const response = await fetch("https://api.ipify.org?format=json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    ipAddress = data.ip;
  } catch (error) {
    console.error("Error fetching IP address:", error.message);
  }

  return {
    device,
    userid: localStorage.getItem("userId"),
    ipAddress,
  };
};
