import React from 'react';
import { FormatOptions } from '../types';

interface FormatOptionsProps {
  options: FormatOptions;
  onChange: (options: FormatOptions) => void;
}

export const FormatOptionsPanel: React.FC<FormatOptionsProps> = ({
  options,
  onChange
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h4 className="text-sm font-semibold text-gray-700 mb-3">Format Options</h4>
      
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="indent" className="text-sm text-gray-600">
            Indent:
          </label>
          <select
            id="indent"
            value={options.indent}
            onChange={(e) => onChange({ ...options, indent: parseInt(e.target.value) })}
            className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={8}>8 spaces</option>
            <option value={0}>Tabs</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="sortKeys"
            checked={options.sortKeys}
            onChange={(e) => onChange({ ...options, sortKeys: e.target.checked })}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label htmlFor="sortKeys" className="text-sm text-gray-600">
            Sort keys alphabetically
          </label>
        </div>
      </div>
    </div>
  );
};