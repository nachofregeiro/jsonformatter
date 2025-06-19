import { JSONFormatResult, JSONStats, FormatOptions } from '../types';

export const formatJSON = (
  input: string, 
  options: FormatOptions = { indent: 2, sortKeys: false }
): JSONFormatResult => {
  if (!input.trim()) {
    return { success: false, error: 'Input is empty' };
  }

  try {
    const parsed = JSON.parse(input);
    
    const formatted = JSON.stringify(
      options.sortKeys ? sortObjectKeys(parsed) : parsed,
      null,
      options.indent
    );
    
    return { success: true, data: formatted };
  } catch (error) {
    const errorMessage = (error as Error).message;
    const match = errorMessage.match(/at position (\d+)/);
    
    if (match) {
      const position = parseInt(match[1]);
      const lines = input.substring(0, position).split('\n');
      const lineNumber = lines.length;
      const column = lines[lines.length - 1].length + 1;
      
      return {
        success: false,
        error: errorMessage,
        lineNumber,
        column
      };
    }
    
    return { success: false, error: errorMessage };
  }
};

export const minifyJSON = (input: string): JSONFormatResult => {
  if (!input.trim()) {
    return { success: false, error: 'Input is empty' };
  }

  try {
    const parsed = JSON.parse(input);
    const minified = JSON.stringify(parsed);
    return { success: true, data: minified };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};

export const validateJSON = (input: string): JSONFormatResult => {
  if (!input.trim()) {
    return { success: false, error: 'Input is empty' };
  }

  try {
    JSON.parse(input);
    return { success: true, data: 'Valid JSON' };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};

export const getJSONStats = (input: string): JSONStats => {
  const characters = input.length;
  const lines = input ? input.split('\n').length : 0;
  const bytes = new Blob([input]).size;
  
  let size: string;
  if (bytes < 1024) {
    size = `${bytes} bytes`;
  } else if (bytes < 1024 * 1024) {
    size = `${(bytes / 1024).toFixed(1)} KB`;
  } else {
    size = `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return { characters, lines, size };
};

const sortObjectKeys = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys);
  } else if (obj !== null && typeof obj === 'object') {
    const sorted: any = {};
    Object.keys(obj).sort().forEach(key => {
      sorted[key] = sortObjectKeys(obj[key]);
    });
    return sorted;
  }
  return obj;
};