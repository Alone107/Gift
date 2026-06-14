import { Routes, Route } from "react-router-dom";
import "./scss/app.scss";

import Header from "./components/Header";
import Home from "./pages/Home";
import { Suspense, lazy } from "react";

const Cart = lazy(() => import("./pages/Cart"));
const NotFound = lazy(() => import("./pages/NotFound"));
const FullGift = lazy(() => import("./pages/FullGift"));

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <Suspense fallback={<div>Идет загрузка...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/gift/:id" element={<FullGift />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default App;
