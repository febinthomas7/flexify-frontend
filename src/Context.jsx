import { createContext, useState } from "react";

export const Watch = createContext();
const Context = ({ children }) => {
  const [deleteWatch, setDeleteWatch] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [userName, setUserName] = useState("");
  const [editedUserName, setEditedUserName] = useState("");
  const [profileDelete, setProfileDelete] = useState(false);
  const [movieAdded, setMovieAdded] = useState(false);

  return (
    <Watch.Provider
      value={{
        deleteWatch,
        setDeleteWatch,
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
        movieAdded,
        setMovieAdded,
      }}
    >
      {children}
    </Watch.Provider>
  );
};

export default Context;
