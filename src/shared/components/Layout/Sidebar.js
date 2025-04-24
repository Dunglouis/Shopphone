import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBanner } from "../../../services/Api";
import { getBannerImage } from "../../ultils";

const Sidebar = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    getBanner({
      params: {
        limit: 6,
      },
    })
      .then(({ data }) => setBanners(data.data.docs))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div id="sidebar" className="col-lg-4 col-md-12 col-sm-12">
        <div id="banner">
          {banners.map((item, index) => (
            <div key={index} className="banner-item">
              <Link to="#">
                <img
                  alt="anh"
                  className="img-fluid"
                  src={getBannerImage(item.image)}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
