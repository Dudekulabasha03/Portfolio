'use client';

import { useState } from 'react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const models = [
  { id: '7b', label: '7B / 8B (LLaMA-3 / Granite)', baseLatency: 120, baseTps: 45, baseVram: 16 },
  { id: '13b', label: '13B / 14B (Medium LLM)', baseLatency: 220, baseTps: 28, baseVram: 28 },
  { id: '70b', label: '70B (LLaMA-3.1 / Granite-70B)', baseLatency: 650, baseTps: 12, baseVram: 140 },
];

const hardware = [
  { id: 'h100', label: 'NVIDIA 8×H100 SXM5', mult: 0.5, name: 'NVIDIA H100 Cluster' },
  { id: 'mi300', label: 'AMD 8×MI300X (192GB)', mult: 0.52, name: 'AMD MI300X Accelerator' },
  { id: 'gaudi3', label: 'Intel Gaudi3 AI Accelerator', mult: 0.65, name: 'Intel Gaudi3 Setup' },
  { id: 'qualcomm', label: 'Qualcomm NPU (Edge AI)', mult: 0.8, name: 'Qualcomm NPU Engine' },
];

const optimizations = [
  { id: 'quant', label: 'INT8 / FP8 Quantization', latencyMult: 0.65, tpsMult: 1.6, vramMult: 0.5 },
  { id: 'fusion', label: 'PyTorch / ONNX Operator Fusion', latencyMult: 0.8, tpsMult: 1.25, vramMult: 0.85 },
  { id: 'vllm', label: 'vLLM & Tensor Parallelism', latencyMult: 0.55, tpsMult: 2.1, vramMult: 0.7 },
  { id: 'flash', label: 'FlashAttention-2 Kernel Tuning', latencyMult: 0.75, tpsMult: 1.4, vramMult: 0.8 },
];

