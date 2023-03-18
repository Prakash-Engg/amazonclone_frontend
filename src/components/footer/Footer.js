import React from "react";
import "./footer.css";

const Footer = () => {
  const year = new Date().getFullYear();
  console.log(year + " is full of happiness");

  return (
    <footer>
      <div className="footer_container">
        <div className="footer_details_one forres">
          <h3>Get to know us</h3>
          <p>About Page</p>
          <p>Contact us</p>
          <p>Services</p>
          <p>Reviews</p>
        </div>
        <div className="footer_details_one forres">
          <h3>Connect with us</h3>
          <p>About us</p>
          <p>Careers</p>
          <p>Press References</p>
          <p>Portal</p>
        </div>
        <div className="footer_details_one">
          <h3>Office Address</h3>
          <p>Noida</p>
          <p>Delhi</p>
          <p>Gurgaon</p>
          <p>Banglore</p>
        </div>
        <div className="footer_details_one">
          <h3>Our Social Media</h3>
          <p>Facebook</p>
          <p>Instagram</p>
          <p>Youtube</p>
          <p>Koo</p>
        </div>
      </div>
      <div className="lastdetails">
        <img src="./amazon_PNG25.png" alt="haha" />
        <p>
          Conditions of Use & Sale &nbsp; &nbsp; &nbsp; Privacy Notice &nbsp;
          &nbsp; &nbsp; Intrest Based Ads &nbsp; &nbsp; &nbsp; 1999-
          {year},Amazon.com,Inc. or its affiliates
        </p>
      </div>
    </footer>
  );
};

export default Footer;
