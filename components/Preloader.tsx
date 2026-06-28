import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const Preloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [showPreloader, setShowPreloader] = useState(true);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);

  const skills = [
    "Python",
    "SQL",
    "Power BI",
    "Microsoft Excel",
    "Pandas & NumPy",
    "Business Intelligence",
    "Data Visualization",
    "Market Research",
    "Communication & Storytelling",
    "Git & GitHub"
  ];

  const taglines = [
    "Transforming Data into Decisions.",
    "Building Business Insights.",
    "Turning Raw Data into Actionable Intelligence.",
    "Solving Business Problems with Analytics.",
    "Creating Interactive Dashboards.",
    "Finding Stories Hidden in Data.",
    "Driving Smarter Decisions Through Analytics.",
    "Data Driven. Market Focused."
  ];

  useEffect(() => {
    // Total duration: 2.0 seconds (2000ms)
    const startTime = Date.now();
    const duration = 2000;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const percentage = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(Math.round(percentage));

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        const timeout = setTimeout(() => {
          setShowPreloader(false);
        }, 400);
        return () => clearTimeout(timeout);
      }
    };

    const frameId = requestAnimationFrame(updateProgress);

    // Rotate skills every 380ms
    const skillInterval = setInterval(() => {
      setCurrentSkillIndex((prev) => (prev + 1) % skills.length);
    }, 380);

    // Rotate taglines every 550ms
    const taglineInterval = setInterval(() => {
      setCurrentTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 550);

    return () => {
      cancelAnimationFrame(frameId);
      clearInterval(skillInterval);
      clearInterval(taglineInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {showPreloader && (
        <motion.div
          id="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -30,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } // Apple-like cubic bezier
          }}
          className="fixed inset-0 bg-brand-dark z-[9999] flex flex-col items-center justify-center p-6 select-none overflow-hidden"
        >
          {/* Extremely soft, dark ambient glow matching current premium dark theme */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-cyan/[0.02] rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-md w-full flex flex-col items-center relative z-10 text-center">
            
            {/* Minimal Logo */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <span className="text-3xl font-bold font-sans tracking-tight text-white">
                Momin<span className="text-brand-accent font-medium">.Analyst</span>
              </span>
            </motion.div>

            {/* Main Progress Indicator and Text */}
            <div className="w-64 space-y-4 mb-8">
              <div className="flex justify-between items-center px-0.5">
                <span className="text-slate-400 font-sans text-xs tracking-wider">
                  Loading Portfolio...
                </span>
                <span className="text-brand-cyan font-mono text-xs font-bold tracking-widest">
                  {progress}%
                </span>
              </div>

              {/* Ultra smooth, thin progress bar */}
              <div className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
                <div 
                  className="h-full bg-gradient-to-r from-brand-accent to-brand-cyan rounded-full transition-all duration-75 ease-out shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Rotating Skill Showcase - Fixed height to avoid jitter or layout shift */}
            <div className="h-10 flex items-center justify-center overflow-hidden w-full relative mb-1.5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`skill-${currentSkillIndex}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute text-brand-cyan font-mono text-sm tracking-widest font-semibold uppercase"
                >
                  {skills[currentSkillIndex]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Rotating Professional Tagline - Fixed height to avoid layout shift */}
            <div className="h-12 flex items-center justify-center overflow-hidden w-full relative">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`tagline-${currentTaglineIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute text-slate-400 text-xs md:text-sm font-sans tracking-wide max-w-sm px-4"
                >
                  {taglines[currentTaglineIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
