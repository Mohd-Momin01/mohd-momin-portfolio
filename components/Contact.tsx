import React, { useState } from 'react';
import { Send, CheckCircle, AlertTriangle, MapPin, ExternalLink, ArrowUpRight, Phone, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EmailIcon } from './EmailIcon';
import { submitContactForm } from '../services/supabase';
import { ContactFormData } from '../types';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'fallback'>('idle');
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFallbackEmail = () => {
    const subject = encodeURIComponent(`Contact from Portfolio: ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:khanmomin1166@gmail.com?subject=${subject}&body=${body}`;
    setStatus('fallback');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setStatus('idle'), 8000);
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:khanmomin1166@gmail.com?subject=Opportunity%20%7C%20Momin.Analyst%20Portfolio";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitContactForm(formData);
      setStatus('success');
      setShowToast(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
      setTimeout(() => setShowToast(false), 5000);
    } catch (error) {
      console.warn("Backend unavailable, switching to email fallback.");
      handleFallbackEmail();
    }
  };

  return (
    <section id="contact" className="py-24 bg-brand-dark relative border-t border-white/5 overflow-hidden">
      {/* Decorative center ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[150%] bg-brand-cyan/[0.015] rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-accent/[0.01] rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Info Side */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Let's Connect</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-brand-accent to-brand-cyan rounded-full mb-6"></div>
              <p className="text-slate-400 text-lg leading-relaxed">
                Whether you have a project in mind, need a Data Analyst, or want to discuss analytics and business intelligence, my inbox is always open.
              </p>
            </motion.div>

            <div className="space-y-6">
              {/* Email Card - Interactive */}
              <motion.div 
                onClick={handleEmailClick}
                whileHover={{ y: -5, borderColor: 'rgba(6, 182, 212, 0.3)', boxShadow: '0 15px 30px -10px rgba(6, 182, 212, 0.12)' }}
                className="flex items-start gap-4 p-6 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 backdrop-blur-md transition-all duration-300 cursor-pointer group relative overflow-hidden"
              >
                {/* Individual soft background teal glow */}
                <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-gradient-to-br from-brand-cyan/15 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500 pointer-events-none z-0" />
                
                <div className="bg-brand-accent/10 rounded-lg flex items-center justify-center shrink-0 -m-1 z-10">
                   <EmailIcon width={28} height={28} stroke="#10b981" />
                </div>
                <div className="flex-grow z-10">
                  <h4 className="text-white font-bold text-lg group-hover:text-brand-accent transition-colors">Email Me</h4>
                  <p className="text-slate-400 group-hover:text-slate-200 transition-colors">khanmomin1166@gmail.com</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-brand-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all absolute top-6 right-6 opacity-0 group-hover:opacity-100 z-10" />
              </motion.div>

              {/* Phone Card - Interactive */}
              <motion.a 
                href="tel:+918787074730"
                whileHover={{ y: -5, borderColor: 'rgba(6, 182, 212, 0.3)', boxShadow: '0 15px 30px -10px rgba(6, 182, 212, 0.12)' }}
                className="flex items-start gap-4 p-6 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 backdrop-blur-md transition-all duration-300 cursor-pointer group relative overflow-hidden flex"
              >
                {/* Individual soft background teal glow */}
                <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-gradient-to-br from-brand-cyan/15 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500 pointer-events-none z-0" />

                <div className="p-3 bg-brand-accent/10 rounded-lg text-brand-accent group-hover:bg-brand-accent group-hover:text-brand-dark transition-colors z-10">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="flex-grow z-10">
                  <h4 className="text-white font-bold text-lg group-hover:text-brand-accent transition-colors">Call or Text</h4>
                  <p className="text-slate-400 group-hover:text-slate-200 transition-colors">+91 87870 74730</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-brand-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all absolute top-6 right-6 opacity-0 group-hover:opacity-100 z-10" />
              </motion.a>
              
              {/* Location Card - Interactive */}
              <motion.a 
                href="https://www.google.com/maps/search/?api=1&query=Manyata+Tech+Park,+Bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, borderColor: 'rgba(6, 182, 212, 0.3)', boxShadow: '0 15px 30px -10px rgba(6, 182, 212, 0.12)' }}
                className="flex items-start gap-4 p-6 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 backdrop-blur-md transition-all duration-300 cursor-pointer group relative overflow-hidden flex"
              >
                {/* Individual soft background teal glow */}
                <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-gradient-to-br from-brand-cyan/15 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500 pointer-events-none z-0" />

                <div className="p-3 bg-brand-cyan/10 rounded-lg text-brand-cyan group-hover:bg-brand-cyan group-hover:text-brand-dark transition-colors z-10">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="flex-grow z-10">
                  <h4 className="text-white font-bold text-lg group-hover:text-brand-cyan transition-colors">Location</h4>
                  <p className="text-slate-400 group-hover:text-slate-200 transition-colors">Bangalore, Karnataka, India</p>
                </div>
                <ExternalLink className="w-5 h-5 text-slate-600 group-hover:text-brand-cyan group-hover:translate-x-1 group-hover:-translate-y-1 transition-all absolute top-6 right-6 opacity-0 group-hover:opacity-100 z-10" />
              </motion.a>
            </div>
          </div>

          {/* Form Side with Glassmorphism and soft glow */}
          <div className="bg-brand-card/30 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
             {/* Dynamic soft teal glow behind form */}
             <div className="absolute -right-24 -top-24 w-64 h-64 bg-gradient-to-br from-brand-cyan/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
             <div className="absolute inset-0 bg-gradient-to-b from-brand-accent/5 to-transparent rounded-2xl pointer-events-none"></div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="relative group">
                <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2 transition-colors group-focus-within:text-brand-cyan">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-950/40 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/30 focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300 placeholder:text-slate-700"
                  placeholder="Mohd Momin"
                />
              </div>

              <div className="relative group">
                <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2 transition-colors group-focus-within:text-brand-cyan">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-950/40 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/30 focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300 placeholder:text-slate-700"
                  placeholder="analyst@example.com"
                />
              </div>

              <div className="relative group">
                <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2 transition-colors group-focus-within:text-brand-cyan">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-slate-950/40 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/30 focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300 placeholder:text-slate-700 resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting' || status === 'success' || status === 'fallback'}
                className={`cursor-pointer w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2.5 transition-all ${
                  status === 'success' 
                    ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]' 
                    : status === 'fallback'
                    ? 'bg-brand-cyan text-brand-dark'
                    : 'bg-gradient-to-r from-brand-accent to-brand-cyan text-brand-dark hover:shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:scale-[1.01] active:scale-[0.99]'
                }`}
              >
                {status === 'submitting' && (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending message...</span>
                  </>
                )}
                {status === 'success' && <><CheckCircle className="w-5 h-5" /> Message Sent Successfully</>}
                {status === 'fallback' && <><ExternalLink className="w-5 h-5" /> Opened Email Client</>}
                {status === 'idle' && <><Send className="w-4 h-4" /> Send Message</>}
                {status === 'error' && 'Retry'}
              </button>

              {status === 'fallback' && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300 flex items-center gap-2 text-brand-cyan text-sm mt-2 justify-center bg-brand-cyan/10 p-2 rounded-lg border border-brand-cyan/20">
                  <AlertTriangle className="w-4 h-4" />
                  Database busy. Redirecting to your email app...
                </div>
              )}

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-sm mt-2 justify-center">
                  <AlertTriangle className="w-4 h-4" />
                  Failed to send. Please try again.
                </div>
              )}
            </form>
          </div>

        </div>
      </div>

      {/* Premium success toast notification overlay */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-4 p-4 rounded-xl bg-slate-900/95 border border-brand-accent/40 shadow-2xl backdrop-blur-md max-w-sm"
          >
            <div className="p-2 rounded-lg bg-brand-accent/25 text-brand-accent flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div className="flex-grow">
              <h5 className="text-white text-sm font-bold">Message Delivered</h5>
              <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                Thank you for connecting! I will get back to you shortly.
              </p>
            </div>
            <button 
              onClick={() => setShowToast(false)}
              className="text-slate-500 hover:text-white transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
