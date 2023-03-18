import React from "react";
import Carousel from "react-material-ui-carousel";
import "./banner.css";

const data = [
  "https://rukminim1.flixcart.com/flap/1680/280/image/1defb861e409319b.jpg?q=50",
  "https://rukminim1.flixcart.com/flap/3376/560/image/f6202f13b6f89b03.jpg?q=50",
  "https://rukminim1.flixcart.com/flap/3376/560/image/ae9966569097a8b7.jpg?q=50",
  "https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50",
  "https://rukminim1.flixcart.com/flap/3376/560/image/57267a180af306fe.jpg?q=50",
  "https://rukminim1.flixcart.com/flap/1680/280/image/8d4150cc4f3f967d.jpg?q=50",
  "https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50",
  "https://rukminim1.flixcart.com/flap/3376/560/image/d117a62eb5fbb8e1.jpg?q=50",
];

const Banner = () => {
  return (
    <Carousel
      className="caruosel"
      autoPlay={true}
      animation="slide"
      indicators={false}
      navButtonsAlwaysVisible={true}
      cycleNavigation={true}
      navButtonsProps={{
        style: {
          backgroundColor: "#fff",
          opacity: "0.6",
          color: "#494949",
          borderRadius: 0,
          marginTop: -22,
          height: "10vh",
        },
      }}
    >
      {data.map((imag, i) => {
        return (
          <>
            <img src={imag} alt="img" key={i} className="banner_img" />
          </>
        );
      })}
    </Carousel>
  );
};

export default Banner;
