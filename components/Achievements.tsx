import React from 'react';
import { motion } from 'motion/react';
import { Trophy, TrendingUp, Mic, BarChart3, Youtube, ExternalLink } from 'lucide-react';

interface MilestoneCardProps {
  icon: React.ComponentType<any>;
  title: string;
  achievement: string;
  glowColor: string;
  iconBg: string;
  iconColor: string;
  link?: { url: string; label: string };
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({ 
  icon: Icon, 
  title, 
  achievement, 
  glowColor, 
  iconBg, 
  iconColor,
  link
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ 
        y: -6, 
        borderColor: 'rgba(6, 182, 212, 0.35)', 
        boxShadow: '0 20px 40px -15px rgba(6, 182, 212, 0.15)' 
      }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      className="group relative rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-brand-cyan/20 backdrop-blur-md p-6 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between h-full"
    >
      {/* Premium backdrop radial glow effect */}
      <div className={`absolute -right-12 -bottom-12 w-32 h-32 bg-gradient-to-br ${glowColor} rounded-full blur-2xl opacity-40 group-hover:opacity-80 group-hover:scale-150 transition-all duration-700 pointer-events-none z-0`} />

      {/* Subtle border outline shine */}
      <div className="absolute inset-0 border border-transparent group-hover:border-white/5 rounded-2xl transition-colors duration-300 pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          {/* Header Layout with Icon & Badge */}
          <div className="flex items-center justify-between mb-5">
            <div className={`p-3 rounded-xl bg-white/5 border border-white/5 text-slate-400 group-hover:text-brand-cyan group-hover:border-brand-cyan/20 transition-all duration-300`}>
              <Icon className={`w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${iconColor}`} />
            </div>
            
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500 group-hover:text-brand-cyan transition-colors duration-300">
              Milestone Accomplished
            </span>
          </div>

          {/* Bold Title */}
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-accent transition-colors duration-300">
            {title}
          </h3>

          {/* One-line achievement */}
          <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300 leading-relaxed font-sans">
            {achievement}
          </p>
        </div>

        {/* Action Link inside card if applicable */}
        {link && (
          <div className="mt-6 pt-4 border-t border-white/5">
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-brand-cyan hover:text-brand-accent transition-colors duration-350 group/link"
            >
              <span>{link.label}</span>
              <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Achievements: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const milestones = [
    {
      icon: Youtube,
      title: 'Educational Content Creator',
      achievement: 'Built a growing YouTube community of 1,000+ subscribers, producing financial insights & trading guides.',
      glowColor: 'from-rose-500/20 to-red-500/5',
      iconColor: 'group-hover:text-rose-500',
      iconBg: 'bg-rose-500/10',
      link: { url: 'https://www.youtube.com/@The_Momin.Analyst', label: 'Visit YouTube Channel' }
    },
    {
      icon: TrendingUp,
      title: 'Market Behavior Analyst',
      achievement: 'Dedicated 5+ years to rigorous personal study of stock market cycles, price action, and volume dynamics.',
      glowColor: 'from-brand-cyan/20 to-blue-500/5',
      iconColor: 'group-hover:text-brand-cyan',
      iconBg: 'bg-brand-cyan/10'
    },
    {
      icon: Mic,
      title: 'Technical Communicator',
      achievement: 'Instructed and simplified multi-variable analytical datasets for general audiences to refine public communication.',
      glowColor: 'from-brand-accent/20 to-emerald-500/5',
      iconColor: 'group-hover:text-brand-accent',
      iconBg: 'bg-brand-accent/10'
    },
    {
      icon: BarChart3,
      title: 'End-to-End Analytics Developer',
      achievement: 'Assembled cohesive data architectures using Excel modeling, relational SQL engines, and Python systems.',
      glowColor: 'from-purple-500/20 to-indigo-500/5',
      iconColor: 'group-hover:text-purple-400',
      iconBg: 'bg-purple-500/10'
    }
  ];

  return (
    <section id="achievements" className="py-24 bg-brand-dark/50 relative border-t border-white/5 overflow-hidden">
      {/* Decorative center ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[120%] bg-brand-cyan/[0.01] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Milestones & Achievements</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-brand-accent to-brand-cyan rounded-full"></div>
        </motion.div>

        {/* Milestone Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {milestones.map((milestone, idx) => (
            <MilestoneCard
              key={idx}
              icon={milestone.icon}
              title={milestone.title}
              achievement={milestone.achievement}
              glowColor={milestone.glowColor}
              iconBg={milestone.iconBg}
              iconColor={milestone.iconColor}
              link={milestone.link}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Achievements;
