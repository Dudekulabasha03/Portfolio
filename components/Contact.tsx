"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";


export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-32 bg-[#030711] text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-cyan-400 font-mono text-sm mb-2">// 06 — LET'S CONNECT</p>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-100 tracking-tight">
            GET IN TOUCH
          </h2>
        </motion.div>

        <div className="relative inline-block w-full max-w-2xl" ref={ref}>
          {/* Animated gradient border */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden -z-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" as const }}
              className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(34,211,238,1)_360deg)] blur-xl opacity-50"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" as const }}
              className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(168,85,247,1)_360deg)] opacity-70"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#0a0f1c] m-[2px] rounded-[23px] p-8 md:p-12 border border-white/5 backdrop-blur-xl relative z-10"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-slate-100 mb-4">
              Open to Opportunities
            </h3>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              Whether it's a challenging AI benchmarking role, research collaboration, or freelance project — I'm ready to build something remarkable.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://github.com/Dudekulabasha03" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-full border border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-slate-200 font-medium transition-colors w-full sm:w-auto"
                >
                  GitHub
                </motion.button>
              </a>
              <a href="https://linkedin.com/in/bashadude" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-full border border-blue-500/50 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 font-medium transition-colors w-full sm:w-auto"
                >
                  LinkedIn
                </motion.button>
              </a>
              <a href="mailto:mahaboobbashadudekula3@gmail.com">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold transition-colors w-full sm:w-auto shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                >
                  Email Me
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
