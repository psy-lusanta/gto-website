import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { Scale, Leaf, Heart, Landmark, BowArrow, Rocket, Compass, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

const timeline = [
  { decade: "1970s", color: "from-yellow-700 to-yellow-500", events: ["Metro Manila Automotive Sales was founded in 1972, conquering the VIZMIN market on take-off.", "First brands carried: Whiz, Gold Eagle, KNW, Hella, Plastic Coat and Orelube."] },
  { decade: "1980s", color: "from-yellow-600 to-amber-500", events: ["Company name changes as operations continue to grow.", "Metro Manila Automotive Sales → First Metro → Inter-Island Industrial Sales → Metro Gold → Gold Rush."] },
  { decade: "1990s", color: "from-amber-600 to-yellow-500", events: ["Kabignayan St. in Banawe became the new home for Gold Rush.", "Became an avid affiliate of the Association of Philippine Volunteer Fire Brigades, Inc."] },
  { decade: "2000s", color: "from-yellow-700 to-yellow-400", events: ["On July 5, 2012, Gran Toro Oro Trading was officially registered.", "Prominent brands joined: Repsol, Aeropak, Lubrigold, Safeway, JTC, Silock, Osram, Michiba, Blaupunkt.", "Business Support Team launched — focusing on Tele Sales and E-commerce."] },
];

const historyImages = [
  {
    src: "/Old Pictures/pic1.jpg",
  },
  {
    src: "/Old Pictures/pic2.jpg",
  },
  {
    src: "/Old Pictures/pic3.jpg",
  },
  {
    src: "/Old Pictures/pic4.jpg",
  },
  {
    src: "/Old Pictures/pic5.jpg",
  },
  {
    src: "/Old Pictures/pic6.jpg",
  },
  {
    src: "/Old Pictures/pic7.jpg",
  },
  {
    src: "/Old Pictures/pic8.jpg",
  },
  {
    src: "/Old Pictures/pic9.jpg",
  },
  {
    src: "/Old Pictures/pic10.jpg",
  },
  {
    src: "/Old Pictures/pic11.jpg",
  },
  {
    src: "/Old Pictures/pic12.jpg",
  },
  {
    src: "/Old Pictures/pic13.jpg",
  },
  {
    src: "/Old Pictures/pic14.jpg",
  },
  {
    src: "/Old Pictures/pic15.jpg",
  },
  {
    src: "/Old Pictures/pic16.jpg",
  },
  {
    src: "/Old Pictures/pic17.jpg",
  },
  {
    src: "/Old Pictures/pic18.jpg",
  },
  {
    src: "/Old Pictures/pic19.jpg",
  },
];

const values = [
  { icon: Scale, title: "Professionalism", desc: "We uphold integrity, accountability, and excellence." },
  { icon: Leaf, title: "Responsibility", desc: "We act as a committed and responsible organization." },
  { icon: Heart, title: "Customer-centricity", desc: "Our partners are at the heart of everything we do." },
  { icon: Landmark, title: "Legacy", desc: "We build sustainable growth grounded in our history." },
];

export default function About() {
  const [activeDecade, setActiveDecade] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { theme } = useTheme();

  // Auto-slide for history carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % historyImages.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => setCurrentSlide(index);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + historyImages.length) % historyImages.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % historyImages.length);

  // Counter animation effect (existing)
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
          if (count < target) {
            el.textContent = Math.ceil(count).toLocaleString();
            requestAnimationFrame(step);
          } else el.textContent = target.toLocaleString();
        };
        step();
        io.unobserve(el);
      });
    }, { threshold: 0.3 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="about-us" className="bg-[#fdfbf3] dark:bg-[#08070a] overflow-hidden transition-colors duration-300">

      {/* Stats */}
      <div className="bg-white/60 dark:bg-white/[.02] border-y border-[#e8dfc8] dark:border-white/10 py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { num: 6000, suf: "+", label: "Direct Clients Nationwide" },
            { num: 50, suf: "+", label: "Years of Industry Experience" },
            { num: 10, suf: "+", label: "Premium Brands Carried" },
            { num: 10000, suf: "+", label: "Products in Stock" },
          ].map((s, i) => (
            <div key={s.label} className="reveal text-center" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="font-black text-[#1c1505] dark:text-white mb-1"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2rem, 6vw, 3rem)" }}>
                <span className="counter" data-target={s.num}>0</span>{s.suf}
              </div>
              <p className="text-[#6b5d3f] dark:text-slate-500 text-xs sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Purpose */}
      <div className="pt-16 sm:pt-24 max-w-3xl mx-auto px-4 text-center reveal">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="w-8 sm:w-12 h-px bg-yellow-600" />
          <span className="text-xs font-bold tracking-[.2em] uppercase text-yellow-600 dark:text-yellow-500"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Our Purpose</span>
          <div className="w-8 sm:w-12 h-px bg-yellow-600" />
        </div>
        <div className="w-12 h-12 rounded-2xl bg-yellow-100 dark:bg-yellow-600/15 border border-yellow-300 dark:border-yellow-600/25 flex items-center justify-center mx-auto mb-5">
          <Compass size={22} className="text-yellow-600 dark:text-yellow-500" />
        </div>
        <p className="text-[#3f3522] dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          To empower businesses by providing reliable product solutions, consistent supply, and strong brand support, enabling our partners to grow with confidence in a competitive market.
        </p>
      </div>

      {/* Vision & Mission */}
      <div className="py-16 sm:py-24 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="reveal relative rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-[#e8dfc8] dark:border-white/10 overflow-hidden group hover:border-yellow-500/50 dark:hover:border-yellow-600/30 transition-all duration-500"
            style={{ background: "linear-gradient(135deg, rgba(194,69,12,.06), rgba(255,255,255,0))" }}>
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-yellow-600/10 blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-yellow-100 dark:bg-yellow-600/20 border border-yellow-300 dark:border-yellow-600/30 flex items-center justify-center mb-5">
                <BowArrow size={20} className="text-yellow-600 dark:text-yellow-500" />
              </div>
              <h3 className="font-black text-2xl sm:text-3xl text-[#1c1505] dark:text-white mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Our Vision</h3>
              <p className="text-[#3f3522] dark:text-slate-400 leading-relaxed text-sm sm:text-base">
                To be the most <span className="text-yellow-600 dark:text-yellow-400 font-semibold">trusted partner</span> in delivering quality products across the automotive, industrial, commercial, and motorcycle industries.
              </p>
            </div>
          </div>

          <div className="reveal-right relative rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-[#e8dfc8] dark:border-white/10 overflow-hidden group hover:border-yellow-500/50 dark:hover:border-yellow-600/30 transition-all duration-500"
            style={{ background: "linear-gradient(135deg, rgba(194,69,12,.06), rgba(255,255,255,0))" }}>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-yellow-800/10 blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-yellow-100 dark:bg-yellow-600/20 border border-yellow-300 dark:border-yellow-600/30 flex items-center justify-center mb-5">
                <Rocket size={20} className="text-yellow-600 dark:text-yellow-500" />
              </div>
              <h3 className="font-black text-2xl sm:text-3xl text-[#1c1505] dark:text-white mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Our Mission</h3>
              <p className="text-[#3f3522] dark:text-slate-400 leading-relaxed mb-3 text-sm sm:text-base">
                <span className="text-yellow-600 dark:text-yellow-400 font-bold">Gearing Towards Outcomes</span>
              </p>
              <ul className="space-y-2">
                {["Deliver solutions and quality products that help partners stay competitive", "Bridge globally trusted brands into the Philippine market.", "Build long-term relationships that go beyond expectations"].map((m, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#3f3522] dark:text-slate-400 text-sm">
                    <span className="text-yellow-600 dark:text-yellow-500 mt-0.5 shrink-0 font-bold">→</span>{m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* History */}
      <div className="bg-white/60 dark:bg-white/[.02] border-y border-[#e8dfc8] dark:border-white/10 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10 reveal">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-yellow-600" />
              <span className="text-xs font-bold tracking-[.2em] uppercase text-yellow-600 dark:text-yellow-500" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Our History</span>
              <div className="w-8 h-px bg-yellow-600" />
            </div>
            <h2 className="font-black text-[#1c1505] dark:text-white leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2rem, 6vw, 3rem)" }}>
              Over 50 Years of Growth
            </h2>
          </div>

          {/* === IMAGE CAROUSEL === */}
          <div className="mb-12 reveal">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[16/9] md:aspect-[21/9] bg-black">
              {historyImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                  <img
                    src={image.src}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                </div>
              ))}

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all backdrop-blur-sm z-20"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all backdrop-blur-sm z-20"
              >
                <ChevronRight size={24} />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {historyImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${index === currentSlide
                      ? 'bg-yellow-500 scale-125'
                      : 'bg-white/60 hover:bg-white/90'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Timeline (kept as is) */}
          <div className="flex gap-2 mb-8 reveal overflow-x-auto pb-2 scrollbar-none">
            {timeline.map((t, i) => (
              <button
                key={t.decade}
                onClick={() => setActiveDecade(i)}
                className={`px-5 py-2 rounded-full text-sm font-bold border transition-all duration-300 whitespace-nowrap shrink-0 ${activeDecade === i
                  ? "bg-yellow-600 border-yellow-600 text-white"
                  : "bg-transparent border-[#e8dfc8] dark:border-white/15 text-[#6b5d3f] dark:text-slate-400 hover:border-yellow-500/60 dark:hover:border-yellow-600/50 hover:text-yellow-600 dark:hover:text-yellow-400"
                  }`}
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {t.decade}
              </button>
            ))}
          </div>

          {/* Timeline Content */}
          <div className="reveal">
            <div className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-12 border border-[#e8dfc8] dark:border-white/10 overflow-hidden bg-white dark:bg-transparent">
              <div className={`absolute top-0 left-0 w-1.5 h-full rounded-l-3xl bg-gradient-to-b ${timeline[activeDecade].color}`} />
              <div className="pl-4">
                <h3 className="font-black text-black/60 dark:text-white mb-4 leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(3rem, 10vw, 5rem)" }}>
                  {timeline[activeDecade].decade}
                </h3>
                <ul className="space-y-4">
                  {timeline[activeDecade].events.map((ev, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 shrink-0" />
                      <p className="text-[#3f3522] dark:text-slate-300 leading-relaxed text-sm sm:text-base">{ev}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-16 sm:py-24 max-w-6xl mx-auto px-4">
        <div className="text-center mb-10 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-yellow-600" />
            <span className="text-xs font-bold tracking-[.2em] uppercase text-yellow-600 dark:text-yellow-500" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Our Values</span>
            <div className="w-8 h-px bg-yellow-600" />
          </div>
          <h2 className="font-black text-[#1c1505] dark:text-white leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2rem, 6vw, 3rem)" }}>
            What We Stand For
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div key={v.title}
                className="reveal group bg-white dark:bg-white/5 border border-[#e8dfc8] dark:border-white/10 rounded-2xl p-5 sm:p-6 hover:border-yellow-500/50 dark:hover:border-yellow-600/40 hover:-translate-y-1 transition-all duration-300 shadow-sm dark:shadow-none"
                style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="mb-4">
                  <Icon size={32} className="text-yellow-600 dark:text-yellow-500 group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors" />
                </div>
                <h4 className="font-black text-base sm:text-lg text-[#1c1505] dark:text-white mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  {v.title}
                </h4>
                <p className="text-[#6b5d3f] dark:text-slate-500 text-xs sm:text-sm leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-b border-[#e8dfc8] dark:border-white/10"
        style={{ background: "linear-gradient(135deg, rgba(194,69,12,.10), rgba(146,64,14,.04))" }}>
        <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-black text-[#1c1505] dark:text-white mb-1"
              style={{ fontSize: "clamp(1.5rem, 5vw, 1.875rem)", fontFamily: "'Barlow Condensed', sans-serif" }}>
              Ready to grow your business?
            </h3>
            <p className="text-[#6b5d3f] dark:text-slate-400 text-sm">Become a GTO reseller and get access to our full product lineup.</p>
          </div>
          <a href="https://gtotrading.com.ph/become-a-seller" target="_blank" rel="noreferrer"
            className="shrink-0 flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-yellow-700 to-yellow-400 text-white font-bold text-sm hover:-translate-y-0.5 transition-transform no-underline">
            Become a Reseller <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}