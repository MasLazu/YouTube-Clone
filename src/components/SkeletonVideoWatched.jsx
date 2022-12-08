import Skeleton from "react-loading-skeleton";

import likeIcon from "../assets/likeIcon.webp";

const SkeletonVideoWatched = () => {
  return (
    <div className="videoWatched md:col-span-8 col-span-12 p-4">
      <Skeleton
        style={{ aspectRatio: "16/9", width: "100%", borderRadius: "0.5rem" }}
      />
      <Skeleton height={16} />
      <Skeleton height={20} count={2} />
      <div className="flex justify-between my-2 flex-wrap">
        <div className="channel flex sm:max-w-[60%] w-[100%] justify-between sm:justify-start">
          <div className="flex">
            <Skeleton height={44} width={44} circle />
            <Skeleton
              height={20}
              width={150}
              style={{ marginTop: "1rem", marginLeft: "0.5rem" }}
            />
          </div>
          <div className="subscribe lg:mx-6 mx-2 flex items-center">
            <Skeleton
              height={36}
              width={100}
              style={{ borderRadius: "999rem" }}
            />
          </div>
        </div>
        <div className="ratingVideo h-[34px] self-center flex mt-3 sm:mt-0">
          <Skeleton
            height={36}
            width={120}
            style={{ borderRadius: "999rem" }}
          />
        </div>
      </div>
      <div className="descVideo mt-4 bg-slate-300 rounded-xl p-4">
        <Skeleton count={5} />
      </div>
    </div>
  );
};
export default SkeletonVideoWatched;
