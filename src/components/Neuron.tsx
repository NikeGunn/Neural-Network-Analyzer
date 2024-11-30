import React from 'react';
import { motion } from 'framer-motion';
import type { Neuron as NeuronType } from '../types/neural-network';

interface NeuronProps {
  neuron: NeuronType;
  isActive?: boolean;
}

export const Neuron: React.FC<NeuronProps> = ({ neuron, isActive }) => {
  return (
    <motion.circle
      cx={neuron.x}
      cy={neuron.y}
      r={20}
      className={`${
        isActive ? 'fill-blue-500' : 'fill-gray-700'
      } stroke-2 stroke-white`}
      initial={{ scale: 0 }}
      animate={{ 
        scale: 1,
        fill: isActive ? '#3B82F6' : '#374151'
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
    />
  );
};