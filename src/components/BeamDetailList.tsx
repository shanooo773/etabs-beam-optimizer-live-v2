import React, { useState } from 'react';
import { BeamAnalysisResult } from '../types';
import BeamDetail from './BeamDetail';

interface BeamDetailListProps {
  results: BeamAnalysisResult[];
}

const BeamDetailList: React.FC<BeamDetailListProps> = ({ results }) => {
  const [openBeamId, setOpenBeamId] = useState<string | null>(null);
  
  const toggleBeam = (id: string) => {
    setOpenBeamId(prev => prev === id ? null : id);
  };
  
  return (
    <div className="card mt-6 slide-in-up">
      <h2 className="text-xl font-semibold mb-4">Detailed Beam Analysis</h2>
      
      {results.length > 0 ? (
        results.map(beam => (
          <BeamDetail 
            key={beam.id}
            beam={beam}
            isOpen={openBeamId === beam.id}
            toggleOpen={() => toggleBeam(beam.id)}
          />
        ))
      ) : (
        <div className="text-center py-8 text-neutral-500">
          No beam data available
        </div>
      )}
    </div>
  );
};

export default BeamDetailList;