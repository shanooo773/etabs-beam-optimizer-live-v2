import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Uploader from './components/Uploader';
import ResultsSummary from './components/ResultsSummary';
import ResultsTable from './components/ResultsTable';
import BeamDetailList from './components/BeamDetailList';
import { AnalysisResults } from './types';
import { LayoutGrid, ListFilter } from 'lucide-react';
import { mockAnalysisResults } from './mock-data';

function App() {
  const [fileId, setFileId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'table' | 'details'>('table');
  
  // For demonstration, we're using mock data
  // In production, this would fetch real data from the API based on fileId
  const [results, setResults] = useState<AnalysisResults | null>(null);
  
  const handleUploadSuccess = (id: string) => {
    setFileId(id);
    
    // Simulate API call delay
    setIsLoading(true);
    setTimeout(() => {
      setResults(mockAnalysisResults);
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">ETABS Beam Optimizer</h1>
          <p className="text-neutral-600 max-w-3xl">
            Analyze your structural model and find optimal beam sections based on moment requirements. 
            Upload your ETABS model to get started.
          </p>
        </div>
        
        {!fileId && (
          <div className="max-w-xl mx-auto">
            <Uploader 
              onUploadSuccess={handleUploadSuccess} 
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>
        )}
        
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600 mb-4"></div>
            <p className="text-lg text-neutral-600">Analyzing beam sections...</p>
          </div>
        )}
        
        {results && !isLoading && (
          <>
            <ResultsSummary results={results} />
            
            <div className="mb-4 flex border-b border-neutral-200">
              <button
                className={`px-4 py-2 flex items-center ${
                  activeTab === 'table' 
                    ? 'text-primary-600 border-b-2 border-primary-600' 
                    : 'text-neutral-600 hover:text-primary-500'
                }`}
                onClick={() => setActiveTab('table')}
              >
                <ListFilter className="w-4 h-4 mr-2" />
                Results Table
              </button>
              
              <button
                className={`px-4 py-2 flex items-center ${
                  activeTab === 'details' 
                    ? 'text-primary-600 border-b-2 border-primary-600' 
                    : 'text-neutral-600 hover:text-primary-500'
                }`}
                onClick={() => setActiveTab('details')}
              >
                <LayoutGrid className="w-4 h-4 mr-2" />
                Detailed View
              </button>
            </div>
            
            {activeTab === 'table' && <ResultsTable results={results.results} />}
            {activeTab === 'details' && <BeamDetailList results={results.results} />}
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;