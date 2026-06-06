import { useState } from "react";
import { Briefcase, Upload, Calendar, User, Mail, Phone, FileText, ChevronDown, CheckCircle } from "lucide-react";

const positions = [
  "Sales Representative",
  "Warehouse Staff",
  "Delivery Driver",
  "Accounting / Finance",
  "Marketing Associate",
  "Customer Service",
  "IT / Web Developer",
  "Operations Assistant",
  "Other / Open Application",
];

const perks = [
  { icon: "💼", title: "Career Growth",     desc: "Clear career paths and promotion opportunities within the company." },
  { icon: "🏥", title: "Health Benefits",   desc: "HMO coverage and government-mandated benefits for all employees." },
  { icon: "🤝", title: "Team Culture",      desc: "Family-oriented environment built on respect and collaboration." },
  { icon: "📍", title: "Quezon City Based", desc: "Conveniently located at #12 Kabignayan St., Doña Josefa, QC." },
];

export default function Careers() {
  const [submitted, setSubmitted] = useState(false);
  const [fileName,  setFileName]  = useState("");
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    position: "", startDate: "", message: "", cv: null,
  });

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleFile = e => {
    const file = e.target.files[0];
    if (file) { setForm(f => ({ ...f, cv: file })); setFileName(file.name); }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="careers" className="py-24 bg-[#08070a]">
      <div className="max-w-6xl mx-auto px-5">

        {/* ── Header ── */}
        <div className="text-center mb-16 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-orange-600" />
            <span className="text-xs font-bold tracking-[.2em] uppercase text-orange-500"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Join Our Team
            </span>
            <div className="w-8 h-px bg-orange-600" />
          </div>
          <h2 className="font-black text-5xl sm:text-6xl lg:text-7xl text-white leading-none mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Build Your Career <br />
            <em className="text-orange-500 not-italic">With GTO</em>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
            We're always looking for passionate, driven individuals to join our growing team.
            Be part of a company with over 50 years of industry experience.
          </p>
        </div>

        {/* ── Perks ── */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {perks.map((p, i) => (
            <div key={p.title}
              className="reveal bg-white/[.03] border border-white/10 rounded-2xl p-5 hover:border-orange-600/40 hover:-translate-y-1 transition-all duration-300"
              style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="text-3xl mb-3">{p.icon}</div>
              <h4 className="font-black text-base text-white mb-1"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                {p.title}
              </h4>
              <p className="text-slate-500 text-xs leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div> */}

        {/* ── Main content: vacancies + form ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left — vacancies info */}
          <div className="reveal">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase size={18} className="text-orange-500" />
              <h3 className="font-black text-3xl text-white"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Available Positions
              </h3>
            </div>

            <div className="space-y-3 mb-10">
              {positions.map((pos, i) => (
                <div key={pos}
                  className="flex items-center gap-3 bg-white/[.03] border border-white/10 rounded-xl px-4 py-3 hover:border-orange-600/30 hover:bg-white/[.05] transition-all duration-200 group">
                  <div className="w-2 h-2 rounded-full bg-orange-600 group-hover:scale-125 transition-transform" />
                  <span className="text-slate-300 text-sm group-hover:text-white transition-colors">{pos}</span>
                </div>
              ))}
            </div>

            {/* Address card */}
            <div className="bg-gradient-to-br from-orange-900/20 to-orange-800/5 border border-orange-600/20 rounded-2xl p-6">
              <p className="text-orange-400 font-bold text-sm mb-3 uppercase tracking-widest"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Our Office
              </p>
              <p className="text-slate-300 text-sm mb-1">📍 #12 Kabignayan St., Doña Josefa, Quezon City</p>
              <p className="text-slate-300 text-sm mb-1">📞 (02) 8-7118005</p>
              <p className="text-slate-300 text-sm">✉️ careers@gtotrading.com.ph</p>
            </div>
          </div>

          {/* Right — application form */}
          <div className="reveal-right">
            <div className="bg-white/[.03] border border-white/10 rounded-3xl p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle size={56} className="text-orange-500 mb-4" />
                  <h3 className="font-black text-3xl text-white mb-2"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    Application Sent!
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                    Thank you for your interest in joining GTO Trading. We'll review your application and get back to you soon.
                  </p>
                  <button onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm text-orange-400 hover:underline bg-transparent border-none cursor-pointer">
                    Submit another application
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-black text-2xl text-white mb-6"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    Submit Your Application
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Name */}
                    <div className="relative">
                      <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                      <input name="name" value={form.name} onChange={handleChange} required
                        placeholder="Full Name"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder:text-slate-500 outline-none focus:border-orange-500 transition-colors" />
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                      <input name="email" type="email" value={form.email} onChange={handleChange} required
                        placeholder="Email Address"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder:text-slate-500 outline-none focus:border-orange-500 transition-colors" />
                    </div>

                    {/* Phone */}
                    <div className="relative">
                      <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                      <input name="phone" type="tel" value={form.phone} onChange={handleChange}
                        placeholder="Phone Number"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder:text-slate-500 outline-none focus:border-orange-500 transition-colors" />
                    </div>

                    {/* Position */}
                    <div className="relative">
                      <Briefcase size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                      <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                      <select name="position" value={form.position} onChange={handleChange} required
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-sm outline-none focus:border-orange-500 transition-colors appearance-none cursor-pointer"
                        style={{ color: form.position ? "#f1f5f9" : "#64748b" }}>
                        <option value="" disabled className="bg-[#0d0b0f] text-slate-400">Position Applying For</option>
                        {positions.map(p => (
                          <option key={p} value={p} className="bg-[#0d0b0f] text-white">{p}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <FileText size={15} className="absolute left-3.5 top-3.5 text-slate-500 pointer-events-none" />
                      <textarea name="message" value={form.message} onChange={handleChange} rows={3}
                        placeholder="Tell us about yourself (optional)"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder:text-slate-500 outline-none focus:border-orange-500 transition-colors resize-none" />
                    </div>

                    {/* CV Upload */}
                    <div>
                      <label className="flex items-center gap-3 bg-white/5 border border-white/10 border-dashed rounded-xl px-4 py-3 cursor-pointer hover:border-orange-500 hover:bg-white/[.07] transition-all group">
                        <Upload size={16} className="text-slate-400 group-hover:text-orange-400 transition-colors shrink-0" />
                        <span className={`text-sm truncate ${fileName ? "text-orange-400" : "text-slate-500"}`}>
                          {fileName || "Attach CV (PDF or Word)"}
                        </span>
                        <input type="file" accept=".pdf,.doc,.docx" onChange={handleFile} className="hidden" />
                      </label>
                    </div>

                    {/* Submit */}
                    <button type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-700 to-orange-400 text-white font-bold text-sm hover:-translate-y-0.5 transition-transform border-none cursor-pointer"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1rem", letterSpacing: "0.05em" }}>
                      SUBMIT APPLICATION
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}