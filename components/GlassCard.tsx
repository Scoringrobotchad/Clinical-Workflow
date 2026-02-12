
import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', onClick, hoverEffect = true }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hoverEffect ? { scale: 1.01, translateY: -2 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      className={`
        bg-white/40 backdrop-blur-2xl border border-white/50 
        rounded-3xl shadow-xl shadow-teal-500/5 overflow-hidden
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};
