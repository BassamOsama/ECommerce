import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./MainSlider.module.css";
import Slider from "react-slick";
import img_1 from "../../assets/images/slider-image-1.jpeg";
import img_2 from "../../assets/images/slider-image-2.jpeg";
import img_3 from "../../assets/images/slider-image-3.jpeg";
import img_4 from "../../assets/images/grocery-banner-2.jpeg";
import img_5 from "../../assets/images/slider-2.jpeg";

export default function MainSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    initialSlide: 0,
    focusOnSelect: true,
  };
  let [count, setCount] = useState(0);
  useEffect(() => {}, []);
  return (
    <>
      <div className="grid grid-cols-12 mb-4">
        <div className="md:col-span-8 col-span-12">
          <Slider {...settings}>
            <img
              className="h-[400px] w-full object-cover"
              src={img_1}
              alt="bag"
            />
            <img
              className="h-[400px] w-full object-cover"
              src={img_4}
              alt="bag"
            />
            <img
              className="h-[400px] w-full object-cover"
              src={img_5}
              alt="bag"
            />
          </Slider>
        </div>
        <div className="md:col-span-4 col-span-12 ">
          <img
            className="h-[200px] w-full object-cover"
            src={img_2}
            alt="chocolate"
          />
          <img
            className="h-[200px] w-full object-cover"
            src={img_3}
            alt="cookies"
          />
        </div>
      </div>
    </>
  );
}
