import { useEffect, useState } from "react";
import { Scale, Leaf, Heart, Landmark, BowArrow, Rocket} from "lucide-react";


const timeline = [
  { decade: "1970s", color: "from-orange-700 to-orange-500", events: ["Metro Manila Automotive Sales was founded in 1972, conquering the VIZMIN market on take-off.", "First brands carried: Whiz, Gold Eagle, KNW, Hella, Plastic Coat and Orelube."] },
  { decade: "1980s", color: "from-orange-600 to-amber-500", events: ["Company name changes as operations continue to grow.", "Metro Manila Automotive Sales → First Metro → Inter-Island Industrial Sales → Metro Gold → Gold Rush."] },
  { decade: "1990s", color: "from-amber-600 to-yellow-500", events: ["Kabignayan St. in Banawe became the new home for Gold Rush.", "Became an avid affiliate of the Association of Philippine Volunteer Fire Brigades, Inc."] },
  { decade: "2000s", color: "from-orange-700 to-orange-400", events: ["On July 5, 2012, Gran Toro Oro Trading was officially registered.", "Prominent brands joined: Repsol, Aeropak, Lubrigold, Safeway, JTC, Silock, Osram, Michiba, Blaupunkt.", "Business Support Team launched — focusing on Tele Sales and E-commerce."] },
];

const values = [
  { icon: Scale, title: "Professionalism", desc: "We conduct ourselves with responsibility, integrity, accountability, and excellence when doing business." },
  { icon: Leaf, title: "Corporate Social Responsibility", desc: "We make effort to be involved as a responsible corporate citizen in our community." },
  { icon: Heart, title: "Customer-centric", desc: "We value our customers as they are the heart of our business." },
  { icon: Landmark, title: "Building Legacy", desc: "We draw inspiration from our rich history and translate them to long-term business strategies." },
];

