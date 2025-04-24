import React, { useEffect, useState } from "react";
import { getProducts } from "../../services/Api";
import { useSearchParams } from "react-router-dom";
import ProductsItem from "../../shared/components/product-item";
import Pagination from "../../shared/components/Pagination";

const Search = () => {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const page = Number(searchParams.get("page")) || 1;
  useEffect(() => {
    getProducts({
      params: {
        name: keyword,
        limit: 6,
        page,
      },
    })
      .then(({ data }) => {
        setProducts(data.data.docs);
        setPages(data.data.pages);
      })
      .catch((error) => console.log(error));
  }, [keyword, page]);
  return (
    <>
      <div>
        <div className="products">
          <div id="search-result">
            Kết quả tìm kiếm với sản phẩm
            <span> {keyword}</span>
          </div>
          <div className="product-list card-deck">
            {products.map((item, index) => (
              <ProductsItem item={item} />
            ))}
          </div>
        </div>
        {/*	End List Product	*/}
        <div id="pagination">
          <Pagination pages={pages} />
        </div>
      </div>
    </>
  );
};

export default Search;
