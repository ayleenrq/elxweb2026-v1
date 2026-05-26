"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Menu,
  X,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ─── Brand Constants ──────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "How We Work", href: "#how-we-work" },
  { label: "Case Studies", href: "#work" },
  { label: "Blog", href: "#blog" },
];

const TICKER_TEXT =
  "AI NATIVE DESIGN · PRODUCT STRATEGY · WEB DEVELOPMENT · BRAND IDENTITY · UX RESEARCH · MCP INTEGRATION · ";

const WORK_CARDS = [
  {
    id: 1,
    tag: "AI Product",
    title: "NeuralDash",
    desc: "AI-powered analytics platform with real-time insights.",
    size: "large",
  },
  {
    id: 2,
    tag: "Brand Identity",
    title: "Lumino Studio",
    desc: "Editorial brand identity for a creative studio.",
    size: "small",
  },
  {
    id: 3,
    tag: "Web App",
    title: "Forma Finance",
    desc: "Clean, accessible fintech dashboard for modern investors.",
    size: "small",
  },
  {
    id: 4,
    tag: "Landing Page",
    title: "Orbit SaaS",
    desc: "High-converting landing page for a B2B SaaS platform.",
    size: "large",
  },
  {
    id: 5,
    tag: "Mobile App",
    title: "Nexus Mobile",
    desc: "Cross-platform mobile experience with native performance.",
    size: "small",
  },
  {
    id: 6,
    tag: "Brand Design",
    title: "Crest Studio",
    desc: "End-to-end brand identity for a growing design studio.",
    size: "small",
  },
];

const SERVICES = [
  { index: "01", name: "AI Product Design" },
  { index: "02", name: "Web Development" },
  { index: "03", name: "Brand Identity" },
  { index: "04", name: "UX / UI Redesign" },
  { index: "05", name: "Project Calculator" },
  { index: "06", name: "MCP Integration" },
];

const MASONRY_CARDS = [
  {
    id: 1,
    image: "https://placehold.co/600x800/1a1a2e/ffffff?text=AI+Analytics",
    title: "AI Analytics",
    tag: "Product Design",
    desc: "AI-powered analytics platform with real-time insights.",
    tall: true,
  },
  {
    id: 2,
    image: "https://placehold.co/600x500/1a1a1a/ffffff?text=Brand+Identity",
    title: "Brand Identity",
    tag: "Creative",
    desc: "Editorial brand identity for a creative studio.",
    tall: false,
  },
  {
    id: 3,
    image: "https://placehold.co/600x850/1a1a1a/ffffff?text=Web+Platform",
    title: "Web Platform",
    tag: "Development",
    desc: "Full-stack web application with modern design.",
    tall: true,
  },
  {
    id: 4,
    image: "https://placehold.co/600x520/1a1a1a/ffffff?text=SaaS+Landing",
    title: "SaaS Landing",
    tag: "UI/UX",
    desc: "High-converting landing page for B2B SaaS.",
    tall: false,
  },
  {
    id: 5,
    image: "https://placehold.co/600x750/1a1a2e/ffffff?text=Mobile+App",
    title: "Mobile App",
    tag: "Product",
    desc: "Cross-platform mobile application with smooth UX.",
    tall: true,
  },
  {
    id: 6,
    image: "https://placehold.co/600x480/1a1a1a/ffffff?text=Dashboard",
    title: "Dashboard",
    tag: "Data Viz",
    desc: "Analytics dashboard with real-time data.",
    tall: false,
  },
];

// const PORTFOLIO_HIGHLIGHT_CARDS = [
//   {
//     id: 1,
//     tags: ["LANDING PAGE", "3 MONTHS"],
//     label: "LANDING PAGE",
//     title: "Saifa — AI Healthcare Platform",
//     desc: "AI-powered patient management and diagnostic tooling.",
//   },
//   {
//     id: 2,
//     tags: ["WEB APP", "4 MONTHS", "AI"],
//     label: "WEB APP",
//     title: "Fundsflow — Investment Platform",
//     desc: "Full-stack SaaS with AI analytics dashboard and real-time portfolio tracking.",
//   },
//   {
//     id: 3,
//     tags: ["MOBILE APP", "2 MONTHS"],
//     label: "MOBILE APP",
//     title: "Upnova — Growth OS",
//     desc: "Founder-focused growth platform with automated reporting and OKR tracking.",
//   },
//   {
//     id: 4,
//     tags: ["BRANDING", "6 WEEKS"],
//     label: "BRANDING",
//     title: "Cichonmeds — Medical Brand",
//     desc: "Brand identity and web presence for a modern medical practice.",
//   },
//   {
//     id: 5,
//     tags: ["DASHBOARD", "3 MONTHS", "AI"],
//     label: "DASHBOARD",
//     title: "Alia — Fintech Dashboard",
//     desc: "Multi-currency wallet and transaction dashboard for Southeast Asia.",
//   },
//   {
//     id: 6,
//     tags: ["CASE STUDY", "5 MONTHS"],
//     label: "CASE STUDY",
//     title: "Resync — Dev Tool",
//     desc: "AI-assisted code review and sync tool for distributed engineering teams.",
//   },
// ];

const CLIENT_LOGOS = [
  {
    id: 1,
    stat: "12+",
    statLabel: "projects delivered",
    name: "NovaTech",
    iconShape: "cloud",
  },
  {
    id: 2,
    stat: "3x",
    statLabel: "conversion uplift",
    name: "Meridian",
    iconShape: "hex",
  },
  {
    id: 3,
    stat: "48h",
    statLabel: "avg. turnaround",
    name: "Galileo",
    iconShape: "globe",
  },
  {
    id: 4,
    stat: "98%",
    statLabel: "client satisfaction",
    name: "LightCore",
    iconShape: "box",
  },
  {
    id: 5,
    stat: "$0→1",
    statLabel: "product launched",
    name: "Vortex AI",
    iconShape: "orb",
  },
  {
    id: 6,
    stat: "40%",
    statLabel: "faster time-to-market",
    name: "GlobalBank",
    iconShape: "hex2",
  },
];

// ─── Shared UI Primitives ─────────────────────────────────────────────────────

