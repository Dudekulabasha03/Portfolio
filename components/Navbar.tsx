"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certs", href: "#certs" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((s) => {
        const el = s as HTMLElement;
        if (window.scrollY >= el.offsetTop - 120) setActive(el.id);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" as const }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? "bg-[#030711]/90 backdrop-blur-xl border-b border-cyan-500/10 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <a
        href="#hero"
        className="font-mono text-cyan-400 font-bold text-lg tracking-widest hover:text-cyan-300 transition-colors"
        style={{ fontFamily: "var(--font-orbitron, monospace)" }}
      >
        BASHA<span className="text-purple-500">.</span>AI
      </a>

      <ul className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className={`relative font-mono text-xs tracking-widest uppercase transition-colors duration-200 ${
                active === l.href.slice(1)
                  ? "text-cyan-400"
                  : "text-slate-400 hover:text-cyan-300"
              }`}
            >
              {l.label}
              {active === l.href.slice(1) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-cyan-400"
                />
              )}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="mailto:mahaboobbashadudekula3@gmail.com"
        className="hidden md:flex items-center gap-2 px-5 py-2 border border-cyan-500/50 rounded text-cyan-400 font-mono text-xs tracking-widest uppercase hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-200"
      >
        Hire Me
      </a>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden flex flex-col gap-1.5 p-2"
        aria-label="Toggle menu"
      >
        <motion.span
          animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          className="block w-6 h-px bg-cyan-400 origin-center"
        />
        <motion.span
          animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
          className="block w-6 h-px bg-cyan-400"
        />
        <motion.span
          animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          className="block w-6 h-px bg-cyan-400 origin-center"
        />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[#030711]/95 backdrop-blur-xl border-b border-cyan-500/10 p-6 flex flex-col gap-4 md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="font-mono text-sm tracking-widest uppercase text-slate-300 hover:text-cyan-400 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="mailto:mahaboobbashadudekula3@gmail.com"
              className="mt-2 px-5 py-3 border border-cyan-500/50 rounded text-cyan-400 font-mono text-xs tracking-widest uppercase text-center hover:bg-cyan-500/10 transition-all"
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
