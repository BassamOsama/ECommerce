import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./ProductDetails.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { addItemToCart, setCartItems } = useContext(CartContext);
  async function addItem(id) {
    const response = await addItemToCart(id);
    if (response.data.status == "success") {
      setCartItems(response.data.numOfCartItems);
      toast.success("Added");
    }
  }
  const { id } = useParams();
  const {
    isLoading,
    isError,
    error,
    data: productDetails,
  } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: () =>
      axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`),
    select: (data) => data.data.data,
  });
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid gap-4 sm:grid-cols-12">
          <div className="col-span-4 py-5">
            <img
              className="w-full"
              src={productDetails?.imageCover}
              alt={productDetails.title}
            />
          </div>
          <div className="col-span-8 self-center py-5">
            <h2>{productDetails.title}</h2>
            <p className="my-3 font-light">{productDetails.description}</p>
            <h3 className="mb-2">{productDetails.category.name}</h3>
            <div className="flex justify-between mb-3">
              <p>{productDetails.price} EGY</p>
              <p>
                {productDetails.ratingsAverage}{" "}
                <FaStar className="text-yellow-400 inline-block" />{" "}
              </p>
            </div>
            <button
              onClick={() => addItem(productDetails.id)}
              className="w-full bg-green-600 py-1 text-white rounded-sm"
            >
              Add To Cart +
            </button>
          </div>
        </div>
      )}
    </>
  );
}
