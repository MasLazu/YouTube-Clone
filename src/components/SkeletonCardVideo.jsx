import Skeleton from "react-loading-skeleton";

const SkeletonCardVideo = ({ count }) => {
  return Array(count)
    .fill(0)
    .map((nothing, i) => (
      <div className="card mt-[12px] mb-4 mx-4" key={i}>
        <div className="tumbnile">
          <Skeleton style={{ aspectRatio: "16 / 9", borderRadius: "0.5rem" }} />
        </div>
        <div className="Title mt-4 mb-1">
          <Skeleton height={20} count={2} />
        </div>
        <div className="channel flex">
          <Skeleton circle height={33} width={33} />
          <Skeleton
            height={17}
            width={150}
            style={{ marginTop: "0.8rem", marginLeft: "1rem" }}
          />
        </div>
        <Skeleton height={15} style={{ marginTop: "0.4rem" }} />
      </div>
    ));
};
export default SkeletonCardVideo;
