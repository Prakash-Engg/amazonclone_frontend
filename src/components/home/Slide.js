import { Divider } from "@mui/material";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import { products } from "./Productdata"; dummy data
import "./slide.css";
import { Link } from "react-router-dom";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Slide = (props) => {
  return (
    <div className="products_section">
      <div className="products_deal">
        <h3>{props.title}</h3>
        <button className="view_btn">View All</button>
      </div>
      <Divider />
      <Carousel
        responsive={responsive}
        infinite={true}
        swipeable={true}
        draggable={false}
        showDots={false}
        centerMode={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        containerClass="carousel-container"
      >
        {props.products.map((e) => {
          return (
            <Link to={`/getproductsone/${e.id}`}>
              {/* // we can also enclosed this in a div and give it an onclick
              fucntion and inside that function we can use usenavigate hook to
              do the same process instead of using a Link */}
              <div className="products_items">
                <div className="product_image">
                  <img className="img1" src={e.url} alt="product_item" />
                  <div className="fitkaro">
                    <p className="products_name" style={{ fontWeight: "500" }}>
                      {e.title.shortTitle}
                    </p>
                    <p className="products_offer" style={{ fontWeight: "700" }}>
                      {e.discount}
                    </p>
                    <p className="products_explore">{e.tagline}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Slide;