export default function BenchmarkCalculator() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [selectedHw, setSelectedHw] = useState(hardware[0]);
  const [selectedOpts, setSelectedOpts] = useState<string[]>(['quant', 'vllm']);

  const toggleOpt = (id: string) => {
    if (selectedOpts.includes(id)) {
      if (selectedOpts.length > 1) setSelectedOpts(selectedOpts.filter(o => o !== id));
    } else {
      setSelectedOpts([...selectedOpts, id]);
    }
  };

  // Compute Metrics
  let latMult = selectedHw.mult;
  let tpsMult = 1 / selectedHw.mult;
  let vramMult = 1.0;

  selectedOpts.forEach(optId => {
    const optObj = optimizations.find(o => o.id === optId);
    if (optObj) {
      latMult *= optObj.latencyMult;
      tpsMult *= optObj.tpsMult;
      vramMult *= optObj.vramMult;
    }
  });

  const finalLatency = Math.round(selectedModel.baseLatency * latMult);
  const latencyReduction = Math.round((1 - (finalLatency / selectedModel.baseLatency)) * 100);

  const finalTps = Math.round(selectedModel.baseTps * tpsMult);
  const tpsBoost = (finalTps / selectedModel.baseTps).toFixed(1);

  const finalVram = Math.round(selectedModel.baseVram * vramMult);
  const vramSavings = Math.round((1 - (finalVram / selectedModel.baseVram)) * 100);

  return (
    <section id="calculator" className="py-24 bg-[#030711] relative overflow-hidden" ref={ref}>
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          className="mb-16 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-green-400 font-mono text-xs tracking-[3px] uppercase mb-2">// 04.5 — INTERACTIVE TOOL</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-wider uppercase font-orbitron">
            BENCHMARK <span className="text-cyan-400">IMPACT CALCULATOR</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-3 rounded-full" />
          <p className="text-slate-400 mt-4 text-sm sm:text-base font-rajdhani">
            Simulate the performance gains achieved by applying targeted AI quantization, kernel tuning, and accelerator optimizations.
          </p>
        </motion.div>

        {/* Calculator Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl bg-[#070d1a]/90 border border-cyan-500/20 backdrop-blur-xl p-8 sm:p-12 shadow-[0_0_50px_rgba(0,212,255,0.1)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Controls Col */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Step 1: Model Selection */}
              <div>
                <label className="block text-cyan-400 font-mono text-xs tracking-widest uppercase mb-3">
                  1. Select Target LLM / Model Architecture
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {models.map(m => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedModel(m)}
                      className={`px-4 py-3 rounded-xl border text-xs font-mono transition-all text-left ${
                        selectedModel.id === m.id
                          ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300 shadow-[0_0_15px_rgba(0,212,255,0.3)]'
                          : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Target Hardware */}
              <div>
                <label className="block text-cyan-400 font-mono text-xs tracking-widest uppercase mb-3">
                  2. Select Target Hardware / Accelerator
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {hardware.map(h => (
                    <button
                      key={h.id}
                      onClick={() => setSelectedHw(h)}
                      className={`px-4 py-3 rounded-xl border text-xs font-mono transition-all text-left ${
                        selectedHw.id === h.id
                          ? 'border-purple-500 bg-purple-500/10 text-purple-300 shadow-[0_0_15px_rgba(123,47,255,0.3)]'
                          : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {h.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Optimizations */}
              <div>
                <label className="block text-cyan-400 font-mono text-xs tracking-widest uppercase mb-3">
                  3. Select Optimization Techniques Applied
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {optimizations.map(opt => {
                    const isSelected = selectedOpts.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        onClick={() => toggleOpt(opt.id)}
                        className={`px-4 py-3 rounded-xl border text-xs font-mono transition-all text-left flex items-center justify-between ${
                          isSelected
                            ? 'border-green-400 bg-green-500/10 text-green-300 shadow-[0_0_15px_rgba(0,255,136,0.2)]'
                            : 'border-slate-800 bg-slate-900/50 text-slate-500 hover:border-slate-700'
                        }`}
                      >
                        <span>{opt.label}</span>
                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                          isSelected ? 'border-green-400 bg-green-400 text-black font-bold' : 'border-slate-700'
                        }`}>
                          {isSelected ? '✓' : ''}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Results Display Col */}
            <div className="lg:col-span-5 bg-[#030711] border border-cyan-500/30 rounded-2xl p-8 relative overflow-hidden text-center shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <p className="text-slate-400 font-mono text-xs tracking-widest uppercase mb-6">
                ESTIMATED OPTIMIZATION METRICS
              </p>

              {/* Stat Cards */}
              <div className="space-y-6">
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                  <p className="text-slate-400 text-xs font-mono uppercase mb-1">Inference Latency</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-3xl sm:text-4xl font-bold font-orbitron text-cyan-400">{finalLatency} ms</span>
                    <span className="text-green-400 font-mono text-sm">(-{latencyReduction}%)</span>
                  </div>
                  <p className="text-slate-500 text-[11px] font-mono mt-1">Base: {selectedModel.baseLatency} ms</p>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                  <p className="text-slate-400 text-xs font-mono uppercase mb-1">Throughput Boost</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-3xl sm:text-4xl font-bold font-orbitron text-purple-400">{finalTps} tok/s</span>
                    <span className="text-green-400 font-mono text-sm">(+{tpsBoost}×)</span>
                  </div>
                  <p className="text-slate-500 text-[11px] font-mono mt-1">Base: {selectedModel.baseTps} tok/s</p>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                  <p className="text-slate-400 text-xs font-mono uppercase mb-1">Memory VRAM Footprint</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-3xl sm:text-4xl font-bold font-orbitron text-green-400">{finalVram} GB</span>
                    <span className="text-green-400 font-mono text-sm">(-{vramSavings}%)</span>
                  </div>
                  <p className="text-slate-500 text-[11px] font-mono mt-1">Base: {selectedModel.baseVram} GB</p>
                </div>
              </div>

              <a
                href="mailto:mahaboobbashadudekula3@gmail.com"
                className="mt-6 inline-flex items-center justify-center w-full py-3 border border-cyan-500/50 rounded-xl text-cyan-400 font-mono text-xs tracking-widest uppercase hover:bg-cyan-500/10 transition-all shadow-[0_0_20px_rgba(0,212,255,0.2)]"
              >
                Request Custom Benchmark Audit
              </a>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
