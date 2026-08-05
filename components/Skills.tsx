'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const skillsData = [
  {
    category: '⚡ Gen AI & LLMs',
    color: 'cyan',
    tags: ['LangChain', 'LangGraph', 'RAG', 'Agentic RAG', 'vLLM', 'TGI', 'llama.cpp', 'Ollama', 'MCP Servers', 'CrewAI', 'LLaMA 2/3/3.1', 'Granite LLM', 'OpenAI', 'Gemini', 'ReAct', 'Chain-of-Thought']
  },
  {
    category: '☁ Cloud & MLOps',
    color: 'green',
    tags: ['AWS Bedrock', 'SageMaker', 'Lambda', 'API Gateway', 'EC2 S3 DynamoDB', 'Aurora', 'OpenSearch', 'IBM Cloud', 'MLflow', 'FastAPI', 'Docker', 'Kubernetes', 'Slurm', 'Airflow', 'n8n']
  },
  {
    category: '◈ Benchmarking & Inferencing',
    color: 'purple',
    tags: ['MLPerf', 'TPCx-AI', 'DLRM', 'TPC-H TPC-DS', 'NVIDIA NIMs', 'Optimum Habana', 'Intel IPEX', 'TensorRT', 'Tensor Parallelism', 'Multi-GPU Orchestration', 'Spark', 'Presto', 'Hadoop']
  },
  {
    category: '◉ ML Frameworks & Models',
    color: 'orange',
    tags: ['PyTorch', 'ONNX', 'TensorFlow', 'Hugging Face', 'Scikit-learn', 'XGBoost', 'Random Forest', 'YOLO', 'Transformers', 'FAISS', 'Pinecone', 'ChromaDB', 'Cohere']
  },
  {
    category: '⊞ Hardware & Accelerators',
    color: 'cyan',
    tags: ['NVIDIA H100 (8×)', 'NVIDIA L4', 'AMD MI300 (8×)', 'AMD Genoa Turin Venice', 'Intel Gaudi3', 'Intel Cascade Lake', 'Intel Sapphire Rapids', 'Qualcomm NPUs', 'OpenBMC', 'Dell iDRAC HP iLO', 'MAAS Bare Metal']
  },
  {
    category: '🔬 Profiling & Performance Tools',
    color: 'purple',
    tags: ['Intel VTune Profiler', 'NVIDIA Nsight Systems', 'NVIDIA Nsight Compute', 'Linux perf', 'PyTorch Profiler', 'ONNX Runtime', 'TensorRT', 'Latency Analysis', 'Throughput/FPS', 'Power Efficiency', 'Memory Bandwidth', 'Bottleneck Analysis']
  },
  {
    category: '💻 Languages & Systems',
    color: 'green',
    tags: ['Python', 'C', 'C++', 'Bash', 'SQL', 'Linux Internals', 'KVM', 'VMware ESXi', 'Hyper-V', 'x86 CPU Architecture']
  }
];

// Tailwind color maps for specific colors
const colorClasses: Record<string, { bg: string, text: string, border: string, glow: string }> = {
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-300', border: 'border-cyan-500/20', glow: 'hover:border-cyan-400/60' },
  green: { bg: 'bg-green-500/10', text: 'text-green-300', border: 'border-green-500/20', glow: 'hover:border-green-400/60' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-300', border: 'border-purple-500/20', glow: 'hover:border-purple-400/60' },
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-300', border: 'border-orange-500/20', glow: 'hover:border-orange-400/60' }
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    <section id="skills" className="py-24 bg-[#030711] relative overflow-hidden" ref={ref}>
      
      {/* Background gradients */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-gradient-radial from-cyan-900/10 to-transparent blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-radial from-purple-900/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-cyan-400 font-mono text-sm mb-3 tracking-widest">// 02 — TECH STACK</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">TECHNICAL SKILLS</h2>
        </motion.div>

        {/* Categories Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillsData.map((category, idx) => {
            const styles = colorClasses[category.color] || colorClasses.cyan;
            
            return (
              <motion.div 
                key={idx} 
                variants={cardVariants}
                whileHover="hover"
                className={`flex flex-col h-full rounded-2xl bg-[rgba(10,15,30,0.6)] border border-[rgba(255,255,255,0.05)] backdrop-blur-xl relative overflow-hidden transition-all duration-300 shadow-lg group ${styles.glow}`}
              >
                {/* Top Border Gradient */}
                <div className="h-1 w-full bg-gradient-to-r from-cyan-400 to-purple-500" />
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold text-white mb-6 tracking-wide flex items-center">
                    {category.category}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2.5">
                    {category.tags.map((tag, tagIdx) => (
                      <motion.span
                        key={tagIdx}
                        custom={tagIdx}
                        variants={{
                          hidden: { opacity: 0, scale: 0.8 },
                          visible: (i) => ({
                            opacity: 1, 
                            scale: 1,
                            transition: { delay: i * 0.05, duration: 0.3 }
                          })
                        }}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium border ${styles.bg} ${styles.text} ${styles.border} shadow-sm group-hover:shadow-md transition-shadow`}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
