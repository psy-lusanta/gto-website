import { useEffect, useRef, useState } from "react";
import { Rocket } from "lucide-react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
// import Model from '../animation/Model';

export default function Hero() {
  const [hidden, setHidden] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setHidden(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".counter[data-target]");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = +el.dataset.target;
        let count = 0;
        const step = () => {
          count += target / 120;
          if (count < target) { el.textContent = Math.ceil(count).toLocaleString(); requestAnimationFrame(step); }
          else el.textContent = target.toLocaleString();
        };
        step();
        io.unobserve(el);
      });
    }, { threshold: 0.3 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.play().catch(() => {
        const tryPlay = () => { v.play(); document.removeEventListener("touchstart", tryPlay); };
        document.addEventListener("touchstart", tryPlay, { once: true });
      });
    }
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-32 pb-16 overflow-hidden">

      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/gto-hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      <div className="absolute inset-0 dark:bg-[#08070a]/70" />

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 30% 40%, rgba(194,69,12,.25), transparent 60%), radial-gradient(ellipse 50% 50% at 75% 65%, rgba(232,140,58,.1), transparent 55%)" }} />

      <div className="absolute bottom-0 left-0 right-0 h-48 sm:h-64 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #08070a)" }} />

      <div className="relative max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full">
{/* 
        <div>
          <span className="hero-h1 block mb-3 text-xs font-bold tracking-[.2em] uppercase text-yellow-500"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Automotive Parts & Accessories
          </span>

          <h1 className="hero-h1 font-black leading-none tracking-tight text-white mb-5"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2.5rem, 8vw, 5rem)" }}>
            <span className="block">
              <em className="text-yellow-500 not-italic">G</em>EARING
            </span>
            <span className="block ml-[10%] sm:ml-[10%]">
              <em className="text-yellow-500 not-italic">T</em>OWARDS
            </span>
            <span className="block ml-[20%] sm:ml-[20%]">
              <em className="text-yellow-500 not-italic">O</em>UTCOME
            </span>
          </h1>

          <p className="hero-p text-slate-300 leading-relaxed mb-8"
            style={{ fontSize: "clamp(0.875rem, 2.5vw, 1rem)" }}>
            Discover trusted components, accessories, and expert support for every vehicle brand across the Philippines.
          </p>
          
          <div className="hero-actions flex flex-wrap gap-3">
            <button onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-glow px-6 py-3 rounded-full bg-gradient-to-r from-orange-700 to-orange-400 text-white font-semibold text-sm hover:-translate-y-0.5 transition-transform border-none cursor-pointer">
              Shop Now
            </button>
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 rounded-full border border-white/30 text-white font-semibold text-sm hover:border-orange-500 hover:bg-orange-900/20 transition-all bg-white/5 backdrop-blur-sm cursor-pointer">
              Get Quote
            </button>
          </div>

          <div className="hero-actions grid grid-cols-4 gap-4 mt-10 pt-8 border-t border-white/20">
            {[
              { num: 6000, suf: "+", label: "Products" },
              { num: 99, suf: "%", label: "Satisfaction" },
              { num: 25, suf: "+", label: "Years" },
              { num: 10000, suf: "+", label: "In Stock" },
            ].map(s => (
              <div key={s.label} className="text-center sm:text-left">
                <div className="font-black text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(1.25rem, 4vw, 1.75rem)" }}>
                  <span className="counter" data-target={s.num}>0</span>{s.suf}
                </div>
                <div className="text-slate-300 uppercase tracking-widest mt-0.5" style={{ fontSize: "clamp(0.6rem, 1.5vw, 0.75rem)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div> */}

        <div className="hero-cards hidden lg:grid gap-4">
          {/* <div className="rounded-3xl overflow-hidden border border-white/10 h-[400px] bg-black/20 backdrop-blur-sm">
            <Canvas camera={{ position: [0, 1, 5], fov: 50 }}>
              <ambientLight intensity={1.5} />
              <directionalLight position={[5, 5, 5]} intensity={2} />
              <Suspense fallback={null}>
                <Model />
              </Suspense>
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={5} />
            </Canvas>
          </div> */}
        </div>
      </div>

      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-slate-300 transition-opacity duration-500 ${hidden ? "opacity-0" : "opacity-100"}`}>
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-slate-300 to-transparent" />
      </div>
    </section>
  );
}