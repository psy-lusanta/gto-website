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
  { label: "About Us", path: "/about", scrollTo: "about-us" },
];

const brands = [
  "ENI LUBRICANTS", "AEROPAK", "BLAUPUNKT", "SAFEWAY TIRES",
  "VEENTO TIRES", "AUTOGREEN TIRES", "ST POWER BATTERY", "LUBRIGOLD", "WHIZ",
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

  useEffect(() => {
    setMenuOpen(false);
    setMobileDdOpen(false);
  }, [location.pathname]);

  const close = () => setMenuOpen(false);
  const openDd = () => { clearTimeout(ddTimeout.current); setDdOpen(true); };
  const closeDd = () => { ddTimeout.current = setTimeout(() => setDdOpen(false), 220); };

  const handleNavClick = (link) => {
    if (link.scrollTo) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const element = document.getElementById("about-us");
          if (element) {
            const navbarHeight = 85;
            const offset = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
            window.scrollTo({ top: offset, behavior: "smooth" });
          }
        }, 200); 
      } else {
        const element = document.getElementById("about-us");
        if (element) {
          const navbarHeight = 85;
          const offset = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
          window.scrollTo({ top: offset, behavior: "smooth" });
        }
      }
    } else {
      navigate(link.path);
    }
    close();
    setDdOpen(false);
  };

  return (
    <>
      <header id="site-header"
        className={`sticky top-0 left-0 right-0 z-50 backdrop-blur-xl transition-all duration-300 ${scrolled
          ? "bg-white/80 backdrop-blur-2xl dark:bg-[#08070a]/75 border-[#e8dfc8] dark:border-white/10 shadow-sm dark:shadow-none"
          : "bg-[#fdfbf3]/75 dark:bg-[#08070a]/65 border-[#e8dfc8]/50 dark:border-white/8"
          }`}>

        <div className="w-full flex px-8 xl:px-12 py-4">

          {/* Logo */}
          <button onClick={() => navigate("/")} className="flex items-center shrink-0">
            <img
              src={theme === "dark" ? GTOLogoWhite : GTOLogoDark}
              alt="GTO Trading"
              className="h-10 sm:h-12 lg:h-20 w-auto object-contain"
            />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {/* Home */}
            <button onClick={() => navigate("/")}
              className={`text-[20px] font-extrabold px-4 py-2.5 transition-all ${location.pathname === "/" ? "text-[#cea14e]" : "text-[#3f3522] dark:text-slate-300 hover:text-[#cea14e]"}`}>
              Home
            </button>

            {/* Brands Dropdown */}
            <div className="relative" onMouseEnter={openDd} onMouseLeave={closeDd}>
              <button className={`flex items-center gap-1.5 text-[20px] font-extrabold px-4 py-2.5 rounded-xl transition-all ${ddOpen ? "text-[#cea14e]" : "text-[#3f3522] dark:text-slate-300 hover:text-[#cea14e]"}`}>
                Brands
                <ChevronDown size={15} className={`transition-transform ${ddOpen ? "rotate-180" : ""}`} />
              </button>

              <div className={`absolute top-full left-0 mt-2 w-56 bg-white dark:bg-[#0d0b0f] border border-[#e8dfc8] dark:border-white/10 rounded-2xl overflow-hidden z-50 shadow-2xl transition-all ${ddOpen ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none translate-y-2"}`}>
                <button onClick={() => { navigate("/shop"); setDdOpen(false); }} className="w-full text-left px-4 py-3.5 text-sm font-extrabold text-yellow-600 dark:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 flex items-center gap-2 border-b">
                  <ShoppingBag size={15} /> All Products
                </button>
                {brands.map(b => (
                  <button key={b} onClick={() => { navigate(`/shop?brand=${encodeURIComponent(b)}`); setDdOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-[#6b5d3f] dark:text-slate-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/15 hover:text-yellow-700 flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {navLinks.filter(l => l.label !== "Home").map(l => (
              <button
                key={l.label}
                onClick={() => handleNavClick(l)}
                className={`text-[20px] font-extrabold px-4 py-2.5 rounded-xl transition-all ${location.pathname === l.path && !l.scrollTo ? "text-[#cea14e]" : "text-[#3f3522] dark:text-slate-300 hover:text-[#cea14e] dark:hover:text-[#cea14e]"}`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2 shrink-0 ml-auto">
            <button onClick={toggleTheme} className="w-10 h-10 flex items-center justify-center">
              {theme === "dark" ? <Sun size={17} className="text-yellow-400" /> : <Moon size={17} className="text-[#6b5d3f]" />}
            </button>

            <button onClick={() => navigate("/login")} className="hidden lg:inline-flex items-center gap-2 text-sm font-extrabold px-4 py-2 rounded-xl border border-[#e8dfc8] dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/8 transition-all">
              <LogIn size={15} /> Login
            </button>

            <button className="lg:hidden" onClick={() => setMenuOpen(o => !o)}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="flex flex-col gap-1 px-4 pb-6 pt-3 border-t border-[#e8dfc8] dark:border-white/10">
            {navLinks.map(l => (
              <button
                key={l.label}
                onClick={() => handleNavClick(l)}
                className={`py-3 px-4 text-base text-left font-extrabold rounded-xl transition-all w-full ${location.pathname === l.path && !l.scrollTo ? "text-yellow-500" : "text-[#3f3522] dark:text-slate-300 hover:text-[#1c1505]"}`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}