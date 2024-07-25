import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Avatar from "react-avatar";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { PiShareFatLight } from "react-icons/pi";
import { GoDownload } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuSendHorizonal } from "react-icons/lu";

import { closeMenu } from "../redux/slice/appSlice";
import { useSearchParams } from "react-router-dom";
import { GOOGLE_API_KEY } from "../utils/Constants";
import CommentsContainers from "./CommentsContainers";
import LiveChat from "./LiveChat";

const WatchPage = () => {
  const [videoDetails, setVideoDetails] = useState();
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("v"));
  const dispatch = useDispatch();
  const videoId = searchParams.get("v");

  const getSignleVideoData = async () => {
    try {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${GOOGLE_API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }
      const json = await response.json();
      setVideoDetails(json.items[0]);
      console.log(json.items, "krishna");
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    dispatch(closeMenu());
    getSignleVideoData();
  }, [dispatch]);

  return (
    <div className="flex flex-col w-full">
      <div className="px-5 mb-5 flex w-full">
        <div className="flex-grow-[7]">
          <iframe
            width="900"
            height="500"
            src={"https://www.youtube.com/embed/" + searchParams.get("v")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <h1 className="font-bold mt-2 text-lg">
            {videoDetails?.snippet?.title}
          </h1>

          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between w-[35%]">
              <div className="flex">
                <Avatar
                  src="https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw"
                  size={35}
                  round={true}
                />
                <h1 className="font-bold ml-2">
                  {videoDetails?.snippet?.channelTitle}
                </h1>
              </div>
              <button className="px-4 py-1 font-medium bg-black text-white rounded-full">
                Subscribe
              </button>
            </div>
            <div className="flex items-center w-[40%] justify-between mt-2">
              <div className="flex items-center cursor-pointer bg-gray-200 px-4 py-2 rounded-full">
                <AiOutlineLike size="20px" className="mr-1" />
                <h4 className="mr-1">{videoDetails?.statistics?.likeCount} 
                  </h4>
                <div  className="mr-1"> |
                  </div>
                <AiOutlineDislike size="20px" />
              </div>
              <div className="flex items-center cursor-pointer bg-gray-200 px-4 py-2 rounded-full">
                <PiShareFatLight size="20px" className="mr-2" />
                <span>Share</span>
              </div>
              <div className="flex items-center cursor-pointer bg-gray-200 px-4 py-2 rounded-full">
                <GoDownload />
                <span>Download</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-grow-[3] w-full">
          <LiveChat />
        </div>
      </div>

      <div>
        <CommentsContainers />
      </div>
    </div>
  );
};

export default WatchPage;
