import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Minimize2, 
  CheckCircle, 
  Copy, 
  Trash2, 
  Download,
  Upload
} from 'lucide-react';

import { JSONTextArea } from './JSONTextArea';
import { ActionButton } from './ActionButton';
import { FormatOptionsPanel } from './FormatOptions';
import { useClipboard } from '../hooks/useClipboard';
import { 
  formatJSON, 
  minifyJSON, 
  validateJSON, 
  getJSONStats 
} from '../utils/jsonFormatter';
import { FormatOptions } from '../types';

export const JSONFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string>('');
  const [formatOptions, setFormatOptions] = useState<FormatOptions>({
    indent: 2,
    sortKeys: false
  });
  
  const { copied, copyToClipboard } = useClipboard();

  const inputStats = useMemo(() => getJSONStats(input), [input]);
  const outputStats = useMemo(() => getJSONStats(output), [output]);

  const handleFormat = () => {
    const result = formatJSON(input, formatOptions);
    if (result.success) {
      setOutput(result.data!);
      setError('');
    } else {
      setError(result.error!);
      setOutput('');
    }
  };

  const handleMinify = () => {
    const result = minifyJSON(input);
    if (result.success) {
      setOutput(result.data!);
      setError('');
    } else {
      setError(result.error!);
      setOutput('');
    }
  };

  const handleValidate = () => {
    const result = validateJSON(input);
    if (result.success) {
      setError('');
      setOutput('✅ Valid JSON');
    } else {
      setError(result.error!);
      setOutput('');
    }
  };

  const handleCopy = async () => {
    if (output) {
      await copyToClipboard(output);
    }
  };

  const handleClear = () => {
    if (input || output) {
      const confirmed = window.confirm('Are you sure you want to clear all content?');
      if (confirmed) {
        setInput('');
        setOutput('');
        setError('');
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setInput(content);
      };
      reader.readAsText(file);
    }
  };

  const handleDownload = () => {
    if (output) {
      const blob = new Blob([output], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'formatted.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          JSON Formatter & Validator
        </h1>
        <p className="text-gray-600 text-lg">
          Format, minify, and validate your JSON data with ease
        </p>
      </div>

      {/* Format Options */}
      <FormatOptionsPanel 
        options={formatOptions} 
        onChange={setFormatOptions} 
      />

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <ActionButton
          onClick={handleFormat}
          icon={FileText}
          label="Format"
          variant="primary"
          disabled={!input.trim()}
        />
        <ActionButton
          onClick={handleMinify}
          icon={Minimize2}
          label="Minify"
          variant="secondary"
          disabled={!input.trim()}
        />
        <ActionButton
          onClick={handleValidate}
          icon={CheckCircle}
          label="Validate"
          variant="success"
          disabled={!input.trim()}
        />
        <ActionButton
          onClick={handleCopy}
          icon={Copy}
          label={copied ? "Copied!" : "Copy"}
          variant="primary"
          disabled={!output}
        />
        <ActionButton
          onClick={handleDownload}
          icon={Download}
          label="Download"
          variant="secondary"
          disabled={!output}
        />
        <ActionButton
          onClick={handleClear}
          icon={Trash2}
          label="Clear"
          variant="danger"
          disabled={!input && !output}
        />
      </div>

      {/* File Upload */}
      <div className="flex justify-center">
        <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition-colors duration-200">
          <Upload size={18} />
          Upload JSON File
          <input
            type="file"
            accept=".json,application/json,text/plain"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Text Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-96">
        <JSONTextArea
          value={input}
          onChange={setInput}
          placeholder="Paste your JSON here..."
          label="Input JSON"
          stats={inputStats}
        />
        <JSONTextArea
          value={output}
          onChange={() => {}}
          placeholder="Formatted JSON will appear here..."
          readOnly
          label="Output JSON"
          stats={outputStats}
          error={error}
        />
      </div>
    </div>
  );
};