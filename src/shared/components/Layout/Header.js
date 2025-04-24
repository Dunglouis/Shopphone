import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loggedOut } from "../../../redux-setup/reducer/auth";

const Header = () => {
  const [keyword, setKeyword] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalCart = useSelector(({ Cart }) =>
    Cart.items.reduce((total, item) => total + item.qty, 0)
  );
  const login = useSelector(({ Auth }) => Auth.logged);
  const logged = login.isLogged;
  const idCustomer = login.currentCustomer?.customer._id;
  const searchValue = (e) => {
    setKeyword(e.target.value);
  };
  const clickSearch = (e) => {
    e.preventDefault();
    return navigate(`/search?keyword=${keyword}`);
  };
  const clickLogOut = (e) => {
    e.preventDefault();
    dispatch(loggedOut());
    return navigate("/login");
  };
  return (
    <>
      <div id="header">
        <div className="container">
          <div className="row">
            <div id="logo" className="col-lg-3 col-md-12 col-sm-12">
              <h1>
                <Link to="/">
                  <img alt="anh" className="img-fluid" src="images/logo.png" />
                </Link>
              </h1>
            </div>
            <div id="search" className="col-lg-4 col-md-12 col-sm-12">
              <form className="form-inline">
                <input
                  onChange={searchValue}
                  className="form-control mt-3"
                  type="search"
                  placeholder="Tìm kiếm"
                  aria-label="Search"
                />
                <button
                  onClick={clickSearch}
                  className="btn btn-danger mt-3"
                  type="submit"
                >
                  Tìm kiếm
                </button>
              </form>
            </div>
            <div id="cart" className="col-lg-5 col-md-12 col-sm-12">
              <i className="fa-solid fa-user mr-1" />
              {logged ? (
                <>
                  <Link className="mr-2" to={`/updateCustomers-${idCustomer}`}>
                    {login.currentCustomer?.customer.fullName}
                  </Link>
                  |
                  <a onClick={clickLogOut} className="mr-2 ml-2" href="#">
                    đăng xuất
                  </a>
                </>
              ) : (
                <>
                  <Link className="mr-2" to="/login">
                    đăng nhập
                  </Link>
                  |
                  <Link className="mr-2 ml-2" to="/register">
                    đăng ký
                  </Link>
                </>
              )}
              |
              <Link className="mt-4 mr-2 ml-2" to="#">
                giỏ hàng
                <ul>
                  <li>
                    <Link to="/cart">
                      <i className="fas fa-shopping-cart" /> Giỏ hàng của bạn
                    </Link>
                  </li>
                  <li>
                    <Link to="/orders">
                      <i className="fas fa-file-alt" /> Đơn hàng đã mua
                    </Link>
                  </li>
                </ul>
              </Link>
              <span className="mt-3">{totalCart}</span>
            </div>
          </div>
        </div>
        {/* Toggler/collapsibe Button */}
        <button
          className="navbar-toggler navbar-light"
          type="button"
          data-toggle="collapse"
          data-target="#menu"
        >
          <span className="navbar-toggler-icon" />
        </button>
      </div>
    </>
  );
};

export default Header;
