import React from 'react';
import { BookOpen } from 'lucide-react';
import type { Example } from '../types/neural-network';

interface ExampleSelectorProps {
  onSelect: (example: Example) => void;
}

export const ExampleSelector: React.FC<ExampleSelectorProps> = ({ onSelect }) => {
  const examples: Example[] = [
    {
      id: 'iris',
      name: 'Iris Flower Classification',
      description: 'Classify iris flowers based on sepal length, sepal width, petal length, and petal width.',
      inputLabels: ['Sepal Length', 'Sepal Width', 'Petal Length', 'Petal Width'],
      sampleData: [
        { values: [5.1, 3.5, 1.4, 0.2], label: 'Setosa' },
        { values: [7.0, 3.2, 4.7, 1.4], label: 'Versicolor' },
        { values: [6.3, 3.3, 6.0, 2.5], label: 'Virginica' }
      ]
    },
    {
      id: 'house',
      name: 'House Price Prediction',
      description: 'Predict house prices based on square footage, bedrooms, bathrooms, and age.',
      inputLabels: ['Square Ft', 'Bedrooms', 'Bathrooms', 'Age'],
      sampleData: [
        { values: [2500, 4, 2.5, 15], label: 'Rs.450,000' },
        { values: [1800, 3, 2, 25], label: 'Rs.320,000' },
        { values: [3200, 5, 3, 5], label: 'Rs.580,000' }
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-blue-400">
        <BookOpen className="w-5 h-5" />
        <h3 className="font-semibold">Example Datasets</h3>
      </div>
      <div className="grid gap-4">
        {examples.map((example) => (
          <button
            key={example.id}
            onClick={() => onSelect(example)}
            className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-left"
          >
            <h4 className="font-medium mb-2">{example.name}</h4>
            <p className="text-sm text-gray-300">{example.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};