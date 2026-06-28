"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import React from 'react';

interface AwardProps extends React.SVGAttributes<SVGSVGElement> {
  width?: number;
  height?: number;
  strokeWidth?: number;
  stroke?: string;
}

const pathVariants: Variants = {
  normal: { opacity: 1, pathLength: 1 },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      staggerChildren: 0.1
    }
  }
};

const Award = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "currentColor",
  ...props
}: AwardProps) => {
  const controls = useAnimation();

  return (
    <div
      style={{
        cursor: "pointer",
        userSelect: "none",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <motion.circle 
          cx="12" 
          cy="8" 
          r="7"
          variants={pathVariants}
          initial="normal"
          animate={controls}
        />
        <motion.polyline 
          points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"
          variants={pathVariants}
          initial="normal"
          animate={controls}
        />
      </svg>
    </div>
  );
};

export { Award };