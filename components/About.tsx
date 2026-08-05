'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const competencies = [
  'AI Benchmarking & Performance Analysis',
  'CPU/GPU/NPU Profiling (VTune/Nsight/perf)',
  'Generative AI & LLM Engineering',
  'RAG & Agentic AI Workflows',
  'Inference Pipeline Optimization',
  'Competitive Analysis AMD/NVIDIA/Qualcomm',
  'Cloud-Native AI Deployments',
  'GPU/Accelerator Performance',
  'MLPerf Benchmarking',
  'AI-Driven Root Cause Analysis',
  'Python & C/C++ Automation',
  'Linux Systems Engineering'
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    <section id="about" className="py-24 bg-[#070d1a] relative overflow-hidden" ref={ref}>
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[rgba(0,212,255,0.05)] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[rgba(138,43,226,0.05)] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-cyan-400 font-mono text-sm mb-3 tracking-widest">// 01 — WHO I AM</p>
          <div className="inline-block relative">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">ABOUT ME</h2>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-transparent rounded-full" />
          </div>
        </motion.div>

        {/* Bento Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          
          {/* Col 1: Avatar Card */}
          <motion.div variants={itemVariants} className="flex flex-col h-full rounded-3xl bg-[rgba(7,13,26,0.8)] border border-[rgba(0,212,255,0.15)] backdrop-blur-md p-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,212,255,0.03)] to-transparent pointer-events-none" />
            <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10">
              <div className="relative mb-6">
                <div className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 animate-[spin_4s_linear_infinite] opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative w-40 h-40 rounded-full bg-[#030711] overflow-hidden border-[3px] border-[#070d1a]">
                  {/* Note: In a real app, use next/image here */}
                  <img src="/photo.png" alt="Mahaboobbasha Dudekula" className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Mahaboobbasha Dudekula (Basha)</h3>
              <p className="text-cyan-400 font-medium mb-6">AI Performance Engineer</p>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-950/30 border border-green-500/30 text-green-400 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Available for Opportunities
              </div>
            </div>
          </motion.div>

          {/* Col 2: Bio Text Cards (Stacked) */}
          <div className="flex flex-col gap-6">
            <motion.div variants={itemVariants} className="flex-1 rounded-3xl bg-[rgba(7,13,26,0.8)] border border-[rgba(0,212,255,0.15)] backdrop-blur-md p-8 text-gray-300 leading-relaxed shadow-lg">
              <p className="mb-4">
                I am a results-driven <strong className="text-white font-medium">AI Performance Engineer</strong> with extensive experience leading benchmarks and performance optimizations at top-tier organizations like <strong className="text-cyan-400">Multifonds</strong>, <strong className="text-cyan-400">AMD</strong>, and <strong className="text-cyan-400">IBM</strong>.
              </p>
              <p>
                My expertise spans <strong className="text-white font-medium">AI benchmarking</strong>, generative AI, and detailed profiling using tools like <strong className="text-purple-400">VTune, Nsight, and perf</strong>. I excel at comprehensive competitive analysis across architectures like <strong className="text-white font-medium">AMD, NVIDIA, and Qualcomm</strong>, driving system-level innovations for complex workloads.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="rounded-3xl bg-[rgba(7,13,26,0.8)] border border-[rgba(0,212,255,0.15)] backdrop-blur-md p-6 flex flex-wrap gap-4 items-center justify-center sm:justify-start">
              <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 transition-all text-sm font-medium text-white group">
                <svg className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                GitHub
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 transition-all text-sm font-medium text-white group">
                <svg className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 transition-all text-sm font-medium text-white group">
                <svg className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="M22 6l-10 7L2 6" /></svg>
                Email
              </a>
            </motion.div>
          </div>

          {/* Col 3: Competencies Bento Grid */}
          <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-1 rounded-3xl bg-[rgba(7,13,26,0.8)] border border-[rgba(0,212,255,0.15)] backdrop-blur-md p-8 flex flex-col">
            <h3 className="text-xl font-bold text-white mb-6">Core Competencies</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 content-start">
              {competencies.map((comp, idx) => (
                <motion.div 
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  className="flex items-start gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  <span className="text-sm text-gray-300 font-medium leading-snug">{comp}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
