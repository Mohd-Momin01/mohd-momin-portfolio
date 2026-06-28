"use client";

import { motion, useAnimation } from "motion/react";
import type { Variants } from "motion/react";
import React from 'react';

interface EmailIconProps extends React.SVGAttributes<SVGSVGElement> {
  email?: string;
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: number;
}

const envelopeVariants: Variants = {
  normal: { scale: 1, opacity: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  click: {
    scale: 0.95,
    transition: { duration: 0.15 },
  },
};

const flapVariants: Variants = {
  normal: { rotateX: 0 },
  hover: {
    rotateX: -25,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const EmailIcon = ({
  email = "khanmomin1166@gmail.com",
  width = 28,
  height = 28,
  stroke = "#22e3a5",
  strokeWidth = 2,
  ...props
}: EmailIconProps) => {
  const controls = useAnimation();

  const handleClick = () => {
    controls.start("click");
    window.location.href = `mailto:${email}?subject=Opportunity | Momin.Analyst Portfolio`;
  };

  return (
    <div
      style={{
        cursor: "pointer",
        padding: "10px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseEnter={() => controls.start("hover")}
      onMouseLeave={() => controls.start("normal")}
      onClick={handleClick}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={envelopeVariants}
        animate={controls}
        initial="normal"
        {...props}
      >
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <motion.path
          d="M3 7l9 6 9-6"
          variants={flapVariants}
          animate={controls}
          initial="normal"
        />
      </motion.svg>
    </div>
  );
};

export { EmailIcon };