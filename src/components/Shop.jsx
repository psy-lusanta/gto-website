import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, X, SlidersHorizontal, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { FaSearch } from "react-icons/fa";
import { products, brandColors } from "../data/products";
import { useTheme } from "../context/ThemeContext";

const brands = ["All", "ENI LUBRICANTS", "AEROPAK", "BLAUPUNKT", "SAFEWAY TIRES", "VEENTO TIRES", "AUTOGREEN TIRES", "ST POWER BATTERY", "LUBRIGOLD", "WHIZ"];
const categories = ["All", "Automotive", "Motorcycle", "Household", "Industrial"];
const ITEMS_PER_PAGE = 12;

const slides = [
  {
    src: "/Products/AEROPAK/AEROPAK COVER.jpeg",
    title: "Premium Automotive Products",
    subtitle: "Trusted brands, delivered nationwide.",
    cta: "Shop Now",
    ctaBrand: null,
  },
  {
    src: "/images/shop/banner-3.jpg",
    title: "ENI Lubricants",
    subtitle: "World-class engine oils for motorcycles and cars.",
    cta: "View ENI",
    ctaBrand: "ENI LUBRICANTS",
  },
];

function ShopBanner({ onBrandFilter }) {
  const [current,   setCurrent]   = useState(0);
  const [animating, setAnimating] = useState(false);
  const autoRef = useRef(null);

  const goTo = (index) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(index);
    setTimeout(() => setAnimating(false), 500);
  };

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  // Auto-advance every 5s, pause on hover
  const startAuto = () => {
    autoRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % slides.length);
    }, 5000);
  };

  const stopAuto = () => clearInterval(autoRef.current);

  useEffect(() => {
    startAuto();
    return () => stopAuto();
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: "21/7" }}
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}>

      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-500 ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}>

          {/* Image */}
          <img
            src={s.src}
            alt={s.title}
            className="w-full h-full object-cover"
            onError={e => {
              e.target.style.display = "none";
              e.target.parentElement.style.background = "linear-gradient(135deg, #1a1208, #2d1f0a)";
            }}
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>
      ))}

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 flex items-center justify-center text-white transition-all backdrop-blur-sm">
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 flex items-center justify-center text-white transition-all backdrop-blur-sm">
        <ChevronRight size={18} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 border-none cursor-pointer ${
              i === current
                ? "w-6 sm:w-8 h-2 bg-[#cea14e]"
                : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute top-4 right-4 z-20 text-xs text-white/60 font-mono hidden sm:block">
        {current + 1} / {slides.length}
      </div>
    </div>
  );
}

