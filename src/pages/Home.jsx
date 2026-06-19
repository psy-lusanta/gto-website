import { useEffect } from "react";
import Hero     from "../components/Hero";
import BrandsMarquee from "../components/BrandMarquee";
// import Brands   from "../components/Brands";
import News     from "../components/News";
import Careers  from "../components/Careers";
import Contact  from "../components/Contact";
import About    from "../components/About";

export default function Home() {
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
      <BrandsMarquee />
      {/* <Brands /> */}
    </>
  );
}