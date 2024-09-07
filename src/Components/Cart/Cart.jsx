import { useContext, useState } from "react";
import { useEffect } from "react";
import styles from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { FaTrash } from "react-icons/fa";
import CartItem from "../CartItem/CartItem";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cartDetails, setCartDetails] = useState(null);
  const {
    getUserCart,
    updateCountOfItem,
    deleteItem,
    clearCart,
    setCartItems,
  } = useContext(CartContext);

  async function getLoggedUserCart() {
    const response = await getUserCart();

    if (response.data.status == "success") {
      setCartDetails(response.data.data);
    }
  }
  async function updateQuantity(id, count) {
    const response = await updateCountOfItem(id, count);

    if (response.data.status == "success") {
      setCartDetails(response.data.data);
      toast.success("Updated");
    }
  }
  async function deleteItemFromCart(id) {
    const response = await deleteItem(id);

    if (response.data.status == "success") {
      setCartDetails(response.data.data);
      setCartItems(response.data.numOfCartItems);
      toast.success("deleted");
    }
  }
  async function clearAllCart() {
    const response = await clearCart();
    if (response.data.message == "success") {
      setCartDetails(response.data.data);
      setCartItems(response.data.numOfCartItems);
      toast.success("deleted");
    }
  }
  useEffect(() => {
    getLoggedUserCart();
  }, []);
  return (
    <>
      <div className="relative mb-16 overflow-x-auto shadow-md sm:rounded-lg p-10 bg-green-100">
        <h2 className="text-green-600 my-3">Cart Shop</h2>
        <div className="flex items-center mb-5 justify-between">
          <p className="h3 text-green-500">
            Total Price : {cartDetails?.totalCartPrice}{" "}
          </p>
          <button
            onClick={() => clearAllCart()}
            className="bg-green-600 rounded-lg p-2 text-white"
          >
            Clear Cart <FaTrash className="inline-block" />{" "}
          </button>
        </div>
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
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cartDetails?.products.map((p) => (
              <>
                <CartItem
                  deleteItemFromCart={deleteItemFromCart}
                  updateQuantity={updateQuantity}
                  count={p.count}
                  price={p.price}
                  product={p.product}
                />
              </>
            ))}
          </tbody>
        </table>
        <Link
          className="block bg-green-600 rounded-lg p-2 mx-auto w-fit text-white"
          to={"/checkout/" + cartDetails?._id}
        >
          Check Out
        </Link>
      </div>
    </>
  );
}
