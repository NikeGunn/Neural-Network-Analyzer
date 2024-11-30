import React from 'react';
import { motion } from 'framer-motion';
import type { Signal as SignalType } from '../types/neural-network';

interface SignalProps {
  signal: SignalType;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
}

export const Signal: React.FC<SignalProps> = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
}) => {
  return (
    <motion.circle
      r={4}
      className="fill-blue-400"
      initial={{ x: sourceX, y: sourceY }}
      animate={{ x: targetX, y: targetY }}
      transition={{
        duration: 0.5,
        ease: "linear",
        repeat: Infinity
      }}
    />
  );
};