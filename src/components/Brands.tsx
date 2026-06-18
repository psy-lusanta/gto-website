import aeropak from "../brands/aeropak.png";
import autogreen from "../brands/autogreen.png";
import blaupunkt from "../brands/blaupunkt.png";
import eni from "../brands/eni.png";
import lubrigold from "../brands/lubrigold.png";
import safeway from "../brands/safeway.png";
import stpower from "../brands/stpower.png";
import veento from "../brands/veento.png";
import whiz from "../brands/whiz.png";

const brandLogos = [
  { name: "AEROPAK", img: aeropak },
  { name: "AUTOGREEN", img: autogreen },
  { name: "BLAUPUNKT", img: blaupunkt },
  { name: "ENI", img: eni },
  { name: "LUBRIGOLD", img: lubrigold },
  { name: "STPOWER", img: stpower },
  { name: "SAFEWAY", img: safeway },
  { name: "VEENTO", img: veento },
  { name: "WHIZ", img: whiz },
];

const marqueeLogos = [...brandLogos, ...brandLogos];

export default function Brands() {
  return (
    <section id="brands" className="py-20 sm:py-28 bg-[#fdfbf3] dark:bg-[#08070a] overflow-hidden transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">

        <div className="text-center mb-12 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-orange-600" />
            <span className="text-xs font-bold tracking-[.2em] uppercase text-orange-600 dark:text-orange-500"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Trusted Brands
            </span>
            <div className="w-8 h-px bg-orange-600" />
          </div>
          <h2 className="font-black text-[#1c1505] dark:text-white leading-none mb-3"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2rem, 6vw, 3.5rem)" }}>
            Brands We <em className="text-orange-600 dark:text-orange-500 not-italic">Carry</em>
          </h2>
          <p className="text-[#6b5d3f] dark:text-slate-400 max-w-xl mx-auto leading-relaxed text-sm sm:text-base">
            We proudly distribute internationally recognized automotive and motorcycle brands across the Philippines.
          </p>
        </div>
      </div>

      <div className="relative w-full mb-6">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none dark:block hidden"
          style={{ background: "linear-gradient(to right, #08070a, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none dark:block hidden"
          style={{ background: "linear-gradient(to left, #08070a, transparent)" }} />
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none block dark:hidden"
          style={{ background: "linear-gradient(to right, #fdfbf3, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none block dark:hidden"
          style={{ background: "linear-gradient(to left, #fdfbf3, transparent)" }} />

        <div className="flex w-max" style={{ animation: "marqueeLeft 28s linear infinite" }}>
          {marqueeLogos.map((b, i) => (
            <div key={`row1-${i}`}
              className="flex items-center justify-center mx-4 sm:mx-6 shrink-0 bg-white dark:bg-white/[.04] border border-[#e8dfc8] dark:border-white/10 rounded-2xl px-6 sm:px-10 py-5 sm:py-7 hover:border-orange-500/60 dark:hover:border-orange-600/40 hover:bg-orange-50 dark:hover:bg-white/[.07] transition-all duration-300 shadow-sm dark:shadow-none">
              <img src={b.img} alt={b.name} className="h-8 sm:h-12 w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none dark:block hidden"
          style={{ background: "linear-gradient(to right, #08070a, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none dark:block hidden"
          style={{ background: "linear-gradient(to left, #08070a, transparent)" }} />
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none block dark:hidden"
          style={{ background: "linear-gradient(to right, #fdfbf3, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none block dark:hidden"
          style={{ background: "linear-gradient(to left, #fdfbf3, transparent)" }} />

        <div className="flex w-max" style={{ animation: "marqueeRight 32s linear infinite" }}>
          {[...marqueeLogos].reverse().map((b, i) => (
            <div key={`row2-${i}`}
              className="flex items-center justify-center mx-4 sm:mx-6 shrink-0 bg-white dark:bg-white/[.04] border border-[#e8dfc8] dark:border-white/10 rounded-2xl px-6 sm:px-10 py-5 sm:py-7 hover:border-orange-500/60 dark:hover:border-orange-600/40 hover:bg-orange-50 dark:hover:bg-white/[.07] transition-all duration-300 shadow-sm dark:shadow-none">
              <img src={b.img} alt={b.name} className="h-8 sm:h-12 w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}