"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";

const filters = [
  { id: "all", label: "All" },
  { id: "genai", label: "Gen AI" },
  { id: "mlops", label: "MLOps" },
  { id: "bench", label: "Benchmarking" },
  { id: "auto", label: "Automation" },
];

const projects = [
  {
    id: 1,
    category: "bench",
    isWide: true,
    title: "Cross-Platform AI Benchmarking Suite",
    description:
      "End-to-end tool for LLM CNN on AMD MI300 NVIDIA H100 Qualcomm NPUs, latency memory FPS power, 60% time reduction.",
    tags: ["PyTorch", "ONNX", "Python", "C++", "VTune", "Nsight", "MLPerf"],
    github: "#",
  },
  {
    id: 2,
    category: "bench",
    isWide: true,
    title: "MLPerf Inference Optimization — Edge & Datacenter",
    description:
      "ResNet BERT optimization, Nsight Compute CUDA kernel 2.5× speedup, Perf/Watt.",
    tags: ["MLPerf", "TensorRT", "ONNX", "Nsight Compute", "CUDA C++", "INT8/FP16"],
    github: "#",
  },
  {
    id: 3,
    category: "bench",
    isWide: false,
    title: "ScaleBench AI",
    description:
      "LLM Inference Benchmarking Tool - vLLM TGI Ollama LlamaCPP, latency throughput TTFT.",
    tags: ["vLLM", "TGI", "Python", "Matplotlib", "REST APIs"],
    github: "#",
  },
  {
    id: 4,
    category: "bench",
    isWide: false,
    title: "GPU-Accelerated LLM Inference",
    description:
      "High-performance inference platform using vLLM Docker Slurm NVIDIA H100 AMD MI300.",
    tags: ["vLLM", "Docker", "Slurm", "NVIDIA H100", "AMD MI300"],
    github: "#",
  },
  {
    id: 5,
    category: "bench",
    isWide: false,
    title: "IBM Sandbox Playground",
    description:
      "Model Benchmarking - BERT RoBERTa LLaMA on Gaudi3 H100.",
    tags: ["Gaudi3", "NVIDIA H100", "Spark", "Presto"],
    github: "#",
  },
  {
    id: 6,
    category: "genai",
    isWide: false,
    title: "EPDW Hub",
    description:
      "Agentic NLP Benchmark Assistance - NLP benchmark system EPDW APIs.",
    tags: ["Agentic AI", "NLP", "LangGraph", "EPDW API"],
    github: "#",
  },
  {
    id: 7,
    category: "genai",
    isWide: false,
    title: "RCAgen AI",
    description:
      "Autonomous Troubleshooting System - LangGraph MCP multi-agent RCA.",
    tags: ["LangGraph", "LangChain", "MCP", "Multi-Agent"],
    github: "#",
  },
  {
    id: 8,
    category: "genai",
    isWide: false,
    title: "ConvoGene",
    description:
      "Production RAG Chatbot - hybrid retrieval AMD teams PDFs.",
    tags: ["LangChain", "OpenAI", "RAG", "Streamlit", "Cohere"],
    github: "#",
  },
  {
    id: 9,
    category: "genai",
    isWide: false,
    title: "EPP Agent",
    description:
      "NLP-Driven Data Fetcher - LangGraph MongoDB MCP access control.",
    tags: ["LangGraph", "MongoDB", "MCP", "NLP"],
    github: "#",
  },
  {
    id: 10,
    category: "genai",
    isWide: false,
    title: "Generative AI Support Bot",
    description:
      "Generative AI Customer Support Bot with AWS Bedrock FAISS OpenSearch.",
    tags: ["AWS Bedrock", "FAISS", "LangChain", "Slack API"],
    github: "#",
  },
  {
    id: 11,
    category: "genai",
    isWide: false,
    title: "Voice Agentic AI",
    description:
      "Voice Agentic AI Assistant - voice-enabled STT/TTS workflows.",
    tags: ["Voice AI", "Agentic", "STT/TTS", "LLM"],
    github: "#",
  },
  {
    id: 12,
    category: "genai",
    isWide: false,
    title: "Test Execution Validation Agent",
    description:
      "Cross-analyze Hercules logs videos JUnit using multi-modal agents.",
    tags: ["LangGraph", "Multi-Modal", "JUnit", "QA Automation"],
    github: "#",
  },
  {
    id: 13,
    category: "mlops",
    isWide: false,
    title: "Serverless RAG Architecture",
    description:
      "AWS based Serverless RAG - API Gateway Lambda Bedrock OpenSearch S3.",
    tags: ["AWS Bedrock", "OpenSearch", "Lambda", "Titan Embeddings"],
    github: "#",
  },
  {
    id: 14,
    category: "mlops",
    isWide: false,
    title: "AI Executive Summary Agent",
    description:
      "AWS Serverless pipeline for benchmark reports using Bedrock Nova Pro.",
    tags: ["Bedrock Nova Pro", "Lambda", "Aurora", "Multi-Agent"],
    github: "#",
  },
  {
    id: 15,
    category: "mlops",
    isWide: false,
    title: "Mobile Inventory Prediction",
    description:
      "Prediction Pipeline using Random Forest XGBoost FastAPI MLflow.",
    tags: ["XGBoost", "FastAPI", "MLflow", "AWS EC2", "DynamoDB"],
    github: "#",
  },
  {
    id: 16,
    category: "auto",
    isWide: false,
    title: "AI Travel Assistant",
    description:
      "Web Automation assistant built with CrewAI ReAct Gradio Playwright.",
    tags: ["CrewAI", "Playwright", "Ollama", "Groq", "Gradio"],
    github: "#",
  },
  {
    id: 17,
    category: "auto",
    isWide: false,
    title: "n8n AI Workflow Suite",
    description:
      "Automation Suite using Gemini-2 Flash WhatsApp Telegram workflows.",
    tags: ["n8n", "Gemini 2", "WhatsApp API", "Telegram"],
    github: "#",
  },
];

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, layout: { duration: 0.3 } }}
      className={`group relative ${
        project.isWide ? "md:col-span-2" : "col-span-1"
      } perspective-1000`}
    >
      <motion.div
        className="w-full h-full bg-white/[0.03] backdrop-blur-md border border-white/[0.08] rounded-2xl p-6 md:p-8 flex flex-col justify-between overflow-hidden relative"
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Hover Border Effect */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl z-[-1]" />

        <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
          <div className="flex justify-between items-start mb-6">
            <span className="text-xs font-mono font-medium text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full uppercase tracking-wider border border-cyan-500/20">
              {filters.find((f) => f.id === project.category)?.label}
            </span>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path>
              </svg>
            </a>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">
            {project.title}
          </h3>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 relative z-10" style={{ transform: "translateZ(20px)" }}>
          {project.tags.map((tag: string, i: number) => (
            <span
              key={i}
              className="text-xs font-medium text-slate-300 bg-white/[0.05] border border-white/[0.1] px-2.5 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filteredProjects = projects.filter(
    (p) => activeFilter === "all" || p.category === activeFilter
  );

  return (
    <section id="projects" className="py-24 bg-[#030711] text-slate-300 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <h3 className="text-cyan-400 font-mono text-sm tracking-widest mb-2 uppercase">
              // 04 — PORTFOLIO
            </h3>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              FEATURED PROJECTS
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center md:justify-end gap-2 md:gap-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                    : "bg-white/[0.03] text-slate-400 border border-white/[0.08] hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Bento Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
