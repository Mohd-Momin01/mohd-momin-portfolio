import React from 'react';
import { Database, BarChart3, TrendingUp, Users } from 'lucide-react';
import { motion } from 'motion/react';

interface HighlightCardProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  glowColor: string;
}

const HighlightCard: React.FC<HighlightCardProps> = ({ icon: Icon, title, description, glowColor }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 25 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ 
        y: -6, 
        scale: 1.02,
        borderColor: "rgba(6, 182, 212, 0.4)", // soft teal glow border
        boxShadow: "0 20px 40px -15px rgba(6, 182, 212, 0.15)"
      }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
      className="group relative rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/10 hover:border-brand-cyan/30 backdrop-blur-md p-6 transition-all duration-300 shadow-lg overflow-hidden flex flex-col justify-between"
    >
      {/* Soft background glow */}
      <div className={`absolute -right-12 -bottom-12 w-32 h-32 bg-gradient-to-br ${glowColor} rounded-full blur-2xl opacity-60 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700 pointer-events-none z-0`} />
      
      {/* Subtle border outline shine */}
      <div className="absolute inset-0 border border-transparent group-hover:border-white/5 rounded-2xl transition-colors duration-300 pointer-events-none z-0" />

      <div className="relative z-10">
        {/* Icon Frame */}
        <div className="p-3 bg-white/[0.03] border border-white/5 rounded-xl w-fit mb-5 text-brand-cyan group-hover:text-brand-accent group-hover:border-brand-cyan/20 transition-all duration-300">
          <Icon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110" />
        </div>

        {/* Card Title */}
        <h3 className="text-lg font-bold text-white group-hover:text-brand-cyan transition-colors duration-300 mb-2">
          {title}
        </h3>

        {/* Card Description */}
        <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  return (
    <section id="about" className="py-24 bg-brand-dark relative overflow-hidden">
      {/* Accent vector backgrounds */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-accent/[0.01] rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About Me</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-brand-accent to-brand-cyan rounded-full"></div>
        </motion.div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Concise copywriting */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 space-y-6"
          >
            <p className="text-xl font-medium text-white leading-relaxed">
              Bridging the gap between <span className="text-brand-accent">raw data</span> and <span className="text-brand-cyan">strategic insights</span>.
            </p>
            <p className="text-slate-350 leading-relaxed text-base">
              I am a Computer Science Engineering student specializing in Data Analytics and Business Intelligence. My interest in data analysis is fueled by an innate curiosity about business efficiency and financial markets.
            </p>
            <p className="text-slate-350 leading-relaxed text-base">
              By combining robust software development skills with advanced visualization methodologies, I assemble clean data pipelines, run statistical models, and build interactive dashboards that help organizations unlock real-world growth.
            </p>
            
            {/* Core Methodologies Badges */}
            <div className="pt-6 border-t border-white/5 space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                Core Methodologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'Exploratory Data Analysis (EDA)',
                  'Statistical Modeling',
                  'KPI Dashboard Design',
                  'Data Pipelines & ETL',
                  'Market Behavior Research'
                ].map((method, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs bg-white/[0.02] border border-white/5 hover:border-brand-cyan/20 text-slate-300 px-3 py-1.5 rounded-lg font-medium transition-all duration-300"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Highlight cards grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <HighlightCard 
              icon={Database}
              title="SQL & Python"
              description="Constructing optimized queries, joining complex relational schemas, cleaning raw tables, and implementing computational analysis."
              glowColor="from-brand-accent/15 to-emerald-500/5"
            />
            
            <HighlightCard 
              icon={BarChart3}
              title="Business Intelligence"
              description="Structuring responsive BI dashboards using Power BI, creating cohesive KPIs, and engineering seamless reports for decision-makers."
              glowColor="from-brand-cyan/15 to-blue-500/5"
            />
            
            <HighlightCard 
              icon={TrendingUp}
              title="Market Research"
              description="Conducting quantitative studies, tracking historical stock movements, analyzing volume trends, and extracting market behaviors."
              glowColor="from-cyan-500/15 to-brand-accent/5"
            />
            
            <HighlightCard 
              icon={Users}
              title="Communication & Teaching"
              description="Presenting analytical concepts clearly and explaining complex data topics to grow a dedicated community of 1,000+ members."
              glowColor="from-emerald-500/15 to-teal-500/5"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
