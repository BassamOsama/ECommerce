import { useContext, useState } from "react";
import { useEffect } from "react";
import styles from "./Wishlist.module.css";
import toast from "react-hot-toast";
import WishListItem from "../WishListItem/WishListItem";
import { WishListContext } from "../../Context/WishListContext";

export default function Wishlist() {
  const [wishListDetails, setWishListDetails] = useState(null);
  const { getUserWishList, deleteItemFromWishList, setWishListItems } =
    useContext(WishListContext);

  async function getLoggedUserWishList() {
    const response = await getUserWishList();
    if (response.data.status == "success") {
      setWishListDetails(response.data);
    }
  }

  async function deleteItemFromWished(id) {
    const response = await deleteItemFromWishList(id);
    
    if (response.data.status == "success") {
      setWishListDetails(response.data);
      setWishListItems(response.data);
      toast.success("deleted");
    }
  }
  useEffect(() => {
    getLoggedUserWishList();
  }, []);
  return (
    <>
      <div className="relative mb-16 overflow-x-auto shadow-md sm:rounded-lg p-10 bg-green-100">
        <h2 className="text-green-600 my-3">My Wish List</h2>
        <div className="flex items-center mb-5 justify-between"></div>
        <table className="w-full text-sm mb-6 text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
              <th scope="col" className="px-6 py-3">
                Adding
              </th>
            </tr>
          </thead>
          <tbody>
            {wishListDetails?.products?.map((p) => (
              <>
                <WishListItem
                  deleteItemFromWished={deleteItemFromWished}
                  price={p.price}
                  product={p.data}
                />
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
