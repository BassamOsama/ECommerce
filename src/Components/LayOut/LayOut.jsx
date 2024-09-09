import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";

export default function LayOut() {
  return (
    <div>
      <NavBar />
      <div className=" container max-w-screen-xl mx-auto pt-5 p-3">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