function SectionLabel({ text, center }: { text: string; center?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 mb-6 ${center ? "justify-center" : ""}`}
    >
      {!center && (
        <span className="w-1.5 h-1.5 rounded-full bg-[#3B6BF7] inline-block" />
      )}
      {center && (
        <span className="w-1.5 h-1.5 rounded-full bg-[#3B6BF7] inline-block" />
      )}
      <span
        className="text-[11px] tracking-[0.2em] text-[#6B6B6B] uppercase"
        style={{ fontFamily: "var(--font-inter, sans-serif)" }}
      >
        {text}
      </span>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0D0D0D]/80 backdrop-blur-xl border-b border-[#1F1F1F]"
          : "bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="/"
            id="nav-logo"
            className="flex items-center"
            aria-label="eluxspace home"
          >
            <Image
              src="/logo-elux.webp"
              alt="eluxspace logo"
              width={110}
              height={28}
              className="h-auto w-auto"
              priority
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-[13px] text-[#6B6B6B] hover:text-white transition-colors duration-200"
                style={{ fontFamily: "var(--font-inter, sans-serif)" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              id="nav-cta-btn"
              className="hidden md:inline-flex items-center gap-1.5 bg-[#3B6BF7] hover:bg-[#2D5CE8] text-white text-[13px] px-4 py-2 rounded-full transition-colors duration-200"
              style={{ fontFamily: "var(--font-inter, sans-serif)" }}
            >
              Start a Project
            </a>
            <button
              className="md:hidden text-[#6B6B6B] hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-80 border-t border-[#1F1F1F]" : "max-h-0"
        }`}
      >
        <div className="bg-[#0D0D0D] px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[14px] text-[#6B6B6B] hover:text-white transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="inline-flex items-center justify-center bg-[#3B6BF7] text-white text-[13px] px-4 py-2.5 rounded-full mt-2"
          >
            Start a Project
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-16 dot-grid overflow-hidden"
      aria-label="Hero"
    >
      {/* Radial gradient vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(59,107,247,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 50% at 50% 100%, rgba(13,13,13,0.95) 0%, transparent 60%)",
        }}
      />

      {/* Hero Text Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        {/* Label */}
        <div className="flex items-center gap-2 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3B6BF7]" />
          <span
            className="text-[11px] tracking-[0.22em] text-[#6B6B6B] uppercase"
            style={{ fontFamily: "var(--font-inter, sans-serif)" }}
          >
            AI Native Product Designer
          </span>
        </div>

        {/* Heading */}
        <h1
          className="text-[clamp(52px,7vw,88px)] leading-[1.05] mb-8 max-w-4xl"
          style={{
            fontFamily: "Satoshi, sans-serif",
            fontWeight: 500,
            letterSpacing: "-0.02em",
          }}
        >
          We design &amp; build
          <br />
          <span className="text-[#6B6B6B]">AI-native digital</span>
          <br />
          products.
        </h1>

        {/* Subtext */}
        <p
          className="text-[16px] text-[#6B6B6B] leading-relaxed max-w-sm mb-12"
          style={{ fontFamily: "var(--font-inter, sans-serif)" }}
        >
          From strategy to launch — we craft refined, intelligent digital
          experiences that move fast and last long.
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-6 flex-wrap">
          <a
            href="#contact"
            id="hero-cta-primary"
            className="inline-flex items-center gap-2 bg-[#3B6BF7] hover:bg-[#2D5CE8] text-white text-[14px] px-6 py-3 rounded-full transition-all duration-200 group"
            style={{ fontFamily: "var(--font-inter, sans-serif)" }}
          >
            Start a Project
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>
          <a
            href="#work"
            id="hero-cta-secondary"
            className="text-[14px] text-[#6B6B6B] hover:text-white underline-offset-4 hover:underline transition-all duration-200"
            style={{ fontFamily: "var(--font-inter, sans-serif)" }}
          >
            See Our Work
          </a>
        </div>
      </div>

      {/* Hero Video — full width below text */}
      <div className="relative z-10 px-6 lg:px-10 pb-0">
        <div className="w-full max-w-7xl mx-auto rounded-2xl overflow-hidden border border-[#1F1F1F]">
          <video
            src="https://res.cloudinary.com/dzr7pdgsy/video/upload/v1769663848/Elux_Space_mtmnmc.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}

// ─── Marquee ───────────────────────────────────────────────────────────────────

function Marquee() {
  const repeated = Array(4).fill(TICKER_TEXT).join("");

  return (
    <div
      className="border-y border-[#1F1F1F] bg-[#111111] overflow-hidden py-4"
      aria-hidden="true"
    >
      <div className="animate-marquee">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="text-[11px] tracking-[0.25em] text-[#6B6B6B] uppercase whitespace-nowrap pr-8"
            style={{ fontFamily: "var(--font-inter, sans-serif)" }}
          >
            {repeated}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Client Logo Icon ─────────────────────────────────────────────────────────

function LogoIcon({ shape }: { shape: string }) {
  const base = "w-6 h-6 flex items-center justify-center flex-shrink-0";
  if (shape === "cloud")
    return (
      <div className={base}>
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path
            d="M17 18H7C4.8 18 3 16.2 3 14c0-1.9 1.3-3.5 3.1-3.9C6.4 8.3 8 7 10 7c1.8 0 3.4.9 4.3 2.3C16.4 9.7 18 11.4 18 13.5c0 1.2-.5 2.3-1.3 3.1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  if (shape === "hex" || shape === "hex2")
    return (
      <div className={base}>
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path
            d="M12 2L20.5 7v10L12 22 3.5 17V7L12 2z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    );
  if (shape === "globe")
    return (
      <div className={base}>
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M12 3c-2 3-2 6 0 9s2 6 0 9M3 12h18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  if (shape === "box")
    return (
      <div className={base}>
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path
            d="M21 8L12 3 3 8v8l9 5 9-5V8z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M12 3v18M3 8l9 5 9-5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    );
  // orb default
  return (
    <div className={base}>
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

// ─── Client Logos Section ────────────────────────────────────────────────────

function ClientLogos() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollState);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = 240 + 16; // card width + gap
    el.scrollBy({
      left: dir === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="clients"
      className="py-20 lg:py-24 bg-[#0D0D0D]"
      aria-label="Our Partners"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-12">
          <div className="flex-1">
            <h2
              className="text-[clamp(32px,4vw,52px)] leading-[1.1] whitespace-nowrap"
              style={{
                fontFamily: "Satoshi, sans-serif",
                fontWeight: 500,
                letterSpacing: "-0.02em",
              }}
            >
              Trusted by global teams
              <br />
              <span className="text-[#6B6B6B]">who build great products.</span>
            </h2>
          </div>

          {/* Nav Buttons */}
          <div className="flex items-start gap-3 pt-1 sm:pt-2">
            <button
              id="client-logos-prev"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={`w-11 h-11 rounded-full border border-[#3a3a3a] flex items-center justify-center transition-all duration-200 text-white hover:bg-[#3B6BF7] hover:border-[#3B6BF7] ${
                canScrollLeft
                  ? "cursor-pointer opacity-100"
                  : "cursor-not-allowed opacity-30"
              }`}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              id="client-logos-next"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={`w-11 h-11 rounded-full border border-[#3a3a3a] flex items-center justify-center transition-all duration-200 text-white hover:bg-[#3B6BF7] hover:border-[#3B6BF7] ${
                canScrollRight
                  ? "cursor-pointer opacity-100"
                  : "cursor-not-allowed opacity-30"
              }`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable Track — outer clips the scrollbar, inner scrolls */}
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-4 overflow-x-auto pb-4 -mb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {CLIENT_LOGOS.map((client) => (
              <div
                key={client.id}
                id={`client-card-${client.id}`}
                className="relative flex-shrink-0 w-[240px] rounded-2xl border border-[#1F1F1F] bg-[#111111] hover:border-[#2a2a2a] transition-all duration-300 p-6 flex flex-col justify-between group cursor-pointer"
                style={{ minHeight: 200 }}
              >
                {/* Stat — top left */}
                <div>
                  <div
                    className="text-[clamp(28px,3vw,40px)] text-white leading-none mb-1.5"
                    style={{
                      fontFamily: "Satoshi, sans-serif",
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {client.stat}
                  </div>
                  <div
                    className="text-[13px] text-[#6B6B6B]"
                    style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                  >
                    {client.statLabel}
                  </div>
                </div>

                {/* Logo — bottom right */}
                <div className="flex items-center justify-end gap-2 mt-8">
                  <span
                    className="text-[13px] text-[#4a4a4a] group-hover:text-[#6B6B6B] transition-colors duration-200"
                    style={{
                      fontFamily: "var(--font-inter, sans-serif)",
                      fontWeight: 500,
                    }}
                  >
                    {client.name}
                  </span>
                  <span className="text-[#4a4a4a] group-hover:text-[#6B6B6B] transition-colors duration-200">
                    <LogoIcon shape={client.iconShape} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Work Card ────────────────────────────────────────────────────────────────

function WorkCard({ card }: { card: (typeof WORK_CARDS)[number] }) {
  const isLarge = card.size === "large";
  const placeholderColors = [
    "from-[#1a1a2e] to-[#1a1a1a]",
    "from-[#0d1f2d] to-[#1a1a1a]",
    "from-[#1f1a2e] to-[#1a1a1a]",
    "from-[#1a2e20] to-[#1a1a1a]",
  ];
  const gradient = placeholderColors[card.id - 1];

  return (
    <div
      className="group rounded-2xl overflow-hidden bg-[#111111] border border-[#1F1F1F] hover:border-[#2a2a2a] transition-all duration-500 cursor-pointer"
      id={`work-card-${card.id}`}
    >
      {/* Image Area — portrait 9:16 */}
      <div
        className={`bg-gradient-to-br ${gradient} h-96 md:h-[420px] relative overflow-hidden`}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="w-16 h-16 rounded-full border border-white/20" />
          <div className="absolute w-32 h-32 rounded-full border border-white/10" />
          <div className="absolute w-48 h-48 rounded-full border border-white/5" />
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#3B6BF7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Corner arrow */}
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-[#3B6BF7]/20">
          <ArrowUpRight size={14} className="text-[#3B6BF7]" />
        </div>
      </div>

      {/* Card Info */}
      <div className="p-5">
        <span
          className="text-[11px] text-[#6B6B6B] tracking-[0.15em] uppercase mb-2 block"
          style={{ fontFamily: "var(--font-inter, sans-serif)" }}
        >
          {card.tag}
        </span>
        <h3
          className="text-[17px] text-white mb-1.5"
          style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 500 }}
        >
          {card.title}
        </h3>
        <p
          className="text-[13px] text-[#6B6B6B] leading-relaxed"
          style={{ fontFamily: "var(--font-inter, sans-serif)" }}
        >
          {card.desc}
        </p>
      </div>
    </div>
  );
}

// ─── Masonry Grid ─────────────────────────────────────────────────────────────

function MasonryCard({ card }: { card: (typeof MASONRY_CARDS)[number] }) {
  return (
    <div
      className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-[#111111] border border-[#1F1F1F] hover:border-[#2a2a2a] transition-all duration-500 ${
        card.tall ? "aspect-[3/4]" : "aspect-[4/3]"
      }`}
    >
      <img
        src={card.image}
        alt={card.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ borderRadius: "12px" }}
      />
      {/* Title & description BELOW image on dark background */}
      <div className="p-6 bg-[#111111]">
        <span
          className="text-[10px] tracking-[0.2em] text-[#6B6B6B] uppercase mb-1.5 block"
          style={{ fontFamily: "var(--font-inter, sans-serif)" }}
        >
          {card.tag}
        </span>
        <h3
          className="text-[16px] text-white mb-1.5"
          style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 500 }}
        >
          {card.title}
        </h3>
        <p
          className="text-[13px] text-[#a0a0a0] leading-relaxed"
          style={{ fontFamily: "var(--font-inter, sans-serif)" }}
        >
          {card.desc}
        </p>
      </div>
      {/* Hover arrow */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-[#3B6BF7]/30">
        <ArrowUpRight size={14} className="text-white" />
      </div>
    </div>
  );
}

// function MasonryGrid() {
//   return (
//     <section
//       id="masonry"
//       className="border-t border-[#1F1F1F] py-20 lg:py-28"
//       aria-label="Masonry gallery"
//     >
//       <div
//         className="mx-auto px-6 lg:px-10"
//         style={{ maxWidth: "1050px" }}
//       >
//         <SectionLabel text="Featured Work" />
//         <h2
//           className="text-[clamp(32px,4vw,52px)] leading-[1.1] text-center mb-12"
//           style={{
//             fontFamily: "Satoshi, sans-serif",
//             fontWeight: 500,
//             letterSpacing: "-0.02em",
//           }}
//         >
//           Work that ships.
//         </h2>
//         {/* 2-column CSS Grid */}
//         <div
//           className="hidden sm:grid"
//           style={{
//             gridTemplateColumns: "1fr 1fr",
//             gap: "20px",
//           }}
//         >
//           {/* Left column: tall, short, tall */}
//           <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
//             <MasonryCard card={MASONRY_CARDS[0]} />
//             <MasonryCard card={MASONRY_CARDS[1]} />
//             <MasonryCard card={MASONRY_CARDS[2]} />
//           </div>
//           {/* Right column: short, tall, short — offset */}
//           <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "80px" }}>
//             <MasonryCard card={MASONRY_CARDS[3]} />
//             <MasonryCard card={MASONRY_CARDS[4]} />
//             <MasonryCard card={MASONRY_CARDS[5]} />
//           </div>
//         </div>
//         {/* Mobile: single column */}
//         <div className="flex flex-col gap-5 sm:hidden">
//           <MasonryCard card={MASONRY_CARDS[0]} />
//           <MasonryCard card={MASONRY_CARDS[1]} />
//           <MasonryCard card={MASONRY_CARDS[2]} />
//           <MasonryCard card={MASONRY_CARDS[3]} />
//           <MasonryCard card={MASONRY_CARDS[4]} />
//           <MasonryCard card={MASONRY_CARDS[5]} />
//         </div>
//       </div>
//     </section>
//   );
// }

// // ─── Portfolio Highlight ──────────────────────────────────────────────────────

// function PortfolioHighlight() {
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const isDragging = useRef(false);
//   const startX = useRef(0);
//   const scrollLeft = useRef(0);

//   const onMouseDown = (e: React.MouseEvent) => {
//     isDragging.current = true;
//     startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
//     scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
//   };

//   const onMouseMove = (e: React.MouseEvent) => {
//     if (!isDragging.current || !scrollRef.current) return;
//     e.preventDefault();
//     const x = e.pageX - scrollRef.current.offsetLeft;
//     const walk = (x - startX.current) * 1.2;
//     scrollRef.current.scrollLeft = scrollLeft.current - walk;
//   };

//   const onMouseUp = () => {
//     isDragging.current = false;
//   };

//   const onMouseLeave = () => {
//     isDragging.current = false;
//   };

//   return (
//     <section
//       id="portfolio-highlight"
//       className="pt-24 pb-0"
//       aria-label="Portfolio highlight"
//     >
//       {/* Header */}
//       <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-8">
//         <p
//           className="font-mono text-xs text-[#525252] tracking-widest mb-3"
//           style={{ fontFamily: "var(--font-inter, monospace)" }}
//         >
//           // PORTFOLIO_HIGHLIGHT
//         </p>
//         <div className="flex items-end justify-between gap-4">
//           <h2
//             className="text-[clamp(40px,5.5vw,52px)] leading-[1.05]"
//             style={{
//               fontFamily: "Satoshi, sans-serif",
//               fontWeight: 500,
//               letterSpacing: "-0.02em",
//             }}
//           >
//             Work that ships.
//           </h2>
//           <a
//             href="#all-work"
//             className="font-mono text-xs text-[#525252] hover:text-white transition-colors duration-200 whitespace-nowrap"
//             style={{ fontFamily: "var(--font-inter, monospace)" }}
//           >
//             View all work →
//           </a>
//         </div>
//         <p
//           className="text-sm text-[#525252] mt-2"
//           style={{ fontFamily: "var(--font-inter, sans-serif)" }}
//         >
//           Drag to explore — each card opens a full case study.
//         </p>
//       </div>

//       {/* Drag-scroll gallery */}
//       <div
//         ref={scrollRef}
//         onMouseDown={onMouseDown}
//         onMouseMove={onMouseMove}
//         onMouseUp={onMouseUp}
//         onMouseLeave={onMouseLeave}
//         className="flex gap-5 overflow-x-auto scrollbar-hide px-6 lg:px-10 pb-6 cursor-grab select-none"
//         style={{
//           scrollbarWidth: "none",
//           msOverflowStyle: "none",
//           WebkitOverflowScrolling: "touch",
//         }}
//       >
//         {PORTFOLIO_HIGHLIGHT_CARDS.map((card) => (
//           <div
//             key={card.id}
//             className="flex-shrink-0 w-[380px] bg-[#111111] border border-[#1F1F1F] rounded-2xl overflow-hidden p-4 group cursor-pointer hover:border-[#2a2a2a] transition-all duration-300"
//           >
//             {/* Tags */}
//             <div className="flex flex-wrap gap-2 mb-4">
//               {card.tags.map((tag) => (
//                 <span
//                   key={tag}
//                   className="font-mono text-[10px] tracking-widest border border-[#2A2A2A] rounded-full px-3 py-1 text-[#888]"
//                   style={{ fontFamily: "var(--font-inter, monospace)" }}
//                 >
//                   {tag}
//                 </span>
//               ))}
//             </div>

//             {/* Dummy image area */}
//             <div
//               className="rounded-xl aspect-video flex items-center justify-center relative overflow-hidden"
//               style={{
//                 backgroundColor: "#0D1117",
//                 backgroundImage:
//                   "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
//                 backgroundSize: "40px 40px",
//               }}
//             >
//               <span
//                 className="font-mono text-xs tracking-widest text-[#2A2A2A] uppercase"
//                 style={{ fontFamily: "var(--font-inter, monospace)" }}
//               >
//                 {card.label}
//               </span>
//             </div>

//             {/* Text content */}
//             <div className="mt-3">
//               <h3
//                 className="text-lg text-white"
//                 style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 600 }}
//               >
//                 {card.title}
//               </h3>
//               <p
//                 className="text-sm text-[#666] leading-relaxed mt-1 line-clamp-2"
//                 style={{ fontFamily: "var(--font-inter, sans-serif)" }}
//               >
//                 {card.desc}
//               </p>
//               <div className="flex items-center justify-end mt-3">
//                 <ChevronRight size={16} className="text-[#3B6BF7]" />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// ─── Featured Work ────────────────────────────────────────────────────────────

function AINativeSection() {
  const oldWay = [
    {
      label: "Months of planning",
      desc: "Extended timelines before any output",
    },
    {
      label: "Flat conversion rates",
      desc: "Generic templates, no personalization",
    },
    {
      label: "High cost per launch",
      desc: "Large teams, slow iteration cycles",
    },
    {
      label: "Static once shipped",
      desc: "No learning, no optimization post-launch",
    },
  ];

  const newWay = [
    {
      label: "Days to first output",
      desc: "Rapid prototyping with AI-assisted design",
    },
    {
      label: "3x conversion uplift",
      desc: "Personalized, data-driven experiences",
    },
    { label: "40% lower cost", desc: "Lean teams, automated workflows" },
    {
      label: "Self-improving",
      desc: "Built-in analytics and continuous learning",
    },
  ];

  return (
    <section
      id="how-we-work"
      className="py-28 lg:py-36 bg-[#0D0D0D]"
      aria-label="AI-native solution"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Section label */}
        <div className="mb-4">
          <span
            className="text-[11px] tracking-[0.2em] text-[#3B6BF7] uppercase"
            style={{ fontFamily: "var(--font-inter, sans-serif)" }}
          >
            04
          </span>
        </div>

        {/* Heading */}
        <h2
          className="text-[clamp(36px,4vw,60px)] leading-[1.1] mb-4"
          style={{
            fontFamily: "Satoshi, sans-serif",
            fontWeight: 500,
            letterSpacing: "-0.02em",
          }}
        >
          How AI-native solves it.
        </h2>

        {/* Subheading */}
        <p
          className="text-[15px] text-[#6B6B6B] leading-relaxed max-w-2xl mb-16"
          style={{ fontFamily: "var(--font-inter, sans-serif)" }}
        >
          The do-or-die section. Old way vs AI-native way, with concrete
          outcomes. This is the argument for the whole rebrand.
        </p>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Old Way */}
          <div className="rounded-2xl border border-[#1F1F1F] p-8 bg-[#111111] opacity-70 hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-3 mb-8">
              <span
                className="text-[10px] tracking-[0.2em] text-[#6B6B6B] uppercase bg-[#1F1F1F] px-3 py-1 rounded-full"
                style={{ fontFamily: "var(--font-inter, sans-serif)" }}
              >
                Traditional Approach
              </span>
            </div>
            <div className="flex flex-col gap-6">
              {oldWay.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full border border-[#3a3a3a] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3a3a3a]" />
                  </div>
                  <div>
                    <h4
                      className="text-[14px] text-[#888] mb-1"
                      style={{
                        fontFamily: "Satoshi, sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      {item.label}
                    </h4>
                    <p
                      className="text-[12px] text-[#3a3a3a] leading-relaxed"
                      style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI-Native Way */}
          <div className="rounded-2xl border border-[#3B6BF7]/30 bg-[#111111] p-8 relative overflow-hidden">
            {/* Subtle gradient glow */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(59,107,247,0.08) 0%, transparent 70%)",
              }}
            />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <span
                  className="text-[10px] tracking-[0.2em] text-white uppercase bg-[#3B6BF7]/20 px-3 py-1 rounded-full"
                  style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                >
                  AI-Native Approach
                </span>
              </div>
              <div className="flex flex-col gap-6">
                {newWay.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-5 h-5 rounded-full bg-[#3B6BF7] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                      >
                        <path
                          d="M2 5.5L4 7.5L8 3"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4
                        className="text-[14px] text-white mb-1"
                        style={{
                          fontFamily: "Satoshi, sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        {item.label}
                      </h4>
                      <p
                        className="text-[12px] text-[#a0a0a0] leading-relaxed"
                        style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom stat strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mt-16 border border-[#1F1F1F] rounded-2xl overflow-hidden">
          {[
            { stat: "90+", label: "Products shipped" },
            { stat: "3x", label: "Avg. conversion lift" },
            { stat: "40%", label: "Lower launch cost" },
            { stat: "100+", label: "Global clients" },
          ].map((s, i) => (
            <div
              key={i}
              className={`py-8 px-6 text-center ${i !== 0 ? "border-l border-[#1F1F1F]" : ""} ${i >= 2 ? "border-t md:border-t-0 md:border-l border-[#1F1F1F]" : ""}`}
            >
              <div
                className="text-[clamp(28px,3vw,40px)] text-white mb-1 leading-none"
                style={{
                  fontFamily: "Satoshi, sans-serif",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                }}
              >
                {s.stat}
              </div>
              <div
                className="text-[12px] text-[#6B6B6B]"
                style={{ fontFamily: "var(--font-inter, sans-serif)" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Problem To Solution ──────────────────────────────────────────────────────

function ProblemToSolution() {
  const cards = [
    {
      label: "You are short on hands.",
      heading: "You need to ship fast, but your team's at capacity.",
      body: "We step in with clear ownership from UX to build-ready UI. You get focused sprints, fast feedback, and delivery that keeps your roadmap moving without delays.",
      cta: "EXTEND MY TEAM",
    },
    {
      label: "Adoption is slowing down.",
      heading: "You're growing, but UX friction is holding users back.",
      body: "We run an audit to identify what's breaking the experience, then redesign the flows that matter most so users move faster and your product scales cleanly. Less friction, faster adoption, and a UX system your team can build on.",
      cta: "REDESIGN MY PRODUCT",
    },
    {
      label: "You need to launch fast.",
      heading:
        "You need an MVP that's credible enough to launch, sell, or raise.",
      body: "We cut scope to what matters, design for trust, and ship a launch-ready MVP without wasted cycles. Clear UX, solid UI, and build support to get you live.",
      cta: "SHIP MY MVP",
    },
    {
      label: "Credibility is missing.",
      heading:
        "The story is strong, but the product doesn't feel investor-ready.",
      body: "We design the surfaces that signal credibility fast, so you look ready when it counts. You get pitch-ready flows, sharper product pages, and a product experience that feels fundable.",
      cta: "POLISH FOR INVESTORS",
    },
  ];

  return (
    <section
      id="problem-to-solution"
      className="py-28 lg:py-36 bg-[#0D0D0D]"
      aria-label="Problem to Solution"
    >
      <div className="max-w-[900px] mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          {/* Label */}
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B6BF7] inline-block" />
            <span
              className="text-[11px] tracking-[0.2em] text-[#6B6B6B] uppercase"
              style={{ fontFamily: "var(--font-inter, sans-serif)" }}
            >
              PROBLEM TO SOLUTION
            </span>
          </div>

          {/* Heading */}
          <h2
            className="text-[clamp(32px,4vw,52px)] leading-[1.1] mb-6"
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontWeight: 500,
              letterSpacing: "-0.02em",
            }}
          >
            Building Is Hard.
            <br />
            The Right Partner Makes It Simpler and Faster.
          </h2>

          {/* Body */}
          <p
            className="text-[15px] text-[#6B6B6B] leading-relaxed"
            style={{ fontFamily: "var(--font-inter, sans-serif)" }}
          >
            Pick the situation you're in. These are the most common founder
            cases, and the fastest path to get it shipped.
          </p>
        </div>

        {/* Card Stack */}
        <div className="flex flex-col gap-6 lg:gap-10">
          {cards.map((card, i) => (
            <div
              key={i}
              id={`problem-card-${i + 1}`}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 rounded-2xl border border-[#1F1F1F] bg-[#111111] p-6 lg:p-8 hover:border-[#2a2a2a] transition-all duration-300"
            >
              {/* Left Column — Text Content */}
              <div className="flex flex-col justify-between">
                <div>
                  {/* Label */}
                  <span
                    className="text-[11px] tracking-[0.15em] text-[#6B6B6B] uppercase mb-3 block"
                    style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                  >
                    {card.label}
                  </span>

                  {/* Heading */}
                  <h3
                    className="text-[clamp(18px,2vw,24px)] text-white mb-4 leading-tight"
                    style={{
                      fontFamily: "Satoshi, sans-serif",
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {card.heading}
                  </h3>

                  {/* Body */}
                  <p
                    className="text-[14px] text-[#6B6B6B] leading-relaxed"
                    style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                  >
                    {card.body}
                  </p>
                </div>

                {/* CTA Button */}
                <a
                  href="#contact"
                  id={`problem-card-${i + 1}-cta`}
                  className="inline-flex items-center gap-2 mt-6 text-[13px] text-white border border-[#2a2a2a] hover:border-[#3B6BF7] hover:bg-[#3B6BF7]/10 px-5 py-2.5 rounded-full transition-all duration-200 w-fit"
                  style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                >
                  {card.cta}
                  <ArrowUpRight size={13} />
                </a>
              </div>

              {/* Right Column — Video Placeholder */}
              <div className="w-full h-full relative rounded-xl overflow-hidden border border-[#1F1F1F] bg-[#0d0d0d] flex items-center justify-center">
                {/* Background pattern */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                {/* Subtle gradient */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(59,107,247,0.05) 0%, transparent 60%)",
                  }}
                />
                {/* Play button */}
                <div className="relative z-10 w-14 h-14 rounded-full border border-[#2a2a2a] bg-[#1a1a1a] flex items-center justify-center group hover:border-[#3B6BF7] hover:bg-[#3B6BF7]/20 transition-all duration-300 cursor-pointer">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="ml-1"
                  >
                    <path
                      d="M4 2.5L13 8L4 13.5V2.5Z"
                      fill="currentColor"
                      className="text-[#6B6B6B] group-hover:text-white transition-colors duration-300"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Problem → Solution Metrics (Bento Layout) ───────────────────────────────

const METRIC_CARDS = [
  {
    number: "34%",
    label: "Structure Impact",
    desc: "Average clarity score increase in onboarding",
  },
  {
    number: "55%",
    label: "Messaging Lift",
    desc: "Measured improvement in engagement after restructuring narratives",
  },
  {
    number: "89%",
    label: "Access Rate",
    desc: "Our restructured onboarding flows helped clients reach key milestones faster",
  },
];

function ProblemSolutionMetrics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="problem-solution-metrics"
      className="py-24 lg:py-32 bg-[#F5F3F0]"
      aria-label="Problem to Solution metrics"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        {/* ── Left-aligned header ── */}
        <div className="mb-20 lg:mb-24">
          <div className="flex items-center gap-2 mb-6">
            <span
              className="text-[11px] tracking-[0.2em] text-[#9a9a9a] uppercase"
              style={{ fontFamily: "var(--font-inter, sans-serif)" }}
            >
              STATS
            </span>
          </div>
          <h2
            className="text-[clamp(36px,5vw,56px)] leading-[1.08] mb-8 max-w-2xl"
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              color: "#1a1a1a",
            }}
          >
            We help you rebuild trust through better structure.
          </h2>
          <a
            href="#contact"
            id="metrics-cta-btn"
            className="inline-flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#2d2d2d] text-white text-[13px] px-6 py-3 rounded-full transition-all duration-200 group"
            style={{ fontFamily: "var(--font-inter, sans-serif)" }}
          >
            Get Template
            <ArrowUpRight size={13} />
          </a>
        </div>

        {/* ── Bento grid (desktop) — height based on percentage ── */}
        <div
          ref={sectionRef}
          className="hidden md:block"
        >
          {/* Container with flex layout for bottom alignment */}
          <div
            className="grid gap-5 items-end"
            style={{
              gridTemplateColumns: "1fr 1fr 1fr",
            }}
          >
            {/* Card 1 — 34%, shortest */}
            <div
              id="metric-card-1"
              className={`rounded-2xl p-8 lg:p-10 flex flex-col justify-end border border-[#E8E4DF] bg-[#EEEBE6] transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{
                transitionDelay: "0ms",
                minHeight: "200px",
              }}
            >
              <div
                className="text-[clamp(52px,6vw,72px)] leading-none mb-4"
                style={{
                  fontFamily: "Satoshi, sans-serif",
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  color: "#1a1a1a",
                }}
              >
                {METRIC_CARDS[0].number}
              </div>
              <div
                className="text-[18px] mb-3"
                style={{
                  fontFamily: "Satoshi, sans-serif",
                  fontWeight: 500,
                  color: "#1a1a1a",
                }}
              >
                {METRIC_CARDS[0].label}
              </div>
              <div
                className="text-[14px] leading-relaxed"
                style={{
                  fontFamily: "var(--font-inter, sans-serif)",
                  color: "#666",
                }}
              >
                {METRIC_CARDS[0].desc}
              </div>
            </div>

            {/* Card 2 — 55%, medium height */}
            <div
              id="metric-card-2"
              className={`rounded-2xl p-8 lg:p-10 flex flex-col justify-end border border-[#E8E4DF] bg-[#EEEBE6] transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: "150ms",
                minHeight: "280px",
              }}
            >
              <div
                className="text-[clamp(56px,7vw,80px)] leading-none mb-4"
                style={{
                  fontFamily: "Satoshi, sans-serif",
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  color: "#1a1a1a",
                }}
              >
                {METRIC_CARDS[1].number}
              </div>
              <div
                className="text-[18px] mb-3"
                style={{
                  fontFamily: "Satoshi, sans-serif",
                  fontWeight: 500,
                  color: "#1a1a1a",
                }}
              >
                {METRIC_CARDS[1].label}
              </div>
              <div
                className="text-[14px] leading-relaxed"
                style={{
                  fontFamily: "var(--font-inter, sans-serif)",
                  color: "#666",
                }}
              >
                {METRIC_CARDS[1].desc}
              </div>
            </div>

            {/* Card 3 — 89%, tallest, positioned to align bottom with others */}
            <div
              id="metric-card-3"
              className={`rounded-2xl p-8 lg:p-10 flex flex-col justify-end border border-[#E8E4DF] bg-[#EEEBE6] transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{
                transitionDelay: "300ms",
                minHeight: "360px",
              }}
            >
              <div
                className="text-[clamp(56px,7vw,80px)] leading-none mb-4"
                style={{
                  fontFamily: "Satoshi, sans-serif",
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  color: "#1a1a1a",
                }}
              >
                {METRIC_CARDS[2].number}
              </div>
              <div
                className="text-[18px] mb-3"
                style={{
                  fontFamily: "Satoshi, sans-serif",
                  fontWeight: 500,
                  color: "#1a1a1a",
                }}
              >
                {METRIC_CARDS[2].label}
              </div>
              <div
                className="text-[14px] leading-relaxed"
                style={{
                  fontFamily: "var(--font-inter, sans-serif)",
                  color: "#666",
                }}
              >
                {METRIC_CARDS[2].desc}
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile: stacked cards ── */}
        <div className="flex flex-col gap-5 md:hidden">
          {METRIC_CARDS.map((card, i) => (
            <div
              key={i}
              id={`metric-card-mobile-${i + 1}`}
              className={`rounded-2xl p-8 lg:p-10 flex flex-col justify-end border border-[#E8E4DF] bg-[#EEEBE6] transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{
                minHeight: "220px",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <div
                className="text-[clamp(48px,10vw,72px)] leading-none mb-4"
                style={{
                  fontFamily: "Satoshi, sans-serif",
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  color: "#1a1a1a",
                }}
              >
                {card.number}
              </div>
              <div
                className="text-[18px] mb-3"
                style={{
                  fontFamily: "Satoshi, sans-serif",
                  fontWeight: 500,
                  color: "#1a1a1a",
                }}
              >
                {card.label}
              </div>
              <div
                className="text-[14px] leading-relaxed"
                style={{
                  fontFamily: "var(--font-inter, sans-serif)",
                  color: "#666",
                }}
              >
                {card.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



function SelectedWork() {
  const portfolioCards = [
    {
      id: 1,
      category: "AI PRODUCT",
      title: "NeuralDash",
      desc: "AI-powered analytics platform with real-time insights.",
      tall: true,
      gradient: "from-[#1a1a2e] to-[#1a2e3a]",
    },
    {
      id: 2,
      category: "BRAND IDENTITY",
      title: "Lumino Studio",
      desc: "Editorial brand identity for a creative studio.",
      tall: false,
      gradient: "from-[#2e1a1a] to-[#3a2a1a]",
    },
    {
      id: 3,
      category: "MOBILE APP",
      title: "DaoWay",
      desc: "Astrology planner app: plan, achieve, thrive.",
      tall: false,
      gradient: "from-[#1a2e1a] to-[#1a3a2a]",
    },
    {
      id: 4,
      category: "FINTECH",
      title: "Kelvin Zero",
      desc: "A digital product for passwordless authentication.",
      tall: true,
      gradient: "from-[#2e1a3a] to-[#3a1a2e]",
    },
    {
      id: 5,
      category: "WEB PLATFORM",
      title: "CloudSync",
      desc: "Enterprise cloud storage with AI organization.",
      tall: true,
      gradient: "from-[#1a1a3a] to-[#1a2e3a]",
    },
    {
      id: 6,
      category: "E-COMMERCE",
      title: "ShopFlow",
      desc: "Seamless checkout experience for modern retail.",
      tall: false,
      gradient: "from-[#3a2e1a] to-[#2e1a1a]",
    },
  ];

  return (
    <section
      id="work"
      className="py-20 lg:py-28 bg-[#0D0D0D]"
      aria-label="Selected work"
    >
      <div className="max-w-[900px] mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Label with blue dot */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B6BF7] inline-block" />
            <span
              className="text-[11px] tracking-[0.2em] text-[#6B6B6B] uppercase"
              style={{ fontFamily: "var(--font-inter, sans-serif)" }}
            >
              SELECTED WORK
            </span>
          </div>

          {/* Heading */}
          <h2
            className="text-[clamp(36px,4.5vw,60px)] leading-[1.1]"
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontWeight: 500,
              letterSpacing: "-0.02em",
            }}
          >
            Work that speaks.
          </h2>
        </div>

        {/* Masonry Grid — 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Left Column: tall, short, tall */}
          <div className="flex flex-col gap-8 md:gap-10">
            <div className="group cursor-pointer">
              {/* Tall card */}
              <div className="rounded-2xl overflow-hidden">
                <div
                  className={`bg-gradient-to-br ${portfolioCards[0].gradient} aspect-[3/4] relative overflow-hidden group-hover:opacity-90 transition-opacity duration-300`}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-15">
                    <div className="w-20 h-20 rounded-full border border-white/20" />
                    <div className="absolute w-36 h-36 rounded-full border border-white/10" />
                    <div className="absolute w-52 h-52 rounded-full border border-white/5" />
                  </div>
                  {/* Hover scale */}
                  <div className="absolute inset-0 group-hover:scale-[1.02] transition-transform duration-500" />
                </div>
              </div>
              {/* Text below — no background, no border */}
              <div className="mt-5">
                <span
                  className="text-[11px] tracking-[0.15em] text-[#6B6B6B] uppercase"
                  style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                >
                  {portfolioCards[0].category}
                </span>
                <h3
                  className="text-[20px] text-white mt-2"
                  style={{
                    fontFamily: "Satoshi, sans-serif",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {portfolioCards[0].title}
                </h3>
                <p
                  className="text-[13px] text-[#6B6B6B] mt-1.5 leading-relaxed"
                  style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                >
                  {portfolioCards[0].desc}
                </p>
              </div>
            </div>

            {/* Short card */}
            <div className="group cursor-pointer">
              <div className="rounded-2xl overflow-hidden">
                <div
                  className={`bg-gradient-to-br ${portfolioCards[2].gradient} aspect-[3/4] relative overflow-hidden group-hover:opacity-90 transition-opacity duration-300`}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-15">
                    <div className="w-16 h-16 rounded-full border border-white/20" />
                    <div className="absolute w-28 h-28 rounded-full border border-white/10" />
                  </div>
                  <div className="absolute inset-0 group-hover:scale-[1.02] transition-transform duration-500" />
                </div>
              </div>
              <div className="mt-5">
                <span
                  className="text-[11px] tracking-[0.15em] text-[#6B6B6B] uppercase"
                  style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                >
                  {portfolioCards[2].category}
                </span>
                <h3
                  className="text-[20px] text-white mt-2"
                  style={{
                    fontFamily: "Satoshi, sans-serif",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {portfolioCards[2].title}
                </h3>
                <p
                  className="text-[13px] text-[#6B6B6B] mt-1.5 leading-relaxed"
                  style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                >
                  {portfolioCards[2].desc}
                </p>
              </div>
            </div>

            {/* Tall card */}
            <div className="group cursor-pointer">
              <div className="rounded-2xl overflow-hidden">
                <div
                  className={`bg-gradient-to-br ${portfolioCards[4].gradient} aspect-[3/4] relative overflow-hidden group-hover:opacity-90 transition-opacity duration-300`}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-15">
                    <div className="w-20 h-20 rounded-full border border-white/20" />
                    <div className="absolute w-36 h-36 rounded-full border border-white/10" />
                    <div className="absolute w-52 h-52 rounded-full border border-white/5" />
                  </div>
                  <div className="absolute inset-0 group-hover:scale-[1.02] transition-transform duration-500" />
                </div>
              </div>
              <div className="mt-5">
                <span
                  className="text-[11px] tracking-[0.15em] text-[#6B6B6B] uppercase"
                  style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                >
                  {portfolioCards[4].category}
                </span>
                <h3
                  className="text-[20px] text-white mt-2"
                  style={{
                    fontFamily: "Satoshi, sans-serif",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {portfolioCards[4].title}
                </h3>
                <p
                  className="text-[13px] text-[#6B6B6B] mt-1.5 leading-relaxed"
                  style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                >
                  {portfolioCards[4].desc}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: short, tall, short (offset top) */}
          <div className="flex flex-col gap-8 md:gap-10 md:pt-28">
            {/* Short card */}
            <div className="group cursor-pointer">
              <div className="rounded-2xl overflow-hidden">
                <div
                  className={`bg-gradient-to-br ${portfolioCards[1].gradient} aspect-[3/4] relative overflow-hidden group-hover:opacity-90 transition-opacity duration-300`}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-15">
                    <div className="w-16 h-16 rounded-full border border-white/20" />
                    <div className="absolute w-28 h-28 rounded-full border border-white/10" />
                  </div>
                  <div className="absolute inset-0 group-hover:scale-[1.02] transition-transform duration-500" />
                </div>
              </div>
              <div className="mt-5">
                <span
                  className="text-[11px] tracking-[0.15em] text-[#6B6B6B] uppercase"
                  style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                >
                  {portfolioCards[1].category}
                </span>
                <h3
                  className="text-[20px] text-white mt-2"
                  style={{
                    fontFamily: "Satoshi, sans-serif",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {portfolioCards[1].title}
                </h3>
                <p
                  className="text-[13px] text-[#6B6B6B] mt-1.5 leading-relaxed"
                  style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                >
                  {portfolioCards[1].desc}
                </p>
              </div>
            </div>

            {/* Tall card */}
            <div className="group cursor-pointer">
              <div className="rounded-2xl overflow-hidden">
                <div
                  className={`bg-gradient-to-br ${portfolioCards[3].gradient} aspect-[3/4] relative overflow-hidden group-hover:opacity-90 transition-opacity duration-300`}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-15">
                    <div className="w-20 h-20 rounded-full border border-white/20" />
                    <div className="absolute w-36 h-36 rounded-full border border-white/10" />
                    <div className="absolute w-52 h-52 rounded-full border border-white/5" />
                  </div>
                  <div className="absolute inset-0 group-hover:scale-[1.02] transition-transform duration-500" />
                </div>
              </div>
              <div className="mt-5">
                <span
                  className="text-[11px] tracking-[0.15em] text-[#6B6B6B] uppercase"
                  style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                >
                  {portfolioCards[3].category}
                </span>
                <h3
                  className="text-[20px] text-white mt-2"
                  style={{
                    fontFamily: "Satoshi, sans-serif",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {portfolioCards[3].title}
                </h3>
                <p
                  className="text-[13px] text-[#6B6B6B] mt-1.5 leading-relaxed"
                  style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                >
                  {portfolioCards[3].desc}
                </p>
              </div>
            </div>

            {/* Short card */}
            <div className="group cursor-pointer">
              <div className="rounded-2xl overflow-hidden">
                <div
                  className={`bg-gradient-to-br ${portfolioCards[5].gradient} aspect-[3/4] relative overflow-hidden group-hover:opacity-90 transition-opacity duration-300`}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-15">
                    <div className="w-16 h-16 rounded-full border border-white/20" />
                    <div className="absolute w-28 h-28 rounded-full border border-white/10" />
                  </div>
                  <div className="absolute inset-0 group-hover:scale-[1.02] transition-transform duration-500" />
                </div>
              </div>
              <div className="mt-5">
                <span
                  className="text-[11px] tracking-[0.15em] text-[#6B6B6B] uppercase"
                  style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                >
                  {portfolioCards[5].category}
                </span>
                <h3
                  className="text-[20px] text-white mt-2"
                  style={{
                    fontFamily: "Satoshi, sans-serif",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {portfolioCards[5].title}
                </h3>
                <p
                  className="text-[13px] text-[#6B6B6B] mt-1.5 leading-relaxed"
                  style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                >
                  {portfolioCards[5].desc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* View all work — centered below */}
        <div className="flex justify-center mt-16">
          <a
            href="#all-work"
            id="work-view-all"
            className="inline-flex items-center gap-2 text-[13px] text-[#6B6B6B] hover:text-white border border-[#2a2a2a] hover:border-[#3B6BF7] px-6 py-3 rounded-full transition-all duration-200 group"
            style={{ fontFamily: "var(--font-inter, sans-serif)" }}
          >
            View all work
            <ArrowUpRight
              size={13}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Key Industries ────────────────────────────────────────────────────────────

const INDUSTRY_TABS = ["FINTECH", "SAAS", "EDTECH"] as const;
type IndustryTab = (typeof INDUSTRY_TABS)[number];

const INDUSTRY_DATA: Record<
  IndustryTab,
  {
    label: string;
    headline: string;
    cta: string;
    challenges: string[];
    solutions: string[];
  }
> = {
  FINTECH: {
    label: "FINTECH",
    headline: "FinTech UX built for trust, clarity, and compliance.",
    cta: "EXPLORE FINTECH WORK →",
    challenges: [
      "Users hesitate when trust signals are unclear",
      "Complex flows like KYC and transactions increase friction",
      "Dense dashboards overwhelm users",
    ],
    solutions: [
      "Trust-first UX with clear guidance and reassurance",
      "Simplified KYC and transaction flows without compromising compliance",
      "Decision-ready dashboards that make complex data easy to act on",
    ],
  },
  SAAS: {
    label: "SAAS",
    headline: "Scalable SaaS That Converts and Retains.",
    cta: "EXPLORE SAAS WORK →",
    challenges: [
      "Confusing onboarding slows activation",
      "Feature growth creates inconsistent UX",
      "Pricing and upgrade flows hurt conversion",
    ],
    solutions: [
      "Clear onboarding and guided flows that surface value fast",
      "Consistent UX patterns that scale as features grow",
      "Pricing and upgrade experiences designed to support conversion",
    ],
  },
  EDTECH: {
    label: "EDTECH",
    headline: "Learning experiences designed for engagement and continuity.",
    cta: "EXPLORE ALL CASES →",
    challenges: [
      "Learners drop off after early sessions",
      "Progress feels unclear and motivation fades",
      "Multiple roles create complex UX requirements",
    ],
    solutions: [
      "Learning flows built around habit and engagement",
      "Clear progress, milestones, and feedback loops",
      "Role-based dashboards that stay usable as the platform grows",
    ],
  },
};

function KeyIndustries() {
  const [activeTab, setActiveTab] = useState<IndustryTab>("FINTECH");
  const data = INDUSTRY_DATA[activeTab];

  return (
    <section
      id="key-industries"
      className="py-28 lg:py-36 bg-[#0D0D0D]"
      aria-label="Key Industries"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        {/* ── Section Header ── */}
        <div className="text-center mb-16 lg:mb-20">
          {/* Label with blue dot */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B6BF7] inline-block" />
            <span
              className="text-[11px] tracking-[0.2em] text-[#6B6B6B] uppercase"
              style={{ fontFamily: "var(--font-inter, sans-serif)" }}
            >
              KEY INDUSTRIES
            </span>
          </div>

          {/* Heading */}
          <h2
            className="text-[clamp(36px,4vw,64px)] leading-[1.1] text-white"
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontWeight: 500,
              letterSpacing: "-0.02em",
            }}
          >
            Built for Products Across Industries.
          </h2>

          {/* Subtext */}
          <p
            className="text-[16px] text-[#6B6B6B] leading-relaxed mt-4 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-inter, sans-serif)" }}
          >
            Proven patterns. Real best practices. A pragmatic partner that helps you
            ship faster and scale with confidence.
          </p>

          {/* Tab Filter — pill container style (same as ServicesByStage) */}
          <div className="inline-flex gap-1 mt-10 bg-[#1A1A1A] rounded-full p-1">
            {INDUSTRY_TABS.map((tab) => (
              <button
                key={tab}
                id={`industry-tab-${tab.toLowerCase()}`}
                role="tab"
                aria-selected={activeTab === tab}
                aria-controls={`industry-panel-${tab.toLowerCase()}`}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                  activeTab === tab
                    ? "bg-[#3B6BF7] text-white"
                    : "text-[#525252] hover:text-white"
                }`}
                style={{ fontFamily: "var(--font-inter, sans-serif)" }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ── Content Area ── */}
        <div
          id={`industry-panel-${activeTab.toLowerCase()}`}
          role="tabpanel"
          aria-label={activeTab}
        >
          {/* Full-width grid: image LEFT, text RIGHT */}
          <div className="grid gap-8 lg:gap-12 items-start" style={{ gridTemplateColumns: 'minmax(448px, auto) 1fr' }}>
            {/* LEFT — Image */}
            <div className="rounded-2xl overflow-hidden max-w-sm lg:max-w-md">
              <div
                className="w-full aspect-[4/3]"
                style={{
                  backgroundColor: "#0D1117",
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span
                    className="font-mono text-[10px] tracking-widest text-[#2A2A2A] uppercase"
                    style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                  >
                    {data.label} PREVIEW
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT — Text content */}
            <div className="flex flex-col gap-6">
              {/* Industry heading */}
              <h3
                className="text-[clamp(22px,2.5vw,32px)] text-white leading-tight"
                style={{
                  fontFamily: "Satoshi, sans-serif",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  maxWidth: "90%",
                }}
              >
                {data.headline}
              </h3>

              {/* Challenges + Solutions side by side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Challenges */}
                <div className="flex flex-col gap-3">
                  <p
                    className="text-base font-semibold text-white"
                    style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                  >
                    Challenges:
                  </p>
                  {data.challenges.map((challenge, i) => (
                    <div key={i} className="flex items-center gap-3">
                      {/* Red rounded-square icon */}
                      <div
                        className="w-[30px] h-[30px] rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: "#EF4444",
                          boxShadow:
                            "inset 0 0 12px rgba(114,19,19,0.5), 0 0 0 0.5px rgba(255,255,255,0.04)",
                        }}
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.875 7.5L6.75 10.375L11.25 5.625"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span
                        className="text-sm text-white leading-relaxed"
                        style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                      >
                        {challenge}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Solutions */}
                <div className="flex flex-col gap-3">
                  <p
                    className="text-base font-semibold text-white"
                    style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                  >
                    How we solve them:
                  </p>
                  {data.solutions.map((solution, i) => (
                    <div key={i} className="flex items-center gap-3">
                      {/* Green rounded-square icon */}
                      <div
                        className="w-[30px] h-[30px] rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: "#2E8C2E",
                          boxShadow:
                            "inset 0 0 12px rgba(21,89,21,0.5), 0 0 0 0.5px rgba(255,255,255,0.04)",
                        }}
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.875 7.5L6.75 10.375L11.25 5.625"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span
                        className="text-sm text-white leading-relaxed"
                        style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                      >
                        {solution}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider line */}
              <div className="border-t border-[#1F1F1F] my-2" />

              {/* CTA Button */}
              <a
                href="#work"
                id={`industry-cta-${activeTab.toLowerCase()}`}
                className="inline-flex items-center gap-2 bg-[#3B6BF7] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#2D5CE8] transition-colors duration-200 w-fit"
                style={{ fontFamily: "var(--font-inter, sans-serif)" }}
              >
                <span>Explore Work</span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19M19 12L13 18M19 12L13 6"
                    stroke="#2853FF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services by Startup Stage ─────────────────────────────────────────────────

const STAGE_TABS = ["SEED", "GROWTH", "SCALE"] as const;
type StageTab = (typeof STAGE_TABS)[number];

const STAGE_DATA: Record<
  StageTab,
  {
    label: string;
    heading: string;
    description: string;
    services: { name: string; desc: string; image: string }[];
  }
> = {
  SEED: {
    label: "SEED",
    heading: "Validate Fast. Ship a Credible MVP in 7 Days.",
    description:
      "Prove the core value, ship the first version, and look legit from day one.",
    services: [
      {
        name: "MVP UX and UI Design",
        desc: "Core flows and screens users actually need, ready for development.",
        image: "https://placehold.co/800x450/0a0a0a/ffffff?text=MVP+UX+UI+Design",
      },
      {
        name: "Clickable Prototype",
        desc: "Demo-ready prototype to sell the idea, test the flow, and align stakeholders.",
        image: "https://placehold.co/800x450/0a0a0a/ffffff?text=Clickable+Prototype",
      },
      {
        name: "Launch Ready Landing Page",
        desc: "Conversion-first page that explains value fast and builds trust instantly.",
        image: "https://placehold.co/800x450/0a0a0a/ffffff?text=Launch+Ready+Landing+Page",
      },
    ],
  },
  GROWTH: {
    label: "GROWTH",
    heading:
      "Increase Adoption and Cut Drop-Off, So Traction Keeps Growing.",
    description:
      "We remove UX friction across key journeys, so users activate faster, stay longer, and come back more often.",
    services: [
      {
        name: "UX Audit and Priorities",
        desc: "Find where users get stuck, then focus on the highest-impact fixes first.",
        image: "https://placehold.co/800x450/0a0a0a/ffffff?text=UX+Audit+Priorities",
      },
      {
        name: "Product Redesign",
        desc: "Simplify key flows and upgrade screens that drive conversion, trust, and repeat usage.",
        image: "https://placehold.co/800x450/0a0a0a/ffffff?text=Product+Redesign",
      },
      {
        name: "Team Extension by Expert",
        desc: "Senior UX/UI support to keep shipping improvements every sprint.",
        image: "https://placehold.co/800x450/0a0a0a/ffffff?text=Team+Extension",
      },
    ],
  },
  SCALE: {
    label: "SCALE",
    heading: "Optimize Without Breaking UX. Reach More Users With Confidence.",
    description:
      "Improve UX quality, increase conversion, and add capacity without slowing down.",
    services: [
      {
        name: "UX Audit",
        desc: "Identify scale bottlenecks, friction, and drop-offs that limit growth.",
        image: "https://placehold.co/800x450/0a0a0a/ffffff?text=UX+Audit",
      },
      {
        name: "Product Redesign",
        desc: "Upgrade core journeys so the experience stays fast, clear, and conversion-ready.",
        image: "https://placehold.co/800x450/0a0a0a/ffffff?text=Product+Redesign",
      },
      {
        name: "Team Extension",
        desc: "Add a dedicated senior team to keep shipping without hiring delays.",
        image: "https://placehold.co/800x450/0a0a0a/ffffff?text=Team+Extension",
      },
    ],
  },
};

function ServicesByStage() {
  const [activeTab, setActiveTab] = useState<StageTab>("SEED");
  const [hoveredServiceIndex, setHoveredServiceIndex] = useState<number | null>(
    null
  );
  const data = STAGE_DATA[activeTab];
  const hoveredService =
    hoveredServiceIndex !== null ? data.services[hoveredServiceIndex] : null;

  return (
    <section
      id="services"
      className="py-28 lg:py-36 bg-[#0D0D0D]"
      aria-label="Services by Startup Stage"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        {/* ── Section Header ── */}
        <div className="text-center">
          {/* Label with blue dot */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B6BF7] inline-block" />
            <span
              className="text-[11px] tracking-[0.2em] text-[#6B6B6B] uppercase"
              style={{ fontFamily: "var(--font-inter, sans-serif)" }}
            >
              SERVICES BY STARTUP STAGE
            </span>
          </div>

          {/* Heading */}
          <h2
            className="text-[clamp(32px,4vw,56px)] leading-[1.1] text-white"
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontWeight: 500,
              letterSpacing: "-0.02em",
            }}
          >
            Support That Fits Your Stage,
            <br />
            From First MVP to Market Scale.
          </h2>

          {/* Description */}
          <p
            className="text-[16px] text-[#6B6B6B] leading-relaxed mt-6 max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-inter, sans-serif)" }}
          >
            Pick where you are right now. We'll show the services built for
            that stage, so you can move fast without guessing.
          </p>

          {/* Tab Navigation — pill style */}
          <div
            className="inline-flex gap-1 mt-12 bg-[#1A1A1A] rounded-full p-1"
            role="tablist"
            aria-label="Startup stage tabs"
          >
            {STAGE_TABS.map((tab) => (
              <button
                key={tab}
                id={`stage-tab-${tab.toLowerCase()}`}
                role="tab"
                aria-selected={activeTab === tab}
                aria-controls={`stage-panel-${tab.toLowerCase()}`}
                onClick={() => {
                  setActiveTab(tab);
                  setHoveredServiceIndex(null);
                }}
                className={`px-6 py-2 text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                  activeTab === tab
                    ? "bg-[#3B6BF7] text-white"
                    : "text-[#525252] hover:text-white"
                }`}
                style={{ fontFamily: "var(--font-inter, sans-serif)" }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ── Content Area — 2-column grid ── */}
        <div
          id={`stage-panel-${activeTab.toLowerCase()}`}
          role="tabpanel"
          aria-label={activeTab}
          className="grid grid-cols-1 lg:grid-cols-[38%_1fr] gap-12 lg:gap-16 mt-16 lg:mt-20"
        >
          {/* Left Column — Stage Info */}
          <div>
            {/* Stage label */}
            <span
              className="text-[11px] tracking-[0.2em] text-[#6B6B6B] uppercase block mb-5"
              style={{ fontFamily: "var(--font-inter, sans-serif)" }}
            >
              {data.label}
            </span>

            {/* Stage heading */}
            <h3
              className="text-[clamp(22px,2.5vw,36px)] leading-[1.15] text-white mb-4"
              style={{
                fontFamily: "Satoshi, sans-serif",
                fontWeight: 500,
                letterSpacing: "-0.02em",
              }}
            >
              {data.heading}
            </h3>

            {/* Stage description */}
            <p
              className="text-[15px] text-[#6B6B6B] leading-relaxed"
              style={{ fontFamily: "var(--font-inter, sans-serif)" }}
            >
              {data.description}
            </p>

            {/* Hover image appears BELOW description — in the left column */}
            <div
              className="overflow-hidden rounded-xl mt-6"
              style={{
                maxHeight: hoveredService ? "220px" : "0px",
                opacity: hoveredService ? 1 : 0,
                transition:
                  "max-height 0.35s ease, opacity 0.3s ease",
              }}
            >
              {hoveredService && (
                <img
                  src={hoveredService.image}
                  alt={hoveredService.name}
                  className="w-full object-cover"
                  style={{ borderRadius: "12px" }}
                />
              )}
            </div>
          </div>

          {/* Right Column — Services List */}
          <div className="flex flex-col gap-6">
            {data.services.map((service, i) => (
              <ServiceCard
                key={`${activeTab}-${i}`}
                name={service.name}
                desc={service.desc}
                index={i}
                isHovered={hoveredServiceIndex === i}
                onHover={() => setHoveredServiceIndex(i)}
                onLeave={() => setHoveredServiceIndex(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────

function ServiceCard({
  name,
  desc,
  index,
  isHovered,
  onHover,
  onLeave,
}: {
  name: string;
  desc: string;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      id={`service-card-${index + 1}`}
      className="rounded-2xl border bg-[#111111] p-7 transition-all duration-300 cursor-default group"
      style={{
        borderColor: isHovered ? "#3B6BF7" : "#1F1F1F",
        borderLeftWidth: "3px",
        borderLeftColor: isHovered ? "#3B6BF7" : "#1F1F1F",
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <h4
        className="text-[17px] text-white mb-2"
        style={{
          fontFamily: "Satoshi, sans-serif",
          fontWeight: 500,
          letterSpacing: "-0.01em",
        }}
      >
        {name}
      </h4>
      <p
        className="text-[14px] text-[#6B6B6B] leading-relaxed"
        style={{ fontFamily: "var(--font-inter, sans-serif)" }}
      >
        {desc}
      </p>
    </div>
  );
}

// ─── Services (legacy — kept for reference) ─────────────────────────────────

function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="services-list"
      className="py-28 lg:py-36"
      aria-label="Services list"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div>
            <SectionLabel text="What We Do" />
            <h2
              className="text-[clamp(36px,4vw,52px)] leading-[1.1]"
              style={{
                fontFamily: "Satoshi, sans-serif",
                fontWeight: 500,
                letterSpacing: "-0.02em",
              }}
            >
              From idea
              <br />
              to launch.
            </h2>
            <p
              className="text-[15px] text-[#6B6B6B] leading-relaxed mt-6 max-w-sm"
              style={{ fontFamily: "var(--font-inter, sans-serif)" }}
            >
              We work with founders, teams, and enterprises to bring bold ideas
              to life — at every stage of the journey.
            </p>
          </div>

          {/* Right — Service Rows */}
          <div className="flex flex-col">
            {SERVICES.map((service, i) => (
              <div
              key={service.index}
              id={`service-row-${i + 1}`}
              className="group flex items-center justify-between py-5 cursor-pointer transition-all duration-200"
              style={{
                backgroundColor:
                  hoveredIndex === i
                    ? "rgba(255,255,255,0.02)"
                    : "transparent",
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex items-center gap-6">
                <span
                  className="text-[11px] text-[#6B6B6B] tabular-nums"
                  style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                >
                  {service.index}
                </span>
                <span
                  className="text-[16px] text-white"
                  style={{
                    fontFamily: "Satoshi, sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {service.name}
                </span>
              </div>
              <ArrowRight
                size={15}
                className="text-[#6B6B6B] transition-all duration-300 group-hover:text-[#3B6BF7] group-hover:translate-x-1"
              />
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ─────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section
      id="contact"
      className="relative py-36 lg:py-44 overflow-hidden"
      aria-label="Call to action"
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(59,107,247,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(80,40,120,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 text-center">
        <SectionLabel text="Let's Work Together" />

        <h2
          className="text-[clamp(40px,5.5vw,76px)] leading-[1.05] mb-6"
          style={{
            fontFamily: "Satoshi, sans-serif",
            fontWeight: 500,
            letterSpacing: "-0.025em",
          }}
        >
          Have a project
          <br />
          <span className="text-[#6B6B6B]">in mind?</span>
        </h2>

        <p
          className="text-[16px] text-[#6B6B6B] leading-relaxed mb-12 max-w-sm mx-auto"
          style={{ fontFamily: "var(--font-inter, sans-serif)" }}
        >
          Tell us what you're building. We'll help you ship something
          remarkable.
        </p>

        <a
          href="mailto:hello@eluxspace.com"
          id="cta-section-btn"
          className="inline-flex items-center gap-2 bg-[#3B6BF7] hover:bg-[#2D5CE8] text-white text-[14px] px-8 py-3.5 rounded-full transition-all duration-200 group"
          style={{ fontFamily: "var(--font-inter, sans-serif)" }}
        >
          Start a Project
          <ArrowRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </a>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      className="border-t border-[#1F1F1F] bg-[#0D0D0D]"
      aria-label="Site footer"
    >
      {/* Top row */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <a
          href="/"
          id="footer-logo"
          className="flex items-center"
          aria-label="eluxspace home"
        >
          <Image
            src="/logo-elux.webp"
            alt="eluxspace logo"
            width={110}
            height={28}
            className="h-auto w-auto"
          />
        </a>
        <div className="flex flex-wrap gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] text-[#6B6B6B] hover:text-white transition-colors duration-200"
              style={{ fontFamily: "var(--font-inter, sans-serif)" }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p
            className="text-[12px] text-[#3a3a3a]"
            style={{ fontFamily: "var(--font-inter, sans-serif)" }}
          >
            © {new Date().getFullYear()} eluxspace. All rights reserved.
          </p>
          <div
            className="flex items-center gap-6 text-[12px] text-[#3a3a3a]"
            style={{ fontFamily: "var(--font-inter, sans-serif)" }}
          >
            <a
              href="mailto:hello@eluxspace.com"
              id="footer-email"
              className="hover:text-[#6B6B6B] transition-colors duration-200"
            >
              hello@eluxspace.com
            </a>
            <span className="text-[#1F1F1F]">·</span>
            <a
              href="tel:+1234567890"
              id="footer-phone"
              className="hover:text-[#6B6B6B] transition-colors duration-200"
            >
              +1 (234) 567-890
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── How We Work ──────────────────────────────────────────────────────────────

const HOW_WE_WORK_STEPS = [
  {
    step: "01",
    heading: "Discovery & Alignment",
    description:
      "We start by understanding your goals, users, and constraints. One focused session to align on scope, timeline, and what success looks like.",
  },
  {
    step: "02",
    heading: "Wireframe & Structure",
    description:
      "Before any visuals, we map out the structure. Every page, every flow — approved before we touch the design.",
  },
  {
    step: "03",
    heading: "Design & Iteration",
    description:
      "High-fidelity UI built on your approved structure. We move fast, share early, and iterate based on real feedback — not assumptions.",
  },
  {
    step: "04",
    heading: "Build & Integrate",
    description:
      "Frontend development in Next.js. Clean code, responsive, SEO-ready. We build what was designed — no shortcuts.",
  },
  {
    step: "05",
    heading: "Launch & Handoff",
    description:
      "Deploy to production, QA on real devices, and a clean handoff. You get the code, the docs, and a staging environment.",
  },
];

function HowWeWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      const scrollProgress =
        (window.scrollY - sectionTop) / (sectionHeight - windowHeight);

      if (scrollProgress <= 0) {
        setCurrentIndex(0);
        return;
      }
      if (scrollProgress >= 1) {
        setCurrentIndex(HOW_WE_WORK_STEPS.length - 1);
        return;
      }

      const rawIndex = scrollProgress * HOW_WE_WORK_STEPS.length;
      setCurrentIndex(Math.min(Math.floor(rawIndex), HOW_WE_WORK_STEPS.length - 1));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="how-we-work"
      className="bg-[#0D0D0D]"
      aria-label="How We Work"
    >
      {/* ── Section Header (NOT inside sticky) ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 text-center">
        {/* Label */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3B6BF7] inline-block" />
          <span
            className="text-[11px] tracking-[0.2em] text-[#6B6B6B] uppercase"
            style={{ fontFamily: "var(--font-inter, sans-serif)" }}
          >
            HOW WE WORK
          </span>
        </div>

        {/* Heading */}
        <h2
          className="text-[clamp(36px,4vw,56px)] leading-[1.1] text-white"
          style={{
            fontFamily: "Satoshi, sans-serif",
            fontWeight: 500,
            letterSpacing: "-0.02em",
          }}
        >
          Simple. Structured. Fast.
        </h2>

        {/* Subtext */}
        <p
          className="text-[15px] text-[#6B6B6B] leading-relaxed max-w-lg mx-auto mt-4"
          style={{ fontFamily: "var(--font-inter, sans-serif)" }}
        >
          Four steps. No guesswork. Just shipping.
        </p>
      </div>

      {/* ── Sticky scroll wrapper ── */}
      <div
        ref={sectionRef}
        className="relative"
        style={{ height: `${HOW_WE_WORK_STEPS.length * 100}vh` }}
      >
        {/* Sticky container */}
        <div className="sticky top-30 h-[600px] overflow-hidden">
          {/* Card stack */}
          {HOW_WE_WORK_STEPS.map((card, i) => {
            const isActive = i === currentIndex;
            const isEntering = i === currentIndex + 1;
            const isBehind = i < currentIndex;

            let transform = "";
            let opacity = 0;
            let scale = 1;

            if (isActive) {
              transform = "translateY(0)";
              opacity = 1;
              scale = 1;
            } else if (isEntering) {
              transform = "translateY(6%)";
              opacity = 0;
              scale = 1;
            } else if (isBehind) {
              // Stack depth: cards behind shrink and slide up
              const depth = currentIndex - i;
              transform = `translateY(-${depth * 8}%) scale(${1 - depth * 0.05})`;
              opacity = Math.max(0, 1 - depth * 0.35);
              scale = 1 - depth * 0.05;
            } else {
              transform = "translateY(6%)";
              opacity = 0;
              scale = 1;
            }

            return (
              <div
                key={card.step}
                className="absolute inset-0 flex items-center justify-center p-6 lg:p-10 transition-all duration-700"
                style={{
                  transform,
                  opacity,
                  pointerEvents: isActive ? "auto" : "none",
                  zIndex: isActive ? 2 : 1,
                }}
              >
                <div
                  className="w-full max-w-5xl h-full bg-[#111111] border border-[#1F1F1F] rounded-2xl flex flex-col lg:flex-row overflow-hidden"
                  style={{
                    transition:
                      "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease",
                  }}
                >
                  {/* ── LEFT — Content ── */}
                  <div className="w-full lg:w-1/2 p-10 lg:p-14 flex flex-col justify-between h-full">
                    <div>
                      {/* Step badge */}
                      <div className="font-mono text-xs text-[#3B6BF7] tracking-widest mb-6">
                        STEP {card.step}
                      </div>

                      {/* Heading */}
                      <h3
                        className="text-[clamp(28px,3.5vw,42px)] text-white leading-tight"
                        style={{
                          fontFamily: "Satoshi, sans-serif",
                          fontWeight: 500,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {card.heading}
                      </h3>

                      {/* Description */}
                      <p
                        className="text-[15px] text-[#6B6B6B] leading-relaxed mt-5 max-w-sm"
                        style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                      >
                        {card.description}
                      </p>
                    </div>

                    {/* Continue hint */}
                    {i < HOW_WE_WORK_STEPS.length - 1 && (
                      <div className="font-mono text-xs text-[#6B6B6B] mt-8">
                        → continues on scroll
                      </div>
                    )}
                  </div>

                  {/* ── RIGHT — Visual ── */}
                  <div className="w-full lg:w-1/2 p-6 lg:p-8">
                    <div
                      className="w-full h-full rounded-xl overflow-hidden relative"
                      style={{
                        backgroundColor: "#0D1117",
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                      }}
                    >
                      {/* Large step number centered */}
                      <div className="absolute inset-0 flex items-center justify-center select-none">
                        <span
                          className="text-[120px] lg:text-[160px] font-bold text-[#1A1A1A] leading-none"
                          style={{ fontFamily: "monospace" }}
                        >
                          {card.step}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* ── Progress indicator ── */}
          <div className="absolute bottom-8 right-8 lg:bottom-10 lg:right-12 z-10">
            <span
              className="font-mono text-xs text-[#333]"
              style={{ fontFamily: "monospace" }}
            >
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(HOW_WE_WORK_STEPS.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

const TESTIMONIAL_VIDEOS = [
  {
    name: "Karlin Walker",
    role: "CEO of Lightrow",
  },
  {
    name: "Cory Gill",
    role: "COO of Alialearn",
  },
  {
    name: "Habil Masuri",
    role: "Founder of Digital Quartier Germany",
  },
];

const TESTIMONIAL_CARDS_ROW_1 = [
  {
    company: "Samsa AI",
    quote: "Wow, that is amazing! Thank you so much for this proactive initiative.",
    name: "Niklas",
    role: "Founder of Samsa AI",
  },
  {
    company: "Ai2",
    quote: "Hi Elux team. Thank you so much for your work thus far. Things are looking really nice.",
    name: "Yvonne Chou",
    role: "Chief of Staff Ai2",
  },
  {
    company: "Lamah Technologies",
    quote: "This style works, it makes it easier to introduce new features in the future.",
    name: "Taha Elraaid",
    role: "Founder & CEO",
  },
  {
    company: "UI Core",
    quote: "We've been working with Elux since 2022, and it's been a great experience from the start.",
    name: "Gabriel Sirbu",
    role: "CoFounder",
  },
  {
    company: "Ai2",
    quote: "OK designs look great! I have a meeting with the Molmo team later this afternoon.",
    name: "David Albright",
    role: "Head of Design",
  },
  {
    company: "Travelcircus",
    quote: "Hi, thanks for all the deliverables. Everything looks good as discussed before.",
    name: "PUI",
    role: "Client",
  },
];

const TESTIMONIAL_CARDS_ROW_2 = [
  {
    company: "Make Waves",
    quote: "Great thanks I've carved out time to review and go over this tomorrow morning. Cannot wait!!",
    name: "TJ Kolesnik",
    role: "CEO",
  },
  {
    company: "Digital Quartier",
    quote: "I like both Hero sections, it's really difficult to decide which one is better.",
    name: "Habil Masuri",
    role: "CEO",
  },
  {
    company: "Alia",
    quote: "Love this style.",
    name: "Cory Gill",
    role: "CO Founder and CCO",
  },
  {
    company: "JCD",
    quote: "Awesome job to the Elux team! The wireframes have captured the core structure well.",
    name: "Sadam Ali",
    role: "Jen Clark Design",
  },
  {
    company: "Frontside Media",
    quote: "Great design arrangement, both versions confirmed after update.",
    name: "Florian",
    role: "Frontside Media",
  },
  {
    company: "Resync",
    quote: "We engaged Elux for website design and development, and the experience was exceptional.",
    name: "Karthik Murali",
    role: "Marketing Manager",
  },
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalVideos = TESTIMONIAL_VIDEOS.length;

  const prev = () => setCurrentIndex((i) => (i === 0 ? totalVideos - 1 : i - 1));
  const next = () => setCurrentIndex((i) => (i === totalVideos - 1 ? 0 : i + 1));

  // const TestimonialCard = ({ card }: { card: typeof TESTIMONIAL_CARDS_ROW_1[0] }) => (
  //   <div className="w-[300px] h-[420px] flex-shrink-0 flex-row bg-[#111111] border border-[#1F1F1F] rounded-2xl overflow-hidden flex flex-col">
  //     <div className="p-5 flex flex-col justify-between flex-1">
  //       <div>
  //         <div className="text-white font-bold text-sm mb-3">{card.company}</div>
  //         <div className="text-sm text-[#888] leading-relaxed line-clamp-4">
  //           "{card.quote}"
  //         </div>
  //       </div>
  //       <div className="mt-4">
  //         <div className="text-white font-semibold text-sm">{card.name}</div>
  //         <div className="text-[#525252] text-xs">{card.role}</div>
  //       </div>
  //     </div>
  //     <div className="bg-[#1A1A1A] w-full h-[160px] flex-shrink-0" />
  //   </div>
  // );

  return (
    <section id="testimonials" className="py-28 bg-[#0D0D0D]" aria-label="Testimonials">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-16 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3B6BF7] inline-block" />
          <span
            className="text-[11px] tracking-[0.2em] text-[#6B6B6B] uppercase"
            style={{ fontFamily: "var(--font-inter, sans-serif)" }}
          >
            TESTIMONIALS
          </span>
        </div>

        <h2
          className="text-[clamp(36px,4vw,52px)] leading-[1.1] max-w-3xl mx-auto"
          style={{
            fontFamily: "Satoshi, sans-serif",
            fontWeight: 500,
            letterSpacing: "-0.02em",
          }}
        >
          Rated 5.0 on Clutch, backed by real founder feedback.
        </h2>

        <p
          className="text-[15px] text-[#6B6B6B] leading-relaxed mt-3"
          style={{ fontFamily: "var(--font-inter, sans-serif)" }}
        >
          Proven patterns. Real best practices. A pragmatic partner that helps
          you ship faster and scale with confidence.
        </p>

        {/* Rating Badges */}
        <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
          <div className="bg-[#111] border border-[#1F1F1F] rounded-full px-5 py-2 flex items-center gap-2">
            <span className="text-white text-sm font-semibold">Clutch</span>
            <span className="text-[#6B6B6B] text-xs">5.0 Ratings</span>
            <span className="text-yellow-400 text-xs">★★★★★</span>
          </div>
          <div className="bg-[#111] border border-[#1F1F1F] rounded-full px-5 py-2 flex items-center gap-2">
            <span className="text-white text-sm font-semibold">DesignRush</span>
            <span className="text-[#6B6B6B] text-xs">5.0 Ratings</span>
            <span className="text-yellow-400 text-xs">★★★★★</span>
          </div>
        </div>
      </div>

      {/* Video Slider */}
      <div className="w-full overflow-hidden mb-10">
        <div className="flex items-center justify-center gap-4">
          {TESTIMONIAL_VIDEOS.map((video, i) => {
            const isCenter = i === currentIndex;
            return (
              <div
                key={i}
                className="bg-[#111111] rounded-2xl overflow-hidden relative flex-shrink-0 transition-all duration-500"
                style={{
                  width: isCenter ? "520px" : "380px",
                  opacity: isCenter ? 1 : 0.5,
                  transform: isCenter ? "scale(1)" : "scale(0.95)",
                  aspectRatio: "16/9",
                }}
              >
                <div className="bg-[#1A1A1A] w-full h-full absolute inset-0" />
                {isCenter && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="ml-1">
                        <path d="M8 5.5L18.5 12L8 18.5V5.5Z" fill="white" />
                      </svg>
                    </div>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent z-10">
                  <div className="text-white font-semibold text-sm">{video.name}</div>
                  <div className="text-[#888] text-xs">{video.role}</div>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/60 px-2 py-1 rounded text-[10px] font-mono text-[#555] z-10">
                  YOUTUBE
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <button onClick={prev} className="w-10 h-10 rounded-full border border-[#1F1F1F] bg-[#111] flex items-center justify-center text-white hover:bg-[#222] transition-colors">
          <ChevronLeft size={16} />
        </button>
        <button onClick={next} className="w-10 h-10 rounded-full bg-[#3B6BF7] flex items-center justify-center text-white hover:bg-[#2D5CE8] transition-colors">
          <ChevronRight size={16} />
        </button>
      </div>


      {/* Carousel Rows */}
      <div className="mt-20">
        {/* Row 1 — scroll left */}
        <div className="overflow-hidden mb-4">
          <div className="animate-scroll-left flex gap-4 w-max">
            {/* {[...TESTIMONIAL_CARDS_ROW_1, ...TESTIMONIAL_CARDS_ROW_1].map((card, i) => (
              // <TestimonialCard key={i} card={card} />
            ))} */}
          </div>
        </div>

        {/* Row 2 — scroll right */}
        <div className="overflow-hidden">
          <div className="animate-scroll-right flex gap-4 w-max">
            {/* {[...TESTIMONIAL_CARDS_ROW_2, ...TESTIMONIAL_CARDS_ROW_2].map((card, i) => (
              // <TestimonialCard key={i} card={card} />
            ))} */}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ClientLogos />
      <SelectedWork />
      <AINativeSection />
      <ProblemToSolution />
      <ProblemSolutionMetrics />
      <ServicesByStage />
      <KeyIndustries />
      <HowWeWork />
      <Testimonials />
      <Services />
      <CTASection />
      <Footer />
    </main>
  );
}
