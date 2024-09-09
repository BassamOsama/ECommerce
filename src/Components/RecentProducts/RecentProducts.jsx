import styles from "./RecentProducts.module.css";
import ProductItem from "../ProductItem/ProductItem";
import Loading from "../Loading/Loading";
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
    <>
      <input
        type="text"
        name="search"
        id="search"
        className="block focus:outline-green-600 mt-8 py-2.5 px-0 w-8/12 mx-auto text-sm text-gray-900 bg-transparent border rounded-lg border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-green-500  focus:outline-2 focus:ring-green-600 focus:ring-2 focus:border-green-600 peer"
        placeholder="Search... "
      />
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-10">
        {products.map((p) => (
          <ProductItem key={p._id} product={p} />
        ))}
      </div>
    </>
  );
}
