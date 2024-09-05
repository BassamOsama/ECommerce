import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./ProductItem.module.css";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductItem({ product }) {
  const { addItemToCart, setCartItems } = useContext(CartContext);
  async function addItem(id) {
    const response = await addItemToCart(id);
    if (response.data.status == "success") {
      setCartItems(response.data.numOfCartItems);
      toast.success("Added");
    }
  }
  return (
    <>
      <div className="flex flex-col group items-center">
        <Link to={`/productDetails/${product._id}`}>
          <div className="">
            <img
              className="w-full object-cover"
              src={product.imageCover}
              alt={product.title}
            />
            <p className="text-sm text-green-600 my-2">
              {product.category.name}
            </p>
            <h4 className="truncate mt-2">
              {product.title.split(" ").slice(0, 2).join(" ")}
            </h4>
            <div className="flex justify-between ">
              <p>{product.price} EGY</p>
              <p>
                {product.ratingsAverage}{" "}
                <FaStar className="text-yellow-400 inline-block" />{" "}
              </p>
            </div>
          </div>
        </Link>
        <button
          onClick={() => addItem(product._id)}
          className="w-2/4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 translate-y-full bg-green-600 text-white py-2 rounded-md opacity-0 "
        >
          Add To Cart +
        </button>
      </div>
    </>
  );
}
