// import aeropak from "../brands/aeropak.png";
// import autogreen from "../brands/autogreen.png";
// import blaupunkt from "../brands/blaupunkt.png";
// import eni from "../brands/eni.png";
// import lubrigold from "../brands/lubrigold.png";
// import safeway from "../brands/safeway.png";
// import stpower from "../brands/stpower.png";
// import veento from "../brands/veento.png";
// import whiz from "../brands/whiz.png";

// const brandLogos = [
//   { name: "AEROPAK", img: aeropak },
//   { name: "AUTOGREEN", img: autogreen },
//   { name: "BLAUPUNKT", img: blaupunkt },
//   { name: "ENI", img: eni },
//   { name: "LUBRIGOLD", img: lubrigold },
//   { name: "STPOWER", img: stpower },
//   { name: "SAFEWAY", img: safeway },
//   { name: "VEENTO", img: veento },
//   { name: "WHIZ", img: whiz },
// ];

// export default function BrandsMarquee() {
//   return (
//     <section id="brands" className="py-20 sm:py-28 bg-[#fdfbf3] dark:bg-[#08070a] transition-colors duration-300">
//       <div className="max-w-6xl mx-auto px-4">

//         <div className="text-center mb-12 reveal">
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <div className="w-8 h-px bg-yellow-600" />
//             <span className="text-xs font-bold tracking-[.2em] uppercase text-yellow-600 dark:text-yellow-500"
//               style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
//               Trusted Brands
//             </span>
//             <div className="w-8 h-px bg-yellow-600" />
//           </div>
//           <h2 className="font-black text-[#1c1505] dark:text-white leading-none mb-3"
//             style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2rem, 6vw, 3.5rem)" }}>
//             Brands We <em className="text-yellow-600 dark:text-yellow-500 not-italic">Carry</em>
//           </h2>
//           <p className="text-[#6b5d3f] dark:text-slate-400 max-w-xl mx-auto leading-relaxed text-sm sm:text-base">
//             We proudly distribute internationally recognized automotive and motorcycle brands across the Philippines.
//           </p>
//         </div>

//         {/* Static Brand Grid - Responsive */}
//         <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-10 px-4">
//           {brandLogos.map((brand, index) => (
//             <div 
//               key={index}
//               className="flex items-center justify-center bg-white dark:bg-white/[.04] border border-[#e8dfc8] dark:border-white/10 rounded-2xl px-8 sm:px-10 py-6 sm:py-8 hover:border-yellow-500/60 dark:hover:border-yellow-600/40 hover:bg-yellow-50 dark:hover:bg-white/[.07] transition-all duration-300 shadow-sm dark:shadow-none group"
//             >
//               <img 
//                 src={brand.img} 
//                 alt={brand.name} 
//                 className="h-12 sm:h-16 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
//               />
//             </div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// }