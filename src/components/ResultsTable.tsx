import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { BeamAnalysisResult, SortDirection, SortState, FilterState } from '../types';

interface ResultsTableProps {
  results: BeamAnalysisResult[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  const [sortState, setSortState] = useState<SortState>({
    column: 'savingsPercentage',
    direction: 'desc',
  });
  
  const [filterState, setFilterState] = useState<FilterState>({
    story: '',
    section: '',
    status: 'all',
  });
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const handleSort = (column: keyof BeamAnalysisResult) => {
    setSortState(prev => ({
      column,
      direction: prev.column === column && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };
  
  // Get unique values for filters
  const uniqueStories = [...new Set(results.map(r => r.storyName))];
  const uniqueSections = [...new Set(results.map(r => r.currentSection))];
  
  // Apply filters
  const filteredResults = results.filter(result => {
    if (filterState.story && result.storyName !== filterState.story) return false;
    if (filterState.section && result.currentSection !== filterState.section) return false;
    if (filterState.status === 'optimal' && !result.isOptimal) return false;
    if (filterState.status === 'improvable' && result.isOptimal) return false;
    return true;
  });
  
  // Apply sorting
  const sortedResults = [...filteredResults].sort((a, b) => {
    if (!sortState.column) return 0;
    
    const aValue = a[sortState.column];
    const bValue = b[sortState.column];
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortState.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
      return sortState.direction === 'asc' 
        ? (aValue === bValue ? 0 : aValue ? 1 : -1)
        : (aValue === bValue ? 0 : aValue ? -1 : 1);
    }
    
    // String comparison
    const aString = String(aValue);
    const bString = String(bValue);
    return sortState.direction === 'asc' 
      ? aString.localeCompare(bString)
      : bString.localeCompare(aString);
  });
  
  const resetFilters = () => {
    setFilterState({
      story: '',
      section: '',
      status: 'all',
    });
  };
  
  return (
    <div className="card slide-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="text-xl font-semibold mb-2 md:mb-0">Optimization Results</h2>
        
        <div className="flex flex-col md:flex-row w-full md:w-auto items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="btn btn-secondary flex items-center"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {(filterState.story || filterState.section || filterState.status !== 'all') && (
              <span className="ml-2 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {(Number(!!filterState.story) + Number(!!filterState.section) + Number(filterState.status !== 'all'))}
              </span>
            )}
          </button>
          
          <p className="text-sm text-neutral-500">
            Showing {filteredResults.length} of {results.length} beams
          </p>
        </div>
      </div>
      
      {isFilterOpen && (
        <div className="mb-4 p-4 bg-neutral-50 rounded-lg border border-neutral-200 fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Story</label>
              <select
                value={filterState.story}
                onChange={(e) => setFilterState(prev => ({ ...prev, story: e.target.value }))}
                className="input"
              >
                <option value="">All Stories</option>
                {uniqueStories.map(story => (
                  <option key={story} value={story}>{story}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Section</label>
              <select
                value={filterState.section}
                onChange={(e) => setFilterState(prev => ({ ...prev, section: e.target.value }))}
                className="input"
              >
                <option value="">All Sections</option>
                {uniqueSections.map(section => (
                  <option key={section} value={section}>{section}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Status</label>
              <select
                value={filterState.status}
                onChange={(e) => setFilterState(prev => ({ ...prev, status: e.target.value as 'all' | 'optimal' | 'improvable' }))}
                className="input"
              >
                <option value="all">All Status</option>
                <option value="optimal">Optimal</option>
                <option value="improvable">Improvable</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button 
              onClick={resetFilters}
              className="btn btn-secondary mr-2"
            >
              Reset
            </button>
            <button 
              onClick={() => setIsFilterOpen(false)}
              className="btn btn-primary"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th 
                onClick={() => handleSort('storyName')}
                className="cursor-pointer hover:bg-neutral-200"
              >
                <div className="flex items-center">
                  Story
                  {sortState.column === 'storyName' && (
                    sortState.direction === 'asc' 
                      ? <ChevronUp className="w-4 h-4 ml-1" /> 
                      : <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </div>
              </th>
              <th 
                onClick={() => handleSort('frameName')}
                className="cursor-pointer hover:bg-neutral-200"
              >
                <div className="flex items-center">
                  Frame
                  {sortState.column === 'frameName' && (
                    sortState.direction === 'asc' 
                      ? <ChevronUp className="w-4 h-4 ml-1" /> 
                      : <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </div>
              </th>
              <th 
                onClick={() => handleSort('currentSection')}
                className="cursor-pointer hover:bg-neutral-200"
              >
                <div className="flex items-center">
                  Current Section
                  {sortState.column === 'currentSection' && (
                    sortState.direction === 'asc' 
                      ? <ChevronUp className="w-4 h-4 ml-1" /> 
                      : <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </div>
              </th>
              <th 
                onClick={() => handleSort('maxMoment')}
                className="cursor-pointer hover:bg-neutral-200"
              >
                <div className="flex items-center">
                  Max Moment
                  {sortState.column === 'maxMoment' && (
                    sortState.direction === 'asc' 
                      ? <ChevronUp className="w-4 h-4 ml-1" /> 
                      : <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </div>
              </th>
              <th 
                onClick={() => handleSort('optimalSection')}
                className="cursor-pointer hover:bg-neutral-200"
              >
                <div className="flex items-center">
                  Optimal Section
                  {sortState.column === 'optimalSection' && (
                    sortState.direction === 'asc' 
                      ? <ChevronUp className="w-4 h-4 ml-1" /> 
                      : <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </div>
              </th>
              <th 
                onClick={() => handleSort('savingsPercentage')}
                className="cursor-pointer hover:bg-neutral-200"
              >
                <div className="flex items-center">
                  Savings
                  {sortState.column === 'savingsPercentage' && (
                    sortState.direction === 'asc' 
                      ? <ChevronUp className="w-4 h-4 ml-1" /> 
                      : <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </div>
              </th>
              <th 
                onClick={() => handleSort('isOptimal')}
                className="cursor-pointer hover:bg-neutral-200"
              >
                <div className="flex items-center">
                  Status
                  {sortState.column === 'isOptimal' && (
                    sortState.direction === 'asc' 
                      ? <ChevronUp className="w-4 h-4 ml-1" /> 
                      : <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedResults.length > 0 ? (
              sortedResults.map((result) => (
                <tr key={result.id} className="hover:bg-neutral-50">
                  <td>{result.storyName}</td>
                  <td>{result.frameName}</td>
                  <td>{result.currentSection}</td>
                  <td>{result.maxMoment.toFixed(2)} kN·m</td>
                  <td>{result.optimalSection}</td>
                  <td>
                    {result.savingsPercentage > 0 ? (
                      <span className="text-success-500">{result.savingsPercentage.toFixed(1)}%</span>
                    ) : (
                      <span>0%</span>
                    )}
                  </td>
                  <td>
                    {result.isOptimal ? (
                      <span className="status-optimal">Optimal</span>
                    ) : (
                      <span className="status-improvable">Improvable</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-8 text-neutral-500">
                  No results match the current filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-neutral-500">
          {sortedResults.length} results
        </p>
        
        <button className="btn btn-primary">
          Download Results
        </button>
      </div>
    </div>
  );
};

export default ResultsTable;