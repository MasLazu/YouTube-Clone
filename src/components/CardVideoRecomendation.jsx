import { Link } from "react-router-dom";
import { rounding } from "../function/rounding.js";
import { scrollTop } from "../function/scrollTop.js";

const CardVideoRecomendation = (props) => {
  return (
    <Link to={"/watch/" + props.id} onClick={scrollTop} key={props.id}>
      <div className="cardVideoRecomendation grid grid-cols-12 mb-2">
        <img
          src={props.thumbnail}
          className="aspect-[16/9] md:col-span-5 sm:col-span-4 col-span-5 md:rounded-lg rounded-xl w-[100%]"
        />
        <div className="desc md:col-span-7 sm:col-span-8 col-span-7 xl:p-2 px-2">
          <div className="title lg:h-10 md:h-8 sm:h-12 h-9 overflow-hidden">
            <h4 className="font-semibold lg:text-sm md:text-xs text-sm sm:text-base">
              {props.title}
            </h4>
          </div>
          <p className="md:text-[10px] lg:text-xs text-xs md:leading-3 lg:leading-4 truncate sm:text-sm text-[#555]">
            {props.channel}
          </p>
          <p className="md:text-[10px] lg:text-xs text-xs md:leading-3 truncate lg:leading-4 sm:text-sm text-[#555]">
            {rounding(props.views)} x ditontion • {rounding(props.likes)} suka
          </p>
        </div>
      </div>
    </Link>
  );
};
export default CardVideoRecomendation;
