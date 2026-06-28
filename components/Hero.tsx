import React, { useState } from 'react';
import { EmailIcon } from './EmailIcon';
import { ChevronLast } from './ChevronLast';
import { Clock8 } from './Clock8';
import { Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'motion/react';

// Define static background particles with stable randomized properties
const BACKGROUND_PARTICLES = [
  { id: 1, size: 3, x: 12, y: 15, duration: 25, delay: -2, xOffset: 15 },
  { id: 2, size: 4, x: 25, y: 70, duration: 32, delay: -5, xOffset: -20 },
  { id: 3, size: 2, x: 80, y: 25, duration: 20, delay: -12, xOffset: 10 },
  { id: 4, size: 5, x: 45, y: 85, duration: 28, delay: -8, xOffset: 25 },
  { id: 5, size: 3, x: 65, y: 60, duration: 35, delay: -15, xOffset: -15 },
  { id: 6, size: 2, x: 88, y: 80, duration: 22, delay: -3, xOffset: 12 },
  { id: 7, size: 4, x: 15, y: 40, duration: 30, delay: -19, xOffset: -10 },
  { id: 8, size: 3, x: 72, y: 45, duration: 27, delay: -7, xOffset: 18 },
  { id: 9, size: 5, x: 35, y: 20, duration: 34, delay: -11, xOffset: -22 },
  { id: 10, size: 2, x: 55, y: 50, duration: 24, delay: -4, xOffset: 8 },
  { id: 11, size: 4, x: 92, y: 10, duration: 29, delay: -16, xOffset: -12 },
  { id: 12, size: 3, x: 5, y: 90, duration: 31, delay: -1, xOffset: 14 }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // premium out-expo
    },
  },
};

