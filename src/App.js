import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./shared/components/Layout/Header";
import Slider from "./shared/components/Layout/Slider";
import Menu from "./shared/components/Layout/Menu";
import Sidebar from "./shared/components/Layout/Sidebar";
import Footer from "./shared/components/Layout/Footer";
import { Provider } from "react-redux";
import store, { persistor } from "./redux-setup/store";
import { PersistGate } from "redux-persist/integration/react";
import { routers } from "./routes";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <>
            <div>
              <Header />

              <div id="body">
                <div className="container">
                  <div className="row">
                    <Menu />
                  </div>
                  <div className="row">
                    <div id="main" className="col-lg-8 col-md-12 col-sm-12">
                      <Slider />

                      <Routes>
                        {routers.map((router, index) => (
                          <Route
                            key={index}
                            path={router.path}
                            element={<router.element />}
                          />
                        ))}
                      </Routes>
                    </div>
                    <Sidebar />
                  </div>
                </div>
              </div>
              {/*	End Body	*/}
              <Footer />
            </div>
          </>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
