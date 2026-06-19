import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronUp, Sun, Moon, LogIn } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import GTOLogoWhite from "../logo/gto-logo-white.png";
import GTOLogoDark from "../logo/gto-logo-no-bg.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "News", path: "/news" },
  { label: "Contact Us", path: "/contact" },
  { label: "Careers", path: "/careers" },
  { label: "About Us", path: "/about" },
];

const brands = ["AEROPAK", "AUTOGREEN", "BLAUPUNKT", "LUBRIGOLD", "MICHIBA", "ORELUBE", "SAFEWAY", "SILOCK", "WHIZ"];

export default function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileDdOpen, setMobileDdOpen] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);
  const ddTimeout = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const close = () => setMenuOpen(false);

  // Hover with delay so it doesn't close instantly when moving cursor
  const openDd = () => { clearTimeout(ddTimeout.current); setDdOpen(true); };
  const closeDd = () => { ddTimeout.current = setTimeout(() => setDdOpen(false), 200); };

  return (
    <>
      <header id="site-header"
        className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${scrolled
            ? "bg-[#fdfbf3]/95 dark:bg-[#08070a]/95 border-[#e8dfc8] dark:border-white/10"
            : "bg-[#fdfbf3]/70 dark:bg-[#08070a]/60 border-[#e8dfc8]/60 dark:border-white/10"
          }`}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">

          {/* Brand */}
          {/* Brand */}
          <button onClick={() => navigate("/")}
            className="flex items-center shrink-0 bg-transparent border-none cursor-pointer p-0">

            <img
              src={theme === "dark" ? GTOLogoWhite : GTOLogoDark}
              alt="GTO"
              className="h-10 sm:h-12 lg:h-20 w-auto object-contain"
            />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            <button onClick={() => navigate("/")}
              className="text-sm font-medium text-[#3f3522] dark:text-slate-300 hover:text-[#1c1505] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 px-3.5 py-2 rounded-lg transition-all bg-transparent border-none cursor-pointer whitespace-nowrap">
              Home
            </button>

            {/* Brands dropdown */}
            <div className="relative" onMouseEnter={openDd} onMouseLeave={closeDd}>
              <button
                className={`flex items-center gap-1 text-sm font-medium px-3.5 py-2 rounded-lg transition-all bg-transparent border-none cursor-pointer ${ddOpen
                    ? "text-[#1c1505] dark:text-white bg-black/5 dark:bg-white/10"
                    : "text-[#3f3522] dark:text-slate-300 hover:text-[#1c1505] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
                  }`}>
                Brands
                <ChevronDown size={13} className={`transition-transform duration-200 ${ddOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown panel */}
              <div
                onMouseEnter={openDd}
                onMouseLeave={closeDd}
                className={`absolute top-full left-0 mt-1 min-w-[200px] bg-white dark:bg-[#0d0b0f] border border-[#e8dfc8] dark:border-white/10 rounded-2xl overflow-hidden z-50 shadow-xl transition-all duration-200 ${ddOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-2"
                  }`}>

                {/* All Products */}
                <button
                  onClick={() => { navigate("/shop"); setDdOpen(false); }}
                  className="w-full text-left px-4 py-3 text-sm font-bold text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors bg-transparent border-none cursor-pointer border-b border-[#e8dfc8] dark:border-white/10">
                  🛒 All Products
                </button>

                {/* Brand list */}
                <div className="py-1">
                  {brands.map(b => (
                    <button key={b}
                      onClick={() => { navigate(`/shop?brand=${b}`); setDdOpen(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm text-[#6b5d3f] dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400 transition-colors bg-transparent border-none cursor-pointer flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {navLinks.filter(l => l.label !== "Home").map(l => (
              <button key={l.label} onClick={() => navigate(l.path)}
                className="text-sm font-medium text-[#3f3522] dark:text-slate-300 hover:text-[#1c1505] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 px-3.5 py-2 rounded-lg transition-all bg-transparent border-none cursor-pointer whitespace-nowrap">
                {l.label}
              </button>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2 shrink-0 ml-auto">
            <button onClick={toggleTheme}
              className="flex items-center justify-center bg-black/5 dark:bg-white/5 rounded-full w-9 h-9 hover:bg-black/10 dark:hover:bg-white/10 transition-all"
              aria-label="Toggle theme">
              {theme === "dark" ? <Sun size={16} className="text-yellow-400" /> : <Moon size={16} className="text-[#6b5d3f]" />}
            </button>

            <button className="hidden lg:inline-flex text-sm font-medium text-[#3f3522] dark:text-slate-300 hover:text-[#1c1505] dark:hover:text-white bg-transparent border-none cursor-pointer">
              Login
            </button>

            <button
              className="lg:hidden flex items-center justify-center bg-black/5 dark:bg-white/5 border border-[#e8dfc8] dark:border-white/10 rounded-lg w-9 h-9 hover:bg-black/10 dark:hover:bg-white/10 transition-all"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu">
              {menuOpen ? <X size={18} className="text-[#1c1505] dark:text-white" /> : <Menu size={18} className="text-[#1c1505] dark:text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="flex flex-col gap-1 px-4 pb-5 pt-3 border-t border-[#e8dfc8] dark:border-white/10">

            <button onClick={() => { navigate("/"); close(); }}
              className="py-2.5 px-3 text-sm text-left text-[#3f3522] dark:text-slate-300 hover:text-[#1c1505] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-all bg-transparent border-none cursor-pointer w-full">
              Home
            </button>

            {/* Mobile Brands dropdown */}
            <button onClick={() => setMobileDdOpen(o => !o)}
              className="flex items-center justify-between w-full py-2.5 px-3 bg-transparent border-none cursor-pointer text-sm text-[#3f3522] dark:text-slate-300 hover:text-[#1c1505] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-all">
              <span>Brands</span>
              {mobileDdOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            <div className={`overflow-hidden transition-all duration-300 ${mobileDdOpen ? "max-h-96" : "max-h-0"}`}>
              <div className="pl-3 flex flex-col border-l-2 border-orange-600/30 dark:border-orange-700/40 ml-3 mb-1">
                <button
                  onClick={() => { navigate("/shop"); close(); }}
                  className="text-xs py-2 px-2 text-left font-bold text-orange-600 dark:text-orange-400 bg-transparent border-none cursor-pointer w-full">
                  🛒 All Products
                </button>
                {brands.map(b => (
                  <button key={b}
                    onClick={() => { navigate(`/shop?brand=${b}`); close(); }}
                    className="text-xs py-2 px-2 text-left text-[#9a8a64] dark:text-slate-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors bg-transparent border-none cursor-pointer w-full">
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {navLinks.filter(l => l.label !== "Home").map(l => (
              <button key={l.label} onClick={() => { navigate(l.path); close(); }}
                className="py-2.5 px-3 text-sm text-left text-[#3f3522] dark:text-slate-300 hover:text-[#1c1505] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-all bg-transparent border-none cursor-pointer w-full">
                {l.label}
              </button>
            ))}

            <button
              className="flex items-center gap-2 py-2.5 px-3 mt-1 text-sm text-left font-semibold text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-white/5 rounded-lg transition-all bg-transparent border-none cursor-pointer w-full border-t border-[#e8dfc8] dark:border-white/10 pt-4">
              <LogIn size={15} />
              Login
            </button>
          </div>
        </div>
      </header>
    </>
  );
}