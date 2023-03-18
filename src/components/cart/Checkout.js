import { React, useContext } from "react";
import StripeCheckout from "react-stripe-checkout";
import "./cart.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginContext } from "../context/ContextProvider";
import Cookies from "js-cookie";

const Checkout = (props) => {
  const { account, setAccount } = useContext(LoginContext);
  const navigate = useNavigate("");

  const cookieValue = Cookies.get("AmazonClonecookie");

  const tokenHandler = async (token) => {
    console.log(token);

    const product = props.priceTotal;
    const res = await axios.post(
      "https://amazonclonebackend.onrender.com/checkout",
      { token, product },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookieValue}`,
        },
      },
      { credentials: "include" }
    );

    //take response and check for status
    console.log(res.status);
    if (res.status === 201) {
      toast.success("Success", {
        position: "top-center",
      });
      console.log(res.data);
      setAccount(res.data);
    } else {
      toast.warn("Success", {
        position: "top-center",
      });
    }

    navigate("/success");
  };

  const notloggedIn = () => {
    navigate("/login");
  };

  return (
    <>
      {account ? (
        <>
          <StripeCheckout
            amount={props.priceTotal.price.cost * 100}
            shippingAddress
            token={tokenHandler}
            stripeKey="pk_test_51MZsumSA098kyG94lOlTOSa1mYdqTVjs8QJYUcFrEnkI1zOedqid3IlSQF4GbYWCCAhsnrqDNCEMaHsqMiZukETr00Vj45Q2m4"
            currency="INR"
            name={props.priceTotal.title.longTitle}
          >
            <button className="cart_btn2">Buy Now</button>
            <ToastContainer />
          </StripeCheckout>
        </>
      ) : (
        <>
          <button className="cart_btn2" onClick={notloggedIn}>
            Buy Now
          </button>
        </>
      )}
    </>
  );
};

export default Checkout;
