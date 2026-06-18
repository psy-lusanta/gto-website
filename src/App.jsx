import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Brands from "./components/Brands";
import About from "./components/About";
import Shop from "./components/Shop";
import Blog from "./components/Blog";
import News from "./components/News";
// import Gallery     from "./components/Gallery";
import Careers from "./components/Careers";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
//Another Page
import ProductPage from "./components/ProductPage";
import BlogPage from "./components/BlogPage";
import PolicyPage from "./components/PolicyPage";


function Home() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-right");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Hero />
      <Brands />
      {/* <Shop /> */}
      {/* <Blog /> */}
      <News />
      {/* <Gallery /> */}
      <Contact />
      <Careers />
      <About />
    </>
  );
}

export default function App() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="bg-[#08070a] min-h-screen">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/blog/:id/:slug" element={<BlogPage />} />
          <Route path="/policies/:slug" element={<PolicyPage />} />
          <Route path="/terms-and-conditions" element={<PolicyPage />} />
          <Route path="/privacy-policy" element={<PolicyPage />} />
          <Route path="/refund-policy" element={<PolicyPage />} />
          <Route path="/faq" element={<PolicyPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}