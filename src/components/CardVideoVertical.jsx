import { rounding } from "../function/rounding.js";
import { extractDuration } from "../function/extractDuration.js";
import { scrollTop } from "../function/scrollTop.js";
import { Link } from "react-router-dom";

const CardVideoVertical = (props) => {
  return (
    <Link
      to={"/watch/" + props.id}
      onClick={scrollTop}
      key={props.idWatchedVideo}
    >
      <div className="cardVideoVertical grid grid-cols-12 mb-6 hover:cursor-pointer m-4">
        <div className="rounded-lg lg:col-span-4 md:col-span-5 sm:col-span-6 col-span-12 flex justify-center">
          <div className="tumbnile relative w-[100%] mb-3">
            <img
              className="rounded-lg aspect-[16/9] w-[100%]"
              src={props.thumbnail}
              alt="thumbnile"
            />
            <div className="duration absolute bottom-2 right-2 bg-black opacity-80 rounded-md text-white py-[2px] px-2.5">
              {extractDuration(props.duration)}
            </div>
          </div>
        </div>
        <div className="sm:px-6 py-2 lg:col-span-8 md:col-span-7 sm:col-span-6 col-span-12">
          <h1 className="font-semibold text-lg h-14 overflow-hidden">
            {props.title}
          </h1>
          <p className="text-[#555]">
            {rounding(props.views)} x ditonton • {rounding(props.likes)} suka
          </p>
          <div className="channel my-2 flex">
            <img
              className="rounded-full h-8 w-8 mr-2"
              src={props.profilePicture}
            />
            <p className="self-center ml-2 font-semibold text-[#555]">
              {props.channel}
            </p>
          </div>
          <p className="text-sm truncate text-[#555]">{props.desc}</p>
        </div>
      </div>
    </Link>
  );
};
export default CardVideoVertical;
