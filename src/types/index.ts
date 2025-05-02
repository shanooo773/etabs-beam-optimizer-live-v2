export interface BeamSection {
  id: string;
  name: string;
  type: string;
  depth: number;
  width: number;
  area: number;
  momentOfInertiaX: number;
  momentOfInertiaY: number;
  sectionModulusX: number;
  sectionModulusY: number;
  plasticModulusX: number;
  plasticModulusY: number;
  weight: number;
}

export interface BeamAnalysisResult {
  id: string;
  storyName: string;
  frameName: string;
  currentSection: string;
  length: number;
  maxMoment: number;
  requiredSectionModulus: number;
  optimalSection: string;
  isOptimal: boolean;
  savingsPercentage: number;
  currentSectionProperties: BeamSection;
  optimalSectionProperties: BeamSection;
}

export interface AnalysisResults {
  totalBeams: number;
  optimalBeams: number;
  improvableBeams: number;
  averageSavings: number;
  results: BeamAnalysisResult[];
}

export interface UploadResponse {
  success: boolean;
  message: string;
  fileId?: string;
}

export type SortDirection = 'asc' | 'desc';

export interface SortState {
  column: keyof BeamAnalysisResult | '';
  direction: SortDirection;
}

export interface FilterState {
  story: string;
  section: string;
  status: 'all' | 'optimal' | 'improvable';
}