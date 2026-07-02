import { useState, useMemo, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    src: "/Banner/aeropak.jpg",
    title: "Premium Automotive Products",
    subtitle: "Trusted brands, delivered nationwide.",
    cta: "Shop Now",
    ctaBrand: "AEROPAK",
  },
  {
    src: "/Banner/autogreen.jpg",
    title: "AUTOGREEN Tires",
    subtitle: "High performance tires for your ride.",
    cta: "View Tires",
    ctaBrand: "AUTOGREEN TIRES",
  },
  {
    src: "/Banner/blaupunkt.jpg",
    title: "BLAUPUNKT Audio",
    subtitle: "Premium sound systems for your vehicle.",
    cta: "View BLAUPUNKT",
    ctaBrand: "BLAUPUNKT",
  },
  {
    src: "/Banner/safeway.jpg",
    title: "SAFEWAY Products",
    subtitle: "Quality cleaning & maintenance.",
    cta: "View SAFEWAY",
    ctaBrand: "SAFEWAY TIRES",
  },
  {
    src: "/Banner/eni oil.jpg",
    title: "ENI Lubricants",
    subtitle: "World-class engine oils.",
    cta: "View ENI",
    ctaBrand: "ENI LUBRICANTS",
  },
  {
    src: "/Banner/gto.jpg",
    title: "GTO Quality",
    subtitle: "Trusted since 1972.",
    cta: "Explore GTO",
    ctaBrand: null,
  },
  {
    src: "/Banner/lubrigold.jpg",
    title: "LUBRIGOLD",
    subtitle: "Premium performance lubricants.",
    cta: "View LUBRIGOLD",
    ctaBrand: "LUBRIGOLD",
  },
  {
    src: "/Banner/st power.jpg",
    title: "ST POWER Battery",
    subtitle: "Long-lasting power for your vehicle.",
    cta: "View ST POWER",
    ctaBrand: "ST POWER BATTERY",
  },
  {
    src: "/Banner/veento.jpg",
    title: "VEENTO Tires",
    subtitle: "Reliable performance tires.",
    cta: "View VEENTO",
    ctaBrand: "VEENTO TIRES",
  },
  {
    src: "/Banner/whiz.jpg",
    title: "WHIZ Products",
    subtitle: "Quality cleaning & maintenance.",
    cta: "View WHIZ",
    ctaBrand: "WHIZ",
  },
];

function ShopBanner({ activeBrand }) {
  const [current, setCurrent] = useState(0);
  const autoRef = useRef(null);

  const filteredSlides = useMemo(() => {
    if (!activeBrand || activeBrand === "All") {
      return slides;
    }
    return slides.filter(slide => slide.ctaBrand === activeBrand);
  }, [activeBrand]);

  const goTo = (index) => {
    if (filteredSlides.length === 0) return;
    setCurrent(index % filteredSlides.length);
  };

  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  // Auto slide
  useEffect(() => {
    if (filteredSlides.length <= 1) return;

    autoRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % filteredSlides.length);
    }, 5000);

    return () => clearInterval(autoRef.current);
  }, [filteredSlides.length]);

  // Reset slide when brand changes
  useEffect(() => {
    setCurrent(0);
  }, [activeBrand]);

  if (filteredSlides.length === 0) {
    return (
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "21/7" }}>
        <div className="absolute inset-0 flex items-center justify-center bg-black text-white text-xl">
          No banner for this brand
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: "21/7" }}
      onMouseEnter={() => clearInterval(autoRef.current)}
      onMouseLeave={() => {
        if (filteredSlides.length > 1) {
          autoRef.current = setInterval(() => {
            setCurrent(c => (c + 1) % filteredSlides.length);
          }, 5000);
        }
      }}
    >
      {filteredSlides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <img
            src={slide.src}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={next}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {filteredSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all ${i === current
                ? "bg-yellow-500 w-6 h-2"
                : "bg-white/60 hover:bg-white w-2 h-2"
              }`}
          />
        ))}
      </div>
    </div>
  );
}

export default ShopBanner;