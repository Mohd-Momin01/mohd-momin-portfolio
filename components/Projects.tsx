import React from 'react';
import { ExternalLink, Github, Clock, BookOpen, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import { Project } from '../types';
import { FileChartColumn } from './FileChartColumn';
import ProjectAnalytics from './ProjectAnalytics';

const projectData: Project[] = [
  {
    id: '1',
    title: 'Adavnce-Excel-Business-Insights',
    description: 'Interactive Excel Dashboard analyzing store sales, customer behavior, refunds, and channel performance and Top 5 State According to Sales using Pivot Tables and Business Analytics.',
    tech: ['Excel', 'SQL', 'Data Cleaning'],
    category: 'Analytics',
    github: 'https://github.com/Mohd-Momin01/Adavnce-Excel-Business-Insights',
    image: '/images/EXCEL REPORT.png',
    caseStudy: 'https://github.com/Mohd-Momin01/Adavnce-Excel-Business-Insights#readme'
  },
  {
    id: '2',
    title: 'Stock Market Trend Analysis',
    description: 'Analyzed historical stock price and volume datasets to identify trends and performance patterns. Built visual reports and extracted insights using Python and Power BI.',
    tech: ['Python', 'Power BI', 'Pandas', 'Matplotlib'],
    category: 'Finance',
    github: 'https://github.com/Mohd-Momin01/Stock-Market-Analysis-and-Prediction',
    link: 'https://stock-market-analysis-and-prediction-cozi96ayccrleaadtt8szv.streamlit.app/',
    image: '/images/PYTHON STOCK.png',
    caseStudy: 'https://github.com/Mohd-Momin01/Stock-Market-Analysis-and-Prediction#readme'
  },
  {
    id: '3',
    title: 'Customer Churn Analysis & Retention Dashboard',
    description: 'Performed exploratory data analysis and customer segmentation. Built KPI dashboards and generated insights to improve customer retention and business performance.',
    tech: ['SQL', 'Python', 'Pandas', 'Power BI', 'EDA'],
    category: 'Analytics',
    github: 'https://github.com/Mohd-Momin01',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80',
    caseStudy: 'https://github.com/Mohd-Momin01#readme'
  },
  {
    id: '4',
    title: 'HR-Analytics-Dashboard-Power-BI',
    description: 'This project focuses on analyzing employee attrition data using Power BI to generate meaningful HR insights and interactive business reports.',
    tech: ['Power BI', 'Power Query', 'DAX (Data Analysis Expressions)', 'Microsoft Excel / CSV Dataset'],
    category: 'Analytics',
    github: 'https://github.com/Mohd-Momin01/HR-Analytics-Dashboard-Power-BI',
    image: '/images/HR ANALYSIS.png',
    caseStudy: 'https://github.com/Mohd-Momin01/HR-Analytics-Dashboard-Power-BI#readme'
  },
  {
    id: '5',
    title: 'E-Commerce-Sales-DashBoard',
    description: 'This project is an interactive E-Commerce Sales Dashboard built using Power BI. It helps in analyzing online sales data through different visualizations like bar charts, pie charts, maps, and slicers to reveal key business KPIs and revenue trends.',
    tech: ['Power BI', 'Power Query', 'DAX (Data Analysis Expressions)', 'Interactive Charts', 'Data Visualization', 'Microsoft Excel / CSV Dataset'],
    category: 'Analytics',
    github: 'https://github.com/Mohd-Momin01/E-Commerce-Sales-DashBoard',
    image: '/images/E COMMERCE POWER BI.png',
    caseStudy: 'https://github.com/Mohd-Momin01/E-Commerce-Sales-DashBoard#readme'
  },
];

// Helper to dynamically calculate estimated technical review time
const calculateReviewTime = (title: string, description: string, tech: string[]): string => {
  const text = `${title} ${description} ${tech.join(' ')}`;
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 40));
  return `${minutes} min read`;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // out-expo
    },
  },
};

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 bg-brand-dark relative overflow-hidden">
      {/* Decorative blurred background */}
      <div className="absolute top-1/2 left-0 w-full h-[500px] bg-brand-accent/5 -skew-y-6 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Project Portfolio</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-brand-accent to-brand-cyan rounded-full"></div>
          </motion.div>
          <motion.a 
            href="https://github.com/Mohd-Momin01" 
            target="_blank" 
            rel="noreferrer" 
            whileHover={{ scale: 1.05, color: '#10b981' }}
            className="text-brand-accent hover:text-white transition-colors flex items-center gap-2 text-sm font-mono"
          >
            View all on GitHub <ExternalLink className="w-4 h-4" />
          </motion.a>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projectData.map((project) => (
            <motion.div 
              key={project.id} 
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                borderColor: "rgba(6, 182, 212, 0.4)", // soft teal glow border
                boxShadow: "0 20px 40px -15px rgba(6, 182, 212, 0.15)"
              }}
              className="group relative bg-brand-card/30 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden flex flex-col h-full transition-colors duration-300"
            >
              {/* Premium top accent slider line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-accent to-brand-cyan transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20"></div>

              {/* Thumbnail preview image block */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-950 border-b border-white/5">
                {/* Visual gradients overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-transparent to-black/35 z-10" />
                
                {/* Soft teal glow on hover overlay */}
                <div className="absolute inset-0 bg-brand-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />

                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-900 text-brand-cyan">
                    <FileChartColumn className="w-12 h-12 stroke-[1.2]" />
                  </div>
                )}

                {/* Category label badge */}
                <span className="absolute top-4 left-4 z-20 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded-lg bg-brand-dark/85 border border-white/10 text-brand-cyan backdrop-blur-sm">
                  {project.category}
                </span>
              </div>
              
              <div className="p-8 flex flex-col flex-grow relative z-10">
                <div className="flex justify-between items-start mb-4">
                  {/* Icon and read time details */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 text-brand-cyan flex items-center justify-center group-hover:bg-brand-cyan/15 group-hover:text-brand-accent transition-all duration-300">
                      <FileChartColumn width={20} height={20} stroke="currentColor" />
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-[11px] text-slate-400 font-mono">
                      <Clock className="w-3.5 h-3.5 text-brand-accent" />
                      <span>{calculateReviewTime(project.title, project.description, project.tech)}</span>
                    </div>
                  </div>

                  {/* Icon Actions */}
                  <div className="flex items-center gap-3">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-slate-500 hover:text-white transition-colors p-1"
                        title="View GitHub Repository"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-slate-500 hover:text-brand-accent transition-colors p-1"
                        title="View Live Interactive App"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-brand-accent transition-colors">
                  {project.title}
                </h3>
                
                {/* Description */}
                <p className="text-slate-400 mb-6 flex-grow leading-relaxed text-sm md:text-base">
                  {project.description}
                </p>

                {/* Action Buttons & Tech Footer */}
                <div className="mt-auto pt-4 border-t border-white/5 space-y-4">
                  {/* Animated Technology Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <motion.span 
                        key={tech} 
                        whileHover={{ scale: 1.05, y: -1, borderColor: "rgba(6, 182, 212, 0.3)", color: "#22d3ee" }}
                        className="px-2.5 py-0.5 text-[11px] font-mono rounded-md bg-slate-950 border border-white/5 text-slate-400 transition-colors duration-200 cursor-default"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Buttons Row */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    {/* Github repo button */}
                    {project.github && (
                      <motion.a 
                        href={project.github} 
                        target="_blank" 
                        rel="noreferrer" 
                        whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-300 border border-white/15 hover:border-white/30 transition-all duration-300"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </motion.a>
                    )}

                    {/* Case Study button (only shown if a case study or detailed documentation exists) */}
                    {project.caseStudy && (
                      <motion.a 
                        href={project.caseStudy} 
                        target="_blank" 
                        rel="noreferrer" 
                        whileHover={{ scale: 1.03, borderColor: "rgba(6, 182, 212, 0.4)", color: "#22d3ee" }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-300 border border-white/15 transition-all duration-300"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-brand-cyan" />
                        <span>Case Study</span>
                      </motion.a>
                    )}

                    {/* Live Demo button (only shown if link exists) */}
                    {project.link && (
                      <motion.a 
                        href={project.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        className="ml-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold text-brand-dark bg-brand-accent hover:bg-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-300"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Dynamic Project Analytics Dashboard */}
        <ProjectAnalytics />
      </div>
    </section>
  );
};

export default Projects;
