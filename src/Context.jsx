import { createContext, useState, useRef } from "react";

export const Watch = createContext();
const Context = ({ children }) => {
  const [deleteWatch, setDeleteWatch] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [userName, setUserName] = useState("");
  const [editedUserName, setEditedUserName] = useState("");
  const [profileDelete, setProfileDelete] = useState(false);
  const [movieAdded, setMovieAdded] = useState(false);
  const [userList, setUserList] = useState([]);
  const [userlike, setUserLike] = useState([]);
  const [prevButtonVisible, setPrevButtonVisible] = useState(false);
  const [nextButtonVisible, setNextButtonVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [moreInfo, setMoreInfo] = useState(false);
  const [moreInfoData, setMoreInfoData] = useState();

  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300; // Adjust this value based on your layout
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

      if (direction === "next") {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });

        // Check if user has reached the end after scrolling
        setTimeout(() => {
          if (scrollRef.current.scrollLeft + clientWidth >= scrollWidth - 50) {
            setNextButtonVisible(false);
          } else {
            setNextButtonVisible(true);
            setPrevButtonVisible(true);
          }
        }, 300);
      } else if (direction === "prev") {
        setTimeout(() => {
          if (scrollRef.current.scrollLeft < 20) {
            setPrevButtonVisible(false);
          } else {
            setPrevButtonVisible(true);
            setNextButtonVisible(true);
          }
        }, 300);
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  };

  const explore = (e) => {
    e.stopPropagation();
    setIsOpen(true);
    document.body.classList.add("scroll");
  };

  const MoreInfo = (e, movie) => {
    e.stopPropagation();
    setMoreInfo(true);
    document.body.classList.add("scroll");
    setMoreInfoData(movie);
    setIsOpen(false);
    document.getElementById("backdrop")?.scrollIntoView(0);
  };
  const closeinfo = (e) => {
    e.stopPropagation();
    setMoreInfo(false);
    document.body.classList.remove("scroll");
  };
  const closeExplore = (e) => {
    e.stopPropagation();
    setIsOpen(false);
    document.body.classList.remove("scroll");
  };

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
        userList,
        setUserList,
        userlike,
        setUserLike,
        handleScroll,
        prevButtonVisible,
        nextButtonVisible,
        isOpen,
        moreInfo,
        moreInfoData,
        explore,
        MoreInfo,
        closeinfo,
        closeExplore,
        scrollRef,
      }}
    >
      {children}
    </Watch.Provider>
  );
};

export default Context;
