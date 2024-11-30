import React from 'react';
import { motion } from 'framer-motion';
import type { Connection as ConnectionType } from '../types/neural-network';

interface ConnectionProps {
  connection: ConnectionType;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
}

export const Connection: React.FC<ConnectionProps> = ({
  connection,
  sourceX,
  sourceY,
  targetX,
  targetY,
}) => {
  return (
    <motion.line
      x1={sourceX}
      y1={sourceY}
      x2={targetX}
      y2={targetY}
      className="stroke-gray-600"
      strokeWidth={2}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{
        duration: 1,
        ease: "easeInOut"
      }}
    />
  );
};