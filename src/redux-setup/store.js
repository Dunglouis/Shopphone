import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import cartReducer from "./reducer/cart";
import authReducer from "./reducer/auth";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "VietPro",
  storage,
};
const persistCartReducer = persistReducer(persistConfig, cartReducer);
const persistAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    Cart: persistCartReducer,
    Auth: persistAuthReducer,
  },
});
export const persistor = persistStore(store);
export default store;
