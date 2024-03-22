import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../redux/slice/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/Constants";
import { chacheResult } from "../redux/slice/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestion, setSuggestion] = useState();
  const [showSuggestion, setShowSuggestion] = useState(false);
const searchCache= useSelector(store => store.search)
  const dispatch = useDispatch();

  const toggleMenuHandler = (e) => {
    e.preventDefault();
    dispatch(toggleMenu());
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    // Make an API call after every key press
    // But if the difference between two API calls is 2ms then decline the API call
    let timer;
  
    if (typeof searchCache === 'object' && searchCache.hasOwnProperty(searchQuery)) {
      setSuggestion(searchCache[searchQuery]);
    } else {
      timer = setTimeout(() => {
        getSearchSuggestion();
      }, 200);
    }
  
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);
  

  const getSearchSuggestion = async () => {
    const proxyUrl = "https://thingproxy.freeboard.io/fetch/";
    const apiUrl = YOUTUBE_SEARCH_API + searchQuery;

    try {
      const response = await fetch(proxyUrl + apiUrl);
      const json = await response.json();
dispatch(chacheResult( {[searchQuery]:json[1]}))
      setSuggestion(json[1]);
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
    }
  };

  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1 cursor-pointer">
        <img
          onClick={toggleMenuHandler}
          className="h-8"
          src="https://cdn.iconscout.com/icon/free/png-256/free-hamburger-menu-462145.png?f=webp"
          alt="hamburger-icon"
        />
        <img
          className="h-8 ml-2"
          src="https://t3.ftcdn.net/jpg/05/07/46/84/360_F_507468479_HfrpT7CIoYTBZSGRQi7RcWgo98wo3vb7.jpg"
          alt="youtubeLogo"
        />
      </div>
      <div className="col-span-10 px-10">
        <div>
          <input
            type="text"
            className="px-5 p-2 w-1/2 border border-gray-400 rounded-l-full"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestion(true)}
            onBlur={() => setShowSuggestion(false)}
          />
          <button className="bg-gray-100 border border-gray-400 p-2 rounded-r-full">
            <img
              className="h-6"
              src="https://icons.veryicon.com/png/o/miscellaneous/prototyping-tool/search-bar-01.png"
              alt="search"
            />
          </button>
        </div>
        {showSuggestion && suggestion?.length > 0 && (
          <div className="absolute bg-white py-2 px-2 w-[32%] shadow-lg rounded-lg border border-gray-100">
            <ul>
              {suggestion.map((s) => (
                <li key={s} className="py-2 px-3 shadow-sm hover:bg-gray-100">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex col-span-1">
        <img
          src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
          alt="userIcon"
          className="h-8"
        />
      </div>
    </div>
  );
};

export default Head;
