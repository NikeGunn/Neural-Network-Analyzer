import React from 'react';
import { motion } from 'framer-motion';
import type { Neuron as NeuronType } from '../types/neural-network';

interface NeuronProps {
  neuron: NeuronType;
  isActive?: boolean;
}

export const Neuron: React.FC<NeuronProps> = ({ neuron, isActive }) => {
  return (
    <>
      {/* Outer glow ring */}
      <motion.circle
        cx={neuron.x}
        cy={neuron.y}
        r={35}
        className={`${
          isActive ? 'fill-violet-500/10' : 'fill-slate-500/5'
        } blur-xl`}
        initial={{ scale: 0 }}
        animate={{ 
          scale: isActive ? [1, 1.3, 1] : 1,
          opacity: isActive ? [0.5, 0.8, 0.5] : 0.3,
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }}
      />

      {/* Pulse ring */}
      <motion.circle
        cx={neuron.x}
        cy={neuron.y}
        r={28}
        className={`${
          isActive ? 'stroke-violet-400' : 'stroke-slate-400'
        } stroke-[0.5] fill-transparent`}
        initial={{ scale: 0.8 }}
        animate={{ 
          scale: isActive ? [0.8, 1.1, 0.8] : 0.8,
          opacity: isActive ? [0.3, 0.6, 0.3] : 0.1,
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut"
        }}
      />

      {/* Main neuron body */}
      <motion.circle
        cx={neuron.x}
        cy={neuron.y}
        r={20}
        className={`
          ${isActive ? 'fill-violet-500' : 'fill-slate-700'}
          drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]
        `}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ 
          scale: 1.15,
          filter: "brightness(1.2)",
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 15,
        }}
      />

      {/* Gradient overlay */}
      <motion.circle
        cx={neuron.x}
        cy={neuron.y}
        r={20}
        className="fill-gradient-radial from-white/20 to-transparent"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.15 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 15,
        }}
      />

      {/* Inner core glow */}
      <motion.circle
        cx={neuron.x}
        cy={neuron.y}
        r={12}
        className={`
          ${isActive ? 'fill-violet-300/30' : 'fill-slate-300/10'}
          blur-[2px]
        `}
        initial={{ scale: 0 }}
        animate={{ 
          scale: isActive ? [0.8, 1, 0.8] : 0.8,
          opacity: isActive ? [0.6, 1, 0.6] : 0.3,
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut"
        }}
      />

      {/* Top highlight */}
      <motion.circle
        cx={neuron.x}
        cy={neuron.y - 8}
        r={6}
        className="fill-white/20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      />
    </>
  );
};