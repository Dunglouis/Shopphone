import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategory } from "../../../services/Api";

const Menu = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getCategory()
      .then(({ data }) => setCategory(data.data.docs))
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <div className="col-lg-12 col-md-12 col-sm-12">
        <nav>
          <div id="menu" className="collapse navbar-collapse">
            <ul>
              {category.map((item, index) => (
                <li className="menu-item">
                  <Link to={`/category-${item._id}`}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Menu;
