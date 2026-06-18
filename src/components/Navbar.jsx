import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Menu, X, ChevronDown, ChevronUp, Sun, Moon, LogIn } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import GTOLogoWhite from "../logo/gto-logo-white.png";
import GTOLogoDark  from "../logo/gto-logo-no-bg.png";

const brands = ["AEROPAK", "AUTOGREEN", "BLAUPUNKT", "JTC", "LUBRIGOLD", "MICHIBA", "ORELUBE", "SAFEWAY", "SILOCK", "WHIZ"];
const marqueeBrands = [...brands, ...brands, ...brands, ...brands];

const navLinks = [
  { label: "Home", id: "home" },
  { label: "Brands", id: "brands" },
  { label: "News", id: "news" },
  { label: "Contact Us", id: "contact" },
  { label: "Careers", id: "careers" },
  { label: "About Us", id: "about-us" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileDdOpen, setMobileDdOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const close = () => setMenuOpen(false);

  const { theme, toggleTheme } = useTheme();

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
      <header id="site-header"
        className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${
          scrolled
            ? "bg-[#fdfbf3]/95 dark:bg-[#08070a]/95 border-[#e8dfc8] dark:border-white/10"
            : "bg-[#fdfbf3]/70 dark:bg-[#08070a]/60 border-[#e8dfc8]/60 dark:border-white/10"
        }`}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">

          {/* Brand */}
          <button onClick={() => scrollTo("home")}
            className="flex items-center shrink-0 bg-transparent border-none cursor-pointer p-0">
            <img src={theme === "dark" ? GTOLogoWhite : GTOLogoDark} alt="GTO" className="h-8 w-auto object-contain" />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {navLinks.slice(0, 2).map(l => (
              <button key={l.label} onClick={() => scrollTo(l.id)}
                className="text-sm font-medium text-[#3f3522] dark:text-slate-300 hover:text-[#1c1505] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 px-3.5 py-2 rounded-lg transition-all bg-transparent border-none cursor-pointer whitespace-nowrap">
                {l.label}
              </button>
            ))}

            {navLinks.slice(2).map(l => (
              <button key={l.label} onClick={() => scrollTo(l.id)}
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

            {/* Login — desktop only */}
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

            {navLinks.slice(0, 2).map(l => (
              <button key={l.label} onClick={() => scrollTo(l.id)}
                className="py-2.5 px-3 text-sm text-left text-[#3f3522] dark:text-slate-300 hover:text-[#1c1505] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-all bg-transparent border-none cursor-pointer w-full">
                {l.label}
              </button>
            ))}

            <div className={`overflow-hidden transition-all duration-300 ${mobileDdOpen ? "max-h-96" : "max-h-0"}`}>
              <div className="pl-3 flex flex-col border-l-2 border-yellow-600/40 dark:border-yellow-700/40 ml-3 mb-1">
                {brands.map(b => (
                  <button key={b} onClick={() => { scrollTo("shop"); close(); }}
                    className="text-xs py-2 px-2 text-left text-[#9a8a64] dark:text-slate-500 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors bg-transparent border-none cursor-pointer w-full">
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {navLinks.slice(2).map(l => (
              <button key={l.label} onClick={() => { scrollTo(l.id); close(); }}
                className="py-2.5 px-3 text-sm text-left text-[#3f3522] dark:text-slate-300 hover:text-[#1c1505] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-all bg-transparent border-none cursor-pointer w-full">
                {l.label}
              </button>
            ))}

            {/* Login — mobile only */}
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