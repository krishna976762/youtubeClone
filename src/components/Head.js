import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "react-avatar";
import { FaMicrophone } from "react-icons/fa";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FiMenu } from "react-icons/fi";
import { toggleMenu } from "../redux/slice/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/Constants";
import { chacheResult } from "../redux/slice/searchSlice";
import { setCategory  } from '../redux/slice/appSlice';



const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestion, setSuggestion] = useState();
  const [showSuggestion, setShowSuggestion] = useState(false);
  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const toggleMenuHandler = (e) => {
    e.preventDefault();
    dispatch(toggleMenu());
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const searchVideo = () =>{
    dispatch(setCategory(searchQuery))
  }

  const selectSuggestion = (query) =>{
    dispatch(setCategory(query))
  }

  useEffect(() => {
    // Make an API call after every key press
    // But if the difference between two API calls is 2ms then decline the API call
    let timer;

    if (
      typeof searchCache === "object" &&
      searchCache.hasOwnProperty(searchQuery)
    ) {
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
      dispatch(chacheResult({ [searchQuery]: json[1] }));
      setSuggestion(json[1]);
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
    }
  };

const startSpeech = () =>{
  
}
// useEffect(() =>{
//   setSearchQuery(transcript)
// },)


  return (
    <div className="grid grid-flow-col p-5 shadow-lg">
      <div className="flex col-span-1 cursor-pointer">
        <FiMenu onClick={toggleMenuHandler} size={30} />
        <img
          className="h-8 ml-2"
          src="https://freebiehive.com/wp-content/uploads/2023/04/Youtube-Logo-Vector.jpg"
          alt="youtubeLogo"
        />
      </div>
      <div className="col-span-10 px-10">
        <div className="flex">
          <input
            type="text"
            placeholder="Search"
            className="px-5 p-2 w-1/2 border border-gray-400 rounded-l-full"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestion(true)}
            onBlur={() => setShowSuggestion(false)}
          />
          <div className="relative inline-block group">
            <button onClick={searchVideo} className="bg-gray-100 border border-gray-400 p-2 rounded-r-full">
              <img
                className="h-6"
                src="https://icons.veryicon.com/png/o/miscellaneous/prototyping-tool/search-bar-01.png"
                alt="search"
              />
            </button>
            <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-2rem] bg-black bg-opacity-75 text-white text-base px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              Search
            </span>
           
          </div>
          {/* <div 
      className="mx-4 my-2 cursor-pointer"  
     onClick={() =>SpeechRecognition?.startListening}
    >
      <FaMicrophone size={20} />
    </div> */}
        </div>
        {showSuggestion && suggestion?.length > 0 && (
          <div className="absolute bg-white py-2 px-2 w-[32%] shadow-lg rounded-lg border border-gray-100">
            <ul>
              {suggestion.map((s) => (
                <li  onClick={() => selectSuggestion(s)} key={s} className="py-2 px-3 shadow-sm hover:bg-gray-100">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
{transcript}
      <div className="flex col-span-1 justify-end">
       
        <Avatar src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkDxZWXhMw0EO3nXAG2QcPVj4ZAZRpg2Ddhw&s"} size={40} round={true} />
      </div>
    </div>
  );
};

export default Head;
