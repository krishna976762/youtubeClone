 import React, { useState } from 'react'
import {useDispatch} from "react-redux";
import { setCategory } from '../redux/slice/appSlice';

const ButtonList = () => {
  const buttonNames = [
    "All", "Gaming", "Song", "Live", "Cricket", "Music", "T-Series", "source-code", "Lo-fi",
    "News", "Cooking", "Valentine"
  ];
  const [active, setActive] = useState("All");
  const dispatch = useDispatch();

  const videoByTag = (tag) => {
    if (active !== tag) {
      dispatch(setCategory(tag));
      setActive(tag);
    }
  }


  return (
    <div className='flex pt-7 w-full overflow-x-scroll no-scrollbar my-1'>
      {/* Map through the button names array */}
      {buttonNames.map((buttonName, index) => (
        <div key={index}>
           <button onClick={() => { videoByTag(buttonName) }} className={`${active === buttonName ? "bg-slate-900 text-white" : "bg-gray-200"} w-fit font-medium mx-1 cursor-pointer px-3 py-2 rounded-lg`}><span className="whitespace-nowrap">{buttonName}</span></button>
        </div>
      ))}
    </div>
  );
};

export default ButtonList;
