import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import SunImg from "../src/assets/icon-sun.svg";
import MoonImg from "../src/assets/icon-moon.svg";
import Refresh from "../src/assets/icon-refresh.svg";
import Darrow from "../src/assets/icon-arrow-up.svg";
import Pagetwo from "./Pagetwo";

function App() {
  const [hours, sethours] = useState("");
  const [minutes, setminutes] = useState("");
  const [slogan, setslogan] = useState("");
  const [author, setauthor] = useState("");
  const [isup, setisup] = useState(false);
  const [fresh, setfresh] = useState(false);
  const [Screensize, setScreensize] = useState(null);
  const [city, setcity] = useState("");
  const [ip, setip] = useState("");
  const [code, setcode] = useState("");
  const [current, setcurrent] = useState("");
  const [currency, setcurrency] = useState("");
  const [country, setcountry] = useState("");
  const [imageloaded, setimageloaded] = useState(false);
  const [wish, setwish] = useState("");
  const [back, setback] = useState("");
  const [changeimg, setchangeimg] = useState(true);

  useEffect(() => {
    if (hours < 12) {
      setwish("GOOD MORNING");
    } else if (hours > 12 && hours < 18) {
      setwish("GOOD EVENING");
    } else {
      setwish("GOOD NIGHT");
    }
  }, [hours]);

  useEffect(() => {
    axios.get(`https://api.ipbase.com/v2/info`).then((response) => {
      const regiondata = response.data.data.location.city.name;
      setcity(regiondata);
      setip(response.data.data.ip);
      setcode(response.data.data.timezone.code);
      setcurrent(response.data.data.timezone.id);
      setcurrency(response.data.data.location.country.currencies[0].name);
      const gottime = response.data.data.timezone.current_time;
      const finded = new Date(gottime);
      sethours(finded.getHours());
      setminutes(finded.getMinutes());
      setcountry(response.data.data.location.country.name);
      console.log(response.data.data);
    });
  }, [App]);

  useEffect(() => {
    const findsize = () => {
      setScreensize(window.innerWidth);
    };
    window.addEventListener("resize", findsize);
  });
  useEffect(() => {
    axios.get("https://api.quotable.io/random/").then((response) => {
      setslogan(response.data.content);
      setauthor(response.data.author);
    });
  }, [fresh]);
  useEffect(() => {
    document.body.style.overflow = "hidden";
  });

  const [rotationAngle, setRotationAngle] = useState(0);
  const rotateImage = () => {
    setRotationAngle((prevAngle) => prevAngle + 180);
  };

  const imageStyle = {
    transform: `rotate(${rotationAngle}deg)`,
    transition: "transform 0.5s ease-in-out",
    cursor: "pointer",
  };

  const handleup = () => {
    setisup(!isup);
  };
  useEffect(() => {
    fetchingdata();
  }, []);

  let timeOfDay;

  // Set conditions based on the current hour
  if (hours >= 1 && hours < 9) {
    timeOfDay = "MORNING";
  } else if (hours >= 9 && hours < 15) {
    timeOfDay = "AFTERNOON";
  } else if (hours >= 15 && hours < 18) {
    timeOfDay = "EVENING";
  } else {
    timeOfDay = "NIGHT";
  }

  const fetchingdata = async () => {
    const response = await fetch(
      `https://source.unsplash.com/1600x900/?${timeOfDay}`
    );
    const data = await response.blob();
    const hloo = new Image();
    hloo.src = URL.createObjectURL(data);
    hloo.onload = () => {
      setback(hloo.src);
      setimageloaded(true);
    };
    hloo.onerror = () => {
      setimageloaded(true);
    };
  };

  const handleimagechange = () => {
    fetchingdata();
  };
  return (
    <>
      <div
        className={`loading z-10 absolute w-[100vw] h-[100vh] bg-slate-700 ${
          !imageloaded ? "block" : "hidden"
        }`}
      >
        <span className=" absolute  top-[50%] left-[50%]  loader"></span>
      </div>
      <div className="App   mt-0 h-[100vh] text-white font-ankith  flex  flex-col">
        <div
          className="page1 p-6 w-full h-[100vh] flex justify-between flex-col"
          style={{
            backgroundImage: `url(${back})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            transform: isup ? "translateY(-100vh)" : "translateY(0)",
            transition: " all 0.5s",
          }}
        >
          <div className={`upper  flex flex-col`}>
            <div
              className={`hloo backdrop-brightness-90 flex text-xl text-start flex-col justify-center `}
            >
              <div className="flex items-center">
                <h1
                  className={`lg:text-2xl xl:text-4xl lg:font-semibold lg:p-6 `}
                >
                  {slogan}
                </h1>
                <img
                  style={{
                    mixBlendMode: "difference",
                  }}
                  onClick={() => {
                    setfresh(!fresh);
                    handleimagechange();
                  }}
                  src={Refresh}
                  alt=""
                />
              </div>
              <h3
                className={`lg:text-2xl xl:text-4xl lg:font-semibold lg:pl-6 font-bold text-xl mt-3 `}
              >
                {author}
              </h3>
            </div>
          </div>
          <div className="middle  sm:mb-7 lg:mb-10 lg:ml-7 md:flex md:justify-between md:items-center">
            <div className="left">
              <div className="wish flex  items-center mb-5">
                <img
                  className="mr-3 xl:w-16"
                  src={hours > 18 ? MoonImg : SunImg}
                  alt=""
                />
                <h1 className="text-2xl xl:text-4xl lg:text-2xl lg:font-semibold">
                  GOOD {timeOfDay}
                </h1>
                <h1
                  className={` lg:text-2xl  xl:text-4xl lg:font-semibold text-xl ${
                    Screensize > 640 ? "block" : "hidden"
                  }`}
                >
                  ,IT'S CURRENTLY
                </h1>
              </div>
              <div className="time  ">
                <div className="watch flex items-end">
                  <h1 className="text-7xl xl:text-9xl mb-3 lg:text-8xl  font-bold">
                    {hours}:{minutes}
                  </h1>
                  <h2 className="text-base xl:text-2xl lg:text-xl">{code}</h2>
                </div>
                <div className="country text-2xl xl:text-5xl font-bold lg:text-3xl mb-3">
                  <p>IN {country}</p>
                </div>
              </div>
            </div>
            <div className="right ">
              <button
                className="flex md:mr-24 xl:w-52 xl:rounded-[50px] justify-between p-1 rounded-[30px] items-center text-black bg-white w-32 "
                onClick={() => {
                  handleup();
                }}
              >
                <p
                  className="text-xl pl-2 xl:m-4 font-semibold xl:text-4xl"
                  // onClick={handleup}
                >
                  More
                </p>
                <img
                  className="xl:w-20 xl:mr-2"
                  src={Darrow}
                  alt=""
                  onClick={() => {
                    // handleup();
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Pagetwo
        isup={isup}
        city={city}
        ip={ip}
        current={current}
        currency={currency}
      />
    </>
  );
}

export default App;
