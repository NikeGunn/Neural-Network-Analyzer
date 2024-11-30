import React, { useState, useEffect } from 'react';
import type { InputData, Example } from '../types/neural-network';

interface DataInputProps {
  onSubmit: (data: InputData) => void;
  example?: Example;
}

export const DataInput: React.FC<DataInputProps> = ({ onSubmit, example }) => {
  const [values, setValues] = useState<string[]>(Array(4).fill(''));
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (example) {
      setValues(Array(4).fill(''));
      setLabel('');
    }
  }, [example]);

  const isValidInput = values.every(v => v !== '' && !isNaN(parseFloat(v))) && label.trim() !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidInput) {
      onSubmit({
        values: values.map(v => parseFloat(v)),
        label
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Input Values</label>
        <div className="grid grid-cols-1 gap-4">
          {values.map((value, index) => (
            <div key={index} className="space-y-1">
              <label className="text-sm text-gray-300">
                {example ? example.inputLabels[index] : `Input ${index + 1}`}
              </label>
              <input
                type="number"
                step="0.1"
                value={value}
                onChange={(e) => {
                  const newValues = [...values];
                  newValues[index] = e.target.value;
                  setValues(newValues);
                }}
                className="w-full px-3 py-2 bg-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter ${example ? example.inputLabels[index].toLowerCase() : 'value'}`}
                required
              />
            </div>
          ))}
        </div>
      </div>
      
      {example?.sampleData && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Sample Data</h4>
          <div className="grid gap-2">
            {example.sampleData.map((sample, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setValues(sample.values.map(String));
                  setLabel(sample.label);
                }}
                className="p-2 bg-gray-700 rounded text-sm hover:bg-gray-600 transition-colors text-left"
              >
                <div className="font-medium">{sample.label}</div>
                <div className="text-gray-400 text-xs">
                  {sample.values.map((v, i) => `${example.inputLabels[i]}: ${v}`).join(', ')}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Label</label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500"
          placeholder="Enter a label for this data"
          required
        />
      </div>

      <button
        type="submit"
        disabled={!isValidInput}
        className={`w-full px-4 py-2 rounded-md transition-colors ${
          isValidInput
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
        }`}
      >
        Process Data
      </button>
    </form>
  );
};