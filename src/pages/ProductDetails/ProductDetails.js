import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  createCommentsproduct,
  getCommentsproduct,
  getPorductsDetail,
} from "../../services/Api";
import { formatPrice, getImage } from "../../shared/ultils";
import moment from "moment/moment";
import PaginationProductDetail from "../../shared/components/PaginationProductDetail";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux-setup/reducer/cart";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState([]);
  const [comments, setComments] = useState([]);
  const [inputFrom, setInputFrom] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [pages, setPages] = useState({});
  const page = Number(searchParams.get("page")) || 1;

  const clickAddToCart = (type) => {
    dispatch(
      addToCart({
        _id: productDetail._id,
        name: productDetail.name,
        price: productDetail.price,
        image: productDetail.image,
        qty: 1,
      })
    );
    if (type === "buy-now") {
      return navigate("/cart");
    }
  };

  //cách lấy value từ nhiều from
  const changeInput = (e) => {
    const { name, value } = e.target;
    return setInputFrom({ ...inputFrom, [name]: value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    createCommentsproduct(id, inputFrom)
      .then(({ data }) => {
        if (data.status === "success") {
          reloadComment(id);
          return setInputFrom({});
        }
      })
      .catch((error) => console.log(error));
  };

  const reloadComment = (id) => {
    getCommentsproduct(id, {
      params: {
        limit: 5,
        page,
      },
    })
      .then(({ data }) => {
        setComments(data.data.docs);
        setPages(data.data.pages);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    //getPorductsDetail
    getPorductsDetail(id)
      .then(({ data }) => setProductDetail(data.data))
      .catch((error) => console.log(error));

    reloadComment(id);
  }, [page]);
  return (
    <>
      <div>
        <div id="product-head" className="row">
          <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
            <img alt="anh" src={getImage(productDetail.image)} />
          </div>
          <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
            <h1>{productDetail.name}</h1>
            <ul>
              <li>
                <span>Bảo hành:</span> 12 Tháng
              </li>
              <li>
                <span>Đi kèm:</span> {productDetail.accessories}
              </li>
              <li>
                <span>Tình trạng:</span> {productDetail.status}
              </li>
              <li>
                <span>Khuyến Mại:</span> {productDetail.promotion}
              </li>
              <li id="price">Giá Bán (chưa bao gồm VAT)</li>
              <li id="price-number">{formatPrice(productDetail.price)}</li>
              <li
                className={productDetail.is_stock ? "" : "text-danger"}
                id="status"
              >
                {productDetail.is_stock ? "Còn hàng" : "Hết Hàng"}
              </li>
            </ul>
            {productDetail.is_stock && (
              <div id="add-cart">
                <button
                  onClick={() => clickAddToCart("buy-now")}
                  className="btn btn-warning mr-2"
                >
                  Mua ngay
                </button>

                <button onClick={clickAddToCart} className="btn btn-info">
                  Thêm vào giỏ hàng
                </button>
              </div>
            )}
          </div>
        </div>
        <div id="product-body" className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <h3>Đánh giá về {productDetail.name}</h3>
            {productDetail.details}
          </div>
        </div>
        {/*	Comment	*/}
        <div id="comment" className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <h3>Bình luận sản phẩm</h3>
            <form method="post">
              <div className="form-group">
                <label>Tên:</label>
                <input
                  onChange={changeInput}
                  name="name"
                  required
                  type="text"
                  className="form-control"
                  value={inputFrom.name || ""}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  onChange={changeInput}
                  name="email"
                  required
                  type="email"
                  className="form-control"
                  id="pwd"
                  value={inputFrom.email || ""}
                />
              </div>
              <div className="form-group">
                <label>Nội dung:</label>
                <textarea
                  onChange={changeInput}
                  name="content"
                  required
                  rows={8}
                  className="form-control"
                  value={inputFrom.content || ""}
                />
              </div>
              <button
                onClick={clickSubmit}
                type="submit"
                name="sbm"
                className="btn btn-primary"
              >
                Gửi
              </button>
            </form>
          </div>
        </div>
        {/*	End Comment	*/}
        {/*	Comments List	*/}
        <div id="comments-list" className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            {comments.map((item, index) => (
              <div key={index} className="comment-item">
                <ul>
                  <li>
                    <b>{item.name}</b>
                  </li>
                  <li>
                    {moment(item.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                  </li>
                  <li>
                    <p>{item.content}</p>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
        {/*	End Comments List	*/}
        {/*	End Product	*/}
        <div id="pagination">
          <PaginationProductDetail pages={pages} />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
