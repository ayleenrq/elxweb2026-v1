"use client";

import { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight,
  Menu,
  X,
  ArrowRight,
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
];

const SERVICES = [
  { index: "01", name: "AI Product Design" },
  { index: "02", name: "Web Development" },
  { index: "03", name: "Brand Identity" },
  { index: "04", name: "UX / UI Redesign" },
  { index: "05", name: "Project Calculator" },
  { index: "06", name: "MCP Integration" },
];

const STATS = [
  { number: "90+", label: "Digital Products" },
  { number: "100+", label: "Global Clients" },
  { number: "20+", label: "Countries" },
  { number: "37%", label: "Return Rate" },
];

// ─── Shared UI Primitives ─────────────────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <span className="w-1.5 h-1.5 rounded-full bg-[#3B6BF7] inline-block" />
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
            className="text-white text-[15px] tracking-tight"
            style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 500 }}
          >
            eluxspace
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
      className="relative min-h-screen flex items-center pt-16 dot-grid overflow-hidden"
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
    </section>
  );
}

// ─── Marquee ──────────────────────────────────────────────────────────────────

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

// ─── Work Card ────────────────────────────────────────────────────────────────

function WorkCard({
  card,
}: {
  card: (typeof WORK_CARDS)[number];
}) {
  const isLarge = card.size === "large";
  // Subtle color accents for each placeholder
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
      {/* Image Area */}
      <div
        className={`bg-gradient-to-br ${gradient} ${isLarge ? "h-80" : "h-56"} relative overflow-hidden`}
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

// ─── Featured Work ────────────────────────────────────────────────────────────

function FeaturedWork() {
  return (
    <section
      id="work"
      className="max-w-7xl mx-auto px-6 lg:px-10 py-28 lg:py-36"
      aria-label="Selected work"
    >
      <SectionLabel text="Selected Work" />

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
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
        <a
          href="#all-work"
          id="work-view-all"
          className="text-[13px] text-[#6B6B6B] hover:text-white underline-offset-4 hover:underline transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 group"
          style={{ fontFamily: "var(--font-inter, sans-serif)" }}
        >
          View all work
          <ArrowUpRight
            size={13}
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>

      {/* Asymmetric 2-col grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left column: card 1 (large) + card 3 (small) */}
        <div className="flex flex-col gap-5">
          <WorkCard card={WORK_CARDS[0]} />
          <WorkCard card={WORK_CARDS[2]} />
        </div>
        {/* Right column: card 2 (small) + card 4 (large) — offset top */}
        <div className="flex flex-col gap-5 md:mt-12">
          <WorkCard card={WORK_CARDS[1]} />
          <WorkCard card={WORK_CARDS[3]} />
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────

function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="border-t border-[#1F1F1F] py-28 lg:py-36"
      aria-label="Services"
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
                className="group flex items-center justify-between py-5 border-t border-[#1F1F1F] cursor-pointer transition-all duration-200"
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
                    className="text-[11px] text-[#3a3a3a] tabular-nums"
                    style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                  >
                    {service.index}
                  </span>
                  <span
                    className="text-[16px] text-white"
                    style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 500 }}
                  >
                    {service.name}
                  </span>
                </div>
                <ArrowRight
                  size={15}
                  className="text-[#3a3a3a] transition-all duration-300 group-hover:text-[#3B6BF7] group-hover:translate-x-1"
                />
              </div>
            ))}
            {/* Last border */}
            <div className="border-t border-[#1F1F1F]" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────

function Stats() {
  return (
    <section
      id="stats"
      className="border-t border-[#1F1F1F] py-20 lg:py-24 bg-[#0D0D0D]"
      aria-label="Statistics"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              id={`stat-${i + 1}`}
              className={`py-10 px-8 ${i !== 0 ? "border-l border-[#1F1F1F]" : ""} ${i >= 2 ? "border-t md:border-t-0 border-[#1F1F1F]" : ""}`}
            >
              <div
                className="text-[clamp(40px,4.5vw,60px)] text-white mb-2 leading-none"
                style={{
                  fontFamily: "Satoshi, sans-serif",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.number}
              </div>
              <div
                className="text-[13px] text-[#6B6B6B]"
                style={{ fontFamily: "var(--font-inter, sans-serif)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
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
      className="relative border-t border-[#1F1F1F] py-36 lg:py-44 overflow-hidden"
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
          className="text-white text-[15px]"
          style={{ fontFamily: "Satoshi, sans-serif", fontWeight: 500 }}
        >
          eluxspace
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Marquee />
      <FeaturedWork />
      <Services />
      <Stats />
      <CTASection />
      <Footer />
    </main>
  );
}
