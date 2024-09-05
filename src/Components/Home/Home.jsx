import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./Home.module.css";
import axios from "axios";
import MainSlider from "../MainSlider/MainSlider";
import RecentProducts from "../RecentProducts/RecentProducts";
import CategorySlider from "../CategorySlider/CategorySlider";

export default function Home() {
  return (
    <>
      <MainSlider />
      <CategorySlider />
      <RecentProducts />
    </>
  );
}
