import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronUp, Sun, Moon, LogIn, ShoppingBag } from "lucide-react";
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

const brands = [
  "ENI LUBRICANTS",
  "AEROPAK",
  "BLAUPUNKT",
  "SAFEWAY TIRES",
  "VEENTO TIRES",
  "AUTOGREEN TIRES",
  "ST POWER BATTERY",
  "LUBRIGOLD",
  "WHIZ",
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
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

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); setMobileDdOpen(false); }, [location.pathname]);

  const close = () => setMenuOpen(false);
  const openDd = () => { clearTimeout(ddTimeout.current); setDdOpen(true); };
  const closeDd = () => { ddTimeout.current = setTimeout(() => setDdOpen(false), 220); };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header id="site-header"
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-all duration-300 ${scrolled
          ? "bg-white/80 backdrop-blur-2xl dark:bg-[#08070a]/75 border-[#e8dfc8] dark:border-white/10 shadow-sm dark:shadow-none"
          : "bg-[#fdfbf3]/75 dark:bg-[#08070a]/65 border-[#e8dfc8]/50 dark:border-white/8"
          }`}>

        <div className="w-full flex px-8 xl:px-12 py-4">

          {/* ── Logo ── */}
          <button onClick={() => navigate("/")}
            className="flex items-center shrink-0 bg-transparent border-none cursor-pointer p-0">
            <img
              src={theme === "dark" ? GTOLogoWhite : GTOLogoDark}
              alt="GTO Trading"
              className="h-10 sm:h-12 lg:h-20 w-auto object-contain"
            />
          </button>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">

            {/* Home */}
            <button onClick={() => navigate("/")}
              className={`text-[20px] font-extrabold px-4 py-2.5 transition-all bg-transparent border-none cursor-pointer whitespace-nowrap ${isActive("/")
                ? "text-[#cea14e] dark:text-[#cea14e] hover:text-[#cea14e] dark:hover:text-[#cea14e]"
                : "text-[#3f3522] dark:text-slate-300 hover:text-[#cea14e] dark:hover:text-[#cea14e]"
                }`}>
              Home
            </button>

            {/* Brands dropdown */}
            <div className="relative" onMouseEnter={openDd} onMouseLeave={closeDd}>
              <button
                className={`flex items-center gap-1.5 text-[20px] font-extrabold px-4 py-2.5 rounded-xl transition-all bg-transparent border-none cursor-pointer whitespace-nowrap ${ddOpen
                  ? "text-[#cea14e] dark:text-[#cea14e] hover:text-[#cea14e] dark:hover:text-[#cea14e]"
                  : "text-[#3f3522] dark:text-slate-300 hover:text-[#cea14e] dark:hover:text-[#cea14e]"
                  }`}>
                Brands
                <ChevronDown size={15} className={`transition-transform duration-200 ${ddOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown */}
              <div
                onMouseEnter={openDd}
                onMouseLeave={closeDd}
                className={`absolute top-full left-0 mt-2 w-56 bg-white dark:bg-[#0d0b0f] border border-[#e8dfc8] dark:border-white/10 rounded-2xl overflow-hidden z-50 shadow-2xl transition-all duration-200 ${ddOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-2"
                  }`}>

                <button
                  onClick={() => { navigate("/shop"); setDdOpen(false); }}
                  className="w-full text-left px-4 py-3.5 text-sm font-extrabold text-yellow-600 dark:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors bg-transparent border-none cursor-pointer border-b border-[#e8dfc8] dark:border-white/10 flex items-center gap-2">
                  <ShoppingBag size={15} />
                  All Products
                </button>

                <div className="py-1.5">
                  {brands.map(b => (
                    <button key={b}
                      onClick={() => { navigate(`/shop?brand=${encodeURIComponent(b)}`); setDdOpen(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm text-[#6b5d3f] dark:text-slate-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/15 hover:text-yellow-700 dark:hover:text-yellow-400 transition-colors bg-transparent border-none cursor-pointer flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0" />
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Rest of nav links */}
            {navLinks.filter(l => l.label !== "Home").map(l => (
              <button key={l.label} onClick={() => navigate(l.path)}
                className={`text-[20px] font-extrabold px-4 py-2.5 rounded-xl transition-all bg-transparent border-none cursor-pointer whitespace-nowrap ${isActive(l.path)
                  ? "text-[#cea14e] dark:text-[#cea14e] hover:text-[#cea14e] dark:hover:text-[#cea14e]"
                  : "text-[#3f3522] dark:text-slate-300 hover:text-[#cea14e] dark:hover:text-[#cea14e]"
                  }`}>
                {l.label}
              </button>
            ))}
          </nav>

          {/* ── Right controls ── */}
          <div className="flex items-center gap-2 shrink-0 ml-auto">

            {/* Theme toggle */}
            <button onClick={toggleTheme}
              className="flex items-center justify-center w-10 h-10 transition-all"
              aria-label="Toggle theme">
              {theme === "dark"
                ? <Sun size={17} className="text-yellow-400" />
                : <Moon size={17} className="text-[#6b5d3f]" />}
            </button>

            {/* Login — desktop only */}
            <button
              onClick={() => navigate("/login")}
              className="hidden lg:inline-flex items-center gap-2 text-sm font-extrabold px-4 py-2 rounded-xl border border-[#e8dfc8] dark:border-white/10 text-[#3f3522] dark:text-slate-300 hover:text-[#1c1505] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/8 bg-transparent cursor-pointer transition-all">
              <LogIn size={15} />
              Login
            </button>

            {/* Hamburger — mobile only */}
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 transition-all"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu">
              {menuOpen
                ? <X size={20} className="text-[#1c1505] dark:text-white" />
                : <Menu size={20} className="text-[#1c1505] dark:text-white" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Nav ── */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="flex flex-col gap-1  px-4 pb-6 pt-3 border-t border-[#e8dfc8] dark:border-white/10">

            {/* Home */}
            <button onClick={() => { navigate("/"); close(); }}
              className={`py-3 px-4 text-base text-left font-extrabold rounded-xl transition-all bg-transparent border-none cursor-pointer w-full ${isActive("/")
                ? "text-yellow-400 dark:text-yellow-500"
                : "text-[#3f3522] dark:text-slate-300 hover:text-[#1c1505] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                }`}>
              Home
            </button>

            {/* Mobile Brands dropdown */}
            <button onClick={() => setMobileDdOpen(o => !o)}
              className="flex items-center justify-between w-full py-3 px-4 bg-transparent border-none cursor-pointer text-base font-extrabold text-[#3f3522] dark:text-slate-300 hover:text-[#1c1505] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all">
              <span>Brands</span>
              {mobileDdOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            <div className={`overflow-hidden transition-all duration-300 ${mobileDdOpen ? "max-h-[500px]" : "max-h-0"}`}>
              <div className="mx-3 mb-2 bg-[#faf6ea] dark:bg-white/[.03] border border-[#e8dfc8] dark:border-white/10 rounded-2xl overflow-hidden">
                <button
                  onClick={() => { navigate("/shop"); close(); }}
                  className="w-full text-left px-4 py-3 text-sm font-extrabold text-yellow-600 dark:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors bg-transparent border-none cursor-pointer border-b border-[#e8dfc8] dark:border-white/10 flex items-center gap-2">
                  <ShoppingBag size={14} />
                  All Products
                </button>
                {brands.map(b => (
                  <button key={b}
                    onClick={() => { navigate(`/shop?brand=${encodeURIComponent(b)}`); close(); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-[#6b5d3f] dark:text-slate-400 hover:text-yellow-700 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/15 transition-colors bg-transparent border-none cursor-pointer flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0" />
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Rest of links */}
            {navLinks.filter(l => l.label !== "Home").map(l => (
              <button key={l.label} onClick={() => { navigate(l.path); close(); }}
                className={`py-3 px-4 text-base text-left font-extrabold transition-all bg-transparent cursor-pointer w-full ${isActive(l.path)
                  ? "text-yellow-600 dark:text-yellow-400 "
                  : "text-[#3f3522] dark:text-slate-300"
                  }`}>
                {l.label}
              </button>
            ))}

            {/* Login — mobile */}
            <div className="pt-3 mt-1 border-t border-[#e8dfc8] dark:border-white/10">
              <button
                onClick={() => { navigate("/login"); close(); }}
                className="flex items-center gap-2 w-full py-3 px-4 text-base font-extrabold text-yellow-600 dark:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-white/5 rounded-xl transition-all bg-transparent border-none cursor-pointer">
                <LogIn size={16} />
                Login
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}