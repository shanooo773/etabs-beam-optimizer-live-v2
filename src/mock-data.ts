import { AnalysisResults, BeamSection, BeamAnalysisResult } from './types';
import { v4 as uuidv4 } from 'uuid';

// Mock beam section library
const beamSections: Record<string, BeamSection> = {
  'W12X26': {
    id: 'W12X26',
    name: 'W12X26',
    type: 'W',
    depth: 310,
    width: 165,
    area: 49.4,
    momentOfInertiaX: 8180,
    momentOfInertiaY: 285,
    sectionModulusX: 528,
    sectionModulusY: 53.2,
    plasticModulusX: 595,
    plasticModulusY: 82.4,
    weight: 38.7
  },
  'W12X30': {
    id: 'W12X30',
    name: 'W12X30',
    type: 'W',
    depth: 312,
    width: 166,
    area: 56.8,
    momentOfInertiaX: 9440,
    momentOfInertiaY: 301,
    sectionModulusX: 607,
    sectionModulusY: 56.3,
    plasticModulusX: 684,
    plasticModulusY: 86.8,
    weight: 44.5
  },
  'W14X22': {
    id: 'W14X22',
    name: 'W14X22',
    type: 'W',
    depth: 356,
    width: 127,
    area: 41.9,
    momentOfInertiaX: 8360,
    momentOfInertiaY: 148,
    sectionModulusX: 471,
    sectionModulusY: 23.3,
    plasticModulusX: 533,
    plasticModulusY: 36.1,
    weight: 32.9
  },
  'W16X26': {
    id: 'W16X26',
    name: 'W16X26',
    type: 'W',
    depth: 406,
    width: 140,
    area: 49.7,
    momentOfInertiaX: 13400,
    momentOfInertiaY: 187,
    sectionModulusX: 659,
    sectionModulusY: 26.7,
    plasticModulusX: 744,
    plasticModulusY: 41.5,
    weight: 38.7
  },
  'W16X31': {
    id: 'W16X31',
    name: 'W16X31',
    type: 'W',
    depth: 406,
    width: 140,
    area: 58.8,
    momentOfInertiaX: 15700,
    momentOfInertiaY: 221,
    sectionModulusX: 774,
    sectionModulusY: 31.5,
    plasticModulusX: 873,
    plasticModulusY: 48.9,
    weight: 46.1
  },
  'W18X35': {
    id: 'W18X35',
    name: 'W18X35',
    type: 'W',
    depth: 457,
    width: 152,
    area: 66.5,
    momentOfInertiaX: 23000,
    momentOfInertiaY: 317,
    sectionModulusX: 1010,
    sectionModulusY: 41.7,
    plasticModulusX: 1140,
    plasticModulusY: 64.1,
    weight: 52.1
  },
  'W18X40': {
    id: 'W18X40',
    name: 'W18X40',
    type: 'W',
    depth: 459,
    width: 153,
    area: 75.9,
    momentOfInertiaX: 26200,
    momentOfInertiaY: 341,
    sectionModulusX: 1140,
    sectionModulusY: 44.6,
    plasticModulusX: 1290,
    plasticModulusY: 68.6,
    weight: 59.5
  },
  'W21X44': {
    id: 'W21X44',
    name: 'W21X44',
    type: 'W',
    depth: 533,
    width: 165,
    area: 83.9,
    momentOfInertiaX: 39400,
    momentOfInertiaY: 449,
    sectionModulusX: 1480,
    sectionModulusY: 54.5,
    plasticModulusX: 1650,
    plasticModulusY: 84.1,
    weight: 65.5
  },
  'W21X50': {
    id: 'W21X50',
    name: 'W21X50',
    type: 'W',
    depth: 528,
    width: 166,
    area: 95.0,
    momentOfInertiaX: 43700,
    momentOfInertiaY: 512,
    sectionModulusX: 1650,
    sectionModulusY: 61.7,
    plasticModulusX: 1860,
    plasticModulusY: 95.0,
    weight: 74.4
  },
  'W24X55': {
    id: 'W24X55',
    name: 'W24X55',
    type: 'W',
    depth: 610,
    width: 178,
    area: 103.9,
    momentOfInertiaX: 67800,
    momentOfInertiaY: 656,
    sectionModulusX: 2230,
    sectionModulusY: 73.7,
    plasticModulusX: 2500,
    plasticModulusY: 113,
    weight: 81.6
  }
};

// Generate mock beam analysis results
const generateMockResults = (): AnalysisResults => {
  const beamResults: BeamAnalysisResult[] = [];
  const stories = ['Story1', 'Story2', 'Story3', 'Story4', 'Story5'];
  const sections = ['W12X26', 'W14X22', 'W16X26', 'W18X35', 'W21X44', 'W24X55'];
  
  // Generate 25 beams
  for (let i = 0; i < 25; i++) {
    const storyName = stories[Math.floor(Math.random() * stories.length)];
    const frameName = `B${Math.floor(Math.random() * 10) + 1}`;
    const currentSectionName = sections[Math.floor(Math.random() * sections.length)];
    const currentSection = beamSections[currentSectionName];
    
    // Calculate random max moment between 100 and 400 kN*m
    const maxMoment = Math.random() * 300 + 100;
    
    // Calculate required section modulus (simplified calculation)
    const steel_yield = 345; // MPa
    const safety_factor = 1.67;
    const requiredSectionModulus = (maxMoment * 1000000) / (steel_yield / safety_factor) / 1000; // cm^3
    
    // Find optimal section
    let optimalSection = currentSection;
    let optimalSectionName = currentSectionName;
    
    // Simple optimization logic - find the smallest section that meets the requirement
    for (const [sectionName, section] of Object.entries(beamSections)) {
      if (section.sectionModulusX >= requiredSectionModulus && 
          section.weight < optimalSection.weight) {
        optimalSection = section;
        optimalSectionName = sectionName;
      }
    }
    
    // Calculate savings percentage
    const isOptimal = currentSection.name === optimalSection.name;
    const savingsPercentage = isOptimal ? 0 : 
      Math.round(((currentSection.weight - optimalSection.weight) / currentSection.weight) * 100);
    
    beamResults.push({
      id: uuidv4(),
      storyName,
      frameName: `${storyName}-${frameName}`,
      currentSection: currentSectionName,
      length: Math.random() * 6 + 4, // Random length between 4 and 10 meters
      maxMoment,
      requiredSectionModulus,
      optimalSection: optimalSectionName,
      isOptimal,
      savingsPercentage,
      currentSectionProperties: currentSection,
      optimalSectionProperties: optimalSection
    });
  }
  
  // Calculate summary data
  const optimalBeams = beamResults.filter(beam => beam.isOptimal).length;
  const improvableBeams = beamResults.length - optimalBeams;
  const totalSavings = beamResults.reduce((sum, beam) => sum + beam.savingsPercentage, 0);
  const averageSavings = totalSavings / beamResults.length;
  
  return {
    totalBeams: beamResults.length,
    optimalBeams,
    improvableBeams,
    averageSavings,
    results: beamResults
  };
};

export const mockAnalysisResults = generateMockResults();