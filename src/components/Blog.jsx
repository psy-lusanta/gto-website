import { useNavigate } from "react-router-dom";
import { ArrowRight, Eye, User, Calendar } from "lucide-react";
import { blogs } from "../data/blogs";

export default function Blog() {
  const navigate = useNavigate();

  return (
    <section id="blog" className="py-24 bg-white/[.02]">
      <div className="max-w-6xl mx-auto px-5">

        {/* Header */}
        <div className="flex items-center gap-3 mb-4 reveal">
          <div className="w-8 h-px bg-orange-600" />
          <span className="text-xs font-bold tracking-[.2em] uppercase text-orange-500"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Our Blog
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 reveal">
          <h2 className="font-black text-5xl sm:text-6xl text-white leading-none"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Latest <em className="text-orange-500 not-italic">Insights</em>
          </h2>
          <p className="text-slate-500 text-sm">{blogs.length} article{blogs.length !== 1 ? "s" : ""}</p>
        </div>

        {/* Featured post — large */}
        {blogs.slice(0, 1).map(b => (
          <div key={b.id}
            onClick={() => navigate(`/blog/${b.id}/${b.slug}`)}
            className="reveal group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white/[.03] border border-white/10 rounded-3xl overflow-hidden cursor-pointer hover:border-orange-600/40 transition-all duration-500 mb-8">

            {/* Image */}
            <div className="relative overflow-hidden aspect-[16/10] lg:aspect-auto">
              <img src={b.img} alt={b.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={e => { e.target.src = "https://placehold.co/800x500/1a1a1a/666?text=GTO+Blog"; }} />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
              <span className="absolute top-4 left-4 px-3 py-1 bg-orange-600 text-white text-xs font-bold rounded-full tracking-widest uppercase">
                {b.tag}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <h3 className="font-black text-3xl sm:text-4xl text-white leading-tight mb-3 group-hover:text-orange-400 transition-colors duration-300"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                {b.title}
              </h3>
              <p className="text-orange-400 text-sm font-medium mb-4 italic">{b.subtitle}</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{b.excerpt}</p>

              <div className="flex items-center gap-4 text-xs text-slate-500 mb-6">
                <span className="flex items-center gap-1.5"><User size={12} />{b.author}</span>
                <span className="flex items-center gap-1.5"><Calendar size={12} />{b.date}</span>
                <span className="flex items-center gap-1.5"><Eye size={12} />{b.views.toLocaleString()} views</span>
              </div>

              <div className="inline-flex items-center gap-2 text-orange-400 font-semibold text-sm group-hover:gap-3 transition-all">
                Read Full Story <ArrowRight size={16} />
              </div>
            </div>
          </div>
        ))}

        {/* More posts grid — for when you add more blogs */}
        {blogs.length > 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogs.slice(1).map((b, i) => (
              <div key={b.id}
                onClick={() => navigate(`/blog/${b.id}/${b.slug}`)}
                className="reveal group bg-white/[.03] border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-orange-600/40 hover:-translate-y-1 transition-all duration-300"
                style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="relative overflow-hidden">
                  <img src={b.img} alt={b.title}
                    className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={e => { e.target.src = "https://placehold.co/600x340/1a1a1a/666?text=GTO+Blog"; }} />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-orange-600 text-white text-xs font-bold rounded-full">
                    {b.tag}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-black text-xl text-white mb-2 group-hover:text-orange-400 transition-colors line-clamp-2"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    {b.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-4">{b.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>{b.date}</span>
                    <span className="flex items-center gap-1"><Eye size={11} />{b.views.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}