import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, SlidersHorizontal, ChevronDown } from "lucide-react";
import { products, brandColors } from "../data/products";

const brands = ["All", "AEROPAK", "AUTOGREEN", "BLAUPUNKT", "LUBRIGOLD", "MICHIBA", "ORELUBE", "SAFEWAY", "SILOCK", "WHIZ"];
const categories = ["All", "Automotive", "Motorcycle", "Household", "Industrial"];

const ITEMS_PER_PAGE = 12;

export default function Shop() {
  const navigate = useNavigate();
  const [activeBrand,    setActiveBrand]    = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [search,         setSearch]         = useState("");
  const [sortBy,         setSortBy]         = useState("default");
  const [page,           setPage]           = useState(1);
  const [selected,       setSelected]       = useState(null);
  const [filterOpen,     setFilterOpen]     = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeBrand    !== "All") list = list.filter(p => p.brand    === activeBrand);
    if (activeCategory !== "All") list = list.filter(p => p.category === activeCategory);
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()));
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
    <section id="shop" className="bg-[#08070a] py-24">

      {/* ── Header ── */}
      <div className="max-w-6xl mx-auto px-5 mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-orange-600" />
          <span className="text-xs font-bold tracking-[.2em] uppercase text-orange-500"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Our Products
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <h2 className="font-black text-5xl sm:text-6xl text-white leading-none"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Shop All <em className="text-orange-500 not-italic">Products</em>
          </h2>
          <p className="text-slate-500 text-sm">{filtered.length} products found</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 flex flex-col lg:flex-row gap-8">

        {/* ── Sidebar ── */}
        <aside className="lg:w-56 shrink-0">

          {/* Mobile filter toggle */}
          <button onClick={() => setFilterOpen(o => !o)}
            className="lg:hidden w-full flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-slate-300 text-sm font-medium mb-4">
            <span className="flex items-center gap-2"><SlidersHorizontal size={15} /> Filters</span>
            <ChevronDown size={15} className={`transition-transform ${filterOpen ? "rotate-180" : ""}`} />
          </button>

          <div className={`lg:block space-y-6 ${filterOpen ? "block" : "hidden"}`}>

            {/* Search */}
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-3">Search</p>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 focus-within:border-orange-500 transition-colors">
                <Search size={14} className="text-slate-500 shrink-0" />
                <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
                  className="bg-transparent border-none outline-none text-white text-sm flex-1 placeholder:text-slate-600"
                  placeholder="Search products…" />
                {search && (
                  <button onClick={() => setSearch("")}><X size={13} className="text-slate-500 hover:text-white" /></button>
                )}
              </div>
            </div>

            {/* Sort */}
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-3">Sort By</p>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-slate-300 text-sm outline-none focus:border-orange-500 transition-colors">
                <option value="default" className="bg-[#0d0b0f]">Default</option>
                <option value="price-asc" className="bg-[#0d0b0f]">Price: Low to High</option>
                <option value="price-desc" className="bg-[#0d0b0f]">Price: High to Low</option>
                <option value="name" className="bg-[#0d0b0f]">Name A–Z</option>
              </select>
            </div>

            {/* Brand filter */}
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-3">Brand</p>
              <div className="flex flex-col gap-1">
                {brands.map(b => (
                  <button key={b} onClick={() => handleBrand(b)}
                    className={`text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      activeBrand === b
                        ? "bg-orange-600 text-white font-semibold"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}>
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Category filter */}
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-3">Category</p>
              <div className="flex flex-col gap-1">
                {categories.map(c => (
                  <button key={c} onClick={() => handleCat(c)}
                    className={`text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      activeCategory === c
                        ? "bg-orange-600 text-white font-semibold"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset */}
            {(activeBrand !== "All" || activeCategory !== "All" || search || sortBy !== "default") && (
              <button onClick={resetFilters}
                className="w-full py-2.5 rounded-xl border border-white/10 text-slate-400 text-sm hover:border-orange-500 hover:text-orange-400 transition-all">
                Reset Filters
              </button>
            )}
          </div>
        </aside>

        {/* ── Product Grid ── */}
        <div className="flex-1">
          {paginated.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-slate-500">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-lg font-medium">No products found</p>
              <button onClick={resetFilters} className="mt-4 text-sm text-orange-400 hover:underline">Clear filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {paginated.map((p, i) => (
                <div key={p.id}
                  onClick={() => navigate(`/product/${p.id}`)}
                  className="group bg-white/[.03] border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-orange-600/40 hover:-translate-y-1 transition-all duration-300"
                  style={{ transitionDelay: `${(i % 12) * 0.04}s` }}>

                  {/* Image */}
                  <div className="relative bg-white/5 overflow-hidden aspect-square">
                    <img src={p.img} alt={p.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      onError={e => { e.target.src = "https://placehold.co/300x300/1a1a1a/666?text=GTO"; }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border mb-2 ${brandColors[p.brand] || "bg-orange-500/20 text-orange-300 border-orange-500/30"}`}>
                      {p.brand}
                    </span>
                    <p className="text-white text-sm font-medium leading-snug line-clamp-2 mb-2">{p.name}</p>
                    <p className="text-orange-400 font-black text-base" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                      ₱{p.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-sm hover:border-orange-500 hover:text-orange-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                ← Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => setPage(n)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                    page === n ? "bg-orange-600 text-white" : "bg-white/5 border border-white/10 text-slate-400 hover:border-orange-500 hover:text-orange-400"
                  }`}>
                  {n}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-sm hover:border-orange-500 hover:text-orange-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                Next →
              </button>
            </div>
          )}
        </div>
      </div>

    </section>
  );
}