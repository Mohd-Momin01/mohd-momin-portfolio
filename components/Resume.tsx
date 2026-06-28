import React from 'react';
import { ExternalLink, FileText, CheckCircle, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { Download } from './Download';

const Resume: React.FC = () => {
  const resumeUrl = "/resume/MOHD%20MOMIN%20RESUME.pdf";

  return (
    <section id="resume" className="py-24 bg-brand-dark relative overflow-hidden border-t border-white/5">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text copy and Buttons */}
          <div className="md:col-span-7 space-y-8 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">Resume & Experience</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-brand-accent to-brand-cyan rounded-full"></div>
              
              <p className="text-slate-400 text-lg leading-relaxed pt-2">
                A detailed overview of my technical skills, analytics projects and educational background. 
                You can view the document directly in your browser or download my ATS-friendly resume to explore my experience and projects.
              </p>
            </motion.div>

            {/* Action Buttons exactly as they were */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col sm:flex-row items-center gap-4 pt-2"
            >
              <button 
                onClick={() => window.open("/resume/MOHD%20MOMIN%20RESUME.pdf", "_blank")}
                className="w-full sm:w-auto min-w-[180px] px-8 py-3.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-accent/50 text-white font-medium transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 group-hover:text-brand-accent transition-colors" /> 
                Open Resume
              </button>
              
              <a 
                href="/resume/MOHD%20MOMIN%20RESUME.pdf"
                download="MOHD MOMIN RESUME.pdf"
                className="w-full sm:w-auto min-w-[180px] px-8 py-3.5 rounded-lg bg-gradient-to-r from-brand-accent to-emerald-500 text-brand-dark font-bold hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-1 cursor-pointer"
              >
                <div className="-my-2 -ml-2">
                  <Download width={20} height={20} stroke="currentColor" /> 
                </div>
                Download Resume
              </a>
            </motion.div>
          </div>

          {/* Right Column: Premium Document/PDF Preview Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="md:col-span-5 w-full max-w-sm mx-auto"
          >
            <motion.div
              whileHover={{ 
                y: -8,
                borderColor: "rgba(6, 182, 212, 0.4)", // soft teal glow border
                boxShadow: "0 20px 40px -15px rgba(6, 182, 212, 0.2)"
              }}
              className="group relative bg-brand-card/35 backdrop-blur-md rounded-2xl border border-white/10 p-4 transition-all duration-300 shadow-2xl overflow-hidden flex flex-col gap-4 cursor-pointer"
              onClick={() => window.open("/resume/MOHD%20MOMIN%20RESUME.pdf", "_blank")}
            >
              {/* Premium top accent slider line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-accent to-brand-cyan transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20"></div>

              {/* PDF Preview Thumbnail with zoom on hover */}
              <div className="relative h-[280px] sm:h-[320px] w-full overflow-hidden rounded-xl bg-slate-950 border border-white/5">
                {/* Visual gradient and lighting overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-transparent to-black/25 z-10" />
                
                {/* Soft teal glow overlay on hover */}
                <div className="absolute inset-0 bg-brand-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />

                {/* Resume Mockup Image */}
                <img 
                  src="/images/Resume thumbnail.png"
                  alt="Mohd Momin Resume Preview" 
                  className="w-full h-full object-cover object-top transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* ATS Resume Badge */}
                <div className="absolute top-3 left-3 z-20 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded-lg bg-brand-dark/90 border border-brand-cyan/30 text-brand-cyan backdrop-blur-md flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-brand-accent" />
                  <span>ATS Approved</span>
                </div>

                {/* Last Updated Badge */}
                <div className="absolute bottom-3 right-3 z-20 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded-lg bg-brand-dark/90 border border-white/10 text-slate-300 backdrop-blur-md flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Updated: June 2026</span>
                </div>

                {/* Document Icon and Quick View Overlay on Hover */}
                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <div className="px-4 py-2 rounded-xl bg-brand-dark/90 border border-brand-cyan/30 text-white font-mono text-xs font-semibold flex items-center gap-2 shadow-lg backdrop-blur-sm">
                    <FileText className="w-4 h-4 text-brand-accent" />
                    <span>Quick View PDF</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Resume;
