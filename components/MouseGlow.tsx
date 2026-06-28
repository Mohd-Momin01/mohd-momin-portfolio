import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const MouseGlow: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs to avoid jerky movements and create an organic lag/momentum effect
  const springConfig = { damping: 40, stiffness: 220, mass: 0.8 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half of the glow width (300px / 2 = 150)
      mouseX.set(e.clientX - 150);
      mouseY.set(e.clientY - 150);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      id="cursor-ambient-glow"
      className="fixed inset-0 pointer-events-none z-[1] hidden lg:block overflow-hidden"
    >
      {/* Soft teal/emerald interactive spotlight following the cursor */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-br from-brand-cyan/8 via-brand-accent/5 to-transparent blur-[80px] opacity-75 mix-blend-screen"
        style={{
          x: glowX,
          y: glowY,
        }}
      />
    </motion.div>
  );
};

export default MouseGlow;
