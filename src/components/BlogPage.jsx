import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, User, Calendar, Share2 } from "lucide-react";
import { blogs } from "../data/blogs";

export default function BlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogs.find(b => b.id === parseInt(id));

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (!blog) return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="text-center">
        <p className="text-6xl mb-4">📝</p>
        <p className="text-xl font-bold mb-4">Blog post not found</p>
        <button onClick={() => navigate("/")} className="text-orange-400 hover:underline">← Back to Home</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#08070a] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-5">

        {/* Back */}
        <button onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors text-sm mb-8 group bg-transparent border-none cursor-pointer">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </button>

        {/* Hero image */}
        <div className="rounded-3xl overflow-hidden border border-white/10 mb-10">
          <img src={blog.img} alt={blog.title}
            className="w-full aspect-[21/9] object-cover"
            onError={e => { e.target.src = "https://placehold.co/1200x500/1a1a1a/666?text=GTO+Blog"; }} />
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="px-3 py-1 bg-orange-600 text-white text-xs font-bold rounded-full tracking-widest uppercase">
            {blog.tag}
          </span>
          <span className="flex items-center gap-1.5 text-slate-500 text-xs"><User size={12} />{blog.author}</span>
          <span className="flex items-center gap-1.5 text-slate-500 text-xs"><Calendar size={12} />{blog.date}</span>
          <span className="flex items-center gap-1.5 text-slate-500 text-xs"><Eye size={12} />{blog.views.toLocaleString()} views</span>
        </div>

        {/* Title */}
        <h1 className="font-black text-white leading-none mb-3"
          style={{ fontSize: "clamp(2rem, 8vw, 4.5rem)" }}>
          {blog.title}
        </h1>
        <p className="text-orange-400 text-xl font-medium italic mb-10">{blog.subtitle}</p>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-10" />

        {/* Timeline content */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[88px] top-0 bottom-0 w-px bg-gradient-to-b from-orange-600 via-orange-600/30 to-transparent hidden sm:block" />

          <div className="space-y-10">
            {blog.timeline.map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                {/* Year */}
                <div className="sm:w-20 shrink-0 flex sm:flex-col items-center sm:items-end gap-3 sm:gap-0">
                  <span className="font-black text-lg text-orange-500 leading-none sm:mb-3 whitespace-nowrap"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    {item.year}
                  </span>
                  {/* Dot */}
                  <div className="hidden sm:block w-3 h-3 rounded-full bg-orange-600 border-2 border-[#08070a] ring-2 ring-orange-600/30 relative left-[calc(100%+16px+1.5px)] -translate-x-1/2" />
                </div>

                {/* Content */}
                <div className="flex-1 bg-white/[.03] border border-white/10 rounded-2xl p-6 hover:border-orange-600/30 transition-colors duration-300">
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 my-12" />

        {/* Share / CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[.03] border border-white/10 rounded-2xl p-6">
          <div>
            <p className="text-white font-bold mb-1">Interested in Blaupunkt products?</p>
            <p className="text-slate-500 text-sm">GTO Trading is your authorized local distributor.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                navigate("/");
                setTimeout(() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }), 150);
              }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-700 to-orange-400 text-white font-semibold text-sm hover:-translate-y-0.5 transition-transform border-none cursor-pointer">
              Shop Blaupunkt
            </button>
            <button
              onClick={() => navigator.share?.({ title: blog.title, url: window.location.href })}
              className="px-4 py-2.5 rounded-full border border-white/20 text-slate-400 hover:border-orange-500 hover:text-orange-400 transition-all text-sm flex items-center gap-2 bg-transparent cursor-pointer">
              <Share2 size={14} /> Share
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}