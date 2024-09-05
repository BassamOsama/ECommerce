import { useState } from "react";
import { useEffect } from "react";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import LayOut from "./Components/LayOut/LayOut.jsx";
import Home from "./Components/Home/Home.jsx";
import Brands from "./Components/Brands/Brands.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import Categories from "./Components/Categories/Categories.jsx";
import Login from "./Components/Login/Login.jsx";
import NavBar from "./Components/NavBar/NavBar.jsx";
import Products from "./Components/Products/Products.jsx";
import Register from "./Components/Register/Register.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";
import Wishlist from "./Components/Wishlist/Wishlist.jsx";
import CounterContextProvider from "./Context/CounterContext.jsx";
import UserContextProvider from "./Context/UserContext.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";
import ProductDetails from "./Components/ProductDetails/ProductDetails.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/CartContext.jsx";
import toast, { Toaster } from "react-hot-toast";
import CheckOut from "./Components/CheckOut/CheckOut.jsx";
import Allorders from "./Components/Allorders/Allorders.jsx";

const myClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 1000,
      refetchInterval: 1000 * 25,
    },
  },
});
function App() {
  let [count, setCount] = useState(0);
  useEffect(() => {}, []);
  const routes = createHashRouter([
    {
      path: "",
      element: <LayOut />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout/:cartId",
          element: (
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <Allorders />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "navbar",
          element: (
            <ProtectedRoute>
              <NavBar />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "productdetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <QueryClientProvider client={myClient}>
        <UserContextProvider>
          <CartContextProvider>
            <CounterContextProvider>
              <RouterProvider router={routes}></RouterProvider>
            </CounterContextProvider>
          </CartContextProvider>
        </UserContextProvider>
        <Toaster
          toastOptions={{
            success: {
              style: { backgroundColor: "green", color: "white" },
              position: "top-right",
            },
          }}
        />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
