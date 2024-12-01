import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Neuron } from './Neuron';
import { Connection } from './Connection';
import { Signal } from './Signal';
import { generateNetwork } from '../utils/networkGenerator';
import { sigmoid } from '../utils/networkProcessor';
import type { Neuron as NeuronType, Connection as ConnectionType, Signal as SignalType, InputData } from '../types/neural-network';

interface NeuralNetworkProps {
  inputData?: InputData;
}

export const NeuralNetwork: React.FC<NeuralNetworkProps> = ({ inputData }) => {
  const [neurons, setNeurons] = useState<NeuronType[]>([]);
  const [connections, setConnections] = useState<ConnectionType[]>([]);
  const [signals, setSignals] = useState<SignalType[]>([]);
  const [activeNeurons, setActiveNeurons] = useState<Set<string>>(new Set());

  useEffect(() => {
    const { neurons: n, connections: c } = generateNetwork();
    setNeurons(n);
    setConnections(c);
  }, []);

  useEffect(() => {
    if (inputData) {
      // Process input data through the network
      const newNeurons = [...neurons];
      const newSignals: SignalType[] = [];
      
      // Set input layer values
      inputData.values.forEach((value, i) => {
        const inputNeuron = newNeurons.find(n => n.layer === 0 && n.id === `neuron-0-${i}`);
        if (inputNeuron) {
          inputNeuron.value = value;
        }
      });

      // Process each layer
      for (let layer = 0; layer < 3; layer++) {
        const layerNeurons = newNeurons.filter(n => n.layer === layer);
        const nextLayerNeurons = newNeurons.filter(n => n.layer === layer + 1);

        layerNeurons.forEach(source => {
          nextLayerNeurons.forEach(target => {
            const connection = connections.find(
              c => c.sourceId === source.id && c.targetId === target.id
            );

            if (connection) {
              const signal: SignalType = {
                id: `signal-${connection.id}-${Date.now()}`,
                connectionId: connection.id,
                progress: 0,
                value: source.value * connection.weight
              };
              newSignals.push(signal);

              // Update target neuron value
              target.value = sigmoid(signal.value);
            }
          });
        });
      }

      setNeurons(newNeurons);
      setSignals(newSignals);
      setActiveNeurons(new Set(newNeurons.map(n => n.id)));
    }
  }, [inputData]);

  return (
    <motion.svg
      className="w-full h-full"
      viewBox="0 0 800 600"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <g>
        {connections.map((connection) => {
          const source = neurons.find((n) => n.id === connection.sourceId)!;
          const target = neurons.find((n) => n.id === connection.targetId)!;
          return (
            <Connection
              key={connection.id}
              connection={connection}
              sourceX={source.x}
              sourceY={source.y}
              targetX={target.x}
              targetY={target.y}
            />
          );
        })}
      </g>
      <g>
        {signals.map((signal) => {
          const connection = connections.find((c) => c.id === signal.connectionId)!;
          const source = neurons.find((n) => n.id === connection.sourceId)!;
          const target = neurons.find((n) => n.id === connection.targetId)!;
          return (
            <Signal
              key={signal.id}
              signal={signal}
              sourceX={source.x}
              sourceY={source.y}
              targetX={target.x}
              targetY={target.y}
            />
          );
        })}
      </g>
      <g>
        {neurons.map((neuron) => (
          <Neuron
            key={neuron.id}
            neuron={neuron}
            isActive={activeNeurons.has(neuron.id)}
          />
        ))}
      </g>
    </motion.svg>
  );
};