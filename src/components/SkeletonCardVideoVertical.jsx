import Skeleton from "react-loading-skeleton";

const SkeletonCardVideoVertical = ({ count }) => {
  return Array(count)
    .fill(0)
    .map((nothing, i) => (
      <div className="card grid grid-cols-12 mb-6 m-4" key={i}>
        <div className="tumbnile lg:col-span-4 md:col-span-5 sm:col-span-6 col-span-12 relative">
          <Skeleton
            style={{
              aspectRatio: "16 / 9",
              borderRadius: "0.5rem",
              width: "100%",
            }}
          />
        </div>
        <div className="sm:px-6 py-2 lg:col-span-8 md:col-span-7 sm:col-span-6 col-span-12">
          <Skeleton height={23} count={2} style={{ marginBottom: "0.5rem" }} />
          <Skeleton height={16} style={{ width: "60%" }} />
          <div className="channel flex">
            <Skeleton circle height={33} width={33} />
            <Skeleton
              height={17}
              width={200}
              style={{ marginTop: "0.8rem", marginLeft: "1rem" }}
            />
          </div>
          <Skeleton height={16} style={{ marginTop: "0.4rem" }} />
        </div>
      </div>
    ));
};
export default SkeletonCardVideoVertical;
