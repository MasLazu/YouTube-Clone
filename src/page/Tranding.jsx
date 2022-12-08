import { useEffect, useState } from "react";
import axios from "axios";
import "react-loading-skeleton/dist/skeleton.css";

import CardVideoVertical from "../components/CardVideoVertical";
import SkeletonCardVideoVertical from "../components/SkeletonCardVideoVertical";

const Tranding = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const datas = await axios.get(
          `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=24&regionCode=ID&key=${process.env.REACT_APP_YOUTUBE_KEY_3}`
        );
        getProfilePicture(datas.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  const getProfilePicture = async (data) => {
    try {
      const profilePrictures = await Promise.all(
        data.items.map(async (element) => {
          const pp = await axios.get(
            `https://www.googleapis.com/youtube/v3/channels?part=snippet&fields=items%2Fsnippet%2Fthumbnails%2Fdefault&id=${element.snippet.channelId}&key=${process.env.REACT_APP_YOUTUBE_KEY_3}`
          );
          return pp.data.items[0].snippet.thumbnails.default.url;
        })
      );
      data.items.forEach((items, i) => {
        data.items[i].profilePricture = profilePrictures[i];
      });
      //console.log(data);
      setData(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const nextPage = async () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    setLoading(true);
    try {
      const dataNextPage = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&part=statistics&chart=mostPopular&maxResults=24&pageToken=${data.nextPageToken}&regionCode=US&key=${process.env.REACT_APP_YOUTUBE_KEY_3}`
      );
      getProfilePicture(dataNextPage.data);
    } catch (err) {
      console.log(err);
    }
  };

  const prevPage = async () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    setLoading(true);
    try {
      const dataprevPagePage = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&part=statistics&chart=mostPopular&maxResults=24&pageToken=${data.prevPageToken}&regionCode=US&key=${process.env.REACT_APP_YOUTUBE_KEY_3}`
      );
      getProfilePicture(dataprevPagePage.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="sm:m-[3vw] mt-[5vw] w-[25rem] sm:container">
          {loading ? (
            <SkeletonCardVideoVertical count={24} />
          ) : (
            data.items.map((data, index) => (
              <CardVideoVertical
                profilePicture={data.profilePricture}
                thumbnail={data.snippet.thumbnails.medium.url}
                title={data.snippet.title}
                channel={data.snippet.channelTitle}
                views={data.statistics.viewCount}
                key={data.id}
                tranding={index + 1}
                id={data.id}
                tags={data.snippet.tags}
                desc={data.snippet.description}
                likes={data.statistics.likeCount}
                duration={data.contentDetails.duration}
              />
            ))
          )}
        </div>
      </div>
      <div className="flex items-center justify-center text-center mb-10">
        {!loading && data.hasOwnProperty("prevPageToken") ? (
          <div
            onClick={prevPage}
            class="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Previous
          </div>
        ) : (
          ""
        )}
        {!loading && data.hasOwnProperty("nextPageToken") ? (
          <div
            onClick={nextPage}
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
          >
            Next
            <svg
              aria-hidden="true"
              class="w-5 h-5 ml-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Tranding;
