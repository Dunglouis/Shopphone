import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerCustomer } from "../../services/Api";

const Register = () => {
  const [inputsForm, setInputsForm] = useState({});
  const [errorAlert, setErrorAlert] = useState(false);
  const [status, setStatus] = useState(false);

  const changeInput = (e) => {
    const { name, value } = e.target;
    return setInputsForm({ ...inputsForm, [name]: value });
  };

  const clickRegister = () => {
    registerCustomer(inputsForm)
      .then(() => {
        setErrorAlert("Đăng ký thành công!");
        setStatus(!status);
        setInputsForm({});
      })
      .catch((error) => {
        if (error.response.data === "email exists") {
          return setErrorAlert("Email đã tồn tại!");
        }
        if (error.response.data === "phone exists") {
          return setErrorAlert("Số điện thoại đã tồn tại!");
        }
      });
  };
  return (
    <>
      <div id="customer">
        {errorAlert && (
          <div
            className={`alert ${
              status ? "alert-success" : "alert-danger"
            } text-center`}
          >
            {errorAlert}
          </div>
        )}
        <h3 className="text-center">Đăng ký</h3>
        <form method="post">
          <div className="row">
            <div id="customer-name" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInput}
                placeholder="Họ và tên (bắt buộc)"
                type="text"
                name="fullName"
                className="form-control"
                required
                value={inputsForm.fullName || ""}
              />
            </div>
            <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInput}
                placeholder="Mật khẩu (bắt buộc)"
                type="text"
                name="password"
                className="form-control"
                required
                value={inputsForm.password || ""}
              />
            </div>
            <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInput}
                placeholder="Email (bắt buộc)"
                type="text"
                name="email"
                className="form-control"
                required
                value={inputsForm.email || ""}
              />
            </div>
            <div id="customer-phone" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={changeInput}
                placeholder="Số điện thoại (bắt buộc)"
                type="text"
                name="phone"
                className="form-control"
                required
                value={inputsForm.phone || ""}
              />
            </div>
            <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
              <input
                onChange={changeInput}
                placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                type="text"
                name="address"
                className="form-control"
                required
                value={inputsForm.address || ""}
              />
            </div>
          </div>
        </form>
        <div className="row">
          <div
            onClick={clickRegister}
            className="by-now col-lg-6 col-md-6 col-sm-12"
          >
            <Link to="#">
              <b>Đăng ký ngay</b>
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

export default Register;
