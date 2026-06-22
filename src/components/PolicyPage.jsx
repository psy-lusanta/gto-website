import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { termsData  } from "../data/terms-and-condition";
import { privacyData } from "../data/privacy-policy";
import { refundData  } from "../data/refund-policy";
import { faqData     } from "../data/faqs";

const policies = {
  "terms-and-conditions": { ...termsData,  isFaq: false },
  "privacy-policy":       { ...privacyData, isFaq: false },
  "refund-policy":        { ...refundData,  isFaq: false },
  "faq":                  { ...faqData,     isFaq: true  },
};

export default function PolicyPage() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const policy = policies[slug];

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (!policy) return (
    <div className="min-h-screen bg-[#fdfbf3] dark:bg-[#08070a] flex items-center justify-center transition-colors duration-300">
      <div className="text-center">
        <p className="text-6xl mb-4">📄</p>
        <p className="text-xl font-bold text-[#1c1505] dark:text-white mb-4">Page not found</p>
        <button onClick={() => navigate("/")}
          className="text-orange-600 dark:text-orange-400 hover:underline bg-transparent border-none cursor-pointer">
          ← Back to Home
        </button>
      </div>
    </div>
  );

  const isFaq = slug === "faq";

  return (
    <div className="min-h-screen bg-[#fdfbf3] dark:bg-[#08070a] pt-24 pb-20 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-5">

        {/* Back */}
        <button onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-[#6b5d3f] dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors text-sm mb-8 group bg-transparent border-none cursor-pointer">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-orange-600" />
            <span className="text-xs font-bold tracking-[.2em] uppercase text-orange-600 dark:text-orange-500"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              GTO Trading
            </span>
          </div>
          <h1 className="font-black text-[#1c1505] dark:text-white leading-none mb-3"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2rem, 8vw, 3.5rem)" }}>
            {policy.title}
          </h1>
          <p className="text-[#6b5d3f] dark:text-slate-400 leading-relaxed mb-3">{policy.subtitle}</p>
          <p className="text-[#9a8a64] dark:text-slate-600 text-xs">Last updated: {policy.updated}</p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#e8dfc8] dark:bg-white/10 mb-10" />

        {/* Content */}
        <div className="space-y-4">
          {policy.sections.map((s, i) => (
            isFaq ? (
              <FaqItem key={i} question={s.heading} answer={s.content} />
            ) : (
              <div key={i}
                className="bg-white dark:bg-white/[.03] border border-[#e8dfc8] dark:border-white/10 rounded-2xl p-6 hover:border-orange-400/40 dark:hover:border-white/20 transition-colors shadow-sm dark:shadow-none">
                <h2 className="font-black text-xl text-[#1c1505] dark:text-white mb-3"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  {s.heading}
                </h2>
                <p className="text-[#6b5d3f] dark:text-slate-400 text-sm leading-relaxed">{s.content}</p>
              </div>
            )
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 p-6 bg-gradient-to-br from-orange-100/80 dark:from-orange-900/20 to-orange-50/30 dark:to-orange-800/5 border border-orange-200 dark:border-orange-600/20 rounded-2xl text-center">
          <p className="text-[#1c1505] dark:text-white font-bold mb-1">Still have questions?</p>
          <p className="text-[#6b5d3f] dark:text-slate-400 text-sm mb-4">Our team is happy to help you.</p>
          <button
            onClick={() => navigate("/contact")}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-700 to-orange-400 text-white font-semibold text-sm hover:-translate-y-0.5 transition-transform border-none cursor-pointer">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-300 shadow-sm dark:shadow-none ${
      open
        ? "border-orange-400/50 dark:border-orange-600/40 bg-orange-50/50 dark:bg-white/[.04]"
        : "border-[#e8dfc8] dark:border-white/10 bg-white dark:bg-white/[.02]"
    }`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 text-left bg-transparent border-none cursor-pointer gap-4">
        <span className="font-bold text-[#1c1505] dark:text-white text-sm leading-snug">{question}</span>
        <span className={`text-orange-600 dark:text-orange-500 text-lg font-black shrink-0 transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
          +
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 pb-5">
          <div className="w-full h-px bg-[#e8dfc8] dark:bg-white/10 mb-4" />
          <p className="text-[#3f3522] dark:text-slate-400 text-sm leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}