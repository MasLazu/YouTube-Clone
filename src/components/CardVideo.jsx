import { Link } from "react-router-dom";
import { rounding } from "../function/rounding.js";
import { extractDuration } from "../function/extractDuration.js";
import { scrollTop } from "../function/scrollTop.js";

function CardVideo(props) {
  return (
    <Link
      to={"/watch/" + props.id}
      onClick={scrollTop}
      key={props.idWatchedVideo}
    >
      <div className="card-video m-4 cursor-pointer">
        <div className="tumbnile relative">
          <img
            src={props.thumbnail}
            alt="thumbnile"
            className="rounded-lg mb-3 aspect-[16/9] w-[100%]"
          />
          <div className="duration absolute bottom-2 right-2 bg-black opacity-80 rounded-md text-white py-[2px] px-2.5">
            {extractDuration(props.duration)}
          </div>
        </div>
        <div className="desc-video">
          <h3 className="font-semibold text-[#000] mb-1 text-lg h-14 overflow-hidden">
            {props.title}
          </h3>
          <div className="channel flex items-stretch">
            <img
              className="rounded-full h-8 w-8 mr-2"
              src={props.profilePicture}
            />
            <p className="text-[#4b4b4b] self-center font-semibold">
              {props.channel}
            </p>
          </div>
          <p className="text-sm text-[#666]">
            {rounding(props.views)} x ditonton • {rounding(props.likes)} suka
          </p>
        </div>
      </div>
    </Link>
  );
}
export default CardVideo;
