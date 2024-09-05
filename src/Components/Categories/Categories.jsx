import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./Categories.module.css";
import axios from "axios";
import Loading from "../Loading/Loading";

export default function Categories() {
  const [categories, setCategories] = useState([]);
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
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-10">
        {categories.map((c) => (
          <div key={c._id} className="p-2">
            <img
              className="h-[300px] w-full object-cover rounded-lg"
              src={c.image}
              alt={c.title}
            />
            <h3 className="text-xlg text-center text-green-600 mt-3 ">
              {c.name}
            </h3>
          </div>
        ))}
      </div>
    </>
  );
}