export default function Shop() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [searchParams] = useSearchParams();
  const brandFromUrl = searchParams.get("brand");

  const [activeBrand,    setActiveBrand]    = useState(brandFromUrl || "All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [search,         setSearch]         = useState("");
  const [sortBy,         setSortBy]         = useState("default");
  const [page,           setPage]           = useState(1);
  const [filterOpen,     setFilterOpen]     = useState(false);

  useEffect(() => {
    setActiveBrand(brandFromUrl || "All");
    setPage(1);
  }, [brandFromUrl]);

  const handleBannerBrand = (brand) => {
    setActiveBrand(brand);
    setPage(1);
    document.getElementById("shop-products")?.scrollIntoView({ behavior: "smooth" });
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeBrand    !== "All") list = list.filter(p => p.brand    === activeBrand);
    if (activeCategory !== "All") list = list.filter(p => p.category === activeCategory);
    if (search) list = list.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
    );
    if (sortBy === "price-asc")  list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sortBy === "name")       list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [activeBrand, activeCategory, search, sortBy]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const resetFilters = () => {
    setActiveBrand("All");
    setActiveCategory("All");
    setSearch("");
    setSortBy("default");
    setPage(1);
  };

  const handleBrand = (b) => { setActiveBrand(b); setPage(1); };
  const handleCat   = (c) => { setActiveCategory(c); setPage(1); };

  return (
    <section id="shop" className="bg-[#fdfbf3] dark:bg-[#08070a] transition-colors duration-300">

      {/* ── Banner / Slideshow ── */}
      <ShopBanner onBrandFilter={handleBannerBrand} />

      {/* ── Products section ── */}
      <div id="shop-products" className="py-16">

        {/* Header */}
        <div className="max-w-6xl mx-auto px-5 mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-yellow-600" />
            <span className="text-xs font-bold tracking-[.2em] uppercase text-yellow-600 dark:text-yellow-500"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Our Products
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="font-black text-5xl sm:text-6xl text-[#1c1505] dark:text-white leading-none"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {activeBrand !== "All" ? (
                <>{activeBrand} <em className="text-yellow-500 not-italic">Products</em></>
              ) : (
                <>Shop All <em className="text-yellow-500 not-italic">Products</em></>
              )}
            </h2>
            <p className="text-[#9a8a64] dark:text-slate-500 text-sm">{filtered.length} products found</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-5 flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <aside className="lg:w-56 shrink-0">
            <button onClick={() => setFilterOpen(o => !o)}
              className="lg:hidden w-full flex items-center justify-between px-4 py-3 bg-black/5 dark:bg-white/5 border border-[#e8dfc8] dark:border-white/10 rounded-xl text-[#3f3522] dark:text-slate-300 text-sm font-medium mb-4">
              <span className="flex items-center gap-2"><SlidersHorizontal size={15} /> Filters</span>
              <ChevronDown size={15} className={`transition-transform ${filterOpen ? "rotate-180" : ""}`} />
            </button>

            <div className={`lg:block space-y-6 ${filterOpen ? "block" : "hidden"}`}>

              {/* Search */}
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-[#9a8a64] dark:text-slate-500 mb-3">Search</p>
                <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 border border-[#e8dfc8] dark:border-white/10 rounded-xl px-3 py-2.5 focus-within:border-yellow-500 transition-colors">
                  <Search size={14} className="text-[#9a8a64] dark:text-slate-500 shrink-0" />
                  <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
                    className="bg-transparent border-none outline-none text-[#1c1505] dark:text-white text-sm flex-1 placeholder:text-[#9a8a64] dark:placeholder:text-slate-600"
                    placeholder="Search products…" />
                  {search && (
                    <button onClick={() => setSearch("")}>
                      <X size={13} className="text-[#9a8a64] dark:text-slate-500 hover:text-[#1c1505] dark:hover:text-white" />
                    </button>
                  )}
                </div>
              </div>

              {/* Sort */}
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-[#9a8a64] dark:text-slate-500 mb-3">Sort By</p>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                  className="w-full bg-black/5 dark:bg-white/5 border border-[#e8dfc8] dark:border-white/10 rounded-xl px-3 py-2.5 text-[#3f3522] dark:text-slate-300 text-sm outline-none focus:border-yellow-500 transition-colors">
                  <option value="default" className="bg-white dark:bg-[#0d0b0f]">Default</option>
                  <option value="name"    className="bg-white dark:bg-[#0d0b0f]">Name A–Z</option>
                </select>
              </div>

              {/* Brand filter */}
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-[#9a8a64] dark:text-slate-500 mb-3">Brand</p>
                <div className="flex flex-col gap-1">
                  {brands.map(b => (
                    <button key={b} onClick={() => handleBrand(b)}
                      className={`text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        activeBrand === b
                          ? "bg-yellow-600 text-white font-semibold"
                          : "text-[#6b5d3f] dark:text-slate-400 hover:text-[#1c1505] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                      }`}>
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category filter */}
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-[#9a8a64] dark:text-slate-500 mb-3">Category</p>
                <div className="flex flex-col gap-1">
                  {categories.map(c => (
                    <button key={c} onClick={() => handleCat(c)}
                      className={`text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        activeCategory === c
                          ? "bg-yellow-600 text-white font-semibold"
                          : "text-[#6b5d3f] dark:text-slate-400 hover:text-[#1c1505] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                      }`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {(activeBrand !== "All" || activeCategory !== "All" || search || sortBy !== "default") && (
                <button onClick={resetFilters}
                  className="w-full py-2.5 rounded-xl border border-[#e8dfc8] dark:border-white/10 text-[#6b5d3f] dark:text-slate-400 text-sm hover:border-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400 transition-all">
                  Reset Filters
                </button>
              )}
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-[#9a8a64] dark:text-slate-500">
                <div className="text-5xl mb-4 text-slate-900 dark:text-amber-400"><FaSearch /></div>
                <p className="text-lg font-medium">No products found</p>
                <button onClick={resetFilters} className="mt-4 text-sm text-yellow-600 dark:text-yellow-400 hover:underline">Clear filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {paginated.map((p, i) => (
                  <div key={p.id}
                    onClick={() => navigate(`/product/${p.id}`)}
                    className="group bg-white dark:bg-white/[.03] border border-[#e8dfc8] dark:border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-yellow-500/50 dark:hover:border-yellow-600/40 hover:-translate-y-1 transition-all duration-300 shadow-sm dark:shadow-none product-card-anim"
                    style={{ animationDelay: `${(i % 12) * 0.04}s` }}>

                    <div className="relative bg-[#faf6ea] dark:bg-white/5 overflow-hidden aspect-square">
                      <img src={p.img} alt={p.name}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                        onError={e => { e.target.src = "https://placehold.co/300x300/1a1a1a/666?text=GTO"; }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="p-3 text-center">
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border mb-2 ${
                        theme === "dark"
                          ? brandColors[p.brand] || "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                          : "bg-yellow-500/20 text-yellow-700 border-yellow-500/30"
                      }`}>
                        {p.brand}
                      </span>
                      <p className="text-[#1c1505] dark:text-white text-sm font-medium leading-snug line-clamp-2">{p.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="px-4 py-2 rounded-lg bg-black/5 dark:bg-white/5 border border-[#e8dfc8] dark:border-white/10 text-[#6b5d3f] dark:text-slate-400 text-sm hover:border-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                  ← Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button key={n} onClick={() => setPage(n)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                      page === n
                        ? "bg-yellow-600 text-white"
                        : "bg-black/5 dark:bg-white/5 border border-[#e8dfc8] dark:border-white/10 text-[#6b5d3f] dark:text-slate-400 hover:border-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400"
                    }`}>
                    {n}
                  </button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="px-4 py-2 rounded-lg bg-black/5 dark:bg-white/5 border border-[#e8dfc8] dark:border-white/10 text-[#6b5d3f] dark:text-slate-400 text-sm hover:border-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}