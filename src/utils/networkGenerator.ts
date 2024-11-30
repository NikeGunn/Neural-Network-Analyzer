import type { Neuron, Connection } from '../types/neural-network';

export const generateNetwork = (
  width = 800,
  height = 600,
  padding = 100
) => {
  const layers = 4;
  const neuronsPerLayer = [4, 6, 6, 4];
  const neurons: Neuron[] = [];
  const connections: Connection[] = [];

  // Generate neurons
  for (let layer = 0; layer < layers; layer++) {
    const count = neuronsPerLayer[layer];
    const layerWidth = width - (padding * 2);
    const layerHeight = height - (padding * 2);
    const startX = padding + (layerWidth / (layers - 1)) * layer;
    
    for (let i = 0; i < count; i++) {
      const spacing = layerHeight / (count + 1);
      const y = padding + spacing * (i + 1);
      
      neurons.push({
        id: `neuron-${layer}-${i}`,
        x: startX,
        y,
        layer,
        value: 0
      });
    }
  }

  // Generate connections
  for (let layer = 0; layer < layers - 1; layer++) {
    const sourceNeurons = neurons.filter(n => n.layer === layer);
    const targetNeurons = neurons.filter(n => n.layer === layer + 1);

    sourceNeurons.forEach(source => {
      targetNeurons.forEach(target => {
        connections.push({
          id: `connection-${source.id}-${target.id}`,
          sourceId: source.id,
          targetId: target.id,
          weight: Math.random()
        });
      });
    });
  }

  return { neurons, connections };
};