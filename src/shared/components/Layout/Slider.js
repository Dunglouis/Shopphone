import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSlider } from "../../../services/Api";
import { getSliderImage } from "../../ultils";

const Slider = () => {
  const [sliders, setSliders] = useState([]);
  useEffect(() => {
    getSlider({
      params: {
        sort: 1, // cac gia tri nay can duoc config sang file khac trong constants
        limit: 10,
      },
    })
      .then(({ data }) => setSliders(data.data.docs))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div id="slide" className="carousel slide" data-ride="carousel">
        {/* Indicators */}
        <ul className="carousel-indicators">
          {sliders.map((item, index) => (
            <li
              data-target="#slide"
              data-slide-to={index}
              className={`${index === 0 ? "active" : ""}`}
            />
          ))}
        </ul>
        {/* The slideshow */}
        <div className="carousel-inner">
          {sliders.map((item, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={index}
            >
              <img src={getSliderImage(item.image)} alt="Vietpro Academy" />
            </div>
          ))}
        </div>
        {/* Left and right controls */}
        <Link className="carousel-control-prev" to="#slide" data-slide="prev">
          <span className="carousel-control-prev-icon" />
        </Link>
        <Link className="carousel-control-next" to="#slide" data-slide="next">
          <span className="carousel-control-next-icon" />
        </Link>
      </div>
    </>
  );
};

export default Slider;
