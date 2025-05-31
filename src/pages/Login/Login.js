import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginCustomer } from "../../services/Api";
import { useDispatch } from "react-redux";
import { loggedIn } from "../../redux-setup/reducer/auth";

const Login = () => {
  const [inputForm, setInputForm] = useState({});
  const [errorAlert, setErrorAlert] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputValue = (e) => {
    const { name, value } = e.target;
    return setInputForm({ ...inputForm, [name]: value });
  };

  const clickLogin = (e) => {
    loginCustomer(inputForm)
      .then(({ data }) => {
        dispatch(loggedIn(data));
        return navigate("/");
      })
      .catch((error) => {
        if (error.response.data === "email not valid")
          return setErrorAlert("Email không hợp lệ!");
        if (error.response.data === "password not valid")
          return setErrorAlert("Mật khẩu không hợp lệ!");
        console.log(error);
      });
  };

  return (
    <>
      <div id="customer">
        {errorAlert && (
          <div className="alert alert-danger text-center">{errorAlert}</div>
        )}
        <h3 className="text-center">Đăng nhập</h3>
        <form method="post">
          <div className="row">
            <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={inputValue}
                placeholder="Email (bắt buộc)"
                type="text"
                name="email"
                className="form-control"
                required
              />
            </div>
            <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={inputValue}
                placeholder="Mật khẩu (bắt buộc)"
                type="text"
                name="password"
                className="form-control"
                required
              />
            </div>
          </div>
        </form>
        <div className="row">
          <div
            onClick={clickLogin}
            className="by-now col-lg-6 col-md-6 col-sm-12"
          >
            <Link to="">
              <b>Đăng nhập ngay</b>
            </Link>
          </div>
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <Link to="#">
              <b>Quay về trang chủ</b>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