const Hero: React.FC = () => {
  const [isAnimatingHireMe, setIsAnimatingHireMe] = useState(false);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleHireMeClick = () => {
    window.location.href = "mailto:khanmomin1166@gmail.com?subject=Opportunity%20%7C%20Momin.Analyst%20Portfolio";
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMouseCoords({ x: x * 15, y: y * 15 });
  };

  const handleMouseLeave = () => {
    setMouseCoords({ x: 0, y: 0 });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden bg-brand-dark">
      
      {/* Background Gradient Overlays - Deep Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-cyan/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Elegant Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {BACKGROUND_PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-brand-cyan/20"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: [0, -120, 0],
              x: [0, p.xOffset, 0],
              opacity: [0, 0.35, 0.7, 0.35, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Column: Text Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 order-2 lg:order-1 text-center lg:text-left relative z-20"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-mono font-medium tracking-wide backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
            </span>
            AVAILABLE FOR DATA ROLES
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl"
          >
            Data Driven. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-cyan">
              Market Focused.
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed drop-shadow-md bg-black/20 backdrop-blur-sm rounded-lg p-2 border border-white/5"
          >
            Hi, I'm Mohd Momin. I am a passionate Data Analyst, Business Intelligence, Market Research, and Data Visualization Enthusiast with a strong analytical mindset developed through years of studying market behavior and data-driven decision making. My journey into analytics began with understanding how data influences business performance and profitability. My focus is on transforming complex datasets into actionable insights.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
          >
            <motion.button 
              onClick={handleHireMeClick}
              onMouseEnter={() => setIsAnimatingHireMe(true)}
              onAnimationEnd={() => setIsAnimatingHireMe(false)}
              whileHover={{ scale: 1.05, y: -2, boxShadow: "0 0 25px rgba(16, 185, 129, 0.45)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className={`cursor-pointer w-full sm:w-auto px-6 py-2.5 rounded-lg bg-brand-accent text-brand-dark font-bold hover:bg-emerald-400 transition-all duration-300 flex items-center justify-center gap-1 shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-95 group ${isAnimatingHireMe ? 'shake-horizontal-normal' : ''} flicker-1-normal`}
            >
              <div className="-my-2 -ml-2">
                <EmailIcon width={24} height={24} stroke="#050505" />
              </div>
              <span className={isAnimatingHireMe ? 'tracking-in-expand-fwd-bottom-normal' : ''}>Hire Me</span>
            </motion.button>
            
            <motion.a 
              href="#projects" 
              onClick={scrollToProjects}
              whileHover={{ scale: 1.05, y: -2, borderColor: "rgba(6, 182, 212, 0.5)", backgroundColor: "rgba(255, 255, 255, 0.08)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="cursor-pointer w-full sm:w-auto px-8 py-3.5 rounded-lg bg-white/5 border border-white/10 text-white font-medium transition-all flex items-center justify-center gap-1 hover:text-brand-cyan group backdrop-blur-sm"
            >
              <div className="-my-2 -ml-2">
                <ChevronLast width={24} height={24} stroke="currentColor" />
              </div>
              View Projects
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Column: Visual Hierarchy (Profile + Tagline) */}
        <div 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="order-1 lg:order-2 relative flex flex-col items-center justify-center h-[500px] lg:h-[600px] perspective-1000"
        >
            
            {/* Soft teal glow behind the image - pulsing & with subtle mouse follow */}
            <motion.div 
              animate={{ 
                scale: [1, 1.15, 1],
                opacity: [0.12, 0.22, 0.12],
                x: `calc(-50% + ${mouseCoords.x * 0.6}px)`,
                y: `calc(-50% + ${mouseCoords.y * 0.6}px)`
              }}
              transition={{ 
                scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                x: { type: "spring", stiffness: 80, damping: 20 },
                y: { type: "spring", stiffness: 80, damping: 20 }
              }}
              className="absolute top-1/2 left-1/2 w-[350px] h-[350px] bg-gradient-to-br from-brand-cyan/20 to-brand-accent/15 rounded-full blur-[80px] z-0 pointer-events-none"
            />

            {/* Main Profile Visuals - Foreground Focus (Floating, Interactive, and 3D tilting) */}
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
                x: mouseCoords.x,
                rotateX: -mouseCoords.y * 0.8,
                rotateY: mouseCoords.x * 0.8
              }}
              transition={{ 
                y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                x: { type: "spring", stiffness: 75, damping: 18 },
                rotateX: { type: "spring", stiffness: 75, damping: 18 },
                rotateY: { type: "spring", stiffness: 75, damping: 18 }
              }}
              className="relative z-20 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full aspect-square flex-shrink-0"
            >
                {/* Spinning Rings */}
                <div className="absolute inset-0 rounded-full border border-brand-accent/20 border-dashed animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-4 rounded-full border border-brand-cyan/20 border-dotted animate-[spin_15s_linear_infinite_reverse]"></div>
                
                {/* Subtle animated glowing border with slow breathing and teal glow */}
                <motion.div 
                  animate={{ 
                    opacity: [0.4, 0.75, 0.4],
                    scale: [0.98, 1.02, 0.98],
                    rotate: [0, 360],
                    boxShadow: [
                      "0 0 25px rgba(6, 182, 212, 0.25)",
                      "0 0 45px rgba(6, 182, 212, 0.5)",
                      "0 0 25px rgba(6, 182, 212, 0.25)"
                    ]
                  }}
                  transition={{ 
                    opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                    boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute inset-[18px] rounded-full bg-gradient-to-r from-brand-accent via-brand-cyan to-brand-accent blur-[3px] pointer-events-none"
                />

                {/* Image Container - Premium glassmorphism circle with hardware accelerated mask-clipping */}
                <div 
                  className="absolute inset-[22px] rounded-full bg-gradient-to-br from-brand-card to-slate-900 border border-white/15 overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:shadow-[0_0_55px_rgba(6,182,212,0.5)] transition-shadow duration-500 group"
                  style={{
                    transform: 'translate3d(0, 0, 0)',
                    WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                    maskImage: 'radial-gradient(circle, white 100%, transparent 100%)'
                  }}
                >
                    {/* Shadow overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-transparent to-black/10 z-10 pointer-events-none rounded-full" />
                    
                    {/* Soft interactive inner glow overlay */}
                    <div className="absolute inset-0 rounded-full pointer-events-none z-15 border border-brand-cyan/20 shadow-[inset_0_0_24px_rgba(6,182,212,0.45)] group-hover:shadow-[inset_0_0_35px_rgba(6,182,212,0.65)] transition-shadow duration-500" />
                    
                    {/* PROFILE IMAGE - rounded-full directly applied to prevent any clipping glitch */}
                    <img 
                      Profile Image
                      src="/images/Profile.png"
                      alt="Mohd Momin" 
                      className="w-full h-full object-cover opacity-90 rounded-full transform scale-100 group-hover:scale-[1.03] transition-transform duration-700 ease-out select-none pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Floating Badge */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 text-center w-max shadow-lg select-none pointer-events-none">
                      <p className="text-white text-sm font-bold">Mohd Momin</p>
                      <p className="text-brand-accent text-xs">Data Analyst</p>
                    </div>
                </div>

                {/* Floating Social Quick-Links Bar on the side of the profile picture */}
                <div className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4.5 z-30 bg-black/60 border border-white/10 backdrop-blur-md p-2.5 rounded-full shadow-[0_0_25px_rgba(0,0,0,0.5)]">
                  <motion.a 
                    href="mailto:khanmomin1166@gmail.com?subject=Opportunity%20%7C%20Momin.Analyst%20Portfolio"
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-slate-400 hover:text-brand-accent transition-colors duration-200 p-1 block"
                    title="Send Email"
                  >
                    <Mail className="w-5 h-5" />
                  </motion.a>
                  
                  <div className="h-[1px] w-full bg-white/10"></div>
                  
                  <motion.a 
                    href="https://www.linkedin.com/in/mohd-momin-58748b344/" 
                    target="_blank" 
                    rel="noreferrer"
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-slate-400 hover:text-brand-cyan transition-colors duration-200 p-1 block"
                    title="Connect on LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                  
                  <div className="h-[1px] w-full bg-white/10"></div>
                  
                  <motion.a 
                    href="https://github.com/Mohd-Momin01" 
                    target="_blank" 
                    rel="noreferrer"
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-slate-400 hover:text-white transition-colors duration-200 p-1 block"
                    title="GitHub Profile"
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                </div>
            </motion.div>

            {/* Tagline Badge - Moved below profile */}
            <div className="mt-8 z-30 flex items-center gap-3 bg-black/40 px-4 py-2 rounded-full border border-white/5 backdrop-blur-md">
               <Clock8 width={20} height={20} stroke="currentColor" className="text-brand-cyan drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
               <p className="text-sm font-medium text-brand-cyan tracking-wide drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
                 Right insights. Right time.
               </p>
            </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
