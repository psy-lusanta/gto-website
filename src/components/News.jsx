import { useState } from "react";
import { Calendar, ArrowRight, User, X } from "lucide-react";
import { newsData } from "../data/news-data";

export default function News() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="news" className="py-20 sm:py-28 bg-[#fdfbf3] dark:bg-[#08070a] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">

        <div className="text-center mb-12 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-orange-600" />
            <span className="text-xs font-bold tracking-[.2em] uppercase text-orange-600 dark:text-orange-500"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Stay Updated
            </span>
            <div className="w-8 h-px bg-orange-600" />
          </div>
          <h2 className="font-black text-[#1c1505] dark:text-white leading-none mb-3"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2rem, 6vw, 3.5rem)" }}>
            Latest <em className="text-orange-600 dark:text-orange-500 not-italic">News</em>
          </h2>
          <p className="text-[#6b5d3f] dark:text-slate-400 max-w-xl mx-auto leading-relaxed text-sm sm:text-base">
            Company announcements, product launches, and updates from GTO Trading.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {newsData.map((n, i) => (
            <div key={n.id}
              onClick={() => setSelected(n)}
              className="reveal group bg-white dark:bg-white/[.03] border border-[#e8dfc8] dark:border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-orange-500/60 dark:hover:border-orange-600/40 hover:-translate-y-1 transition-all duration-300 shadow-sm dark:shadow-none"
              style={{ transitionDelay: `${i * 0.06}s` }}>

              <div className="relative overflow-hidden">
                <img src={n.image} alt={n.title}
                  className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={e => { e.target.src = "https://placehold.co/600x340/1a1a1a/666?text=GTO+News"; }} />
              </div>

              <div className="p-5">
                <span className="flex items-center gap-1.5 text-[#9a8a64] dark:text-slate-500 text-xs mb-2">
                  <Calendar size={11} /> {n.date}
                </span>
                <h3 className="font-black text-lg text-[#1c1505] dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  {n.title}
                </h3>
                <p className="text-[#6b5d3f] dark:text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4">{n.excerpt}</p>
                <div className="inline-flex items-center gap-1.5 text-orange-600 dark:text-orange-400 font-semibold text-sm group-hover:gap-2.5 transition-all">
                  Read More <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div className="relative bg-white dark:bg-[#0d0b0f] border border-[#e8dfc8] dark:border-white/15 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={e => e.stopPropagation()}>

            <button onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center hover:bg-black/20 dark:hover:bg-white/20 transition-colors">
              <X size={18} className="text-[#1c1505] dark:text-white" />
            </button>

            <img src={selected.image} alt={selected.title}
              className="w-full aspect-[16/9] object-cover rounded-t-3xl"
              onError={e => { e.target.src = "https://placehold.co/900x500/1a1a1a/666?text=GTO+News"; }} />

            <div className="p-6 sm:p-8">
              <h2 className="font-black text-[#1c1505] dark:text-white leading-tight mb-4"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(1.5rem, 5vw, 2.25rem)" }}>
                {selected.title}
              </h2>

              <div className="flex items-center gap-4 text-xs text-[#9a8a64] dark:text-slate-500 mb-6">
                <span className="flex items-center gap-1.5"><User size={12} />{selected.author}</span>
                <span className="flex items-center gap-1.5"><Calendar size={12} />{selected.date}</span>
              </div>

              <p className="text-[#3f3522] dark:text-slate-300 leading-relaxed text-sm sm:text-base">{selected.content}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}