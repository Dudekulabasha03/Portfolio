"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

const companies = [
  {
    id: "multifonds",
    companyName: "MULTIFONDS",
    period: "08/2026 – Present",
    logoText: "MF",
    logoGradient: "from-cyan-400 to-green-500",
    role: "AI Performance Engineer · Benchmarking & Inference Optimization",
    items: [
      {
        date: "08/2026 – Present",
        title: "AI Benchmarking & Performance Engineering",
        bullets: [
          "competitive analysis NVIDIA/AMD/Qualcomm measuring latency FPS memory power",
          "profiling using VTune Nsight Linux perf for CPU/GPU/NPU bottlenecks",
          "optimize PyTorch ONNX models quantization INT8/FP16 operator fusion 30% memory reduction",
          "Python C/C++ automation frameworks for benchmark execution telemetry reporting",
          "MLPerf benchmarks power efficiency Perf/Watt edge AI datacenter",
        ],
      },
    ],
  },
  {
    id: "infobell-amd",
    companyName: "INFOBELL IT — Client: AMD",
    period: "01/2022 – Present",
    logoText: "IT",
    logoGradient: "from-purple-500 to-indigo-600",
    role: "AI/ML Infrastructure & Applied AI Engineer",
    items: [
      {
        date: "02/2022 – 05/2024",
        title: "AI/ML Benchmarking & Infrastructure Automation",
        bullets: [
          "MLPerf LLaMA2 TPCx-AI on AMD Genoa Turin",
          "automation reduced 2 hours → 15 minutes",
          "Python Selenium BIOS/FPGA | MAAS | ScaleBench AI latency throughput TTFT",
        ],
      },
      {
        date: "11/2023 – Present",
        title: "Applied Generative AI Engineering",
        bullets: [
          "ConvoGene RAG chatbot",
          "EPP Agent LangGraph MCP",
          "RCA Troubleshooting multi-agent",
          "MCP-driven RAG for benchmark orchestration",
        ],
      },
      {
        date: "01/2025 – 02/2025",
        title: "Intelligent Document Processing",
        bullets: [
          "Gemini 2.5 Pro + pdf2image engineering drawings JSON metadata",
        ],
      },
      {
        date: "2024 – Present",
        title: "EPDW Hub — Agentic NLP Benchmark Assistance",
        bullets: [
          "NLP benchmark triggering | EPDW Tool APIs",
          "reduced benchmark setup overhead",
        ],
      },
      {
        date: "05/2025 – Present",
        title: "Cloud Deployment & LLM Inference Optimization",
        bullets: [
          "AWS Bedrock SageMaker | NVIDIA NIM low-latency",
          "LLaMA-2 70B FP8 on 8×H100 8×MI300",
          "AMD Venice Turin pre-release",
        ],
      },
    ],
  },
  {
    id: "infobell-ibm",
    companyName: "INFOBELL IT — Client: IBM",
    period: "08/2024 – Present",
    logoText: "IBM",
    logoGradient: "from-blue-500 to-cyan-500",
    role: "Data & AI Performance Engineer",
    items: [
      {
        date: "08/2024 – Present",
        title: "Big Data Benchmarking & Optimization",
        bullets: [
          "Hadoop Hive Spark Presto on AMD CPU clusters",
          "throughput scalability",
        ],
      },
      {
        date: "01/2025 – Present",
        title: "LLM Inference & Accelerator Performance Engineering",
        bullets: [
          "Granite-8B LLaMA-3.2-70B on Gaudi3 and H100",
          "Optimum Habana vLLM",
          "Gaudi3 vs H100 vs L4 comparative study",
        ],
      },
      {
        date: "04/2025 – Present",
        title: "Applied AI Solutions on IBM Cloud",
        bullets: [
          "AI Sandbox Chatbot Watson AI LangChain Pinecone",
        ],
      },
    ],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 bg-[#070d1a] text-slate-300 relative overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-cyan-400 font-mono text-sm tracking-widest mb-2 uppercase">
            // 03 — CAREER
          </h3>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            WORK EXPERIENCE
          </h2>
        </motion.div>

        {/* Experience Container */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 md:left-12 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.6)]" />

          <div className="space-y-20">
            {companies.map((company, companyIndex) => (
              <div key={company.id} className="relative z-10">
                {/* Company Header */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-6 mb-8 pl-12 md:pl-24 relative"
                >
                  <div className="absolute left-[9px] md:left-[41px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)] border-2 border-[#070d1a]" />
                  
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl bg-gradient-to-br ${company.logoGradient} shadow-lg shadow-cyan-500/20 shrink-0`}>
                    {company.logoText}
                  </div>
                  
                  <div>
                    <h4 className="text-2xl font-bold text-white leading-tight">
                      {company.companyName}
                    </h4>
                    <p className="text-cyan-300 font-medium text-sm md:text-base">
                      {company.role} <span className="text-slate-500 hidden md:inline-block mx-2">•</span> <span className="block md:inline-block text-slate-400 text-sm">{company.period}</span>
                    </p>
                  </div>
                </motion.div>

                {/* Timeline Items */}
                <div className="space-y-10">
                  {company.items.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: itemIndex * 0.15 }}
                      className="relative pl-12 md:pl-24 group"
                    >
                      <div className="absolute left-[13px] md:left-[45px] top-2 w-2 h-2 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors duration-300 shadow-[0_0_10px_rgba(34,211,238,0)] group-hover:shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                      
                      <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 md:p-8 backdrop-blur-sm hover:bg-white/[0.04] transition-colors duration-300">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                          <h5 className="text-lg md:text-xl font-semibold text-slate-100">
                            {item.title}
                          </h5>
                          <span className="text-xs md:text-sm font-mono text-cyan-400/80 px-3 py-1 rounded-full bg-cyan-500/10 shrink-0 self-start border border-cyan-500/20">
                            {item.date}
                          </span>
                        </div>
                        
                        <ul className="space-y-3">
                          {item.bullets.map((bullet, i) => (
                            <li key={i} className="flex items-start text-slate-400 leading-relaxed text-sm md:text-base">
                              <span className="text-cyan-500 mr-3 mt-1.5 text-[10px]">▶</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
