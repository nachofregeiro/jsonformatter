import React from 'react';
import { JSONStats } from '../types';

interface JSONTextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  readOnly?: boolean;
  stats?: JSONStats;
  error?: string;
  label: string;
}

export const JSONTextArea: React.FC<JSONTextAreaProps> = ({
  value,
  onChange,
  placeholder,
  readOnly = false,
  stats,
  error,
  label
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
        {stats && (
          <div className="flex gap-4 text-sm text-gray-600">
            <span>Characters: {stats.characters.toLocaleString()}</span>
            <span>Lines: {stats.lines.toLocaleString()}</span>
            <span>Size: {stats.size}</span>
          </div>
        )}
      </div>
      
      <div className="relative flex-1">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          className={`w-full h-full p-4 border-2 rounded-lg font-mono text-sm leading-relaxed resize-none transition-colors duration-200 ${
            error
              ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-200'
              : readOnly
              ? 'border-gray-200 bg-gray-50 text-gray-700'
              : 'border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-200'
          } focus:outline-none focus:ring-2`}
          spellCheck={false}
        />
        
        {error && (
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-red-100 border-t-2 border-red-300 rounded-b-lg">
            <p className="text-red-700 text-sm font-medium">
              ❌ {error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};