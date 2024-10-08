import React, { useEffect, useState } from "react";
const LoggedInDevices = () => {
  return (
    <section className={`my-list  bg-black  text-white p-4 md:p-8`}>
      <div className=" bg-[#0b0b0b] relative py-4 text-white px-8  w-full">
        <h2 className="text-2xl  font-bold text-white group-hover/item:underline decoration-2 duration-150 ease-in underline-offset-2  ">
          Logged in Details
        </h2>
        <div className="pt-3  w-full">
          <ul className="flex flex-col gap-2 text-sm">
            {JSON.parse(localStorage.getItem("deviceDetails"))?.map(
              (session, index) => {
                const dateObject = new Date(session?.updatedAt);
                let hours = dateObject.getHours();
                let month = dateObject.getMonth();

                let day = dateObject.getDay();
                let year = dateObject.getFullYear();
                const minutes = dateObject
                  .getMinutes()
                  .toString()
                  .padStart(2, "0");

                // Determine AM or PM
                const ampm = hours >= 12 ? "PM" : "AM";

                // Convert hours to 12-hour format and remove leading zero
                hours = hours % 12 || 12;

                const formattedTime = `${day}/${month}/${year} (${hours}:${minutes} ${ampm})`;
                return (
                  <li key={index}>
                    Device: {session.device}, Time: {formattedTime}
                  </li>
                );
              }
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default LoggedInDevices;
