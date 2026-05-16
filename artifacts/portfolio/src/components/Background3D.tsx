import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const Background3D: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  
  // Create rotation based on scroll
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Decorative gradient blobs */}
      <motion.div
        animate={{
          x: mousePosition.x * 0.5,
          y: mousePosition.y * 0.5,
        }}
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          x: -mousePosition.x * 0.3,
          y: -mousePosition.y * 0.3,
        }}
        className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-cyan-500/10 rounded-full blur-[100px]"
      />
      
      {/* 3D-like floating shapes */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.1, 0.2, 0.1],
              x: [0, Math.sin(i) * 100, 0],
              y: [0, Math.cos(i) * 100, 0],
              rotateZ: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: 100 + i * 40,
              height: 100 + i * 40,
              border: "1px solid rgba(255,255,255,0.03)",
              borderRadius: i % 2 === 0 ? "30% 70% 70% 30% / 30% 30% 70% 70%" : "50%",
              position: "absolute",
              top: `${20 + (i * 15) % 60}%`,
              left: `${10 + (i * 20) % 80}%`,
              rotate,
            }}
          />
        ))}
      </div>
      
      {/* Subtle Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} 
      />
    </div>
  );
};
