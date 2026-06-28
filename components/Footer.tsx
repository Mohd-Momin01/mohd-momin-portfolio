import React from 'react';
import { Github, Linkedin, Youtube, Mail, ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socials = [
    { 
      name: 'GitHub',
      icon: Github, 
      href: "https://github.com/Mohd-Momin01",
      hoverColor: "hover:text-white hover:border-white/30 hover:bg-white/5"
    },
    { 
      name: 'LinkedIn',
      icon: Linkedin, 
      href: "https://www.linkedin.com/in/mohd-momin-58748b344/",
      hoverColor: "hover:text-brand-cyan hover:border-brand-cyan/30 hover:bg-brand-cyan/5"
    },
    { 
      name: 'Email',
      icon: Mail, 
      href: "mailto:khanmomin1166@gmail.com?subject=Opportunity%20%7C%20Momin.Analyst%20Portfolio",
      hoverColor: "hover:text-brand-accent hover:border-brand-accent/30 hover:bg-brand-accent/5"
    },
    { 
      name: 'YouTube',
      icon: Youtube, 
      href: "https://www.youtube.com/@The_Momin.Analyst",
      hoverColor: "hover:text-red-500 hover:border-red-500/30 hover:bg-red-500/5"
    }
  ];

  return (
    <footer className="bg-brand-dark/95 border-t border-white/5 relative overflow-hidden py-16">
      {/* Subtle radial ambient background glows to match premium cards */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-cyan/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Premium Brand Logo */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-6"
        >
          <span className="text-2xl font-bold font-sans tracking-tight text-white select-none">
            Momin<span className="text-brand-accent font-medium">.Analyst</span>
          </span>
        </motion.div>

        {/* Social Links Row */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-4 mb-8"
        >
          {socials.map((social, idx) => (
            <motion.a 
              key={idx}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              title={social.name}
              whileHover={{ y: -4, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-xl bg-white/[0.01] text-slate-400 border border-white/5 transition-all duration-300 shadow-md ${social.hoverColor}`}
            >
              <social.icon className="w-5 h-5 transition-transform" />
            </motion.a>
          ))}
        </motion.div>

        {/* Copyright & Subtexts */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center space-y-2 mb-8"
        >
          <p className="text-slate-500 text-sm font-medium">
            &copy; {new Date().getFullYear()} Mohd Momin. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs font-mono">
            Unlocking strategic growth through robust data pipelines & modeling.
          </p>
        </motion.div>

        {/* Back to Top button */}
        <motion.button 
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ y: -4, scale: 1.05, borderColor: "rgba(6, 182, 212, 0.4)", color: "#22d3ee", boxShadow: "0 10px 15px -3px rgba(6, 182, 212, 0.1)" }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/10 text-slate-500 text-xs font-mono font-medium transition-all duration-300 cursor-pointer shadow-lg bg-slate-950/40"
          title="Back to Top"
        >
          <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          <span>Back to Top</span>
        </motion.button>

      </div>
    </footer>
  );
};

export default Footer;
