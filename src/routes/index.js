import Category from "../pages/Category/Category";
import Home from "../pages/Home/Home";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Search from "../pages/Search/Search";
import Cart from "../pages/Cart/Cart";
import Success from "../pages/Success/Success";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Order from "../pages/Order/Order";
import OrderDetail from "../pages/OrderDetail/OrderDetail";
import UpdateCustomer from "../pages/UpdateCustomers/UpdateCustomer";
import AuthRequired from "../shared/AuthRequired";

export const routers = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/category-:id",
    element: Category,
  },
  {
    path: "/productdetails-:id",
    element: ProductDetails,
  },
  {
    path: "/search",
    element: Search,
  },
  {
    path: "/cart",
    element: Cart,
  },
  {
    path: "/success",
    element: Success,
  },
  {
    path: "/register",
    element: Register,
  },
  {
    path: "/login",
    element: Login,
  },
  {
    path: "/orders",
    element: AuthRequired.CheckNotLogged(Order),
  },
  {
    path: `/orderDetail-:id`,
    element: OrderDetail,
  },
  {
    path: `/updateCustomers-:id`,
    element: AuthRequired.CheckNotLogged(UpdateCustomer),
  },
  {
    path: "*",
    element: NotFound,
  },
];
