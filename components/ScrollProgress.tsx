import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  // Create a highly responsive and silky smooth momentum-based spring
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 26,
    restDelta: 0.001
  });

  return (
    <motion.div
      id="scroll-progress-bar"
      className="fixed top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-brand-accent to-brand-cyan origin-left z-[200] pointer-events-none shadow-[0_2px_10px_rgba(6,182,212,0.45)]"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
