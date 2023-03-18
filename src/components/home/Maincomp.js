import React, { useEffect } from "react";
import Banner from "./Banner";
import "./home.css";
import Slide from "./Slide";
import { getProducts } from "../redux/actions/action";
import { useDispatch, useSelector } from "react-redux";

const Maincomp = () => {
  const { products } = useSelector((state) => state.getproductsdata);
  console.log(products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="home_section">
      <div className="banner_part">
        <Banner />
      </div>
      <div className="slide_part">
        <div className="left_slide">
          <Slide title="Deal of the Day" products={products} />
        </div>
        <div className="right_slide">
          <h4 className="festive">Festive latest launches</h4>
          <img src="./feed3.webp" alt="" className="feed3_img" />
          <a href="#">see more</a>
        </div>
      </div>
      <Slide title="Today's Deal" products={products} />
      <div className="center_img">
        <img
          src="https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg"
          alt="wtf"
        />
      </div>
      <Slide title="Best Seller" products={products} />
      <Slide title="Upto 80% off" products={products} />
    </div>
  );
};

export default Maincomp;