export default function About() {
  const [activeDecade, setActiveDecade] = useState(0);

  useEffect(() => {
    const els = document.querySelectorAll(".counter[data-target]");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = +el.dataset.target;
        let count = 0;
        const step = () => {
          count += target / 120;
          if (count < target) { el.textContent = Math.ceil(count).toLocaleString(); requestAnimationFrame(step); }
          else el.textContent = target.toLocaleString();
        };
        step();
        io.unobserve(el);
      });
    }, { threshold: 0.3 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="about-us" className="bg-[#08070a] overflow-hidden">

      {/* Banner */}
      <div className="relative py-20 sm:py-32 flex items-center justify-center text-center overflow-hidden px-4">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(194,69,12,.15), transparent 70%)" }} />
        <div className="relative max-w-4xl mx-auto reveal">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 sm:w-12 h-px bg-yellow-600" />
            <span className="text-xs font-bold tracking-[.2em] uppercase text-yellow-500"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>About the Company</span>
            <div className="w-8 sm:w-12 h-px bg-yellow-600" />
          </div>
          <h2 className="font-black text-white leading-none mb-5"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2.5rem, 8vw, 5rem)" }}>
            Gran Toro Oro<br /><em className="text-yellow-500 not-italic">Trading Corporation</em>
          </h2>
          <p className="text-slate-400 leading-relaxed mx-auto max-w-2xl"
            style={{ fontSize: "clamp(0.875rem, 2.5vw, 1.125rem)" }}>
            Committed to helping businesses grow and succeed. We offer a variety of products and solutions
            that aid micro and macro businesses to compete in today's automotive, industrial and commercial marketplace.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white/[.02] border-y border-white/10 py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { num: 6000, suf: "+", label: "Direct Clients Nationwide" },
            { num: 50, suf: "+", label: "Years of Industry Experience" },
            { num: 10, suf: "+", label: "Premium Brands Carried" },
            { num: 10000, suf: "+", label: "Products in Stock" },
          ].map((s, i) => (
            <div key={s.label} className="reveal text-center" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="font-black text-white mb-1"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2rem, 6vw, 3rem)" }}>
                <span className="counter" data-target={s.num}>0</span>{s.suf}
              </div>
              <p className="text-slate-500 text-xs sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="py-16 sm:py-24 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="reveal relative rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-white/10 overflow-hidden group hover:border-orange-600/30 transition-all duration-500"
            style={{ background: "linear-gradient(135deg, rgba(194,69,12,.1), rgba(8,7,10,0))" }}>
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-orange-600/10 blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-orange-600/20 border border-orange-600/30 flex items-center justify-center text-xl sm:text-2xl mb-5"><BowArrow /></div>
              <h3 className="font-black text-2xl sm:text-3xl text-white mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Our Vision</h3>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                To establish GTO as the <span className="text-yellow-400 font-semibold">trusted partner</span> providing quality products in the automotive, industrial, commercial and motorcycle industry.
              </p>
            </div>
          </div>

          <div className="reveal-right relative rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-white/10 overflow-hidden group hover:border-orange-600/30 transition-all duration-500"
            style={{ background: "linear-gradient(135deg, rgba(146,64,14,.08), rgba(8,7,10,0))" }}>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-orange-800/10 blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-orange-600/20 border border-orange-600/30 flex items-center justify-center text-xl sm:text-2xl mb-5"><Rocket /></div>
              <h3 className="font-black text-2xl sm:text-3xl text-white mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Our Mission</h3>
              <p className="text-slate-400 leading-relaxed mb-3 text-sm sm:text-base"><span className="text-orange-400 font-bold">Gearing Towards Outcomes</span></p>
              <ul className="space-y-2">
                {["Bring solutions and quality products to the AUTO, FLT, IND, COM and MTR market.", "Bridge international products to the Philippine market.", "Build and maintain relationships with clients, going beyond expectations."].map((m, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-400 text-sm">
                    <span className="text-orange-500 mt-0.5 shrink-0 font-bold">→</span>{m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* History */}
      <div className="bg-white/[.02] border-y border-white/10 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10 reveal">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-orange-600" />
              <span className="text-xs font-bold tracking-[.2em] uppercase text-orange-500" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Our History</span>
              <div className="w-8 h-px bg-orange-600" />
            </div>
            <h2 className="font-black text-white leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2rem, 6vw, 3rem)" }}>
              Over 50 Years of Growth
            </h2>
          </div>

          {/* Decade tabs — scrollable on mobile */}
          <div className="flex gap-2 mb-8 reveal overflow-x-auto pb-2 scrollbar-none">
            {timeline.map((t, i) => (
              <button key={t.decade} onClick={() => setActiveDecade(i)}
                className={`px-5 py-2 rounded-full text-sm font-bold border transition-all duration-300 whitespace-nowrap shrink-0 ${activeDecade === i ? "bg-orange-600 border-orange-600 text-white" : "bg-transparent border-white/15 text-slate-400 hover:border-orange-600/50 hover:text-orange-400"
                  }`}
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                {t.decade}
              </button>
            ))}
          </div>

          <div className="reveal">
            <div className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-12 border border-white/10 overflow-hidden"
              style={{ background: "rgba(255,255,255,0.03)" }}>
              <div className={`absolute top-0 left-0 w-1.5 h-full rounded-l-3xl bg-gradient-to-b ${timeline[activeDecade].color}`} />
              <div className="pl-4">
                <h3 className="font-black text-white/10 mb-4 leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(3rem, 10vw, 5rem)" }}>
                  {timeline[activeDecade].decade}
                </h3>
                <ul className="space-y-4">
                  {timeline[activeDecade].events.map((ev, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0" />
                      <p className="text-slate-300 leading-relaxed text-sm sm:text-base">{ev}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Values */}
      <div className="py-16 sm:py-24 max-w-6xl mx-auto px-4">
        <div className="text-center mb-10 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-orange-600" />
            <span className="text-xs font-bold tracking-[.2em] uppercase text-orange-500" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>Our Values</span>
            <div className="w-8 h-px bg-orange-600" />
          </div>
          <h2 className="font-black text-white leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2rem, 6vw, 3rem)" }}>
            What We Stand For
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="reveal group bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 hover:border-orange-600/40 hover:-translate-y-1 transition-all duration-300"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="mb-4">
                  <Icon
                    size={32}
                    className="text-orange-500 group-hover:text-orange-400 transition-colors"
                  />
                </div>
                <h4
                  className="font-black text-base sm:text-lg text-white mb-2 group-hover:text-orange-400 transition-colors"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {v.title}
                </h4>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}