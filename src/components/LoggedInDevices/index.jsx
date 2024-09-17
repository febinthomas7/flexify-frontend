import React, { useEffect, useState } from "react";
import { getDeviceDetails } from "../../utils";
const LoggedInDevices = () => {
  const [deviceDetails, setDeviceDetails] = useState([]);
  useEffect(() => {
    const fetchDeviceDetails = async () => {
      const deviceDetails = await getDeviceDetails();
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/auth/user/device`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(deviceDetails),
        }
      );

      const data = await response.json();
      setDeviceDetails(data?.user.devicedetails);

      console.log(data.user.devicedetails); // This will log both the IP address and device details
    };

    fetchDeviceDetails();
  }, []);
  console.log(deviceDetails);

  return (
    <section className={`my-list  bg-black  text-white p-4 md:p-8`}>
      <div className=" bg-[#0b0b0b] relative py-4 text-white px-8">
        <h2 className="text-2xl  font-bold text-white group-hover/item:underline decoration-2 duration-150 ease-in underline-offset-2  ">
          Logged in Devices
        </h2>
        <div className="pt-3">
          <ul className="flex flex-col gap-2 text-sm">
            {deviceDetails?.map((session, index) => (
              <li key={index}>
                Device: {session.device}, IP: {session.ipAddress}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default LoggedInDevices;
