import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./buynow.css";
import Option from "./Option";
import Subtotal from "./Subtotal";
import Right from "./Right";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Buynow = () => {
  const [cartdata, setCartdata] = useState("");
  // console.log(cartdata);

  const navigate = useNavigate("");

  const cookieValue = Cookies.get("AmazonClonecookie");
  console.log("line 18 " + cookieValue);

  const startShopping = () => {
    navigate("/");
  };

  const getbuydata = async () => {
    console.log("haha");
    const res = await fetch(
      "https://amazonclonebackend.onrender.com/cartdetails",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookieValue}`,
        },
        credentials: "include",
      }
    );
    console.log("hehe");
    const data = await res.json();

    if (res.status !== 201) {
      console.log("error");
    } else {
      setCartdata(data.carts);
      console.log("Line 50 buynow");
      const newCartdata = cartdata.z();
      setCartdata(newCartdata);
    }
  };

  useEffect(() => {
    getbuydata();
  }, []);

  return (
    <>
      {cartdata ? (
        cartdata.length ? (
          <div className="buynow_section">
            <div className="buynow_container">
              <div className="left_buy">
                <h1>Shopping Cart</h1>
                <p>Select all items</p>
                <span>Price</span>
                <Divider />
                {/* {console.log(cartdata.length)} */}
                {/* {console.log(cartdata[0].description)} */}
                {/* {console.log(cartdata)} */}

                {cartdata.map((e, k) => {
                  return (
                    <>
                      <div className="item_containert">
                        <img src={e.cart.url} alt="" />
                        <div className="item_details">
                          <h3>{e.cart.title.longTitle}</h3>
                          <h3>{e.cart.title.shortTitle}</h3>
                          <h3 className="diffrentprice">
                            ₹ {e.cart.price.cost}.00
                          </h3>
                          <p className="unusuall">
                            Usually Dispatched in 8 Days
                          </p>
                          <p>Eligible for FREE Shipping</p>
                          <img
                            src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png"
                            alt="heythere"
                          />
                          <Option deletedata={e.cart.id} get={getbuydata} />
                        </div>
                        <h3 className="item_price">₹{e.cart.price.cost}.00</h3>
                      </div>
                      <Divider />
                    </>
                  );
                })}

                <Subtotal items={cartdata} />
              </div>
              <Right items={cartdata} />
            </div>
          </div>
        ) : (
          <>
            <div
              style={{
                display: "grid",
                placeItems: "center",
                marginTop: "200px",
                height: "42vh",
              }}
            >
              <p className="not_placed">Your cart is empty!</p>
              <button className="view_btn" onClick={startShopping}>
                Start your Shopping
              </button>
            </div>
          </>
        )
      ) : (
        <div className="circle">
          <CircularProgress className="circleh2" />
          <h2>Loading...</h2>
        </div>
      )}
      {/* {console.log(cartdata[0].cart.description)} */}
    </>
  );
};

export default Buynow;
