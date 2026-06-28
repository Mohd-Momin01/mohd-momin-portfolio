import React from 'react';
import { Eye, Download, Award, Calendar, Link2 } from 'lucide-react';
import { motion } from 'motion/react';

interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
   pdf: string;
  verify: string;
}

const CERTIFICATES: CertificateItem[] = [
  {
    id: '1',
    title: 'Getting Started With Hadoop',
    issuer: 'Simplilearn',
    date: '2025',
    image: "/images/Certificate.png",
    pdf: '/certificates/hadoop_intro.pdf',
    verify: 'https://simpli-web.app.link/e/6YAA6TdXd4b'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const Certificates: React.FC = () => {

  const getFileUrl = (fileName: string) => {
    const { data } = supabase.storage
      .from('certificates')
      .getPublicUrl(fileName);
    return data.publicUrl;
  };

  return (
    <section id="certificates" className="py-24 bg-brand-dark relative border-t border-white/5 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-10 w-[300px] h-[300px] bg-brand-cyan/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Certifications</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-brand-accent to-brand-cyan rounded-full"></div>
            <p className="mt-6 text-slate-400 max-w-2xl text-lg leading-relaxed">
              Validating expertise in Data Analytics, Financial Modeling, and Tech.
              <br />
              <span className="text-sm text-slate-500">View or download credentials directly.</span>
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {CERTIFICATES.map((cert) => (
            <motion.div 
              key={cert.id}
              variants={itemVariants}
              whileHover={{ 
                y: -8, 
                borderColor: "rgba(6, 182, 212, 0.4)", // soft teal glow border
                boxShadow: "0 20px 40px -15px rgba(6, 182, 212, 0.15)"
              }}
              className="group relative bg-brand-card/30 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden flex flex-col h-full transition-all duration-300 shadow-xl"
            >
              {/* Premium top accent slider line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-accent to-brand-cyan transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20"></div>

              {/* Certificate thumbnail preview with zoom on hover */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-950 border-b border-white/5">
                {/* Visual gradients overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-transparent to-black/35 z-10" />
                
                {/* Soft teal glow overlay on hover */}
                <div className="absolute inset-0 bg-brand-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />

                <img 
                  src={cert.image} 
                  alt={cert.title} 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Issuer overlay badge */}
                <span className="absolute top-4 left-4 z-20 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded-lg bg-brand-dark/85 border border-white/10 text-brand-cyan backdrop-blur-sm">
                  {cert.issuer}
                </span>
              </div>

              {/* Card content and metadata */}
              <div className="p-6 flex flex-col flex-grow relative z-10">
                <div className="flex items-center justify-between mb-4">
                  {/* Award Icon Frame */}
                  <div className="p-2.5 rounded-xl bg-white/5 text-brand-cyan group-hover:bg-brand-cyan/15 group-hover:text-brand-accent transition-all duration-300 border border-white/5 group-hover:border-brand-cyan/20">
                    <Award className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                  </div>
                  {/* Date badge */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-xs font-mono text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-brand-accent" />
                    <span>{cert.date}</span>
                  </div>
                </div>

                {/* Certificate Title */}
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight group-hover:text-brand-accent transition-colors">
                  {cert.title}
                </h3>
                
                {/* Organization / Issuer */}
                <p className="text-sm text-slate-400 font-medium mb-6">
                  {cert.issuer}
                </p>

                {/* Actions Footer containing both buttons */}
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-3">
                  <button
                    onClick={() => window.open("/certificates/hadoop_intro.pdf", "_blank", "noopener,noreferrer")}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-brand-cyan/5 hover:bg-brand-cyan/10 border border-brand-cyan/25 hover:border-brand-cyan/40 text-brand-cyan hover:text-white text-sm font-medium transition-all duration-300 active:scale-95 cursor-pointer shadow-md"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => {
                      const a = document.createElement("a");
                      a.href = cert.pdf;
                     a.download = "";
                     document.body.appendChild(a);
                      a.click();
                   document.body.removeChild(a);
                } }
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-brand-accent/5 hover:bg-brand-accent/10 border border-brand-accent/25 hover:border-brand-accent/40 text-brand-accent hover:text-emerald-400 text-sm font-medium transition-all duration-300 active:scale-95 cursor-pointer shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>PDF</span>
                  </button>
                  <a
                      href={cert.verify}
                      target="_blank"
                      rel="noopener noreferrer"
                    className="flex items-center justify-center px-4 py-2.5 rounded-lg border border-brand-cyan/25 text-brand-cyan hover:bg-brand-cyan/10 transition-all duration-300"
>
                 <Link2 className="w-4 h-4" />
              </a>

                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;
