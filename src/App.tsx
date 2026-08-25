import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import {
  Milestone,
  X,
  ExternalLink,
  Eye,
  Rocket,
  Target,
  Code2,
  Heart,
  UserCog,
  ShieldCheck,
  Infinity as InfinityIcon,
  Sparkles,
  Quote,
  Shuffle,
  Grid3x3,
  Moon,
  Palette,
} from "lucide-react";

/* ============================== ICONS ============================== */
function TikTokIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.37v12.67a2.89 2.89 0 0 1-2.89 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.29 0 .57.04.84.12V8.32a6.21 6.21 0 0 0-.84-.06A6.25 6.25 0 1 0 12.82 14.5V8.66a8.07 8.07 0 0 0 4.74 1.52V6.81a4.85 4.85 0 0 1-1.97-.12Z" />
    </svg>
  );
}

/* ============================== TOAST ============================== */
const ToastContext = createContext<((message: string) => void) | null>(null);
const useToast = () => useContext(ToastContext);

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{ message: string; closing: boolean } | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback((fade = true) => {
    if (fade) {
      setToast((t) => (t ? { ...t, closing: true } : t));
      window.setTimeout(() => setToast(null), 300);
    } else {
      setToast(null);
    }
  }, []);

  const showToast = useCallback(
    (message: string) => {
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
      setToast({ message, closing: false });
      hideTimer.current = window.setTimeout(() => dismiss(true), 3000);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm text-center">
          <div
            className={`glass-card glow-gold rounded-2xl px-5 py-4 backdrop-blur-xl flex items-center justify-center gap-2.5 text-center transition-all duration-300 ${
              toast.closing ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0 animate-pop-in"
            }`}
          >
            <span className="font-heading font-bold text-gold-gradient shrink-0">A&amp;V</span>
            <span className="text-white/30 shrink-0">◆</span>
            <span className="text-white/85 text-sm font-medium flex-1">{toast.message}</span>
            <button
              onClick={() => dismiss(true)}
              className="shrink-0 grid place-items-center h-7 w-7 rounded-full bg-white/5 hover:bg-white/10 text-white/60 transition-colors"
              aria-label="Tutup"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

/* ============================== PARTICLE BG ============================== */
function ParticleBackground({ density = 18 }: { density?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: density }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 5 + 2,
        delay: Math.random() * 9,
        duration: Math.random() * 8 + 7,
        cyan: Math.random() > 0.5,
      })),
    [density]
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-40" />
      <div className="absolute -top-40 -left-40 w-[36rem] h-[36rem] rounded-full bg-[#00F2FE]/10 blur-[120px] animate-float-slow" />
      <div className="absolute -bottom-40 -right-40 w-[40rem] h-[40rem] rounded-full bg-[#FF2A85]/10 blur-[130px] animate-float-slow" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/3 left-1/2 w-[28rem] h-[28rem] rounded-full bg-[#D4AF37]/10 blur-[120px] animate-float-slow" style={{ animationDelay: "4s" }} />
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full animate-float-slow"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.cyan ? "#00F2FE" : "#D4AF37",
            boxShadow: `0 0 ${p.size * 3}px ${p.cyan ? "rgba(0,242,254,0.7)" : "rgba(212,175,55,0.7)"}`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ============================== GLOBAL BG ============================== */
function GlobalBackground({ mode }: { mode: string }) {
  const dust = useMemo(
    () =>
      Array.from({ length: 42 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 4 + 1.5,
        delay: Math.random() * 10,
        duration: Math.random() * 10 + 8,
      })),
    []
  );
  if (mode === "dark") {
    return (
      <div className="fixed inset-0 -z-10 bg-[#090D16]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#090D16_85%)]" />
      </div>
    );
  }
  if (mode === "gold") {
    return (
      <div className="fixed inset-0 -z-10 bg-[#090D16] overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-[#D4AF37]/[0.05] blur-[140px]" />
        {dust.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full animate-float-slow"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: "#D4AF37",
              boxShadow: "0 0 8px rgba(212,175,55,0.7)",
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              opacity: 0.7,
            }}
          />
        ))}
      </div>
    );
  }
  return (
    <div className="fixed inset-0 -z-10 bg-[#090D16] overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-[0.08]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60rem] h-[36rem] rounded-full bg-[#00F2FE]/[0.05] blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[40rem] h-[30rem] rounded-full bg-[#FF2A85]/[0.04] blur-[150px]" />
    </div>
  );
}

/* ============================== CURSOR SPOTLIGHT ============================== */
function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia || !window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;
    let raf: number;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    const loop = () => {
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      el.style.transform = `translate(${cx}px, ${cy}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={ref} className="pointer-events-none fixed top-0 left-0 z-0 hidden md:block" style={{ willChange: "transform" }}>
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "30rem",
          height: "30rem",
          background: "radial-gradient(circle, rgba(212,175,55,0.10) 0%, rgba(0,242,254,0.06) 38%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}

/* ============================== BG SWITCHER ============================== */
const BG_MODES = [
  { id: "grid", label: "Cyber Grid", icon: Grid3x3 },
  { id: "gold", label: "Gold Dust", icon: Sparkles },
  { id: "dark", label: "Minimalist", icon: Moon },
];
function BackgroundSwitcher({ mode, setMode }: { mode: string; setMode: (m: string) => void }) {
  const [open, setOpen] = useState(false);
  const ActiveIcon = BG_MODES.find((m) => m.id === mode)?.icon ?? Palette;
  return (
    <div className="fixed bottom-5 left-4 z-50 flex flex-col items-start">
      {open && (
        <div className="mb-2 glass-card glow-cyan rounded-2xl p-2 flex flex-col gap-1 animate-pop-in w-44">
          <div className="px-2 pt-1 pb-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">Background Mode</div>
          {BG_MODES.map((m) => {
            const Icon = m.icon;
            const active = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => { setMode(m.id); setOpen(false); }}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition-all ${active ? "btn-gold" : "text-white/70 hover:bg-white/5"}`}
              >
                <Icon className="h-4 w-4" /> {m.label}
              </button>
            );
          })}
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Ganti background"
        className="glass-card glow-cyan rounded-full h-11 w-11 grid place-items-center text-cyan-neon hover:scale-105 transition-transform"
      >
        <ActiveIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

