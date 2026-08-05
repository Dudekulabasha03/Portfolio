import type { Metadata } from "next";
import { Orbitron, Rajdhani, Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});
const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});
const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono-custom",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mahaboobbasha Dudekula | AI Performance Engineer",
  description:
    "AI Performance Engineer specializing in AI benchmarking, inference optimization, and profiling across NVIDIA, AMD, and Qualcomm platforms. Expert in VTune, Nsight, PyTorch, ONNX, and MLPerf.",
  keywords: [
    "AI Benchmarking",
    "AI Performance Engineer",
    "MLPerf",
    "VTune",
    "Nsight",
    "PyTorch",
    "ONNX",
    "GPU Profiling",
    "LLM Inference",
    "AMD MI300",
    "NVIDIA H100",
  ],
  openGraph: {
    title: "Mahaboobbasha Dudekula | AI Performance Engineer",
    description:
      "AI benchmarking expert profiling CPU/GPU/NPU pipelines with VTune, Nsight & perf across AMD, NVIDIA, Qualcomm.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${orbitron.variable} ${rajdhani.variable} ${shareTechMono.variable} bg-[#030711] text-slate-200 antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
