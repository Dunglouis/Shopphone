import React, { useEffect, useState } from "react";
import { getProducts } from "../../services/Api";
import ProductsItem from "../../shared/components/product-item";

const Home = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    getProducts({
      params: {
        limit: 6,
      },
    })
      .then(({ data }) => setLatestProducts(data.data.docs))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    getProducts({
      params: {
        limit: 6,
        is_featured: true,
      },
    })
      .then(({ data }) => setFeatured(data.data.docs))
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <div className="products">
        <h3>Sản phẩm nổi bật</h3>
        <div className="product-list card-deck">
          {featured.map((item, index) => (
            <ProductsItem key={index} item={item} />
          ))}
        </div>
      </div>
      {/*	End Feature Product	*/}
      {/*	Latest Product	*/}
      <div className="products">
        <h3>Sản phẩm mới</h3>
        <div className="product-list card-deck">
          {latestProducts.map((item, index) => (
            <ProductsItem key={index} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
