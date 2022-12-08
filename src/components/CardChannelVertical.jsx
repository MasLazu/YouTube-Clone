import { rounding } from "../function/rounding.js";

const CardChannelVertical = (props) => {
  return (
    <div
      className="cardChannelVertical grid grid-cols-12 my-8 hover:cursor-pointer"
      key={props.name}
    >
      <div className="flex justify-center rounded-lg lg:col-span-4 md:col-span-5 sm:col-span-6 col-span-12">
        <img
          src={props.profilePicture}
          className="profilePicture h-[180px] w-[180px] rounded-full"
        />
      </div>
      <div className="sm:px-6 flex flex-col justify-center mt-5 sm:mt-0 lg:col-span-8 md:col-span-7 sm:col-span-6 col-span-12">
        <h1 className="font-semibold text-xl overflow-hidden text-center sm:text-left">
          {props.name}
        </h1>
        <p className="text-[#555] my-2 text-center sm:text-left">
          {props.customUrl} • {rounding(props.subscriber)} subscriber
        </p>
        <p className="text-sm h-10 overflow-hidden text-[#555] text-center sm:text-left">
          {props.desc}
        </p>
        <div className="flex mt-3 justify-center sm:justify-start">
          <button className="subscribeButton py-[6px] px-5 bg-[#1a56db] rounded-full text-white cursor-pointer hover:brightness-125 duration-[50ms] active:brightness-75 active:scale-95">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};
export default CardChannelVertical;
