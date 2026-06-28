import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { BarChart3, TrendingUp, Youtube, Award } from 'lucide-react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  decimals?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, duration = 1800, decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressPercentage = Math.min(progress / duration, 1);

      // Smooth out-expo easing function for a premium, organic slowing down feel
      const easedProgress = 1 - Math.pow(2, -10 * progressPercentage);
      const currentVal = easedProgress * value;

      setCount(currentVal);

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return <span ref={ref} className="font-extrabold tracking-tight tabular-nums">{count.toFixed(decimals)}</span>;
};

interface StatItem {
  id: string;
  value: number;
  suffix: string;
  decimals?: number;
  label: string;
  subtext: string;
  icon: React.ComponentType<any>;
  glowColor: string;
}

const STATS_DATA: StatItem[] = [
  {
    id: 'analytics-projects',
    value: 10,
    suffix: '+',
    label: 'Analytics Projects',
    subtext: 'End-to-end pipelines, BI dashboards, and data models.',
    icon: BarChart3,
    glowColor: 'from-brand-accent/20 to-emerald-500/5',
  },
  {
    id: 'stock-market-research',
    value: 5,
    suffix: '+ Years',
    label: 'Stock Market Research',
    subtext: 'Quantitative behavior study & price trend analysis.',
    icon: TrendingUp,
    glowColor: 'from-brand-cyan/20 to-blue-500/5',
  },
  {
    id: 'youtube-community',
    value: 1000,
    suffix: '+',
    label: 'YouTube Community',
    subtext: 'Educating & sharing insights on financial datasets.',
    icon: Youtube,
    glowColor: 'from-red-500/20 to-rose-500/5',
  },
  {
    id: 'btech-cgpa',
    value: 8.2,
    suffix: ' CGPA',
    decimals: 1,
    label: 'B.Tech CSE',
    subtext: 'Rigorous academic base in Computer Science Engineering.',
    icon: Award,
    glowColor: 'from-brand-accent/20 to-teal-500/5',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // out-expo
    },
  },
};

const StatsSection: React.FC = () => {
  return (
    <section className="py-16 bg-brand-dark/90 relative overflow-hidden border-t border-b border-white/5">
      {/* Background radial soft cyan/teal glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[150%] bg-brand-cyan/[0.02] rounded-full blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {STATS_DATA.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group relative rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-brand-cyan/30 backdrop-blur-md p-6 transition-all duration-300 shadow-xl overflow-hidden"
              >
                {/* Individual premium glowing backing blur */}
                <div className={`absolute -right-12 -bottom-12 w-32 h-32 bg-gradient-to-br ${stat.glowColor} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none z-0`} />

                {/* Subtle border shine effect */}
                <div className="absolute inset-0 border border-transparent group-hover:border-white/5 rounded-2xl transition-colors duration-300 pointer-events-none z-0" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    {/* Icon frame */}
                    <div className="p-3 bg-white/[0.03] border border-white/5 rounded-xl w-fit mb-4 text-brand-cyan group-hover:text-brand-accent group-hover:border-brand-cyan/20 transition-all duration-300">
                      <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                    </div>

                    {/* Numeric Counter with Suffix */}
                    <div className="text-4xl lg:text-5xl font-extrabold text-white mb-2 flex items-baseline gap-1">
                      <AnimatedCounter value={stat.value} decimals={stat.decimals} />
                      <span className="text-2xl lg:text-3xl text-brand-cyan font-bold transition-colors duration-300 group-hover:text-brand-accent">
                        {stat.suffix}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2">
                    {/* Title Label */}
                    <h3 className="text-lg font-semibold text-white group-hover:text-brand-cyan transition-colors duration-300 mb-1">
                      {stat.label}
                    </h3>
                    {/* Short Description */}
                    <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300 leading-relaxed">
                      {stat.subtext}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
