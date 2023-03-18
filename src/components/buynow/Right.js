import React, { useEffect, useState } from "react";
import "./buynow.css";

const Right = (props) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    totalAmount();
  }, [props.items]);

  const totalAmount = () => {
    let price = 0;
    props.items.map((item) => {
      price = price + item.cart.price.cost;
    });
    setPrice(price);
  };

  return (
    <div className="right_buy">
      {/* {props.items &&
        props.items.length &&
        props.items.map((item) => {
          console.log(item);
        })} */}
      <img
        src="https://m.media-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png"
        alt=""
      />
      <div className="cost_right">
        <p>Your order is eligible for FREE Deleivery</p>
        <br />
        <span style={{ color: "#565959" }}>
          Select this option & checkout Details
        </span>
        <h3>
          Subtotal ({props.items.length} items):{" "}
          <span style={{ fontWeight: 700 }}>₹ {price}.00</span>
        </h3>
        <button className="rightbuy_btn">Proceed to Buy</button>
        <div className="emi">EMI Available</div>
      </div>
    </div>
  );
};

export default Right;
