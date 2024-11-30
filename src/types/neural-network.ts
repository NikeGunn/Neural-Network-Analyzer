export interface Neuron {
  id: string;
  x: number;
  y: number;
  layer: number;
  value: number;
}

export interface Connection {
  id: string;
  sourceId: string;
  targetId: string;
  weight: number;
}

export interface Signal {
  id: string;
  connectionId: string;
  progress: number;
  value: number;
}

export interface InputData {
  values: number[];
  label: string;
}

export interface Example {
  id: string;
  name: string;
  description: string;
  inputLabels: string[];
  sampleData: InputData[];
}