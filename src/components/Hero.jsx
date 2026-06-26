import { useEffect, useRef, useState } from "react";
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from '../context/ThemeContext'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef(null);
  const { theme } = useTheme();

  // Video autoplay
  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.play().catch(() => {
        const tryPlay = () => {
          v.play();
          document.removeEventListener("touchstart", tryPlay);
        };
        document.addEventListener("touchstart", tryPlay, { once: true });
      });
    }
  }, []);

  return (
    <>
      {/* HERO VIDEO SECTION */}
      <section id="home" className="relative min-h-screen flex items-center pb-16 overflow-hidden">
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

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />

        <div className="relative -top-10 max-w-7xl mx-auto px-4 z-10 w-full">
          <div className="max-w-2xl lg:max-w-3xl">
            <h1 className="font-black text-white leading-none mb-6"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(3rem, 8vw, 5.5rem)" }}>
              GRAN TORO ORO<br />
              <span className="text-[#cea14e]">TRADING</span>
            </h1>

            <p className="text-xl sm:text-2xl text-white/90 mb-10 leading-tight">
              Premium automotive and motorcycle parts distributor since 1972
            </p>

            {/* Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <a href="#brands" className="w-full sm:w-auto">
                <button
                  className="group relative w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 
                 rounded-2xl bg-gradient-to-br from-[#cea14e] via-amber-500 to-yellow-600 
                 text-black font-bold tracking-wider uppercase text-base sm:text-sm
                 hover:from-[#cea14e] hover:via-amber-600 hover:to-yellow-700 
                 transform hover:-rotate-1 active:scale-95 
                 transition-all duration-300 ease-out shadow-lg shadow-yellow-500/40 
                 hover:shadow-xl hover:shadow-yellow-500/50 overflow-hidden"
                >
                  <span className="flex items-center justify-center gap-3 relative z-10">
                    {/* Sun Icon */}
                    <svg
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
                      />
                    </svg>

                    <span>Our Brands</span>

                    {/* Arrow Icon */}
                    <svg
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      fill="none"
                      className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2"
                    >
                      <path
                        d="M5 12h14m-7-7l7 7-7 7"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>

                  {/* Shine / Highlight Effects */}
                  <div className="absolute inset-0 rounded-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-300 bg-gradient-to-tl from-amber-200/40 via-transparent to-transparent" />

                  <div className="absolute -left-full top-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-[200%] transition-transform duration-700 ease-out" />
                </button>
              </a>
            </div>
          </div>
        </div>

        {theme === 'dark' && (
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#08070a] to-transparent pointer-events-none" />
        )}
      </section>
    </>
  );
}