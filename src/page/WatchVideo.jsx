import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { rounding } from "../function/rounding";

import CardVideoRecomendation from "../components/CardVideoRecomendation";
import likeIcon from "../assets/likeIcon.webp";
import SkeletonVideoRecomendation from "../components/SkeletonVideoRecomendation";
import SkeletonVideoWatched from "../components/SkeletonVideoWatched";

const WatchVideo = () => {
  let { idVideo } = useParams();
  const [dataRecomendations, setdataRecomendations] = useState();
  const [dataVideoWatched, setDataVideoWatched] = useState();
  const [loadingVideoWatched, setLoadingVideoWatched] = useState(true);
  const [loadingRecomendation, setLoadingRecomendation] = useState(true);

  useEffect(() => {
    setLoadingVideoWatched(true);
    setLoadingRecomendation(true);
    const fetch = async () => {
      try {
        const datas = await axios.get(
          `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&part=statistics&id=${idVideo}&maxResults=1&key=${process.env.REACT_APP_YOUTUBE_KEY_4}`
        );
        getProfilePicture(datas.data.items[0]);
        getRecomendationId();
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, [idVideo]);

  const getProfilePicture = async (data) => {
    try {
      const profilePrictures = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&fields=items%2Fsnippet%2Fthumbnails%2Fdefault&id=${data.snippet.channelId}&key=${process.env.REACT_APP_YOUTUBE_KEY_4}`
      );
      data.profilePricture =
        profilePrictures.data.items[0].snippet.thumbnails.default.url;
      //console.log(data);
      setDataVideoWatched(data);
      setLoadingVideoWatched(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getRecomendationId = async () => {
    setLoadingRecomendation(true);
    try {
      const dataId = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=24&relatedToVideoId=${idVideo}&safeSearch=none&type=video&key=${process.env.REACT_APP_YOUTUBE_KEY_4}`
      );
      getComplateDataRecomendation(dataId.data.items);
    } catch (err) {
      console.log(err);
    }
  };

  const getComplateDataRecomendation = async (dataId) => {
    try {
      const complateDatas = await Promise.all(
        dataId.map(async (item) => {
          const complateDataVideo = await axios.get(
            `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&part=statistics&id=${item.id.videoId}&key=${process.env.REACT_APP_YOUTUBE_KEY_4}`
          );
          return complateDataVideo.data.items[0];
        })
      );
      //console.log(complateDatas);
      setdataRecomendations(complateDatas);
      setLoadingRecomendation(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-[100vw] flex justify-center">
      <div className="container grid grid-cols-12">
        {loadingVideoWatched ? (
          <SkeletonVideoWatched />
        ) : (
          <div className="videoWatched md:col-span-8 col-span-12 p-4">
            <iframe
              src={`https://www.youtube.com/embed/${idVideo}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="videoPlayer w-[100%] rounded-lg aspect-[16/9]"
            ></iframe>
            <div className="tags flex flex-wrap mt-1 lg:max-h-[44px] md:max-h-[36px] max-h-[32px] overflow-hidden">
              {dataVideoWatched.snippet.tags.map((tag) => (
                <p className="text-blue-700 lg:text-sm text-xs mr-1">#{tag}</p>
              ))}
            </div>
            <h2 className="font-semibold lg:text-xl sm:text-lg text-base">
              {dataVideoWatched.snippet.title}
            </h2>
            <div className="flex justify-between my-2 flex-wrap">
              <div className="channel flex sm:max-w-[60%] w-[100%] justify-between sm:justify-start">
                <div className="flex">
                  <img
                    src={dataVideoWatched.profilePricture}
                    className="h-11 w-11 rounded-full cursor-pointer self-center"
                  />
                  <h3 className="items-stretch self-center ml-2 font-semibold lg:text-lg md:text-base sm:text-lg sm:leading-[24px] lg:leading-[24px] cursor-pointer">
                    {dataVideoWatched.snippet.channelTitle}
                  </h3>
                </div>
                <div className="subscribe lg:mx-6 mx-2 flex items-center">
                  <button className="px-5 py-[7px] lg:text-bas text-sm bg-[#1a56db] font-semibold text-white rounded-full cursor-pointer hover:brightness-125 duration-[50ms] active:brightness-75 active:scale-95">
                    Subscribe
                  </button>
                </div>
              </div>
              <div className="ratingVideo h-[34px] self-center flex mt-3 sm:mt-0">
                <button className="likeButton bg-slate-300 py-2 px-5 rounded-l-full border-r border-slate-600 flex hover:brightness-105">
                  <img src={likeIcon} className="h-[14px] self-center mr-2" />
                  <p className="text-sm lg:text-base self-center">
                    {rounding(dataVideoWatched.statistics.likeCount)}
                  </p>
                </button>
                <button className="bg-slate-300 py-2 px-5 rounded-r-full border-l border-slate-600 hover:brightness-105">
                  <img
                    src={likeIcon}
                    className="h-[14px] self-center mr-1 rotate-180"
                  />
                </button>
              </div>
            </div>
            <div className="descVideo mt-4 bg-slate-300 rounded-xl p-4">
              <p className="font-semibold text-xs lg:text-sm">
                {rounding(dataVideoWatched.statistics.viewCount)} x ditonton
              </p>
              <p className="text-xs lg:text-sm text-ellipsis overflow-hidden">
                {dataVideoWatched.snippet.description}
              </p>
            </div>
          </div>
        )}
        <div className="videoRecomendation md:col-span-4 col-span-12 flex flex-col py-4 md:pr-4 md:pl-0 px-4">
          {loadingRecomendation ? (
            <SkeletonVideoRecomendation count={24} />
          ) : (
            dataRecomendations.map((data) => {
              return (
                <CardVideoRecomendation
                  title={data.snippet.title}
                  channel={data.snippet.channelTitle}
                  views={data.statistics.viewCount}
                  likes={data.statistics.likeCount}
                  thumbnail={data.snippet.thumbnails.medium.url}
                  id={data.id}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
export default WatchVideo;
