import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./CategorySlider.module.css";
import Slider from "react-slick";
import axios from "axios";
import Loading from "../Loading/Loading";

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: false,
    initialSlide: 0,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  async function getCategories() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setCategories(data?.data);
  }
  useEffect(() => {
    getCategories();
  }, []);
  if (categories.length === 0) {
    return <Loading />;
  }
  return (
    <>
      <div className="slider-container">
        <Slider {...settings}>
          {categories.map((c) => (
            <div key={c._id} className="p-2">
              <img
                className="h-[300px] w-full object-cover"
                src={c.image}
                alt={c.title}
              />
              <h3 className="text-sm text-center text-green-600 mt-3 ">
                {c.name}
              </h3>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
