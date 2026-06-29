import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageSquare, User, CheckCircle } from "lucide-react";

const contactInfo = [
  { icon: <MapPin size={20} />, label: "Address", value: "#12 Kabignayan St., Doña Josefa, Quezon City", sub: "Metro Manila, Philippines" },
  { icon: <Phone size={20} />, label: "Phone", value: "(02) 8-7118005", sub: "09688996697 | 09177146697" },
  { icon: <Mail size={20} />, label: "Email", value: "info@gtotrading.com.ph", sub: "We reply within 24 hours" },
  { icon: <Clock size={20} />, label: "Business Hours", value: "Monday – Saturday", sub: "7:00 AM – 5:00 PM" },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = e => { e.preventDefault(); setSubmitted(true); };

  return (
    <section id="contact" className="pb-20 py-10 sm:pb-28 sm:py-10 bg-[#fdfbf3] dark:bg-white/[.02] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-5">

        <div className="text-center mb-16 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#cea14e] " />
            <span className="text-xs font-bold tracking-[.2em] uppercase text-[#cea14e]  dark:text-[#cea14e] "
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Get In Touch
            </span>
            <div className="w-8 h-px bg-[#cea14e]" />
          </div>
          <h2 className="font-black text-5xl sm:text-6xl lg:text-7xl text-[#1c1505] dark:text-white leading-none mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Contact <em className="text-[#cea14e]  dark:text-[#cea14e]  not-italic">GTO Trading</em>
          </h2>
          <p className="text-[#6b5d3f] dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Have a question about our products, pricing, or becoming a reseller? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {contactInfo.map((c, i) => (
            <div key={c.label}
              className="reveal bg-white dark:bg-white/[.03] border border-[#e8dfc8] dark:border-white/10 rounded-2xl p-5 hover:border-yellow-500/60 dark:hover:border-yellow-600/40 hover:-translate-y-1 transition-all duration-300 group shadow-sm dark:shadow-none"
              style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-600/15 border border-yellow-200 dark:border-yellow-600/20 flex items-center justify-center text-yellow-600 dark:text-yellow-400 mb-4 group-hover:bg-yellow-200 dark:group-hover:bg-yellow-600/25 transition-colors">
                {c.icon}
              </div>
              <p className="text-xs font-bold tracking-widest uppercase text-[#9a8a64] dark:text-slate-500 mb-1">{c.label}</p>
              <p className="text-[#1c1505] dark:text-white text-sm font-medium leading-snug">{c.value}</p>
              <p className="text-[#9a8a64] dark:text-slate-500 text-xs mt-0.5">{c.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          <div className="reveal bg-white dark:bg-white/[.03] border border-[#e8dfc8] dark:border-white/10 rounded-3xl p-8 shadow-sm dark:shadow-none">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle size={56} className="text-yellow-500 mb-4" />
                <h3 className="font-black text-3xl text-[#1c1505] dark:text-white mb-2"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  Message Sent!
                </h3>
                <p className="text-[#6b5d3f] dark:text-slate-400 text-sm max-w-xs leading-relaxed">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <button onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm text-yellow-600 dark:text-yellow-400 hover:underline bg-transparent border-none cursor-pointer">
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquare size={18} className="text-yellow-600 dark:text-yellow-500" />
                  <h3 className="font-black text-2xl text-[#1c1505] dark:text-white"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    Send Us a Message
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9a8a64] dark:text-slate-500 pointer-events-none" />
                      <input name="name" value={form.name} onChange={handleChange} required
                        placeholder="Full Name"
                        className="w-full bg-[#faf6ea] dark:bg-white/5 border border-[#e8dfc8] dark:border-white/10 rounded-xl pl-10 pr-4 py-3 text-[#1c1505] dark:text-white text-sm placeholder:text-[#9a8a64] dark:placeholder:text-slate-500 outline-none focus:border-yellow-500 transition-colors" />
                    </div>
                    <div className="relative">
                      <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9a8a64] dark:text-slate-500 pointer-events-none" />
                      <input name="phone" type="tel" value={form.phone} onChange={handleChange}
                        placeholder="Phone Number"
                        className="w-full bg-[#faf6ea] dark:bg-white/5 border border-[#e8dfc8] dark:border-white/10 rounded-xl pl-10 pr-4 py-3 text-[#1c1505] dark:text-white text-sm placeholder:text-[#9a8a64] dark:placeholder:text-slate-500 outline-none focus:border-yellow-500 transition-colors" />
                    </div>
                  </div>

                  <div className="relative">
                    <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9a8a64] dark:text-slate-500 pointer-events-none" />
                    <input name="email" type="email" value={form.email} onChange={handleChange} required
                      placeholder="Email Address"
                      className="w-full bg-[#faf6ea] dark:bg-white/5 border border-[#e8dfc8] dark:border-white/10 rounded-xl pl-10 pr-4 py-3 text-[#1c1505] dark:text-white text-sm placeholder:text-[#9a8a64] dark:placeholder:text-slate-500 outline-none focus:border-yellow-500 transition-colors" />
                  </div>

                  <input name="subject" value={form.subject} onChange={handleChange}
                    placeholder="Subject (e.g. Product Inquiry, Reseller Application)"
                    className="w-full bg-[#faf6ea] dark:bg-white/5 border border-[#e8dfc8] dark:border-white/10 rounded-xl px-4 py-3 text-[#1c1505] dark:text-white text-sm placeholder:text-[#9a8a64] dark:placeholder:text-slate-500 outline-none focus:border-yellow-500 transition-colors" />

                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                    placeholder="Your message..."
                    className="w-full bg-[#faf6ea] dark:bg-white/5 border border-[#e8dfc8] dark:border-white/10 rounded-xl px-4 py-3 text-[#1c1505] dark:text-white text-sm placeholder:text-[#9a8a64] dark:placeholder:text-slate-500 outline-none focus:border-yellow-500 transition-colors resize-none" />

                  <button type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-yellow-700 to-yellow-400 text-white font-bold text-base border-none cursor-pointer hover:-translate-y-0.5 transition-transform"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}>
                    SEND MESSAGE
                  </button>
                </form>
              </>
            )}
          </div>

          <div className="reveal-right flex flex-col gap-5">
            <div className="rounded-2xl overflow-hidden border border-[#e8dfc8] dark:border-white/10 flex-1 min-h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3860.6484257388815!2d121.0064196!3d14.6190929!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b70cf46cc4c3%3A0xfb1321df8902f6d4!2sGRAN%20TORO%20ORO%20TRADING%20CORPORATION!5e0!3m2!1sen!2suk!4v1703478555812!5m2!1sen!2suk"
                width="100%" height="100%" style={{ border: 0, minHeight: "280px" }}
                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="GTO Trading Location" />
            </div>

            <div className="bg-white dark:bg-white/[.03] border border-[#e8dfc8] dark:border-white/10 rounded-2xl p-6 shadow-sm dark:shadow-none">
              <p className="text-xs font-bold tracking-widest uppercase text-[#9a8a64] dark:text-slate-500 mb-4">Follow Us</p>
              <div className="flex flex-wrap gap-3">
                <a href="https://www.facebook.com/GTOPortalPhilippines" target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#faf6ea] dark:bg-white/5 border border-[#e8dfc8] dark:border-white/10 rounded-xl text-[#6b5d3f] dark:text-slate-300 text-sm hover:border-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400 transition-all no-underline">
                  Facebook
                </a>
                <a href="#"
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#faf6ea] dark:bg-white/5 border border-[#e8dfc8] dark:border-white/10 rounded-xl text-[#6b5d3f] dark:text-slate-300 text-sm hover:border-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400 transition-all no-underline">
                  Instagram
                </a>
                <a href="#"
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#faf6ea] dark:bg-white/5 border border-[#e8dfc8] dark:border-white/10 rounded-xl text-[#6b5d3f] dark:text-slate-300 text-sm hover:border-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400 transition-all no-underline">
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}