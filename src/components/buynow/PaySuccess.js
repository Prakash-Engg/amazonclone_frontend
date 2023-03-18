import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./paysuccess.css";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const PaySuccess = () => {
  // const navigate = useNavigate("");

  // useEffect(() => {
  //   setInterval(() => {
  //     navigate("/orders");
  //   }, 3500);
  // }, []);

  return (
    <>
      <div className="maindev">
        <h2>
          <CheckCircleRoundedIcon className="done_logo" />
          Payment Succesfull
        </h2>
        <h4>Your Order is placed</h4>
        <h3>Reference ID: 1234567890</h3>
      </div>
    </>
  );
};

export default PaySuccess;
