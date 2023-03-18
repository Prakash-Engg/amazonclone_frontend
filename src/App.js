import "./App.css";
import Navbar from "./components/header/Navbar";
import Newnav from "./components/NewNavbar/Newnav";
import Maincomp from "./components/home/Maincomp";
import Footer from "./components/footer/Footer";
import Sign_in from "./components/signup_in/Sign_in";
import Sign_up from "./components/signup_in/Sign_up";
import Profile from "./components/signup_in/Profile";
import { Routes, Route } from "react-router-dom";
import Cart from "./components/cart/Cart";
import Buynow from "./components/buynow/Buynow";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import PaySuccess from "./components/buynow/PaySuccess";
import Orders from "./components/buynow/Orders";
import ProtectedRoutes from "./components/context/ProtectedRoutes";

function App() {
  const [data, setData] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setData(true);
    }, 2300);
  }, []);

  return (
    <>
      {data ? (
        <>
          {" "}
          <Navbar />
          <Newnav />
          <Routes>
            <Route path="/" element={<Maincomp />} />
            <Route path="/login" element={<Sign_in />} />
            <Route path="/register" element={<Sign_up />} />
            <Route path="/getproductsone/:id" element={<Cart />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/buynow" element={<Buynow />} />
              <Route path="/success" element={<PaySuccess />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
          <Footer />
        </>
      ) : (
        <div className="circle">
          <CircularProgress className="circleh2" />
          <h2>Loading...</h2>
        </div>
      )}
    </>
  );
}

export default App;
