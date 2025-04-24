import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  getProductCategory,
  getProductsByCategoryId,
} from "../../services/Api";
import ProductsItem from "../../shared/components/product-item";
import PaginationCategory from "../../shared/components/PaginationCategory";

const Category = () => {
  const { id } = useParams();
  const [productCategory, setProductCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pages, setPages] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  useEffect(() => {
    getProductsByCategoryId(id, {
      params: {
        limit: 9,
        page,
      },
    })
      .then(({ data }) => {
        setCategories(data.data.docs);
        setPages(data.data.pages);
      })
      .catch((error) => console.log(error));

    getProductCategory(id)
      .then(({ data }) => setProductCategory(data.data.name))
      .catch((error) => console.log(error));
  }, [id, page]);

  return (
    <>
      <div>
        <div className="products">
          <h3>
            {productCategory} (hiện có {pages.total} sản phẩm)
          </h3>
          <div className="product-list card-deck">
            {categories.map((item, index) => {
              return <ProductsItem key={index} item={item} />;
            })}
          </div>
        </div>
        {/*	End List Product	*/}
        <div id="pagination">
          <PaginationCategory pages={pages} />
        </div>
      </div>
    </>
  );
};

export default Category;
