import React from "react";

const VideoCard = ({ info }) => {
  const { snippet, statistics } = info;
  const { channelTitle, thumbnails, title } = snippet;
  return (
    <div className="p-2 m-2 w-72 shadow-lg">
      <img
        className="rounded-lg"
        src={thumbnails.medium.url}
        alt="thummbnail"
      />
      <ul>
        <li
          className="font-bold py-2"
          style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}
        >
          {title}
        </li>
        <li>{channelTitle}</li>
        <li>{statistics.viewCount} views</li>
      </ul>
    </div>
  );
};

export const AdVideoCard = ({ info }) =>{
  <div className="p-1 n-1 border-red-900">
    <VideoCard info={info}  />
  </div>
}
export default VideoCard;
