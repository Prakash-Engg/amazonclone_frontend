import { React, useState, useContext } from "react";
import "./orders.css";
import { Divider } from "@mui/material";
import { LoginContext } from "../context/ContextProvider";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { fontWeight } from "@mui/system";

const Orders = () => {
  const { account, setAccount } = useContext(LoginContext);
  const navigate = useNavigate("");

  const startShopping = () => {
    navigate("/");
  };

  // const [ordersdata, setOrdersdata] = useState("");
  console.log(account.orders);
  console.log("line 19 order");
  const reverseOrders = account.orders.reverse();
  console.log("line 21 order");

  return (
    <>
      {account.orders ? (
        account.orders.length ? (
          <div className="senior_div">
            <div className="topdiv">
              <p>Placed Orders</p>
              <p className="track">Track your orders</p>
              <Divider />
            </div>

            {reverseOrders.map((e, k) => {
              return (
                <div className="downdiv">
                  <div className="leftdiv">
                    <img
                      src={e.order.url}
                      alt="feed"
                      style={{
                        marginTop: "10px",
                        marginBottom: "18px",
                      }}
                    />
                  </div>
                  <div className="middiv">
                    <div className="mid_text">
                      <div
                        className="downdiv_mtop"
                        style={{ marginBottom: "-15px", fontWeight: "900" }}
                      >
                        {e.order.title.shortTitle}
                      </div>
                    </div>
                    <br />
                    <div className="mid_text"> {e.order.title.longTitle}</div>
                    <p className="mid_text">
                      <div style={{ fontWeight: "900", marginBottom: "-20px" }}>
                        Shipping Address-
                      </div>{" "}
                      <br />
                      A-47, Noida sector-6, Dwaraka, West Delhi
                    </p>
                  </div>
                  <div className="rightdiv">
                    <div className="mid_text" style={{ fontWeight: "800" }}>
                      <div className="downdiv_mtop">{`Ordered on ${e.order.day}, ${e.order.month} ${e.order.date}, ${e.order.year}`}</div>{" "}
                      <p>{`Paid ₹ ${e.order.amount} for this Order`}</p>
                    </div>
                  </div>
                </div>
              );
            })}
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
              <p className="not_placed">You have not Placed any orders yet!</p>
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
    </>
  );
};

export default Orders;
