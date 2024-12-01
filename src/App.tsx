import { useState } from 'react';
import { Brain, ChevronRight } from 'lucide-react';
import { NeuralNetwork } from './components/NeuralNetwork';
import { DataInput } from './components/DataInput';
import { ExampleSelector } from './components/ExampleSelector';
import { DataVisualizer } from './components/DataVisualizer';
import { Footer } from './components/Footer';
import { NetworkInfo } from './components/NetworkInfo';
import type { InputData, Example } from './types/neural-network';

function App() {
  const [inputData, setInputData] = useState<InputData | undefined>();
  const [selectedExample, setSelectedExample] = useState<Example>();
  const [processedData, setProcessedData] = useState<InputData[]>([]);

  const networkInfo = {
    neurons: [],
    connections: [],
    activeNeuron: null
  };

  const handleDataSubmit = (data: InputData) => {
    setInputData(data);
    setProcessedData([...processedData, data]);
  };

  const handleExampleSelect = (example: Example) => {
    setSelectedExample(example);
    setProcessedData([]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="p-6 border-b border-gray-800">
        <div className="container mx-auto flex items-center gap-4">
          <Brain className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold">Neural Network Visualization Lab</h1>
        </div>
      </header>
      
      <main className="container mx-auto py-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gray-800 rounded-lg p-8 shadow-xl">
              <div className="aspect-video">
                <NeuralNetwork inputData={inputData} />
              </div>
            </div>

            {processedData.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-8 shadow-xl">
                <h2 className="text-xl font-semibold mb-4">Data Analysis</h2>
                <DataVisualizer data={processedData} />
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                {selectedExample ? (
                  <div className="flex items-center gap-2">
                    <span>{selectedExample.name}</span>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-400">Input Data</span>
                  </div>
                ) : (
                  'Input Data'
                )}
              </h2>
              <DataInput onSubmit={handleDataSubmit} example={selectedExample} />
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <ExampleSelector onSelect={handleExampleSelect} />
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6">
              <NetworkInfo 
                neurons={networkInfo.neurons}
                connections={networkInfo.connections}
                activeNeuron={networkInfo.activeNeuron}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;