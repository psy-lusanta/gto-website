import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar      from "./components/Navbar";
import Footer      from "./components/Footer";
import Home        from "./pages/Home";
// import BrandsPage  from "./pages/BrandsPage";
import ShopPage    from "./pages/ShopPage";
import NewsPage    from "./pages/NewsPage";
import ContactPage from "./pages/ContactPage";
import CareersPage from "./pages/CareersPage";
import AboutPage   from "./pages/AboutPage";
import ProductPage from "./components/ProductPage";
import BlogPage    from "./components/BlogPage";
import PolicyPage  from "./components/PolicyPage";

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="bg-[#fdfbf3] dark:bg-[#08070a] min-h-screen transition-colors duration-300">
      <Navbar />
      <main>
        <Routes>
          <Route path="/"                     element={<Home />} />
          {/* <Route path="/brands"           element={<BrandsPage />} /> */}
          <Route path="/shop"                 element={<ShopPage />} />
          <Route path="/news"                 element={<NewsPage />} />
          <Route path="/contact"              element={<ContactPage />} />
          <Route path="/careers"              element={<CareersPage />} />
          <Route path="/about"                element={<AboutPage />} />
          <Route path="/product/:id"          element={<ProductPage />} />
          <Route path="/blog/:id/:slug"       element={<BlogPage />} />
          <Route path="/:slug"                element={<PolicyPage />} />
          <Route path="/:slug"                element={<PolicyPage />} />
          <Route path="/:slug"                element={<PolicyPage />} />
          <Route path="/:slug"                element={<PolicyPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}