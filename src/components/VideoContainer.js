import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEO_API } from "../utils/Constants";
import VideoCard,{AdVideoCard} from "./VideoCard";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    try {
      const response = await fetch(YOUTUBE_VIDEO_API);
      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }
      const json = await response.json();
      setVideos(json.items);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  return (
    <div className="flex flex-wrap">
      {videos.length > 0 && <AdVideoCard info={videos[0]} />}
      {videos.map((data) => (
        <Link to={"/watch?v=" + data.id} key={data.id}>
          <VideoCard info={data} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
