import { Link } from "react-router-dom";
import { formatPrice, getImage } from "./../ultils/index";

const ProductsItem = ({ item }) => {
  return (
    <div className="product-item card text-center">
      <Link to={`/productdetails-${item._id}`}>
        <img alt="anh" src={getImage(item.image)} />
      </Link>
      <h4>
        <Link to="#">{item.name}</Link>
      </h4>
      <p>
        Giá Bán: <span>{formatPrice(item.price)}</span>
      </p>
    </div>
  );
};

export default ProductsItem;
