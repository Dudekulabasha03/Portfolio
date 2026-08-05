'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import * as THREE from 'three';

const roles = [
  'AI Performance Engineer',
  'AI Benchmarking Expert',
  'LLM Inference Optimizer',
  'MLPerf Specialist'
];

export default function Hero() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Typewriter effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      if (displayText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
        timer = setTimeout(() => {}, 500); // pause before typing
      } else {
        timer = setTimeout(() => setDisplayText(currentRole.substring(0, displayText.length - 1)), 50);
      }
    } else {
      if (displayText === currentRole) {
        timer = setTimeout(() => setIsDeleting(true), 2000); // pause before deleting
      } else {
        timer = setTimeout(() => setDisplayText(currentRole.substring(0, displayText.length + 1)), 100);
      }
    }
    
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  // Three.js Canvas
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#030711');
    scene.fog = new THREE.FogExp2('#030711', 0.02);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Particle System
    const particleCount = 180;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 40;     // x
      positions[i + 1] = (Math.random() - 0.5) * 40; // y
      positions[i + 2] = (Math.random() - 0.5) * 40; // z
      
      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      });
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00d4ff,
      size: 0.15,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Lines for connections
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });

    // Floating Geometries
    const geometries = [
      { geo: new THREE.IcosahedronGeometry(2, 0), color: 0x7b2fff }, // Purple
      { geo: new THREE.OctahedronGeometry(1.5, 0), color: 0x00d4ff }, // Cyan
      { geo: new THREE.TetrahedronGeometry(1.8, 0), color: 0x00ff88 }, // Green
      { geo: new THREE.TorusGeometry(1.2, 0.4, 8, 20), color: 0xff8800 } // Orange
    ];

    const floatingObjects: THREE.LineSegments[] = [];

    geometries.forEach(({ geo, color }) => {
      const edges = new THREE.EdgesGeometry(geo);
      const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.5 });
      const mesh = new THREE.LineSegments(edges, material);
      
      mesh.position.x = (Math.random() - 0.5) * 30;
      mesh.position.y = (Math.random() - 0.5) * 20;
      mesh.position.z = (Math.random() - 0.5) * 20;
      
      mesh.userData = {
        rx: (Math.random() - 0.5) * 0.02,
        ry: (Math.random() - 0.5) * 0.02,
        rz: (Math.random() - 0.5) * 0.02,
        yOffset: Math.random() * Math.PI * 2,
        speed: 0.001 + Math.random() * 0.002
      };
      
      scene.add(mesh);
      floatingObjects.push(mesh);
    });

    let animationFrameId: number;
    const CONN_DIST = 2.8;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const positions = particleSystem.geometry.attributes.position.array as Float32Array;

      // Update particles
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] += velocities[i].x;
        positions[i3 + 1] += velocities[i].y;
        positions[i3 + 2] += velocities[i].z;

        // Bounce off bounds
        if (Math.abs(positions[i3]) > 20) velocities[i].x *= -1;
        if (Math.abs(positions[i3 + 1]) > 20) velocities[i].y *= -1;
        if (Math.abs(positions[i3 + 2]) > 20) velocities[i].z *= -1;
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;

      // Update connections
      const linePositions = [];
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < CONN_DIST) {
            linePositions.push(
              positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
              positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
            );
          }
        }
      }

      // Recreate lines
      scene.children = scene.children.filter(child => child.type !== 'LineSegments' || floatingObjects.includes(child as THREE.LineSegments));
      
      if (linePositions.length > 0) {
        const lineGeo = new THREE.BufferGeometry();
        lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        const lines = new THREE.LineSegments(lineGeo, lineMaterial);
        scene.add(lines);
      }

      // Rotate floating objects
      const time = Date.now();
      floatingObjects.forEach((obj) => {
        obj.rotation.x += obj.userData.rx;
        obj.rotation.y += obj.userData.ry;
        obj.rotation.z += obj.userData.rz;
        obj.position.y += Math.sin(time * obj.userData.speed + obj.userData.yOffset) * 0.02;
      });

      // Slowly rotate entire system
      particleSystem.rotation.y += 0.001;
      
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } }
  };

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden bg-[#030711]">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes glitch {
          0% { text-shadow: 0.05em 0 0 #00d4ff, -0.05em -0.025em 0 #7b2fff, -0.025em 0.05em 0 #00ff88; }
          14% { text-shadow: 0.05em 0 0 #00d4ff, -0.05em -0.025em 0 #7b2fff, -0.025em 0.05em 0 #00ff88; }
          15% { text-shadow: -0.05em -0.025em 0 #00d4ff, 0.025em 0.025em 0 #7b2fff, -0.05em -0.05em 0 #00ff88; }
          49% { text-shadow: -0.05em -0.025em 0 #00d4ff, 0.025em 0.025em 0 #7b2fff, -0.05em -0.05em 0 #00ff88; }
          50% { text-shadow: 0.025em 0.05em 0 #00d4ff, 0.05em 0 0 #7b2fff, 0 -0.05em 0 #00ff88; }
          99% { text-shadow: 0.025em 0.05em 0 #00d4ff, 0.05em 0 0 #7b2fff, 0 -0.05em 0 #00ff88; }
          100% { text-shadow: -0.025em 0 0 #00d4ff, -0.025em -0.025em 0 #7b2fff, -0.025em -0.05em 0 #00ff88; }
        }
        .glitch-text {
          animation: glitch 3s infinite;
        }
      `}} />
      
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none opacity-60" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6 flex items-center gap-2 px-4 py-2 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/5 backdrop-blur-md">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00ff88]"></span>
            </span>
            <span className="text-xs font-semibold tracking-widest text-[#00d4ff]">AI PERFORMANCE ENGINEER</span>
          </motion.div>

          {/* Name */}
          <motion.div variants={itemVariants} className="mb-4 flex flex-col items-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 font-['Orbitron',sans-serif] uppercase glitch-text">
              MAHABOOBBASHA
            </h1>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7b2fff] font-['Orbitron',sans-serif] uppercase mt-2">
              DUDEKULA
            </h1>
          </motion.div>

          {/* Typewriter Role */}
          <motion.div variants={itemVariants} className="h-10 mb-6 text-xl md:text-3xl font-medium text-gray-300">
            <span className="mr-1">&gt;</span>
            <span className="text-[#00ff88]">{displayText}</span>
            <span className="animate-pulse">_</span>
          </motion.div>

          {/* Subtext */}
          <motion.p variants={itemVariants} className="max-w-3xl mb-10 text-sm md:text-base text-gray-400 leading-relaxed">
            Engineering the future with AI benchmarking, LLMs, and high-performance inferencing.
            <br className="hidden md:block" />
            <span className="text-gray-500 mt-2 inline-block">Multifonds · AMD · IBM · VTune · Nsight · PyTorch · ONNX · MLPerf</span>
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 mb-16">
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="px-8 py-4 bg-[#00d4ff] text-[#030711] font-bold rounded-lg shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-shadow hover:shadow-[0_0_30px_rgba(0,212,255,0.6)]"
            >
              View Projects
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-8 py-4 bg-transparent text-white border-2 border-[#7b2fff] font-bold rounded-lg shadow-[0_0_20px_rgba(123,47,255,0.2)] transition-shadow hover:shadow-[0_0_30px_rgba(123,47,255,0.4)] hover:bg-[#7b2fff]/10"
            >
              Contact Me
            </motion.a>
          </motion.div>

          {/* Stats Row */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 border-t border-white/10 pt-8 w-full max-w-4xl">
            {[
              { label: 'Years Exp', value: '4+' },
              { label: 'Projects', value: '15+' },
              { label: 'Certifications', value: '7' },
              { label: 'Major Clients', value: '3' }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-black text-white mb-1 font-['Orbitron',sans-serif]">{stat.value}</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center"
      >
        <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" as const }}
          className="w-5 h-8 border-2 border-gray-500 rounded-full flex justify-center p-1"
        >
          <div className="w-1 h-2 bg-[#00d4ff] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
