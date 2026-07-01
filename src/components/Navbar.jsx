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
    if (link.label === "Home") {
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
      }
    } else if (link.scrollTo) {
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

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header id="site-header"
        className={`sticky top-0 left-0 right-0 z-[100] backdrop-blur-xl transition-all duration-300 ${scrolled
          ? "bg-white/80 backdrop-blur-2xl dark:bg-[#08070a]/75 border-[#e8dfc8] dark:border-white/10 shadow-sm dark:shadow-none"
          : "bg-[#fdfbf3]/75 dark:bg-[#08070a]/65 border-[#e8dfc8]/50 dark:border-white/8"
          }`}>

        <div className="w-full flex px-8 xl:px-12 py-4">

          {/* Logo */}
          <button onClick={() => {
            if (location.pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
            else navigate("/");
          }} className="flex items-center shrink-0">
            <img
              src={theme === "dark" ? GTOLogoWhite : GTOLogoDark}
              alt="GTO Trading"
              className="h-10 sm:h-12 lg:h-20 w-auto object-contain"
            />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {/* Home */}
            <button onClick={() => {
              if (location.pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
              else navigate("/");
            }} className={`text-[20px] font-extrabold px-4 py-2.5 transition-all ${location.pathname === "/" ? "text-[#cea14e]" : "text-[#3f3522] dark:text-slate-300 hover:text-[#cea14e]"}`}>
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

            {/* Other Links */}
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

            <button onClick={() => navigate("/login")} className="hidden lg:inline-flex items-center gap-2 text-black text-sm font-extrabold px-4 py-2 rounded-xl border dark:text-white border-[#e8dfc8] dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/8 transition-all">
              <LogIn size={15} /> Login
            </button>

            <button className="lg:hidden" onClick={() => setMenuOpen(o => !o)}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed top-[72px] left-0 right-0 bottom-0 z-[100] bg-[#fdfbf3] dark:bg-[#08070a] transition-all duration-300 ${menuOpen ? "opacity-100 translate-y-0 " : "opacity-0 pointer-events-none -translate-y-4"
            }`}
        >
          <div
            className="h-100 overflow-y-auto px-4 py-5 bg-white dark:bg-black backdrop-blur-3xl backdrop-brightness-90 border-t border-white/20"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {/* Home */}
            <button
              onClick={() => handleNavClick({ label: "Home" })}
              className="w-full text-left py-3 px-4 dark:text-white text-black font-extrabold rounded-xl hover:bg-black/5 dark:hover:bg-white/5"
            >
              Home
            </button>

            {/* Brands */}
            <button
              onClick={() => setMobileDdOpen(!mobileDdOpen)}
              className="w-full flex items-center justify-between py-3 px-4 dark:text-white text-black mt-2 rounded-xl font-extrabold bg-black/5 dark:bg-white/5"
            >
              <span>Brands</span>

              {mobileDdOpen ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>

            {mobileDdOpen && (
              <div className="mt-3 ml-2 rounded-xl dark:text-white text-black border border-[#e8dfc8] dark:border-white/10 overflow-hidden">
                <button
                  onClick={() => {
                    navigate("/shop");
                    close();
                  }}
                  className="w-full text-left px-4 py-3 font-bold text-yellow-500 border-b border-[#e8dfc8] dark:border-white/10"
                >
                  <ShoppingBag className="inline mr-2" size={15} />
                  All Products
                </button>

                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => {
                      navigate(`/shop?brand=${encodeURIComponent(brand)}`);
                      close();
                    }}
                    className="w-full text-left px-4 py-3 dark:text-white text-black hover:bg-yellow-50 dark:hover:bg-yellow-900/20 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                    {brand}
                  </button>
                ))}
              </div>
            )}

            {/* Other Links */}
            {navLinks
              .filter((l) => l.label !== "Home")
              .map((l) => (
                <button
                  key={l.label}
                  onClick={() => handleNavClick(l)}
                  className="w-full text-left py-3 px-4 mt-1 dark:text-white text-black font-extrabold rounded-xl hover:bg-black/5 dark:hover:bg-white/5"
                >
                  {l.label}
                </button>
              ))}

            {/* Login */}
            <button
              onClick={() => {
                navigate("/login");
                close();
              }}
              className="w-full text-left py-3 px-4 mt-5 border-t border-[#e8dfc8] dark:border-white/10 text-yellow-500 font-extrabold"
            >
              <LogIn className="inline mr-2" size={16} />
              Login
            </button>
          </div>
        </div>
      </header>
    </>
  );
}