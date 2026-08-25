import { BrowserRouter, Route, Routes } from "react-router";
import { RootLayout } from "./layout";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { Cart } from "./pages/Cart";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { SingleProduct } from "./pages/SingleProduct";
import { NotFound } from "./components/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/product/slug/:slug" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<ProtectedRoute><h1>checkout</h1></ProtectedRoute>} />
          <Route path="/contato" element={<ProtectedRoute><h1>contato</h1></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
