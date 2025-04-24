import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice, getImage } from "../../shared/ultils";
import { deleteItemCart, updateCart } from "../../redux-setup/reducer/cart";
import { Link, useNavigate } from "react-router-dom";
import { order } from "../../services/Api";

const Cart = () => {
  const login = useSelector(({ Auth }) => Auth.logged);
  const itemsCart = useSelector(({ Cart }) => Cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newItemsCart = itemsCart.map((item) => ({
    prd_id: item._id,
    price: item.price,
    qty: item.qty,
  }));

  const data = {
    customer_id: login.currentCustomer?.customer._id,
    fullName: login.currentCustomer?.customer.fullName,
    email: login.currentCustomer?.customer.email,
    phone: login.currentCustomer?.customer.phone,
    address: login.currentCustomer?.customer.address,
    items: newItemsCart,
  };

  const changeQty = (e, id) => {
    const value = Number(e.target.value);
    if (value === 0) {
      // eslint-disable-next-line no-restricted-globals
      const isComfirm = confirm("Bạn có muốn xóa sản phẩm này không?");
      return isComfirm ? dispatch(deleteItemCart({ _id: id })) : false;
    }
    dispatch(
      updateCart({
        _id: id,
        qty: value,
      })
    );
  };

  const clickOrder = (e) => {
    e.preventDefault();
    console.log(data);

    order(data)
      .then(() => navigate("/success"))
      .catch((error) => console.log(error));
  };

  const clickDelete = (id) => {
    dispatch(
      deleteItemCart({
        _id: id,
      })
    );
  };
  return (
    <>
      <div>
        <div id="my-cart">
          <div className="row">
            <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">
              Thông tin sản phẩm
            </div>
            <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">
              Tùy chọn
            </div>
            <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
          </div>
          <form method="post">
            {itemsCart.map((item, index) => (
              <div className="cart-item row">
                <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                  <img alt="anh" src={getImage(item.image)} />
                  <h4>{item.name}</h4>
                </div>
                <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                  <input
                    onChange={(e) => changeQty(e, item._id)}
                    type="number"
                    id="quantity"
                    className="form-control form-blue quantity"
                    value={item.qty}
                  />
                </div>
                <div
                  onClick={() => clickDelete(item._id)}
                  className="cart-price col-lg-3 col-md-3 col-sm-12"
                >
                  <b>{formatPrice(item.qty * item.price)}</b>
                  <Link to="#">Xóa</Link>
                </div>
              </div>
            ))}

            <div className="row">
              <div className="cart-thumb col-lg-7 col-md-7 col-sm-12"></div>
              <div className="cart-total col-lg-2 col-md-2 col-sm-12">
                <b>Tổng cộng:</b>
              </div>
              <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                <b>
                  {formatPrice(
                    itemsCart.reduce(
                      (total, item) => total + item.qty * item.price,
                      0
                    )
                  )}
                </b>
              </div>
            </div>
          </form>
        </div>
        {/*	End Cart	*/}
        {/*	Customer Info	*/}
        <div id="customer">
          <div className="row">
            {login.isLogged ? (
              <div
                onClick={(e) => clickOrder(e)}
                className="by-now col-lg-6 col-md-6 col-sm-12"
              >
                <Link to="#">
                  <b>Mua ngay</b>
                  <span>Giao hàng tận nơi siêu tốc</span>
                </Link>
              </div>
            ) : (
              <div className="by-now col-lg-6 col-md-6 col-sm-12">
                <Link to="/login">
                  <b>Đăng nhập</b>
                  <span>Đăng nhập để mua hàng</span>
                </Link>
              </div>
            )}
            <div className="by-now col-lg-6 col-md-6 col-sm-12">
              <Link to="#">
                <b>Trả góp Online</b>
                <span>Vui lòng call (+84) 0988 550 553</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
