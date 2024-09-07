import styles from "./WishListItem.module.css";

export default function WishListItem({
  deleteItemFromWished,
  price,
  product,
}) {
  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img
            src={product.imageCover}
            className="w-16 md:w-32 max-w-full max-h-full"
            alt={product.title}
          />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.title}
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {price}EGP
        </td>
        <td className="px-6 py-4">
          <span
            onClick={() => deleteItemFromWished(product?.id)}
            className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline"
          >
            Remove
          </span>
        </td>
        <td className="px-6 py-4">
          <button className="bg-green-600 rounded-lg p-2 text-white">
            Add to Cart
          </button>
        </td>
      </tr>
    </>
  );
}
