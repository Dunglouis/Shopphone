import { BASE_URL } from "../constants/app";

export const getImage = (imageName) => {
  return `${BASE_URL}/assets/uploads/products/${imageName}`;
};

export const getSliderImage = (imageName) => {
  return `${BASE_URL}/assets/uploads/sliders/${imageName}`;
};
export const getBannerImage = (imageName) => {
  return `${BASE_URL}/assets/uploads/banners/${imageName}`;
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