/* ============================== STATUS BAR ============================== */
function StatusBar() {
  return (
    <div className="relative z-50 bg-black/70 backdrop-blur-md border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-9 items-center justify-between text-[10px] sm:text-xs font-mono tracking-wider uppercase">
          <div className="flex items-center gap-2 text-emerald-300/90">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-pulse-dot" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-emerald-300/90">AV Studio Production <span className="text-white/30">•</span> System Online &amp; Operational</span>
          </div>
          <div className="hidden sm:block text-gold-gradient font-semibold">Established: September 07, 2024</div>
          <div className="sm:hidden text-gold-gradient font-semibold">EST. 07-09-2024</div>
        </div>
      </div>
    </div>
  );
}

/* ============================== NAVBAR ============================== */
const NAV_LINKS = [
  { label: "Tentang", href: "#tentang" },
  { label: "Filosofi", href: "#filosofi" },
  { label: "Nilai Utama", href: "#nilai" },
  { label: "Kutipan", href: "#kutipan" },
  { label: "Kontak", href: "#kontak" },
];
function Navbar({ onOpenContact }: { onOpenContact: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`sticky top-0 z-40 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`glass-card rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between transition-all duration-500 ${scrolled ? "glow-gold" : ""}`}>
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative grid place-items-center h-10 w-10 rounded-xl bg-gradient-to-br from-[#F7E08A] via-[#D4AF37] to-[#B8860B] text-[#090D16] font-heading font-extrabold text-lg shadow-[0_0_22px_rgba(212,175,55,0.55)]">AV</div>
            <div className="leading-tight">
              <div className="font-heading text-base sm:text-lg font-bold tracking-[0.2em] text-gold-gradient">AV STUDIO</div>
              <div className="font-mono text-[9px] tracking-[0.3em] text-cyan-neon uppercase">Production</div>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="relative text-sm font-medium text-white/70 hover:text-white transition-colors group">
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gradient-to-r from-[#D4AF37] to-[#00F2FE] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={onOpenContact} className="hidden sm:inline-flex items-center gap-2 btn-gold rounded-xl px-4 py-2 text-sm font-semibold">
              <TikTokIcon className="h-4 w-4" /> Official Contact
            </button>
            <button onClick={() => setOpen((v) => !v)} className="lg:hidden grid place-items-center h-10 w-10 rounded-xl glass-card text-white/80" aria-label="Menu">
              <span className="text-lg">{open ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
        {open && (
          <div className="lg:hidden mt-2 glass-card rounded-2xl p-4 animate-fade-up">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-xl text-sm text-white/80 hover:bg-white/5 hover:text-white transition-colors">{l.label}</a>
              ))}
              <button onClick={() => { setOpen(false); onOpenContact(); }} className="mt-2 inline-flex items-center justify-center gap-2 btn-gold rounded-xl px-4 py-2.5 text-sm font-semibold">
                <TikTokIcon className="h-4 w-4" /> Official Contact
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

/* ============================== HERO ============================== */
function Hero() {
  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center overflow-hidden">
      <ParticleBackground density={22} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#090D16]/40 via-transparent to-[#090D16]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-cyan-neon animate-fade-up">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00F2FE] shadow-[0_0_10px_#00F2FE]" />
            Official Parent Brand &amp; Studio Landing Page
          </div>
          <h1 className="mt-7 font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="text-white">Elevating Visual Quality &amp; </span>
            <span className="text-gold-gradient">Human Consciousness</span>
            <span className="text-white"> Beyond Boundaries</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base sm:text-lg text-white/65 font-display leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Induk entitas inovasi teknologi visual modern, riset AI enhancement, dan harmoni logika serta karya.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <a href="#filosofi" className="btn-gold rounded-xl px-7 py-3.5 text-sm font-semibold inline-flex items-center justify-center gap-2">Jelajahi Profil Studio <span aria-hidden>→</span></a>
            <a href="#visi" className="btn-outline-cyan rounded-xl px-7 py-3.5 text-sm font-semibold inline-flex items-center justify-center gap-2">Lihat Visi Kami</a>
          </div>
          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs font-mono uppercase tracking-wider text-white/40 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <span>AI Enhancement R&amp;D</span><span className="text-[#D4AF37]">◆</span>
            <span>Visual Reconstruction</span><span className="text-[#00F2FE]">◆</span>
            <span>Creator Empowerment</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-[#D4AF37] to-transparent" />
      </div>
    </section>
  );
}

/* ============================== MILESTONE MODAL ============================== */
const FOUNDED = new Date("2024-09-07T00:00:00");
const daysSince = () => Math.max(0, Math.floor((new Date().getTime() - FOUNDED.getTime()) / 86400000));
const MILESTONES = [
  { date: "07 September 2024", title: "Pendirian AV Studio", desc: "ADVIK OWNER meresmikan lahirnya induk entitas inovasi teknologi visual & AI enhancement.", accent: "text-gold-gradient", dot: "bg-[#D4AF37]" },
  { date: "Q4 2024", title: "Fase Riset Awal", desc: "Eksplorasi mendalam pada media quality enhancement dan rekonstruksi detail visual.", accent: "text-cyan-neon", dot: "bg-[#00F2FE]" },
  { date: "100 Hari Inovasi", title: "Eksperimen Rekonstruksi", desc: "Pengujian algoritma rekonstruksi visual yang alami, presisi, dan efisien.", accent: "text-rose-neon", dot: "bg-[#FF2A85]" },
  { date: "2025", title: "Ekspansi Tools & Workflow", desc: "Demokratisasi media beresolusi tinggi dan optimasi alur kerja kreator global.", accent: "text-gold-gradient", dot: "bg-[#D4AF37]" },
  { date: "Kini", title: "Induk Brand & Studio", desc: "AV Studio berdiri sebagai parent brand resmi dengan ekosistem karya berkelas dunia.", accent: "text-cyan-neon", dot: "bg-[#00F2FE]" },
];
function MilestoneModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onClose]);
  if (!open) return null;
  const days = daysSince();
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md animate-fade-up" onClick={onClose} />
      <div className="relative w-full max-w-lg glass-card glow-gold rounded-3xl p-7 sm:p-9 animate-pop-in max-h-[85vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 grid place-items-center h-9 w-9 rounded-full bg-white/5 hover:bg-white/10 text-white/70 transition-colors" aria-label="Tutup">
          <X className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-3">
          <div className="grid place-items-center h-11 w-11 rounded-2xl bg-gradient-to-br from-[#F7E08A] to-[#B8860B] text-[#090D16]">
            <Milestone className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold text-gold-gradient">Milestones A &amp; V</h3>
            <p className="font-mono text-[10px] uppercase tracking-wider text-white/45">{days.toLocaleString("id-ID")} Hari Perjalanan Inovasi</p>
          </div>
        </div>
        <div className="mt-7 relative pl-6">
          <div className="absolute left-[7px] top-1 bottom-1 w-px bg-gradient-to-b from-[#D4AF37] via-[#00F2FE] to-[#FF2A85]" />
          <ul className="space-y-6">
            {MILESTONES.map((m, i) => (
              <li key={i} className="relative">
                <span className={`absolute -left-[22px] top-1 h-3.5 w-3.5 rounded-full ${m.dot} ring-4 ring-[#090D16]`} />
                <div className="font-mono text-[10px] uppercase tracking-wider text-white/40">{m.date}</div>
                <div className={`mt-1 font-heading text-base font-bold ${m.accent}`}>{m.title}</div>
                <p className="mt-1 text-sm text-white/60 leading-relaxed">{m.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ============================== ABOUT FILOSOFI ============================== */
function AboutFilosofi() {
  const [milestoneOpen, setMilestoneOpen] = useState(false);
  return (
    <section id="filosofi" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-[0.07]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-neon">About Us &amp; Filosofi Nama</div>
            <h2 className="mt-4 font-heading text-3xl sm:text-5xl font-bold leading-tight">
              <span className="text-white">The Origin &amp; Heart of </span><span className="text-gold-gradient">AV Studio</span>
            </h2>
            <p className="mt-5 font-display text-lg sm:text-xl text-white/60 italic">Lahir pada 07 September 2024 dari Sintesis Logika dan Inspirasi.</p>
            <div className="mt-10 flex gap-5">
              <div className="flex-1 glass-card glow-gold rounded-2xl p-6 text-center">
                <div className="font-heading text-6xl font-extrabold text-gold-gradient">A</div>
                <div className="mt-2 text-xs font-mono uppercase tracking-wider text-white/50">Owner / Pemilik</div>
              </div>
              <div className="flex items-center text-3xl text-[#00F2FE]">+</div>
              <div className="flex-1 glass-card glow-cyan rounded-2xl p-6 text-center">
                <div className="font-heading text-6xl font-extrabold text-cyan-neon">V</div>
                <div className="mt-2 text-xs font-mono uppercase tracking-wider text-white/50">Partner / Inspirasi</div>
              </div>
            </div>
            <button onClick={() => setMilestoneOpen(true)} className="mt-7 btn-outline-cyan rounded-xl px-6 py-3 text-sm font-semibold inline-flex items-center gap-2.5">
              <Milestone className="h-4 w-4" /> Jelajahi Milestones A &amp; V
            </button>
          </div>
          <div className="glass-card rounded-3xl p-8 sm:p-10">
            <p className="text-white/75 leading-relaxed text-base sm:text-lg">
              AV Studio didirikan oleh <span className="text-gold-gradient font-semibold">ADVIK OWNER</span> sebagai bentuk dedikasi tinggi di ekosistem riset &amp; inovasi AI enhancement. Nama <span className="text-cyan-neon font-semibold">"AV Studio"</span> memiliki makna filosofis yang mendalam:
            </p>
            <ul className="mt-6 space-y-5">
              <li className="flex gap-4">
                <span className="mt-1 grid place-items-center h-8 w-8 shrink-0 rounded-lg bg-gradient-to-br from-[#F7E08A] to-[#B8860B] text-[#090D16] font-heading font-extrabold">A</span>
                <p className="text-white/70 leading-relaxed">merepresentasikan inisial dari <span className="text-white font-medium">Owner / Pemilik Studio</span> — sosok pengolah logika, pengambil keputusan teknis, dan arsitek utama di balik fondasi studio.</p>
              </li>
              <li className="flex gap-4">
                <span className="mt-1 grid place-items-center h-8 w-8 shrink-0 rounded-lg bg-gradient-to-br from-[#00F2FE] to-[#0a7d8c] text-[#090D16] font-heading font-extrabold">V</span>
                <p className="text-white/70 leading-relaxed">merepresentasikan inisial dari <span className="text-white font-medium">Partner Owner sekaligus kekasih dari Developer</span> — pilar inspirasi, pendamping setia, dan sumber motivasi utama yang melengkapi perjalanan karya ini.</p>
              </li>
            </ul>
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="font-display text-lg italic text-white/80">Kombinasi <span className="text-gold-gradient font-semibold">A</span> &amp; <span className="text-cyan-neon font-semibold">V</span> menyatukan harmoni antara logika teknis dan energi dorongan moral untuk melahirkan standar karya berkelas dunia.</p>
            </div>
          </div>
        </div>
      </div>
      <MilestoneModal open={milestoneOpen} onClose={() => setMilestoneOpen(false)} />
    </section>
  );
}

/* ============================== DAYS COUNTER ============================== */
function calcDays() {
  const ms = new Date().getTime() - FOUNDED.getTime();
  return Math.max(0, Math.floor(ms / 86400000));
}
function DaysCounter() {
  const [days, setDays] = useState(calcDays());
  useEffect(() => {
    const id = setInterval(() => setDays(calcDays()), 60000);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D4AF37]/[0.04] to-transparent" />
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-neon">Live Counter</div>
        <h3 className="mt-4 font-heading text-2xl sm:text-3xl font-semibold text-white/80">Hari Perjalanan Inovasi &amp; Dedikasi AV Studio</h3>
        <div className="mt-10 inline-flex flex-col items-center">
          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-[#D4AF37]/15 blur-3xl" />
            <div className="relative glass-card glow-gold rounded-3xl px-10 sm:px-16 py-8">
              <div key={days} className="font-heading text-7xl sm:text-8xl lg:text-9xl font-extrabold text-gold-gradient tabular-nums animate-pop-in">{days.toLocaleString("id-ID")}</div>
              <div className="mt-2 font-mono text-sm uppercase tracking-[0.3em] text-white/50">Hari Sejak 07 September 2024</div>
            </div>
          </div>
        </div>
        <p className="mt-8 max-w-2xl mx-auto text-white/55 font-display text-lg">Setiap hari adalah langkah baru dalam riset, eksperimen, dan harmoni antara logika teknis serta karya kreatif.</p>
      </div>
    </section>
  );
}

/* ============================== VISI MISI ============================== */
const VISI_CARDS = [
  { id: "visi", icon: Eye, tag: "Visi", title: "VISI", body: "Menjadi pelopor dan standar utama dalam ekosistem AI media quality enhancement yang cepat, presisi, dan dapat diakses oleh seluruh kreator global.", glow: "glow-gold", accent: "text-gold-gradient" },
  { id: "misi", icon: Rocket, tag: "Misi", title: "MISI", body: "Memformulasikan rekaan rekonstruksi detail visual yang alami, mendemokratisasi kualitas media beresolusi tinggi, serta mengoptimalkan efisiensi alur kerja kreator.", glow: "glow-cyan", accent: "text-cyan-neon" },
  { id: "tujuan", icon: Target, tag: "Tujuan", title: "TUJUAN", body: "Menjadi empowerment tool (alat pemberdaya) yang mempercepat imajinasi manusia menjadi karya visual nyata bermutu tinggi tanpa menggantikan esensi kreativitas manusia.", glow: "glow-rose", accent: "text-rose-neon" },
];
function VisiMisi() {
  return (
    <section id="visi" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-[0.06]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-neon">Studio Foundation</div>
          <h2 className="mt-4 font-heading text-3xl sm:text-5xl font-bold"><span className="text-white">Visi, Misi, &amp; </span><span className="text-gold-gradient">Tujuan Studio</span></h2>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {VISI_CARDS.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.id} className={`group glass-card ${c.glow} rounded-3xl p-8 animate-border-glow transition-transform duration-500 hover:-translate-y-2`}>
                <div className="flex items-center justify-between">
                  <div className="grid place-items-center h-12 w-12 rounded-2xl bg-white/5 border border-white/10"><Icon className={`h-6 w-6 ${c.accent}`} /></div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">{c.tag}</span>
                </div>
                <h3 className={`mt-6 font-heading text-2xl font-bold ${c.accent}`}>{c.title}</h3>
                <p className="mt-4 text-white/65 leading-relaxed">{c.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================== FOUNDER NOTES ============================== */
function FounderNotes() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00F2FE]/[0.03] to-transparent" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-neon">Dual Founder Note</div>
          <h2 className="mt-4 font-heading text-3xl sm:text-5xl font-bold"><span className="text-white">Refleksi Dari Dua </span><span className="text-gold-gradient">Pilar Studio</span></h2>
        </div>
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          <div className="glass-card glow-gold rounded-3xl p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute -top-8 -right-6 font-heading text-[9rem] font-extrabold text-white/[0.04] leading-none select-none">A</div>
            <div className="relative">
              <div className="flex items-center gap-4">
                <div className="grid place-items-center h-14 w-14 rounded-2xl bg-gradient-to-br from-[#F7E08A] to-[#B8860B] text-[#090D16]"><Code2 className="h-7 w-7" /></div>
                <div>
                  <div className="font-heading text-xl font-bold text-gold-gradient">A — Founder &amp; Lead Developer</div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-white/45">Logika • Arsitektur • Presisi</div>
                </div>
              </div>
              <p className="mt-6 text-white/70 leading-relaxed">"Setiap baris kode adalah pernyataan dedikasi — menjahit algoritma dengan presisi, merancang arsitektur sistem yang tangguh, dan menempa fondasi teknis yang mampu bertahan melintasi waktu. Passi ini bukan sekadar pekerjaan, melainkan dedikasi tinggi untuk mengejar keunggulan di tiap detail logika."</p>
            </div>
          </div>
          <div className="glass-card glow-cyan rounded-3xl p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute -top-8 -right-6 font-heading text-[9rem] font-extrabold text-white/[0.04] leading-none select-none">V</div>
            <div className="relative">
              <div className="flex items-center gap-4">
                <div className="grid place-items-center h-14 w-14 rounded-2xl bg-gradient-to-br from-[#00F2FE] to-[#0a7d8c] text-[#090D16]"><Heart className="h-7 w-7" /></div>
                <div>
                  <div className="font-heading text-xl font-bold text-cyan-neon">V — Partner &amp; Inspiration</div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-white/45">Estetika • Intuisi • Koneksi</div>
                </div>
              </div>
              <p className="mt-6 text-white/70 leading-relaxed">"Di balik tiap sistem, ada sentuhan estetika dan dukungan moral yang membuat teknologi terasa manusiawi. Intuisi kreatif dan kehadiran setia menjadi sumber motivasi — mengingatkan bahwa karya terbaik lahir dari harmoni antara akal dan hati, antara logika dan koneksi manusia."</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================== CORE VALUES ============================== */
const VALUES = [
  { icon: UserCog, title: "Human-Centric Technology", body: "Manusia sebagai kemudi utama, AI sebagai alat pemberdaya.", accent: "text-gold-gradient", ring: "glow-gold" },
  { icon: ShieldCheck, title: "Integrity & Authenticity", body: "Menghargai keaslian karya dan hak cipta di era digital.", accent: "text-cyan-neon", ring: "glow-cyan" },
  { icon: InfinityIcon, title: "Limitless Innovation", body: "Eksperimen tiada henti pada batas teknologi visual.", accent: "text-rose-neon", ring: "glow-rose" },
  { icon: Sparkles, title: "Empowerment & Impact", body: "Memberi dampak positif dan penyemangat bagi seluruh kreator.", accent: "text-gold-gradient", ring: "glow-gold" },
];
function CoreValues() {
  return (
    <section id="nilai" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-[0.06]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-neon">Studio Core Values</div>
          <h2 className="mt-4 font-heading text-3xl sm:text-5xl font-bold"><span className="text-white">4 Pilar Utama </span><span className="text-gold-gradient">Studio</span></h2>
        </div>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <div key={i} className={`group glass-card ${v.ring} rounded-3xl p-7 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]`}>
                <div className="grid place-items-center h-14 w-14 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform"><Icon className={`h-7 w-7 ${v.accent}`} /></div>
                <h3 className={`mt-6 font-heading text-lg font-bold ${v.accent}`}>{v.title}</h3>
                <p className="mt-3 text-sm text-white/60 leading-relaxed">{v.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================== PERMANENT QUOTE ============================== */
function PermanentQuote() {
  return (
    <section id="kutipan" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00F2FE]/[0.04] to-transparent" />
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="glass-card glow-cyan rounded-[2rem] p-10 sm:p-16 text-center relative overflow-hidden">
          <div className="absolute top-6 left-8 text-[#00F2FE]/20"><Quote className="h-16 w-16" /></div>
          <div className="absolute bottom-6 right-8 text-[#D4AF37]/20 rotate-180"><Quote className="h-16 w-16" /></div>
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-neon">Permanent Quote</div>
          <blockquote className="mt-8 font-display text-2xl sm:text-3xl lg:text-4xl font-medium leading-snug">
            <span className="text-gold-gradient">"Jika AI di ciptakan pintar selayaknya otak manusia, maka kita yang mempunyai kesadaran harusnya bisa lebih pintar dari robot buatan"</span>
          </blockquote>
          <div className="mt-8 inline-flex items-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="font-heading text-lg font-semibold tracking-wider text-white/80">AV Studio</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================== RANDOM QUOTES ============================== */
const QUOTES = [
  { text: "AI adalah cermin peradaban — secerah apa pun ia bersinar, tetap manusia yang memegang cahayanya.", cat: "Dunia AI" },
  { text: "Mesin belajar dari data, manusia belajar dari makna. Keduanya butuh satu sama lain untuk maju.", cat: "Dunia AI" },
  { text: "Inteligensi buatan bukan pengganti kesadaran, melainkan alat untuk memperluasnya.", cat: "Dunia AI" },
  { text: "Kesadaran adalah kompas yang memastikan teknologi tetap berjalan ke arah kemanusiaan.", cat: "Mindset & Kesadaran" },
  { text: "Pikiran yang terbuka adalah ruang tak terbatas bagi setiap kemungkinan baru.", cat: "Mindset & Kesadaran" },
  { text: "Yang membedakan manusia dari mesin bukan kecepatan, melainkan kemampuan untuk bermakna.", cat: "Mindset & Kesadaran" },
  { text: "Setiap baris kode adalah janji — bahwa logika hari ini akan menjadi fondasi karya besok.", cat: "Coding & Logika" },
  { text: "Debugging adalah seni mendengarkan sistem ketika ia berbicara tentang kesalahannya.", cat: "Coding & Logika" },
  { text: "Arsitektur yang baik tidak terlihat — ia hanya membuat semuanya terasa mudah.", cat: "Coding & Logika" },
  { text: "Gagal sekali bukan akhir — ia adalah cetak biru versi diri yang lebih tangguh.", cat: "Ketekunan" },
  { text: "Mereka yang menolak menyerah, menulis ulang batas yang orang lain anggap mustahil.", cat: "Ketekunan" },
  { text: "Konsistensi adalah jembatan antara mimpi dan kenyataan yang nyata.", cat: "Ketekunan" },
];
function RandomQuotes() {
  const [current, setCurrent] = useState(QUOTES[0]);
  const [spin, setSpin] = useState(false);
  const pick = () => {
    setSpin(true);
    let next = current;
    let guard = 0;
    while (next.text === current.text && guard < 12) { next = QUOTES[Math.floor(Math.random() * QUOTES.length)]; guard++; }
    setTimeout(() => { setCurrent(next); setSpin(false); }, 320);
  };
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-neon">Interactive Quote Generator</div>
        <div className="mt-6 min-h-[180px] flex items-center justify-center">
          <div key={current.text} className="glass-card glow-gold rounded-3xl p-8 sm:p-10 animate-pop-in w-full">
            <p className="font-display text-xl sm:text-2xl italic leading-relaxed text-white/85">"{current.text}"</p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1">
              <Sparkles className="h-3.5 w-3.5 text-gold-gradient" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/55">{current.cat}</span>
            </div>
          </div>
        </div>
        <button onClick={pick} disabled={spin} className="mt-8 btn-gold rounded-xl px-7 py-3.5 text-sm font-semibold inline-flex items-center gap-2.5 disabled:opacity-70">
          <Shuffle className={`h-4 w-4 ${spin ? "animate-spin" : ""}`} /> Random Quotes
        </button>
      </div>
    </section>
  );
}

/* ============================== TYPING CREED ============================== */
const CREEDS = [
  "Logika menemukan jalan, inspirasi memberi arti.",
  "Manusia sebagai kemudi utama, AI sebagai alat pemberdaya.",
  "Karya berkelas dunia lahir dari harmoni akal dan hati.",
  "Eksperimen tiada henti pada batas teknologi visual.",
  "Kesadaran adalah kompas yang mengarahkan setiap inovasi.",
  "Integritas karya adalah fondasi di era digital.",
];
function TypingCreed() {
  const [idx, setIdx] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = CREEDS[idx % CREEDS.length];
    if (!deleting && sub === current.length) { const t = setTimeout(() => setDeleting(true), 1700); return () => clearTimeout(t); }
    if (deleting && sub === 0) { setDeleting(false); setIdx((i) => i + 1); return; }
    const t = setTimeout(() => setSub((s) => s + (deleting ? -1 : 1)), deleting ? 32 : 70);
    return () => clearTimeout(t);
  }, [sub, deleting, idx]);
  const current = CREEDS[idx % CREEDS.length];
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D4AF37]/[0.03] to-transparent" />
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-neon">Studio Creed</div>
        <div className="mt-6 font-display text-xl sm:text-2xl lg:text-3xl min-h-[3.5rem] flex items-center justify-center">
          <span className="text-white/85">{current.substring(0, sub)}</span>
          <span className="ml-1 inline-block w-[3px] h-7 sm:h-9 bg-[#D4AF37] animate-pulse-dot align-middle" />
        </div>
      </div>
    </section>
  );
}

/* ============================== DIGITAL STAMP ============================== */
function SparkleBurst({ active }: { active: boolean }) {
  const bits = useMemo(
    () => Array.from({ length: 16 }).map((_, i) => ({ id: i, angle: (i / 16) * Math.PI * 2, dist: 60 + Math.random() * 90, size: Math.random() * 6 + 3, delay: Math.random() * 0.15, cyan: Math.random() > 0.5 })),
    []
  );
  if (!active) return null;
  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center">
      {bits.map((b) => (
        <span key={b.id} className="absolute rounded-full" style={{
          width: `${b.size}px`, height: `${b.size}px`,
          background: b.cyan ? "#00F2FE" : "#D4AF37",
          boxShadow: `0 0 10px ${b.cyan ? "rgba(0,242,254,0.8)" : "rgba(212,175,55,0.8)"}`,
          animation: `sparkOut 0.9s ${b.delay}s cubic-bezier(0.22,1,0.36,1) forwards`,
          ["--tx" as string]: `${Math.cos(b.angle) * b.dist}px`, ["--ty" as string]: `${Math.sin(b.angle) * b.dist}px`,
        }} />
      ))}
      <style>{`@keyframes sparkOut{0%{transform:translate(0,0) scale(1);opacity:1}100%{transform:translate(var(--tx),var(--ty)) scale(0);opacity:0}}`}</style>
    </div>
  );
}
function DigitalStamp() {
  const { showToast } = useToast();
  const [spark, setSpark] = useState(false);
  const trigger = () => { setSpark(true); showToast("A & V — Synergy of Logic and Inspiration"); window.setTimeout(() => setSpark(false), 1000); };
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-[0.05]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] rounded-full bg-[#D4AF37]/[0.06] blur-[120px]" />
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-neon">Digital Stamp &amp; Monogram Credentials</div>
        <button onClick={trigger} className="mt-8 group relative inline-flex items-center justify-center gap-4 sm:gap-8 cursor-pointer" aria-label="A & V Monogram">
          <SparkleBurst active={spark} />
          <span className="font-script text-7xl sm:text-9xl text-gold-gradient leading-none drop-shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-transform group-hover:scale-110">A</span>
          <span className="font-heading text-4xl sm:text-5xl text-white/30">&amp;</span>
          <span className="font-script text-7xl sm:text-9xl text-cyan-neon leading-none drop-shadow-[0_0_30px_rgba(0,242,254,0.4)] transition-transform group-hover:scale-110">V</span>
        </button>
        <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">Klik monogram untuk merasakan sinergi</div>
        <div className="mt-12 flex justify-center">
          <button onClick={trigger} className="relative group cursor-pointer" aria-label="AV Official Seal">
            <SparkleBurst active={spark} />
            <div className="absolute -inset-3 rounded-full bg-[#D4AF37]/15 blur-2xl group-hover:bg-[#D4AF37]/25 transition-colors" />
            <div className="relative glass-card glow-gold rounded-full w-72 h-72 sm:w-80 sm:h-80 grid place-items-center p-8 animate-border-glow group-hover:scale-105 transition-transform duration-500">
              <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full animate-[spin_22s_linear_infinite]">
                <defs><path id="stampCircle" d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" /></defs>
                <text className="fill-[#D4AF37] font-mono" style={{ fontSize: "11px", letterSpacing: "3px" }}>
                  <textPath href="#stampCircle" startOffset="0%">VERIFIED OFFICIAL STUDIO • ADVIK OWNER • ALL RIGHTS RESERVED •</textPath>
                </text>
              </svg>
              <div className="relative text-center">
                <div className="font-heading text-3xl font-extrabold text-gold-gradient">AV</div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-white/50">Verified</div>
                <div className="mt-3 h-px w-16 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-neon">Official Seal</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ============================== FOOTER ============================== */
function Footer({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <footer id="kontak" className="relative pt-24 pb-10 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 grid-overlay opacity-[0.05]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12">
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <div className="flex items-center gap-3">
                <div className="grid place-items-center h-11 w-11 rounded-xl bg-gradient-to-br from-[#F7E08A] via-[#D4AF37] to-[#B8860B] text-[#090D16] font-heading font-extrabold text-lg shadow-[0_0_22px_rgba(212,175,55,0.55)]">AV</div>
                <div>
                  <div className="font-heading text-lg font-bold tracking-[0.2em] text-gold-gradient">AV STUDIO</div>
                  <div className="font-mono text-[9px] tracking-[0.3em] text-cyan-neon uppercase">Production</div>
                </div>
              </div>
              <p className="mt-5 text-sm text-white/55 leading-relaxed max-w-xs">Induk entitas inovasi teknologi visual modern, riset AI enhancement, dan harmoni logika serta karya.</p>
            </div>
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">Navigasi</div>
              <ul className="mt-5 space-y-2.5 text-sm">
                {[{ l: "Tentang", h: "#filosofi" }, { l: "Filosofi", h: "#filosofi" }, { l: "Nilai Utama", h: "#nilai" }, { l: "Kutipan", h: "#kutipan" }].map((n) => (
                  <li key={n.l}><a href={n.h} className="text-white/60 hover:text-gold-gradient transition-colors">{n.l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">Official Social Media</div>
              <button onClick={onOpenContact} className="mt-5 inline-flex items-center gap-2.5 btn-gold rounded-xl px-5 py-3 text-sm font-semibold"><TikTokIcon className="h-4 w-4" /> Official Social Media</button>
              <p className="mt-4 text-xs text-white/40">Tiga akun TikTok resmi: Owner, Partner, dan Official Studio Store.</p>
            </div>
          </div>
          <div className="mt-10 pt-7 border-t border-white/10">
            <p className="text-center font-display text-base text-white/75">© 2024 - 2026 AV Studio Production. Designed &amp; Developed by <span className="text-gold-gradient font-semibold">ADVIK OWNER</span>.</p>
            <p className="mt-2 text-center text-xs text-white/45">Seluruh identitas, filosofi, dan aset resmi AV Studio Production dilindungi.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================== CONTACT MODAL ============================== */
const ACCOUNTS = [
  { label: "TIKTOK A (OWNER)", handle: "@dittyz__", url: "https://www.tiktok.com/@dittyz__?_r=1&_t=ZS-997CHOJ64JT", role: "Founder & Lead Developer", accent: "text-gold-gradient", ring: "glow-gold" },
  { label: "TIKTOK V (PARTNER)", handle: "@villyyz__", url: "https://www.tiktok.com/@villyyz__?_r=1&_t=ZS-997CEH0Hj68", role: "Strategic Partner & Inspiration", accent: "text-cyan-neon", ring: "glow-cyan" },
  { label: "TIKTOK OFFICIAL", handle: "@advikstore", url: "https://www.tiktok.com/@advikstore?_r=1&_t=ZS-997CJXcKEYq", role: "AV Studio & ADVIK Store", accent: "text-rose-neon", ring: "glow-rose" },
];
function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md animate-fade-up" onClick={onClose} />
      <div className="relative w-full max-w-lg glass-card glow-gold rounded-3xl p-7 sm:p-9 animate-pop-in">
        <button onClick={onClose} className="absolute top-4 right-4 grid place-items-center h-9 w-9 rounded-full bg-white/5 hover:bg-white/10 text-white/70 transition-colors" aria-label="Tutup"><X className="h-5 w-5" /></button>
        <div className="text-center">
          <div className="inline-grid place-items-center h-14 w-14 rounded-2xl bg-gradient-to-br from-[#F7E08A] to-[#B8860B] text-[#090D16] mx-auto"><TikTokIcon className="h-7 w-7" /></div>
          <h3 className="mt-4 font-heading text-2xl font-bold text-gold-gradient">Official Social Media</h3>
          <p className="mt-2 text-sm text-white/55">Terhubung resmi dengan AV Studio Production melalui akun TikTok resmi.</p>
        </div>
        <div className="mt-7 space-y-4">
          {ACCOUNTS.map((a) => (
            <div key={a.label} className={`glass-card ${a.ring} rounded-2xl p-5 flex items-center gap-4`}>
              <div className="grid place-items-center h-11 w-11 rounded-xl bg-white/5 border border-white/10 shrink-0"><TikTokIcon className="h-5 w-5 text-white" /></div>
              <div className="flex-1 min-w-0">
                <div className={`font-mono text-xs uppercase tracking-wider ${a.accent}`}>{a.label}</div>
                <div className="mt-0.5 text-sm text-white/80 font-medium truncate">{a.handle}</div>
                <div className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5"><span className="text-[10px] font-mono text-white/55">{a.role}</span></div>
              </div>
              <a href={a.url} target="_blank" rel="noopener noreferrer" className="btn-outline-cyan rounded-xl px-3.5 py-2 text-xs font-semibold inline-flex items-center gap-1.5 shrink-0">Kunjungi <ExternalLink className="h-3.5 w-3.5" /></a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================== STYLES (inlined) ============================== */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Great+Vibes&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
.font-heading{font-family:'Cinzel',ui-sans-serif,system-ui,sans-serif;}
.font-display{font-family:'Cormorant Garamond',ui-serif,Georgia,serif;}
.font-script{font-family:'Great Vibes',cursive;}
.font-mono{font-family:'JetBrains Mono',ui-monospace,monospace;}
.text-gold-gradient{background:linear-gradient(135deg,#F7E08A 0%,#D4AF37 45%,#B8860B 75%,#FFF0B3 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;}
.text-cyan-neon{color:#00F2FE;text-shadow:0 0 14px rgba(0,242,254,0.55);}
.text-rose-neon{color:#FF2A85;text-shadow:0 0 14px rgba(255,42,133,0.5);}
.glass-card{background:linear-gradient(160deg,rgba(255,255,255,0.06) 0%,rgba(255,255,255,0.02) 100%);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,0.09);}
.glow-gold{box-shadow:0 0 0 1px rgba(212,175,55,0.35),0 0 28px rgba(212,175,55,0.25),inset 0 0 22px rgba(212,175,55,0.06);}
.glow-cyan{box-shadow:0 0 0 1px rgba(0,242,254,0.35),0 0 28px rgba(0,242,254,0.22),inset 0 0 22px rgba(0,242,254,0.06);}
.glow-rose{box-shadow:0 0 0 1px rgba(255,42,133,0.35),0 0 28px rgba(255,42,133,0.22),inset 0 0 22px rgba(255,42,133,0.06);}
.btn-gold{background:linear-gradient(135deg,#F7E08A 0%,#D4AF37 50%,#B8860B 100%);color:#090D16;box-shadow:0 0 22px rgba(212,175,55,0.4),inset 0 1px 0 rgba(255,255,255,0.4);transition:all 0.35s cubic-bezier(0.22,1,0.36,1);}
.btn-gold:hover{box-shadow:0 0 38px rgba(212,175,55,0.7),inset 0 1px 0 rgba(255,255,255,0.5);transform:translateY(-2px);}
.btn-outline-cyan{border:1px solid rgba(0,242,254,0.55);color:#00F2FE;background:rgba(0,242,254,0.04);transition:all 0.35s cubic-bezier(0.22,1,0.36,1);}
.btn-outline-cyan:hover{background:rgba(0,242,254,0.12);box-shadow:0 0 26px rgba(0,242,254,0.45);transform:translateY(-2px);}
.grid-overlay{background-image:linear-gradient(rgba(0,242,254,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,242,254,0.06) 1px,transparent 1px);background-size:54px 54px;}
.animate-pulse-dot{animation:pulseDot 1.6s ease-in-out infinite;}
.animate-border-glow{animation:borderGlow 3.5s ease-in-out infinite;}
.animate-float-slow{animation:floatSlow 9s ease-in-out infinite;}
.animate-fade-up{animation:fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both;}
.animate-pop-in{animation:popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both;}
@keyframes pulseDot{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(34,197,94,0.7);}50%{opacity:0.6;box-shadow:0 0 0 8px rgba(34,197,94,0);}}
@keyframes borderGlow{0%,100%{box-shadow:0 0 0 1px rgba(212,175,55,0.3),0 0 22px rgba(212,175,55,0.18);}50%{box-shadow:0 0 0 1px rgba(0,242,254,0.4),0 0 30px rgba(0,242,254,0.22);}}
@keyframes floatSlow{0%,100%{transform:translateY(0) translateX(0);}50%{transform:translateY(-18px) translateX(8px);}}
@keyframes fadeUp{from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);}}
@keyframes popIn{from{opacity:0;transform:scale(0.92) translateY(10px);}to{opacity:1;transform:scale(1) translateY(0);}}
html{scroll-behavior:smooth;}
::-webkit-scrollbar{width:10px;}
::-webkit-scrollbar-track{background:#090D16;}
::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#D4AF37,#00F2FE);border-radius:8px;}
`;

/* ============================== APP ============================== */
export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [bgMode, setBgMode] = useState("grid");
  const openContact = () => setContactOpen(true);

  return (
    <ToastProvider>
      <style>{STYLES}</style>
      <div className="relative min-h-screen text-white overflow-x-hidden bg-[#090D16]">
        <GlobalBackground mode={bgMode} />
        <CursorSpotlight />
        <StatusBar />
        <Navbar onOpenContact={openContact} />
        <main className="relative z-10">
          <Hero />
          <AboutFilosofi />
          <DaysCounter />
          <VisiMisi />
          <FounderNotes />
          <CoreValues />
          <PermanentQuote />
          <RandomQuotes />
          <TypingCreed />
          <DigitalStamp />
        </main>
        <Footer onOpenContact={openContact} />
        <BackgroundSwitcher mode={bgMode} setMode={setBgMode} />
        <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      </div>
    </ToastProvider>
  );
}
