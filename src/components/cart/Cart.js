import { Divider } from "@mui/material";
// import { fontWeight } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./cart.css";
import { LoginContext } from "../context/ContextProvider";
import CircularProgress from "@mui/material/CircularProgress";
import Checkout from "./Checkout";
import Cookies from "js-cookie";

const Cart = () => {
  const { id } = useParams("");
  // console.log(id);

  const history = useNavigate("");

  const { account, setAccount } = useContext(LoginContext); // is this by reference or by value

  const [inddata, setInddata] = useState([]);
  console.log(inddata);

  const cookieValue = Cookies.get("AmazonClonecookie");

  const getinddata = async () => {
    const res = await fetch(
      `https://amazonclonebackend.onrender.com/getproductsone/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    // console.log(data);

    if (res.status !== 201) {
      console.log("no data available");
    } else {
      console.log("get data");
      setInddata(data);
    }
  };

  useEffect(() => {
    getinddata();
  }, [id]); // why id is written as dependency instead of no dependency

  //add cart function

  const addtocart = async (id) => {
    const checkres = await fetch(
      `https://amazonclonebackend.onrender.com/addcart/${id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookieValue}`,
        },
        body: JSON.stringify({
          inddata,
        }),
        credentials: "include",
      }
    );

    const data1 = await checkres.json();
    console.log(data1);

    if (checkres.status === 401 || !data1) {
      console.log("User Invalid");
      alert("User Invalid");
    } else {
      // alert("Item added to your Cart");
      history("/buynow");
      setAccount(data1);
    }
  };

  const notloggedIn = () => {
    history("/login");
  };

  return (
    <div className="cart_section">
      {inddata && Object.keys(inddata).length ? (
        <div className="cart_container">
          <div className="left_cart">
            <img src={inddata.url} alt="cart_image" />
            <div className="cart_btn">
              {account ? (
                <>
                  <button
                    className="cart_btn1"
                    onClick={() => addtocart(inddata.id)}
                  >
                    Add to Cart
                  </button>
                </>
              ) : (
                <>
                  <button className="cart_btn1" onClick={notloggedIn}>
                    Add to Cart
                  </button>
                </>
              )}
              <Checkout priceTotal={inddata} />
            </div>
          </div>
          <div className="right_cart">
            <h3>{inddata.title.shortTitle}</h3>
            <h4>{inddata.title.longTitle}</h4>
            <Divider />
            <p className="mrp">M.R.P. : ₹ {inddata.price.mrp}</p>
            <p>
              Deal of tha Day :{" "}
              <span style={{ color: "#b12704" }}>₹{inddata.price.cost}</span>
            </p>
            <p>
              You saved :{" "}
              <span style={{ color: "#b12704" }}>
                ₹{inddata.price.mrp - inddata.price.cost} (
                {inddata.price.discount})
              </span>
            </p>
            <div className="discount_box">
              <h5>
                Discount :{" "}
                <span style={{ color: "#111" }}>{inddata.discount}</span>
              </h5>
              <h4>
                Free Delievery :{" "}
                <span style={{ color: "#111", fontWeight: 600 }}>
                  Oct 8- 21
                </span>{" "}
                Details
              </h4>
              <p>
                Fastest Deleivery :{" "}
                <span style={{ color: "#111", fontWeight: 600 }}>
                  Tommorow 11 AM
                </span>
              </p>
              <p className="description">
                About the Item :{" "}
                <span
                  style={{
                    color: "#565959",
                    fontSize: "14px",
                    fontWeight: 500,
                    letterSpacing: "0.4px",
                  }}
                >
                  {inddata.description}
                </span>
              </p>
            </div>
          </div>
        </div>
      ) : inddata ? (
        <div className="circle">
          <CircularProgress className="circleh2" />
          <h2>Loading...</h2>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;
