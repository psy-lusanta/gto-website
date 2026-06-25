import { useEffect, useRef, useState } from "react";
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from '../context/ThemeContext'

const heroSlides = [
  { src: "/Banner/Artboard 1.jpg", alt: "Premium Automotive Products" },
  { src: "/Banner/Artboard 2.jpg", alt: "Motorcycle Excellence" },
  { src: "/Banner/Artboard 3.jpg", alt: "Warehouse & Logistics" },
  { src: "/Banner/Artboard 4.jpg", alt: "Our Partners" },
  { src: "/Banner/Artboard 5.jpg", alt: "Our Partners" },
  { src: "/Banner/Artboard 6.jpg", alt: "Our Partners" },
  { src: "/Banner/Artboard 7.jpg", alt: "Our Partners" },
  { src: "/Banner/Artboard 8.jpg", alt: "Our Partners" },
  { src: "/Banner/Artboard 9.jpg", alt: "Our Partners" },
  { src: "/Banner/Artboard 10.jpg", alt: "Our Partners" },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef(null);
  const { theme } = useTheme();

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => setCurrentSlide(index);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);

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
      {/*HERO VIDEO SECTION */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
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

        {theme === 'dark' && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        )}
        

        {/* Bottom fade from video to next section */}
        {theme === 'dark' && (
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#08070a] to-transparent pointer-events-none" />
        )}
      </section>

      {/* 2. ABOUT BANNER SECTION */}
      <section className="relative py-20 sm:py-32 flex items-center justify-center text-center overflow-hidden px-4 bg-[#fdfbf3] dark:bg-[#08070a]">
        {/* Background Accent */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(194,69,12,.15), transparent 70%)"
          }}
        />

        <div className="relative max-w-4xl mx-auto z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.25, delayChildren: 0.1 }
              }
            }}
          >
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.8, ease: [0.21, 0.92, 0.3, 1] }}
              className="font-black text-[#1c1505] dark:text-white leading-none mb-2"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(2.8rem, 8.5vw, 5.2rem)"
              }}
            >
              GRAN TORO ORO
            </motion.h1>

            <motion.h2
              variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.9, ease: [0.21, 0.92, 0.3, 1], delay: 0.4 }}
              className="font-black text-[#1c1505] dark:text-white leading-none"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(2.4rem, 7.5vw, 4.5rem)"
              }}
            >
              <em className="text-[#cea14e] dark:text-[#cea14e] not-italic">Trading Corporation</em>
            </motion.h2>
          </motion.div>
        </div>

        {/* Bottom fade to carousel */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/5 dark:from-black to-transparent pointer-events-none" />
      </section>

      {/* 3. IMAGE CAROUSEL SECTION */}
      <section className="relative py-8 bg-black">
        <div className="relative mx-auto w-full max-w-[1920px] px-4 lg:px-6">
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-3xl shadow-2xl">
            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center" }}
                />
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 md:p-4 rounded-full transition-all z-20 backdrop-blur-md"
              aria-label="Previous slide"
            >
              <ChevronLeft size={28} className="md:w-8 md:h-8" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 md:p-4 rounded-full transition-all z-20 backdrop-blur-md"
              aria-label="Next slide"
            >
              <ChevronRight size={28} className="md:w-8 md:h-8" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3.5 h-3.5 md:w-4 md:h-4 rounded-full transition-all duration-300 border-2 border-white ${index === currentSlide
                    ? "bg-yellow-500 border-yellow-500 scale-110"
                    : "bg-transparent hover:bg-white/60"
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}