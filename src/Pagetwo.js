import React, { useRef } from "react";
import Darrow from "../src/assets/icon-arrow-up.svg";

export default function Pagetwo(props) {
  const showing = useRef();

  const handleupside = () => {
    showing.current.style.transform = "translateY(100vh)";
    document.querySelector(".page1").style.transform = "translateY(0)";
  };
  return (
    <div
      className={`p-4 relative md:p-10 w-full  lg:p-16 md:text-center font-ankith  `}
      style={{
        transform: props.isup ? "translateY(-100vh)" : "translateY(100)",
        transition: "all 0.5s",
      }}
      ref={showing}
    >
      <div className="top md:mb-11  md:flex md:items-center md:justify-between ">
        <div className="left  flex md:text-2xl  md:flex-col justify-between">
          <p className="lg:text-3xl xl:text-5xl">Current Timezone</p>
          <h1 className="font-bold xl:text-5xl xl:mt-3 md:text-3xl text-base">
            {props.current}
          </h1>
        </div>
        <div className="right flex md:text-2xl md:flex-col justify-between">
          <p className="lg:text-3xl xl:text-5xl">Currency</p>
          <h1 className="font-bold xl:text-5xl xl:mt-3 md:text-3xl text-base">
            {props.currency}
          </h1>
        </div>
      </div>
      <div className="bottom md:items-center md:flex md:justify-between">
        <div className="left lg:ml-14 flex md:text-2xl md:flex-col justify-between">
          <p className="lg:text-3xl xl:text-5xl">City</p>
          <h1 className="font-semibold xl:text-5xl xl:mt-3 md:text-3xl text-base">
            {props.city}
          </h1>
        </div>
        <div className="right flex md:text-2xl md:flex-col justify-between">
          <p className="lg:text-3xl xl:text-5xl">IP Address</p>
          <h1 className="font-semibold xl:text-5xl xl:mt-3 md:text-3xl text-base">
            {props.ip}
          </h1>
        </div>
      </div>
      <button
        className="flex md:mr-24  xl:w-52 xl:rounded-[50px] justify-between p-1 rounded-[30px] items-center text-white absolute top-[78vh] right-[2vw] bg-black w-32 "
        onClick={() => {
          handleupside();
        }}
      >
        <p className="text-xl pl-2 xl:m-4 font-semibold xl:text-4xl">More</p>
        <img
          className="xl:w-20 mr-1 w-10 xl:mr-2"
          src={Darrow}
          alt=""
          // style={imageStyle}
          onClick={() => {
            handleupside();
          }}
        />
      </button>
    </div>
  );
}
