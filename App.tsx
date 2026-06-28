import React from 'react';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Achievements from './components/Achievements';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import Preloader from './components/Preloader';
import MouseGlow from './components/MouseGlow';

function App() {
  return (
    <div className="min-h-screen bg-brand-dark text-white selection:bg-brand-accent/30 selection:text-white overflow-x-hidden relative">
      <Preloader />
      <MouseGlow />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <StatsSection />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Achievements />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

export default App;