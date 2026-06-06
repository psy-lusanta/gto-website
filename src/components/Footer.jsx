import { useNavigate } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import GTOLogo from "../assets/gto-logo-white.png";

const footerLinks = {
  "Quick Links": [
    { label: "Home", id: "home" },
    { label: "About Us", id: "about" },
    { label: "Shop", id: "shop" },
    { label: "Blog", id: "blog" },
    { label: "Careers", id: "careers" },
    { label: "Contact Us", id: "contact" },
  ],
  "Our Brands": [
    { label: "AEROPAK", id: "shop" },
    { label: "AUTOGREEN", id: "shop" },
    { label: "BLAUPUNKT", id: "shop" },
    { label: "LUBRIGOLD", id: "shop" },
    { label: "SAFEWAY", id: "shop" },
    { label: "WHIZ", id: "shop" },
  ],
  "Policies": [
    { label: "Terms of Service", path: "/terms-and-conditions" },
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Refund Policy", path: "/refund-policy" },
    { label: "FAQ", path: "/faq" },
    { label: "Become a Reseller", path: null, href: "https://gtotrading.com.ph/become-a-seller" },
  ],
};

export default function Footer() {
  const navigate = useNavigate();

  const scrollTo = (id) => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 150);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#060508] border-t border-white/10">

      {/* ── Top CTA band ── */}
      <div className="border-b border-white/10"
        style={{ background: "linear-gradient(135deg, rgba(194,69,12,.12), rgba(146,64,14,.05))" }}>
        <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-black text-white mb-1" style={{ fontSize: "clamp(1.5rem, 5vw, 1.875rem)" }}
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Ready to grow your business?
            </h3>
            <p className="text-slate-400 text-sm">Become a GTO reseller and get access to our full product lineup.</p>
          </div>
          <a href="https://gtotrading.com.ph/become-a-seller" target="_blank" rel="noreferrer"
            className="shrink-0 flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-orange-700 to-orange-400 text-white font-bold text-sm hover:-translate-y-0.5 transition-transform no-underline">
            Become a Reseller <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* ── Main footer ── */}
      <div className="max-w-6xl mx-auto px-5 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <button onClick={() => scrollTo("home")}
              className="bg-transparent border-none cursor-pointer p-0 mb-5 block">
              <img src={GTOLogo} alt="GTO" className="h-9 w-auto object-contain" />
            </button>

            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Gran Toro Oro Trading Corporation — your trusted partner for automotive, motorcycle, industrial, and commercial products since the 1970s.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5">
              <div className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin size={14} className="text-orange-500 mt-0.5 shrink-0" />
                <span>#12 Kabignayan St., Doña Josefa, Quezon City</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Phone size={14} className="text-orange-500 shrink-0" />
                <span>(02) 8-7118005 | 09688996697</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Mail size={14} className="text-orange-500 shrink-0" />
                <span>info@gtotrading.com.ph</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Clock size={14} className="text-orange-500 shrink-0" />
                <span>Mon–Sat, 7:00 AM – 5:00 PM</span>
              </div>
            </div>

            {/* Social
            <div className="flex gap-3 mt-6">
              <a href="https://www.facebook.com/GTOPortalPhilippines" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-orange-600/20 hover:border-orange-600/40 hover:text-orange-400 transition-all">
                <Facebook size={15} />
              </a>
              <a href="#"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-orange-600/20 hover:border-orange-600/40 hover:text-orange-400 transition-all">
                <Instagram size={15} />
              </a>
              <a href="#"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-orange-600/20 hover:border-orange-600/40 hover:text-orange-400 transition-all">
                <Youtube size={15} />
              </a>
            </div> */}
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p className="text-xs font-bold tracking-[.2em] uppercase text-slate-500 mb-4">{title}</p>
              <ul className="space-y-2.5">
                {links.map(l => (
                  <li key={l.label}>
                    {l.href ? (
                      // External link
                      <a href={l.href} target="_blank" rel="noreferrer"
                        className="text-sm text-slate-400 hover:text-orange-400 transition-colors no-underline">
                        {l.label}
                      </a>
                    ) : l.path ? (
                      // Internal policy page
                      <button onClick={() => { navigate(l.path); window.scrollTo(0, 0); }}
                        className="text-sm text-slate-400 hover:text-orange-400 transition-colors bg-transparent border-none cursor-pointer p-0 text-left">
                        {l.label}
                      </button>
                    ) : (
                      // Scroll to section
                      <button onClick={() => scrollTo(l.id)}
                        className="text-sm text-slate-400 hover:text-orange-400 transition-colors bg-transparent border-none cursor-pointer p-0 text-left">
                        {l.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-5 py-5 flex flex-col sm:flex-row items-center justify-center">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} Gran Toro Oro Trading Corporation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}