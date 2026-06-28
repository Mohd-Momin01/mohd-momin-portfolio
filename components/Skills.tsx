import React, { useState } from 'react';
import { 
  FileJson, 
  Database, 
  BarChart3, 
  GitBranch, 
  Terminal, 
  TrendingUp, 
  FileSpreadsheet,
  MessageSquare
} from 'lucide-react';
import { motion } from 'motion/react';
import { Skill } from '../types';

const skills: Skill[] = [
  { name: 'Python', icon: Terminal, category: 'Programming', level: 'Intermediate', progress: 60 },
  { name: 'SQL', icon: Database, category: 'Database', level: 'Intermediate', progress: 80 },
  { name: 'Pandas & NumPy', icon: FileJson, category: 'Data Analysis', level: 'Intermediate', progress: 75 },
  { name: 'Power BI', icon: BarChart3, category: 'Visualization', level: 'Intermediate', progress: 75 },
  { name: 'Microsoft Excel', icon: FileSpreadsheet, category: 'Analytics', level: 'Advanced', progress: 90 },
  { name: 'Git & GitHub', icon: GitBranch, category: 'Version Control', level: 'Intermediate', progress: 70 },
  { name: 'Stock Market Research', icon: TrendingUp, category: 'Domain Knowledge', level: 'Advanced', progress: 95 },
  { name: 'Communication & Storytelling', icon: MessageSquare, category: 'Soft Skills', level: 'Advanced', progress: 90 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const Skills: React.FC = () => {
  const [animatingSkill, setAnimatingSkill] = useState<string | null>(null);

  const handleMouseEnter = (name: string) => {
    if (animatingSkill !== name) {
      setAnimatingSkill(name);
    }
  };

  const handleAnimationEnd = () => {
    setAnimatingSkill(null);
  };

  return (
    <section id="skills" className="py-24 bg-brand-dark/50 relative border-y border-white/5 overflow-hidden">
      {/* Background radial soft glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[120%] bg-brand-cyan/[0.01] rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Clean Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16 relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Technical Arsenal</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-brand-accent to-brand-cyan rounded-full mb-6 mx-auto"></div>
          <p className="text-slate-400 text-lg leading-relaxed">
            A curated list of tools and technologies I use to drive insights and build solutions.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10"
        >
          {skills.map((skill, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -6, 
                scale: 1.02,
                borderColor: "rgba(6, 182, 212, 0.4)", // soft teal glow border
                boxShadow: "0 20px 40px -15px rgba(6, 182, 212, 0.15)"
              }}
              className={`group p-6 rounded-2xl bg-brand-card border border-white/5 hover:border-brand-cyan/30 hover:bg-white/[0.03] transition-all duration-300 flex flex-col items-center justify-between gap-5 text-center cursor-pointer relative overflow-hidden shadow-lg ${
                animatingSkill === skill.name ? 'flip-scale-2-hor-bottom-normal z-50' : ''
              }`}
              onMouseEnter={() => handleMouseEnter(skill.name)}
              onAnimationEnd={handleAnimationEnd}
            >
              {/* Soft teal glow on hover */}
              <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-gradient-to-br from-brand-cyan/15 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500 pointer-events-none z-0" />
              
              {/* Elegant border shine */}
              <div className="absolute inset-0 border border-transparent group-hover:border-brand-cyan/20 rounded-2xl transition-all duration-500 pointer-events-none z-0" />

              <div className="flex flex-col items-center gap-4 w-full relative z-10">
                <div className="p-4 rounded-full bg-slate-900 group-hover:bg-brand-cyan/15 transition-all duration-300">
                  <skill.icon className="w-8 h-8 text-slate-400 group-hover:text-brand-cyan group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" />
                </div>
                <div>
                  <h3 className="text-white font-medium group-hover:text-brand-cyan transition-colors duration-300">{skill.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{skill.category}</p>
                </div>
              </div>

              {/* Clean dynamic progress indicator */}
              <div className="w-full mt-2 relative z-10">
                <div className="flex justify-between items-center text-[10px] sm:text-xs mb-1.5 px-0.5">
                  <span className="text-slate-500 group-hover:text-brand-cyan transition-colors duration-300 font-medium">{skill.level}</span>
                  <span className="text-slate-400 font-semibold group-hover:text-brand-accent transition-colors duration-300">{skill.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-brand-cyan to-brand-accent rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
