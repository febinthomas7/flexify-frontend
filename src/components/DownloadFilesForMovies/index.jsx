import { useEffect, useState } from "react";

import axios from "axios";

const DownloadFilesForMovies = ({ id }) => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "/api/download/movie",
      params: {
        id: id,
      },
    };

    axios.request(options).then((response) => {
      setFiles(response.data);
      setIsLoading(false);
    });
  }, [id]);

  if (files === null || typeof files === "undefined") {
    return;
  } else {
    return (
      <>
        <div className="flex gap-3  flex-wrap justify-center items-baseline">
          {files.length <= 0 ? null : (
            <h1 className="text-white flex justify-center items-center gap-3">
              Download:
            </h1>
          )}

          {isLoading &&
            Array.from({ length: 4 }, (_, i) => i).map((e) => {
              return (
                <div
                  key={e}
                  className="py-1 px-2 h-[32px] w-[59px] bg-[#0d1015ed] rounded-lg text-transparent"
                >
                  {e}
                </div>
              );
            })}
          {files.length <= 0
            ? null
            : files?.map((e, index) => {
                return (
                  <div
                    className="py-1 px-2  bg-slate-800 rounded-lg cursor-pointer text-white hover:bg-slate-700"
                    key={index}
                  >
                    <a href={e.url}>{e.quality}</a>
                  </div>
                );
              })}
        </div>
      </>
    );
  }
};

export default DownloadFilesForMovies;
