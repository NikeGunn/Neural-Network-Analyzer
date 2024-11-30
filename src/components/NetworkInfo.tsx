import React from 'react';
import type { Neuron, Connection } from '../types/neural-network';

interface NetworkInfoProps {
  activeNeuron: Neuron | null;
  connections: Connection[];
  neurons: Neuron[];
}

export const NetworkInfo: React.FC<NetworkInfoProps> = ({ activeNeuron, connections, neurons }) => {
  if (!activeNeuron) {
    return (
      <div className="p-4 bg-gray-800 rounded-lg">
        <p className="text-gray-400">Hover over a neuron to see its details</p>
      </div>
    );
  }

  const incomingConnections = connections.filter(c => c.targetId === activeNeuron.id);
  const outgoingConnections = connections.filter(c => c.sourceId === activeNeuron.id);

  return (
    <div className="p-4 bg-gray-800 rounded-lg space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Neuron Information</h3>
        <p className="text-gray-300">Layer: {activeNeuron.layer + 1}</p>
        <p className="text-gray-300">Value: {activeNeuron.value.toFixed(3)}</p>
      </div>
      
      <div>
        <h4 className="font-medium mb-1">Incoming Connections</h4>
        <div className="space-y-1">
          {incomingConnections.map(conn => {
            const sourceNeuron = neurons.find(n => n.id === conn.sourceId)!;
            return (
              <p key={conn.id} className="text-sm text-gray-400">
                From Layer {sourceNeuron.layer + 1} • Weight: {conn.weight.toFixed(3)}
              </p>
            );
          })}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-1">Outgoing Connections</h4>
        <div className="space-y-1">
          {outgoingConnections.map(conn => {
            const targetNeuron = neurons.find(n => n.id === conn.targetId)!;
            return (
              <p key={conn.id} className="text-sm text-gray-400">
                To Layer {targetNeuron.layer + 1} • Weight: {conn.weight.toFixed(3)}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};