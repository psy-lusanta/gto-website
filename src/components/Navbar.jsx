import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import GTOLogo from "../assets/gto-logo-white.png";

const brands = ["AEROPAK","AUTOGREEN","BLAUPUNKT","JTC","LUBRIGOLD","MICHIBA","ORELUBE","SAFEWAY","SILOCK","WHIZ"];
const marqueeBrands = [...brands, ...brands, ...brands, ...brands];

const navLinks = [
  { label: "Home",    id: "home" },
  { label: "About",   id: "about-us" },
  { label: "Shop",    id: "shop" },
  { label: "Blog",    id: "blog" },
  { label: "Careers", id: "careers" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [scrolled,     setScrolled]     = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [mobileDdOpen, setMobileDdOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const close = () => setMenuOpen(false);

  const scrollTo = (id) => {
    close();
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 150);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header id="site-header" className={`fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-xl transition-all duration-300 ${
        scrolled ? "bg-[#08070a]/95" : "bg-[#08070a]/60"
      }`}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">

          {/* Brand */}
          <button onClick={() => scrollTo("home")}
            className="flex items-center shrink-0 bg-transparent border-none cursor-pointer p-0">
            <img src={GTOLogo} alt="GTO" className="h-8 w-auto object-contain" />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {navLinks.slice(0, 2).map(l => (
              <button key={l.label} onClick={() => scrollTo(l.id)}
                className="text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 px-3.5 py-2 rounded-lg transition-all bg-transparent border-none cursor-pointer whitespace-nowrap">
                {l.label}
              </button>
            ))}

            {navLinks.slice(2).map(l => (
              <button key={l.label} onClick={() => scrollTo(l.id)}
                className="text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 px-3.5 py-2 rounded-lg transition-all bg-transparent border-none cursor-pointer whitespace-nowrap">
                {l.label}
              </button>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2 shrink-0 ml-auto">
            {/* <div className="hidden lg:flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 focus-within:border-yellow-500 transition-colors">
              <Search size={14} className="text-slate-400 shrink-0" />
              <input className="bg-transparent border-none outline-none text-white text-sm w-32 placeholder:text-slate-500"
                placeholder="Search parts…" />
            </div> */}

            <button
              className="lg:hidden flex items-center justify-center bg-white/5 border border-white/10 rounded-lg w-9 h-9 hover:bg-white/10 transition-all"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu">
              {menuOpen ? <X size={18} className="text-white" /> : <Menu size={18} className="text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="flex flex-col gap-1 px-4 pb-5 pt-3 border-t border-white/10">

            {/* Mobile search */}
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 mb-2">
              <Search size={14} className="text-slate-400 shrink-0" />
              <input className="bg-transparent border-none outline-none text-white text-sm flex-1 placeholder:text-slate-500 min-w-0"
                placeholder="Search parts…" />
            </div>

            {navLinks.slice(0, 2).map(l => (
              <button key={l.label} onClick={() => scrollTo(l.id)}
                className="py-2.5 px-3 text-sm text-left text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all bg-transparent border-none cursor-pointer w-full">
                {l.label}
              </button>
            ))}

            <div className={`overflow-hidden transition-all duration-300 ${mobileDdOpen ? "max-h-96" : "max-h-0"}`}>
              <div className="pl-3 flex flex-col border-l-2 border-yellow-700/40 ml-3 mb-1">
                {brands.map(b => (
                  <button key={b} onClick={() => { scrollTo("shop"); close(); }}
                    className="text-xs py-2 px-2 text-left text-slate-500 hover:text-yellow-400 transition-colors bg-transparent border-none cursor-pointer w-full">
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {navLinks.slice(2).map(l => (
              <button key={l.label} onClick={() => { scrollTo(l.id); close(); }}
                className="py-2.5 px-3 text-sm text-left text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all bg-transparent border-none cursor-pointer w-full">
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Ticker */}
      <div className="fixed left-0 right-0 z-40 overflow-hidden bg-yellow-700 py-1.5" style={{ top: "60px" }}>
        <div className="ticker-track whitespace-nowrap">
          {marqueeBrands.map((b, i) => (
            <span key={`${i}-${b}`}
              className="mx-5 text-xs font-bold tracking-widest text-white uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              ✦ {b}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}