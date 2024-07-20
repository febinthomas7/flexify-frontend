import { useEffect, useState } from "react";

const DownloadFilesForMovies = ({ id, mode }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const data = async () => {
      const result = await fetch(
        `https://api.themoviedb.org/3/${mode}/${id}?language=en-US&api_key=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const jsonData = await result.json();
      downloadableFiles(jsonData?.imdb_id);
    };
    data();
  }, [id]);

  const downloadableFiles = async (data) => {
    try {
      let res = await fetch(
        `https://yts.mx/api/v2/movie_details.json?imdb_id=${data}`
      );
      let d = await res.json();
      let torr = d.data.movie.torrents;

      setFiles(torr);
    } catch (error) {
      <h1>no files to download</h1>;
    }
  };
  if (files === null || typeof files === "undefined") {
    return null;
  } else {
    return (
      <>
        <div className="flex gap-3  flex-wrap p-3 ">
          {files.map((e, index) => {
            return (
              <div
                className="p-2 bg-slate-800 rounded-lg cursor-pointer text-white hover:bg-slate-700"
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
