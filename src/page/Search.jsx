import { useEffect, useState } from "react";
import axios from "axios";
import "react-loading-skeleton/dist/skeleton.css";
import { useParams } from "react-router-dom";

import CardVideoVertical from "../components/CardVideoVertical";
import CardChannelVertical from "../components/CardChannelVertical";
import SkeletonCardVideoVertical from "../components/SkeletonCardVideoVertical";

const Search = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  let { keysearch } = useParams();

  useEffect(() => {
    setLoading(true);
    const fetchId = async () => {
      try {
        const dataId = await axios.get(
          `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=24&q=${keysearch}&regionCode=ID&safeSearch=none&type=video&type=channel&key=${process.env.REACT_APP_YOUTUBE_KEY_2}`
        );
        getComplateData(dataId.data.items);
      } catch (err) {
        console.log(err);
      }
    };
    fetchId();
  }, [keysearch]);

  const getComplateData = async (dataId) => {
    try {
      const complateDatas = await Promise.all(
        dataId.map(async (item) => {
          if (item.id.hasOwnProperty("videoId")) {
            const complateDataVideo = await axios.get(
              `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&part=statistics&id=${item.id.videoId}&key=${process.env.REACT_APP_YOUTUBE_KEY_2}`
            );
            return complateDataVideo.data.items[0];
          } else if (item.id.hasOwnProperty("channelId")) {
            const complateDataChannel = await axios.get(
              `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&part=statistics&id=${item.id.channelId}&key=${process.env.REACT_APP_YOUTUBE_KEY_2}`
            );
            return complateDataChannel.data.items[0];
          }
        })
      );
      //console.log(complateDatas, "No profile Picture");
      getProfilePicture(complateDatas);
    } catch (err) {
      console.log(err);
    }
  };

  const getProfilePicture = async (data) => {
    try {
      const profilePrictures = await Promise.all(
        data.map(async (element) => {
          if (element.kind == "youtube#video") {
            const pp = await axios.get(
              `https://www.googleapis.com/youtube/v3/channels?part=snippet&fields=items%2Fsnippet%2Fthumbnails%2Fdefault&id=${element.snippet.channelId}&key=${process.env.REACT_APP_YOUTUBE_KEY_2}`
            );
            return pp.data.items[0].snippet.thumbnails.default.url;
          } else {
            return "";
          }
        })
      );
      data.forEach((items, i) => {
        if (items.kind == "youtube#video") {
          data[i].profilePricture = profilePrictures[i];
        } else {
          data[i].profilePricture = "";
        }
      });
      //console.log(data, "with profile Picture");
      setData(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-[100vw] flex justify-center">
      <div className="sm:m-[3vw] mt-[5vw] felx flex-col w-[25rem] sm:w-full">
        {loading ? (
          <SkeletonCardVideoVertical count={24} />
        ) : (
          data.map((data) => {
            if (data.kind == "youtube#video") {
              return (
                <CardVideoVertical
                  profilePicture={data.profilePricture}
                  thumbnail={data.snippet.thumbnails.medium.url}
                  title={data.snippet.title}
                  channel={data.snippet.channelTitle}
                  views={data.statistics.viewCount}
                  key={data.id}
                  id={data.id}
                  tags={data.snippet.tags}
                  likes={data.statistics.likeCount}
                  duration={data.contentDetails.duration}
                  desc={data.snippet.description}
                />
              );
            } else if (data.kind == "youtube#channel") {
              return (
                <CardChannelVertical
                  profilePicture={data.snippet.thumbnails.high.url}
                  name={data.snippet.title}
                  customUrl={data.snippet.customUrl}
                  subscriber={data.statistics.subscriberCount}
                  desc={data.snippet.description}
                />
              );
            } else {
              return "";
            }
          })
        )}
      </div>
    </div>
  );
};

export default Search;
