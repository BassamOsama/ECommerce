import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const WishListContext = createContext();

export default function WishListContextProvider({ children }) {
  const token = localStorage.getItem("token");
  const headers = { token };
  function getUserWishList() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers,
      })
      .then((data) => data)
      .catch((err) => err);
  }
  function addItemToWishList(pId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId: pId,
        },
        {
          headers,
        }
      )
      .then((data) => data)
      .catch((err) => err);
  }
  function deleteItemFromWishList(id) {
    return axios
      .delete("https://ecommerce.routemisr.com/api/v1/wishlist/" + id, {
        headers,
      })
      .then((data) => data)
      .catch((err) => err);
  }
  const [wishListItems, setWishListItems] = useState(0);
  async function getWishList() {
    const response = await getUserWishList();
    console.log(response);
    if (response.data.status == "success") {
      setWishListItems(response.data.data.length);
    }
  }
  useEffect(() => {
    getWishList();
  }, []);
  return (
    <WishListContext.Provider
      value={{
        getUserWishList,
        addItemToWishList,
        deleteItemFromWishList,
        wishListItems,
        setWishListItems,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
