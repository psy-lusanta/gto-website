import { useNavigate } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, ExternalLink} from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import GTOLogoWhite from "../logo/gto-logo-white.png";
import GTOLogoDark  from "../logo/gto-logo-no-bg.png";

const quickLinks = [
  { label: "Home",       path: "/" },
  { label: "Shop",       path: "/shop" },
  { label: "News",       path: "/news" },
  { label: "About Us",   path: "/about" },
  { label: "Careers",    path: "/careers" },
  { label: "Contact Us", path: "/contact" },
];

const policies = [
  { label: "Terms of Service",  path: "/terms-and-conditions" },
  { label: "Privacy Policy",    path: "/privacy-policy" },
  { label: "Refund Policy",     path: "/refund-policy" },
  { label: "FAQ",               path: "/faq" },
  { label: "Become a Reseller", href: "https://gtotrading.com.ph/become-a-seller" },
];

const socials = [
  { label: "Facebook",  href: "https://www.facebook.com/GTOPortalPhilippines", icon: FaFacebookF,  color: "hover:bg-blue-600 hover:border-blue-600" },
  { label: "Instagram", href: "#",                                              icon: FaInstagram, color: "hover:bg-pink-600 hover:border-pink-600" },
  { label: "YouTube",   href: "#",                                              icon: FaYoutube,   color: "hover:bg-red-600 hover:border-red-600" },
  { label: "Twitter",   href: "#",                                              icon: FaTwitter,   color: "hover:bg-sky-500 hover:border-sky-500" },
];

export default function Footer() {
  const navigate  = useNavigate();
  const { theme } = useTheme();

  return (
    <footer className="bg-[#f7f2e4] dark:bg-[#060508] border-t border-[#e8dfc8] dark:border-white/10 transition-colors duration-300">

      {/* ── Main footer ── */}
      <div className="max-w-6xl mx-auto px-5 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <button onClick={() => navigate("/")}
              className="bg-transparent border-none cursor-pointer p-0 mb-5 block">
              <img src={theme === "dark" ? GTOLogoWhite : GTOLogoDark} alt="GTO" className="h-10 w-auto object-contain" />
            </button>

            <p className="text-[#6b5d3f] dark:text-slate-400 text-sm leading-relaxed mb-6">
              Gran Toro Oro Trading Corporation — your trusted partner for automotive, motorcycle, industrial, and commercial products since the 1970s.
            </p>

            {/* Social icons */}
            <div className="flex gap-2 flex-wrap">
              {socials.map(s => {
                const Icon = s.icon;
                return (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                    className={`w-9 h-9 rounded-xl bg-white dark:bg-white/5 border border-[#e8dfc8] dark:border-white/10 flex items-center justify-center text-[#6b5d3f] dark:text-slate-400 hover:text-white transition-all duration-200 ${s.color}`}>
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Contact info */}
          <div>
            <p className="text-xs font-bold tracking-[.2em] uppercase text-[#9a8a64] dark:text-slate-500 mb-4">Contact</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-[#6b5d3f] dark:text-slate-400">
                <MapPin size={14} className="text-orange-600 dark:text-orange-500 mt-0.5 shrink-0" />
                <span>#12 Kabignayan St., Doña Josefa, Quezon City</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#6b5d3f] dark:text-slate-400">
                <Phone size={14} className="text-orange-600 dark:text-orange-500 shrink-0" />
                <span>(02) 8-7118005 | 09688996697</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#6b5d3f] dark:text-slate-400">
                <Mail size={14} className="text-orange-600 dark:text-orange-500 shrink-0" />
                <span>info@gtotrading.com.ph</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#6b5d3f] dark:text-slate-400">
                <Clock size={14} className="text-orange-600 dark:text-orange-500 shrink-0" />
                <span>Mon–Sat, 7:00 AM – 5:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-bold tracking-[.2em] uppercase text-[#9a8a64] dark:text-slate-500 mb-4">Quick Links</p>
            <ul className="space-y-2.5">
              {quickLinks.map(l => (
                <li key={l.label}>
                  <button onClick={() => { navigate(l.path); window.scrollTo(0, 0); }}
                    className="text-sm text-[#6b5d3f] dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors bg-transparent border-none cursor-pointer p-0 text-left">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <p className="text-xs font-bold tracking-[.2em] uppercase text-[#9a8a64] dark:text-slate-500 mb-4">Policies</p>
            <ul className="space-y-2.5">
              {policies.map(l => (
                <li key={l.label}>
                  {l.href ? (
                    <a href={l.href} target="_blank" rel="noreferrer"
                      className="text-sm text-[#6b5d3f] dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors no-underline">
                      {l.label}
                    </a>
                  ) : (
                    <button onClick={() => { navigate(l.path); window.scrollTo(0, 0); }}
                      className="text-sm text-[#6b5d3f] dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors bg-transparent border-none cursor-pointer p-0 text-left">
                      {l.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#e8dfc8] dark:border-white/10">
        <div className="max-w-6xl mx-auto px-5 py-5 flex flex-col sm:flex-row items-center justify-center gap-3">
          <p className="text-[#9a8a64] dark:text-slate-600 text-xs">
            © {new Date().getFullYear()} Gran Toro Oro Trading Corporation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}