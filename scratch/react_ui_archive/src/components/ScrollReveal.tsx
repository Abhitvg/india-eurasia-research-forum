import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  key?: string | number;
}

export default function ScrollReveal({ 
  children, 
  width = "100%", 
  className = "", 
  delay = 0,
  direction = "up"
}: ScrollRevealProps) {
  
  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
      x: direction === "left" ? 30 : direction === "right" ? -30 : 0,
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
    },
  };

  return (
    <div style={{ width, overflow: 'visible' }} className={className}>
      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: "0px" }}
        transition={{ 
          type: "spring",
          stiffness: 70,
          damping: 20,
          mass: 1,
          delay: delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
