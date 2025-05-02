import React from 'react';
import { BarChart3, Scale as Scales, Check, AlertTriangle } from 'lucide-react';
import { AnalysisResults } from '../types';

interface ResultsSummaryProps {
  results: AnalysisResults;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({ results }) => {
  const { totalBeams, optimalBeams, improvableBeams, averageSavings } = results;
  
  const optimalPercentage = Math.round((optimalBeams / totalBeams) * 100) || 0;
  const improvablePercentage = Math.round((improvableBeams / totalBeams) * 100) || 0;
  
  return (
    <div className="card mb-6 slide-in-up">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <BarChart3 className="w-5 h-5 mr-2 text-primary-600" />
        Optimization Summary
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
          <div className="flex items-center mb-2">
            <Scales className="w-5 h-5 text-neutral-700 mr-2" />
            <h3 className="font-medium text-neutral-800">Total Beams</h3>
          </div>
          <p className="text-2xl font-bold text-neutral-900">{totalBeams}</p>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center mb-2">
            <Check className="w-5 h-5 text-success-500 mr-2" />
            <h3 className="font-medium text-neutral-800">Optimal Beams</h3>
          </div>
          <p className="text-2xl font-bold text-neutral-900">{optimalBeams} <span className="text-sm font-normal text-neutral-500">({optimalPercentage}%)</span></p>
        </div>
        
        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
          <div className="flex items-center mb-2">
            <AlertTriangle className="w-5 h-5 text-warning-500 mr-2" />
            <h3 className="font-medium text-neutral-800">Improvable Beams</h3>
          </div>
          <p className="text-2xl font-bold text-neutral-900">{improvableBeams} <span className="text-sm font-normal text-neutral-500">({improvablePercentage}%)</span></p>
        </div>
        
        <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center mb-2">
            <BarChart3 className="w-5 h-5 text-primary-600 mr-2" />
            <h3 className="font-medium text-neutral-800">Avg. Material Savings</h3>
          </div>
          <p className="text-2xl font-bold text-neutral-900">{averageSavings.toFixed(1)}%</p>
        </div>
      </div>

      <div className="mt-6 bg-neutral-50 p-4 rounded-lg border border-neutral-200">
        <div className="w-full bg-neutral-200 rounded-full h-4">
          <div 
            className="bg-success-500 h-4 rounded-full" 
            style={{ width: `${optimalPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-neutral-600">
          <span>Optimal: {optimalPercentage}%</span>
          <span>Improvable: {improvablePercentage}%</span>
        </div>
      </div>
    </div>
  );
};

export default ResultsSummary;