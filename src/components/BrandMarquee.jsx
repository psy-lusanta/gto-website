import { motion } from 'framer-motion';
import { useTheme } from "../context/ThemeContext";

const brandLogos = [
  { name: "AEROPAK", light: "/Black and White Logos/aeropak-black.png", dark: "/Black and White Logos/aeropak-white.png" },
  { name: "AUTOGREEN", light: "/Black and White Logos/autogreen-black.png", dark: "/Black and White Logos/autogreen-white.png" },
  { name: "BLAUPUNKT", light: "/Black and White Logos/blaupunkt-black.png", dark: "/Black and White Logos/blaupunkt-white.png" },
  { name: "ENI", light: "/Black and White Logos/eni-black.png", dark: "/Black and White Logos/eni-white.png" },
  { name: "LUBRIGOLD", light: "/Black and White Logos/lubrigold-black.png", dark: "/Black and White Logos/lubrigold-white.png" },
  { name: "STPOWER", light: "/Black and White Logos/st power-black.png", dark: "/Black and White Logos/st power-white.png" },
  { name: "SAFEWAY", light: "/Black and White Logos/safeway-black.png", dark: "/Black and White Logos/safeway-white.png" },
  { name: "VEENTO", light: "/Black and White Logos/veento-black.png", dark: "/Black and White Logos/veento-white.png" },
  { name: "WHIZ", light: "/Black and White Logos/whiz-black.png", dark: "/Black and White Logos/whiz-white.png" },
];

export default function BrandsMarquee() {
  const { theme } = useTheme();

  return (
    <section id="brands" className="py-20 sm:py-28 bg-[#fdfbf3] dark:bg-[#08070a] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">

        <div className="text-center mb-12 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-yellow-600" />
            <span className="text-xs font-bold tracking-[.2em] uppercase text-yellow-600 dark:text-yellow-500"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Trusted Brands
            </span>
            <div className="w-8 h-px bg-yellow-600" />
          </div>
          <h2 className="font-black text-[#1c1505] dark:text-white leading-none mb-3"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2rem, 6vw, 3.5rem)" }}>
            Brands We <em className="text-yellow-600 dark:text-yellow-500 not-italic">Carry</em>
          </h2>
          <p className="text-[#6b5d3f] dark:text-slate-400 max-w-xl mx-auto leading-relaxed text-sm sm:text-base">
            We proudly distribute internationally recognized automotive and motorcycle brands across the Philippines.
          </p>
        </div>

        {/* Animated Brand Grid */}
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-10 px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1
              }
            }
          }}
        >
          {brandLogos.map((brand, index) => (
            <motion.div 
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.9 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { type: "spring", stiffness: 100, damping: 12 }
                }
              }}
              className="flex items-center justify-center bg-white dark:bg-white/[.04] border border-[#e8dfc8] dark:border-white/10 rounded-2xl px-8 sm:px-10 py-6 sm:py-8 hover:border-yellow-500/60 dark:hover:border-yellow-600/40 hover:bg-yellow-50 dark:hover:bg-white/[.07] transition-all duration-300 shadow-sm dark:shadow-none group"
            >
              <img 
                src={theme === "dark" ? brand.dark : brand.light}
                alt={brand.name} 
                className="h-12 sm:h-16 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}