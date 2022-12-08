import Skeleton from "react-loading-skeleton";

const SkeletonVideoRecomendation = ({ count }) => {
  return Array(count)
    .fill(0)
    .map((nothing, i) => (
      <div className="cardVideoRecomendation grid grid-cols-12 mb-2" key={i}>
        <div className="md:col-span-5 sm:col-span-4 col-span-5 md:rounded-lg rounded-xl w-[100%]">
          <Skeleton
            style={{
              aspectRatio: "16 / 9",
              borderRadius: "0.5rem",
              width: "100%",
            }}
          />
        </div>
        <div className="desc md:col-span-7 sm:col-span-8 col-span-7 xl:p-2 px-2">
          <Skeleton count={3} />
        </div>
      </div>
    ));
};
export default SkeletonVideoRecomendation;
