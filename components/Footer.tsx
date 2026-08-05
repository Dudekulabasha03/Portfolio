"use client";

export default function Footer() {
  return (
    <footer className="bg-[#070d1a] border-t border-cyan-500/10 py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500">
        <p className="text-center md:text-left">
          © 2026 <span className="text-cyan-400">Mahaboobbasha Dudekula</span> · AI Performance Engineer
        </p>
        <p className="text-center md:text-right">
          Built with <span className="text-cyan-400">Next.js</span> · <span className="text-cyan-400">Motion</span> · <span className="text-cyan-400">21st.dev</span>
        </p>
      </div>
    </footer>
  );
}
