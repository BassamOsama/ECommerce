import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./RecentProducts.module.css";
import axios from "axios";
import ProductItem from "../ProductItem/ProductItem";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import useProducts from "../../../Hooks/useProducts";

export default function RecentProducts() {
  const { isLoading, isError, data: products, error } = useProducts();
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <h3>{JSON.stringify(error)}</h3>;
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-10">
      {products.map((p) => (
        <ProductItem key={p._id} product={p} />
      ))}
    </div>
  );
}
