import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";

const Header = () => {
  const dispatch = useDispatch();
  const searchCache = useSelector((store)=>store.search)
  
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestion, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
  const timer = setTimeout(() =>{
    if(searchCache[searchQuery]){
      setSuggestions(searchCache[searchQuery]);
    }else{
      getSearchSuggestion()
    }
  } , 200);



    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestion = async () => {
    console.log("api call- " + searchQuery);
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);

    //update cache
    dispatch(cacheResults({
      [searchQuery]: json[1]
    }))

  };

  return (
    <div className="grid grid-flow-col m-2 p-2 shadow-lg">
      <div className="flex col-span-1">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-8 mx-2 cursor-pointer"
          alt="menu"
          src="https://static.vecteezy.com/system/resources/previews/002/292/406/original/hamburger-menu-line-icon-free-vector.jpg"
        />
        <img
          className="h-8"
          src="https://w7.pngwing.com/pngs/674/324/png-transparent-youtube-logo-music-video-computer-icons-youtube-logo-text-trademark-logo.png"
          alt="logo"
        />
      </div>

      <div className="col-span-10">
        <input
          className=" w-1/2 px-10 border border-gray-400 rounded-l-full p-2"
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
        />
        <button className="border border-gray-400 p-2 rounded-r-full">
          search
        </button>

        {showSuggestions && (
          <div className="fixed bg-white py-2 px-2 w-[40rem] shadow-lg rounded-lg border border-white">
            <ul>
              {suggestion.map((s) => (
                <li className="py-2 px-3 shadow-sm hover:bg-gray-100">{s}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="col-span-1">
        <img
          className="h-8"
          src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
          alt="user-icon"
        />
      </div>
    </div>
  );
};

export default Header;

    // debouncing
    // on changing the input value in the search bar suggestion is showed after
    // every 300ms
    //  this is clearing the set timeout
    // suppose you typed i so the timeout function starts running for 300 ms
    // so if you typed anything before 300 ms it will clearr the timeout and will
    // start running again and the for the word will not be shown.