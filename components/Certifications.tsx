"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const certifications = [
  {
    icon: "☁",
    title: "AWS Certified Solutions Architect – Associate",
    org: "Amazon Web Services · SAA-C03",
    bg: "bg-amber-500/20 text-amber-400",
  },
  {
    icon: "⎈",
    title: "Certified Kubernetes Administrator",
    org: "Linux Foundation · CKA",
    bg: "bg-cyan-500/20 text-cyan-400",
  },
  {
    icon: "🐧",
    title: "Linux Foundation Certified Sys Admin",
    org: "Linux Foundation · LFCS",
    bg: "bg-green-500/20 text-green-400",
  },
  {
    icon: "🐍",
    title: "PCAP – Certified Associate in Python",
    org: "Python Institute",
    bg: "bg-yellow-500/20 text-yellow-400",
  },
  {
    icon: "🤗",
    title: "Fundamentals of Agents",
    org: "Hugging Face · Professional Certificate",
    bg: "bg-orange-500/20 text-orange-400",
  },
  {
    icon: "◈",
    title: "IBM RAG and Agentic AI",
    org: "IBM · Coursera Professional Certificate",
    bg: "bg-blue-500/20 text-blue-400",
  },
  {
    icon: "⚡",
    title: "Complete Generative AI with LangChain & HF",
    org: "Professional Certificate",
    bg: "bg-purple-500/20 text-purple-400",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certs" className="py-24 bg-[#070d1a] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-12">
          <p className="text-cyan-400 font-mono text-sm mb-2">// 05 — CREDENTIALS</p>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-100 tracking-tight">
            EDUCATION & CERTIFICATIONS
          </h2>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {/* Education Card */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row items-start md:items-center gap-6 p-8 rounded-2xl bg-white/5 border border-purple-500/30 backdrop-blur-md shadow-lg"
          >
            <div className="w-16 h-16 shrink-0 flex items-center justify-center rounded-xl bg-purple-500/20 text-3xl">
              🎓
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-slate-100 mb-1">
                B.Tech in Computer Science & Engineering
              </h3>
              <p className="text-slate-400 text-lg mb-2">
                Madanapalle Institute of Technology & Science
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm font-mono">
                <span className="text-slate-500">May 2018 – June 2022</span>
                <span className="text-green-400">CGPA: 8.6 / 10.0</span>
              </div>
            </div>
          </motion.div>

          {/* Certifications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-all duration-300 flex flex-col h-full"
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-4 ${cert.bg}`}
                >
                  {cert.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-100 mb-2 leading-tight">
                  {cert.title}
                </h4>
                <p className="text-slate-400 text-sm mt-auto">{cert.org}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
