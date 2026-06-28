import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  TrendingUp, 
  Home, 
  User, 
  Cpu, 
  BarChart3, 
  Award, 
  FileText, 
  Mail, 
  ChevronRight 
} from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLogoAnimating, setIsLogoAnimating] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  const navLinks = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Skills', href: '#skills', icon: Cpu },
    { name: 'Projects', href: '#projects', icon: BarChart3 },
    { name: 'Certificates', href: '#certificates', icon: Award },
    { name: 'Achievements', href: '#achievements', icon: TrendingUp },
    { name: 'Resume', href: '#resume', icon: FileText },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  // Dispatch a custom event to notify other components (like ChatBot) of mobile menu toggle
  useEffect(() => {
    const event = new CustomEvent('mobileMenuToggle', { detail: { open: isMenuOpen } });
    window.dispatchEvent(event);
  }, [isMenuOpen]);

  // Dispatch floating menu visibility event for ChatBot dynamic positioning
  useEffect(() => {
    const isFloatingVisible = !showNavbar && isScrolled;
    const event = new CustomEvent('floatingMenuToggle', { detail: { visible: isFloatingVisible } });
    window.dispatchEvent(event);
  }, [showNavbar, isScrolled]);

  // Prevent background scrolling while the mobile drawer is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Handle background transparency
      setIsScrolled(currentScrollY > 20);

      // Smart sticky navbar logic for mobile
      if (currentScrollY <= 10) {
        setShowNavbar(true);
      } else if (currentScrollY > lastY && currentScrollY > 80) {
        setShowNavbar(false);
      } else if (currentScrollY < lastY) {
        setShowNavbar(true);
      }
      lastY = currentScrollY;

      // Handle active section highlighting
      const scrollPosition = currentScrollY + 120; // Offset to trigger active state earlier
      
      // Check if we are at the bottom of the page
      if ((window.innerHeight + currentScrollY) >= document.body.offsetHeight - 50) {
        setActiveSection('contact');
        return;
      }

      for (const link of navLinks) {
        const sectionId = link.href.substring(1);
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.replace('#', '');
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100; // Account for fixed navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setIsMenuOpen(false);
      setActiveSection(sectionId);
    }
  };

  return (
    <>
      <nav 
        className={`fixed w-full z-[100] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] border-b ${
          isScrolled 
            ? 'bg-brand-dark/95 backdrop-blur-md border-brand-border py-4 shadow-lg' 
            : 'bg-transparent border-transparent py-6'
        } ${
          !showNavbar && !isMenuOpen ? '-translate-y-full md:translate-y-0' : 'translate-y-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
          <a 
            href="#home" 
            onClick={(e) => scrollToSection(e, '#home')}
            className="flex items-center gap-2 group cursor-pointer relative z-50"
            onMouseEnter={() => setIsLogoAnimating(true)}
          >
            <div className="p-2 rounded-lg bg-gradient-to-br from-brand-accent/20 to-brand-cyan/20 group-hover:from-brand-accent/30 group-hover:to-brand-cyan/30 transition-all border border-brand-accent/20">
              <TrendingUp className="w-5 h-5 text-brand-accent" />
            </div>
            <span 
              className={`text-xl font-bold font-sans tracking-tight text-white ${isLogoAnimating ? 'tracking-in-contract-bck-top-normal' : ''}`}
              onAnimationEnd={() => setIsLogoAnimating(false)}
            >
              Momin<span className="text-brand-accent">.Analyst</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`text-sm font-medium transition-all duration-300 relative group cursor-pointer text-focus-in-normal ${
                  activeSection === link.href.substring(1) 
                    ? 'text-brand-accent' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-2 left-0 h-0.5 bg-brand-accent rounded-full transition-all duration-300 ${
                  activeSection === link.href.substring(1) ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-50'
                }`}></span>
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, '#contact')}
              className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-brand-accent/50 text-white text-sm font-medium transition-all hover:bg-brand-accent/10 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] cursor-pointer active:scale-95 flicker-2-normal"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-colors relative z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Side Drawer with Backdrop Blur and Premium Animations - Decoupled from translated navbar */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Stronger dark blurred interactive overlay covering the visible background area */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-brand-dark/85 backdrop-blur-md z-[110]"
            />

            {/* Side Navigation Drawer occupying only 70-75% screen width */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 210 }}
              className="md:hidden fixed top-0 left-0 bottom-0 w-[72%] max-w-[290px] bg-gradient-to-b from-brand-dark/95 to-brand-dark/90 backdrop-blur-2xl border-r border-brand-cyan/25 rounded-r-2xl shadow-[0_0_50px_rgba(6,182,212,0.25)] z-[120] flex flex-col h-full overflow-hidden"
            >
              {/* Drawer Header with Logo Accent and Close Button */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-brand-accent/10 border border-brand-accent/20">
                    <TrendingUp className="w-4 h-4 text-brand-accent" />
                  </div>
                  <span className="text-lg font-bold font-sans tracking-tight text-white">
                    Momin<span className="text-brand-accent">.Analyst</span>
                  </span>
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Menu Navigation Items */}
              <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1.5 scrollbar-none">
                {navLinks.map((link, index) => {
                  const LinkIcon = link.icon;
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: index * 0.035, 
                        duration: 0.45, 
                        ease: [0.16, 1, 0.3, 1] 
                      }}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.97 }}
                      className={`relative flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer overflow-hidden group ${
                        isActive
                          ? 'bg-brand-accent/10 text-brand-accent font-semibold border border-brand-accent/20 shadow-[inset_0_1px_12px_rgba(16,185,129,0.05)]'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white border border-transparent'
                      }`}
                    >
                      {/* Premium Ripple/Feedback Highlight on tap */}
                      <span className="absolute inset-0 bg-gradient-to-r from-brand-cyan/10 to-brand-accent/5 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-200 pointer-events-none" />

                      <div className="flex items-center gap-3 relative z-10">
                        <LinkIcon className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${
                          isActive ? 'text-brand-accent' : 'text-slate-400 group-hover:text-white'
                        }`} />
                        <span className="text-sm font-medium">{link.name}</span>
                      </div>
                      
                      <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all transform translate-x-1 group-hover:translate-x-0 ${
                        isActive ? 'text-brand-accent' : 'text-slate-400'
                      }`} />
                    </motion.a>
                  );
                })}
              </div>

              {/* Fixed Bottom CTA "Hire Me" Button Area */}
              <div className="p-6 border-t border-white/5 bg-brand-dark/95 backdrop-blur-md relative z-20">
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="block w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-accent to-brand-cyan text-brand-dark font-bold text-center shadow-[0_4px_12px_rgba(16,185,129,0.15)] hover:shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-sm"
                >
                  Hire Me
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Floating Quick Menu button in top-right corner */}
      <AnimatePresence>
        {!showNavbar && isScrolled && !isMenuOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden fixed top-4 right-6 z-[101] w-11 h-11 rounded-full flex items-center justify-center bg-brand-dark/90 border border-brand-cyan/35 backdrop-blur-md shadow-[0_4px_16px_rgba(6,182,212,0.25)] text-brand-cyan hover:text-white active:scale-95 transition-all cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;