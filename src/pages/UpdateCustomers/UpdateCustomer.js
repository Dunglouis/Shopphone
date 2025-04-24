import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateCustomer } from "../../services/Api";
import { updatedCustomer } from "../../redux-setup/reducer/auth";

const UpdateCustomer = () => {
  const currentCustomer = useSelector(
    ({ Auth }) => Auth.logged.currentCustomer
  );
  const [alert, setAlert] = useState(false);
  const [valueInput, setInputValue] = useState(currentCustomer?.customer);
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();

  const inputForm = (e) => {
    const { name, value } = e.target;
    return setInputValue({ ...valueInput, [name]: value });
  };

  const clickUpdate = () => {
    updateCustomer(valueInput._id, valueInput)
      .then(() => {
        setAlert("Cập nhật thông tin khách hàng thành công!");
        setStatus(true);
        return dispatch(updatedCustomer(valueInput));
      })
      .catch((error) => {
        if (error.response?.data === "phone exists") {
          return setAlert("Số điện thoại đã tồn tại!");
        }
      });
  };
  return (
    <>
      <div id="customer">
        {alert && (
          <>
            <div
              className={`alert ${
                status ? "alert-success" : "alert-danger"
              } text-center`}
            >
              {alert}
            </div>
          </>
        )}
        <h3 className="text-center">Thông tin tài khoản</h3>
        <form method="post">
          <div className="row">
            <div id="customer-name" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={inputForm}
                placeholder="Họ và tên (bắt buộc)"
                type="text"
                name="fullName"
                className="form-control"
                value={valueInput?.fullName}
                required
              />
            </div>
            <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={inputForm}
                disabled
                placeholder="Mật khẩu (bắt buộc)"
                type="password"
                name="password"
                className="form-control"
                value={valueInput?.password}
                required
              />
            </div>
            <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={inputForm}
                disabled
                placeholder="Email (bắt buộc)"
                type="text"
                name="email"
                className="form-control"
                value={valueInput?.email}
                required
              />
            </div>
            <div id="customer-phone" className="col-lg-6 col-md-6 col-sm-12">
              <input
                onChange={inputForm}
                placeholder="Số điện thoại (bắt buộc)"
                type="text"
                name="phone"
                className="form-control"
                value={valueInput?.phone}
                required
              />
            </div>
            <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
              <input
                onChange={inputForm}
                placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                type="text"
                name="address"
                className="form-control"
                defaultValue="Đống Đa, Hà Nội"
                value={valueInput?.address}
                required
              />
            </div>
          </div>
        </form>
        <div className="row">
          <div
            onClick={clickUpdate}
            className="by-now col-lg-6 col-md-6 col-sm-12"
          >
            <Link to="#">
              <b>Cập nhật ngay</b>
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

export default UpdateCustomer;
