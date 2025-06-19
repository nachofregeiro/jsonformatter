export interface JSONFormatResult {
  success: boolean;
  data?: string;
  error?: string;
  lineNumber?: number;
  column?: number;
}

export interface JSONStats {
  characters: number;
  lines: number;
  size: string;
}

export interface FormatOptions {
  indent: number;
  sortKeys: boolean;
}