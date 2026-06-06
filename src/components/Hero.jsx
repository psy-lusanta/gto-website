import { useEffect, useRef, useState } from "react";
import { Rocket } from "lucide-react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import Model from '../animation/Model';

export default function Hero() {

  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHidden(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-32 pb-16 overflow-hidden">

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 30% 40%, rgba(194,69,12,.18), transparent 60%), radial-gradient(ellipse 50% 50% at 75% 65%, rgba(232,140,58,.07), transparent 55%)" }} />
      <div className="absolute inset-0 opacity-[.035] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full">

        {/* Copy */}
        <div>
          <span className="hero-h1 block mb-3 text-xs font-bold tracking-[.2em] uppercase text-yellow-500"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Automotive Parts & Accessories
          </span>

          <h1 className="hero-h1 font-black leading-none tracking-tight text-white mb-5"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2.5rem, 8vw, 5rem)" }}>
            Drive <em className="text-yellow-500 not-italic">performance</em> with premium car products.
          </h1>

          <p className="hero-p text-slate-400 leading-relaxed mb-8"
            style={{ fontSize: "clamp(0.875rem, 2.5vw, 1rem)" }}>
            Discover trusted components, accessories, and expert support for every vehicle brand across the Philippines.
          </p>

          <div className="hero-actions flex flex-wrap gap-3">
            <button onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-glow px-6 py-3 rounded-full bg-gradient-to-r from-orange-700 to-orange-400 text-white font-semibold text-sm hover:-translate-y-0.5 transition-transform border-none cursor-pointer">
              Shop Now
            </button>
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-3 rounded-full border border-white/20 text-white font-semibold text-sm hover:border-orange-500 hover:bg-orange-900/10 transition-all bg-transparent cursor-pointer">
              Get Quote
            </button>
          </div>

          {/* Stats */}
          <div className="hero-actions grid grid-cols-4 gap-4 mt-10 pt-8 border-t border-white/10">
            {[
              { num: "200+", label: "Products" },
              { num: "99%", label: "Satisfaction" },
              { num: "25+", label: "Years" },
              { num: "10k+", label: "In Stock" },
            ].map(s => (
              <div key={s.label} className="text-center sm:text-left">
                <div className="font-black text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(1.25rem, 4vw, 1.75rem)" }}>
                  {s.num}
                </div>
                <div className="text-slate-500 uppercase tracking-widest mt-0.5" style={{ fontSize: "clamp(0.6rem, 1.5vw, 0.75rem)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cards — hidden on mobile */}
        <div className="hero-cards hidden lg:grid gap-4">
          <div className="rounded-3xl p-6 border border-white/10"
            style={{ background: "linear-gradient(135deg, rgba(194,69,12,.22), rgba(146,64,14,.08))" }}>
            <div className="flex gap-2">
              <Rocket className="w-6 h-6 text-yellow-500" />
              <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Fast Delivery
              </h3>
            </div>
            <p className="text-orange-100/80 text-sm leading-relaxed">On-time nationwide shipping for all orders across the Philippines.</p>
          </div>
          <div className="rounded-3xl overflow-hidden border border-white/10 h-[400px]">
            <Canvas camera={{ position: [0, 1, 5], fov: 50 }}>
              <ambientLight intensity={1.5} />
              <directionalLight position={[5, 5, 5]} intensity={2} />

              <Suspense fallback={null}>
                <Model />
              </Suspense>

              <OrbitControls
                enableZoom={false}
                autoRotate
                autoRotateSpeed={5}
              />
            </Canvas>
          </div>
        </div>
      </div>

      {/* Scroll indicator — hidden on very small screens */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-slate-500 transition-opacity duration-500 ${hidden ? "opacity-0" : "opacity-100"
          }`}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-slate-500 to-transparent" />
      </div>
    </section>
  );
}