import React, { useEffect, useState } from "react";
import  axios from 'axios'
import {useDispatch,useSelector} from "react-redux";
import { YOUTUBE_VIDEO_API,GOOGLE_API_KEY } from "../utils/Constants";
import VideoCard,{AdVideoCard} from "./VideoCard";
import { setHomeVideo } from '../redux/slice/appSlice';
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const dispatch = useDispatch();
  // const [videos, setVideos] = useState([]);
  const { video, category } = useSelector((store) => store.app);

  const fetchingYoutubeVideo = async () => {
    try {
      const response = await fetch(YOUTUBE_VIDEO_API);
      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }
      const json = await response.json();
      // setVideos(json.items);
      dispatch(setHomeVideo(json.items))
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const fetchVideoByCategory = async (category) => {
    try {
        const res = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${category}&type=video&key=${GOOGLE_API_KEY}`);
        dispatch(setHomeVideo(res?.data?.items))
    } catch (error) {
        console.log(error);
    }
}
useEffect(() => {
    if (category === "All") {
        fetchingYoutubeVideo();
    } else {
        fetchVideoByCategory(category);
    }
}, [category]);

  return (
    <div className="flex flex-wrap mt-2">
      {video?.length > 0 && <AdVideoCard info={video[0]} />}
      {video?.map((data) => (
        <Link to={"/watch?v=" + data.id} key={data.id} className="w-full sm:w-1/2 md:w-1/3 p-2">
          <VideoCard info={data} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
