import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { YOUTUBE_VIDEO_API } from "../utils/Constants";

const VideoCard = ({ info }) => { 
  const [thumbNail, setThumbnail] = useState();
  const { snippet, statistics } = info;
  const { channelTitle, thumbnails, title } = snippet;

  return (
    <div className="p-2 my-2 w-82 shadow-lg">
      <img
        className="rounded-xl w-full'"
        src={thumbnails.medium.url}
        alt="thummbnail"
      />
      <div className="flex">
        <ul>
          <li
            className="font-bold py-2"
            style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
          >
            {title}
          </li>
          <li>{channelTitle}</li>
          <li>{statistics?.viewCount} views</li>
        </ul>
      </div>
    </div>
  );
};

export const AdVideoCard = ({ info }) => {
  <div className="p-1 n-1 border-red-900">
    <VideoCard info={info} />
  </div>;
};
export default VideoCard;
