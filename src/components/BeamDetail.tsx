import React from 'react';
import { BeamAnalysisResult } from '../types';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

interface BeamDetailProps {
  beam: BeamAnalysisResult;
  isOpen: boolean;
  toggleOpen: () => void;
}

const BeamDetail: React.FC<BeamDetailProps> = ({ beam, isOpen, toggleOpen }) => {
  const { 
    currentSectionProperties,
    optimalSectionProperties,
    maxMoment,
    length,
    requiredSectionModulus
  } = beam;
  
  return (
    <div className="border border-neutral-200 rounded-lg mb-4 overflow-hidden">
      <div 
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-neutral-50"
        onClick={toggleOpen}
      >
        <div className="flex items-center">
          <div className="mr-4">
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-neutral-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-neutral-600" />
            )}
          </div>
          <div>
            <h3 className="font-medium">{beam.frameName}</h3>
            <p className="text-sm text-neutral-500">Story: {beam.storyName}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div>
            <p className="text-sm text-neutral-500">Current</p>
            <p className="font-medium">{beam.currentSection}</p>
          </div>
          
          <ArrowRight className="w-4 h-4 text-neutral-400" />
          
          <div>
            <p className="text-sm text-neutral-500">Optimal</p>
            <p className="font-medium">{beam.optimalSection}</p>
          </div>
          
          <div>
            {beam.isOptimal ? (
              <span className="status-optimal">Optimal</span>
            ) : (
              <span className="status-improvable">Improvable</span>
            )}
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="p-4 bg-neutral-50 border-t border-neutral-200 fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-1">
              <h4 className="font-medium mb-2">Beam Properties</h4>
              <div className="bg-white p-3 rounded-md border border-neutral-200">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-neutral-500">Length:</div>
                  <div>{length.toFixed(2)} m</div>
                  
                  <div className="text-neutral-500">Max Moment:</div>
                  <div>{maxMoment.toFixed(2)} kN·m</div>
                  
                  <div className="text-neutral-500">Required S<sub>x</sub>:</div>
                  <div>{requiredSectionModulus.toFixed(2)} cm<sup>3</sup></div>
                </div>
              </div>
            </div>
            
            <div className="col-span-1">
              <h4 className="font-medium mb-2">Current Section: {beam.currentSection}</h4>
              <div className="bg-white p-3 rounded-md border border-neutral-200">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-neutral-500">Depth:</div>
                  <div>{currentSectionProperties.depth} mm</div>
                  
                  <div className="text-neutral-500">Width:</div>
                  <div>{currentSectionProperties.width} mm</div>
                  
                  <div className="text-neutral-500">Area:</div>
                  <div>{currentSectionProperties.area} cm<sup>2</sup></div>
                  
                  <div className="text-neutral-500">I<sub>x</sub>:</div>
                  <div>{currentSectionProperties.momentOfInertiaX} cm<sup>4</sup></div>
                  
                  <div className="text-neutral-500">S<sub>x</sub>:</div>
                  <div>{currentSectionProperties.sectionModulusX} cm<sup>3</sup></div>
                  
                  <div className="text-neutral-500">Weight:</div>
                  <div>{currentSectionProperties.weight} kg/m</div>
                </div>
              </div>
            </div>
            
            <div className="col-span-1">
              <h4 className="font-medium mb-2">Optimal Section: {beam.optimalSection}</h4>
              <div className={`bg-white p-3 rounded-md border ${!beam.isOptimal ? 'border-success-500' : 'border-neutral-200'}`}>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-neutral-500">Depth:</div>
                  <div>{optimalSectionProperties.depth} mm</div>
                  
                  <div className="text-neutral-500">Width:</div>
                  <div>{optimalSectionProperties.width} mm</div>
                  
                  <div className="text-neutral-500">Area:</div>
                  <div>{optimalSectionProperties.area} cm<sup>2</sup></div>
                  
                  <div className="text-neutral-500">I<sub>x</sub>:</div>
                  <div>{optimalSectionProperties.momentOfInertiaX} cm<sup>4</sup></div>
                  
                  <div className="text-neutral-500">S<sub>x</sub>:</div>
                  <div>{optimalSectionProperties.sectionModulusX} cm<sup>3</sup></div>
                  
                  <div className="text-neutral-500">Weight:</div>
                  <div>{optimalSectionProperties.weight} kg/m</div>
                </div>
                
                {!beam.isOptimal && (
                  <div className="mt-3 pt-3 border-t border-neutral-200">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-success-500 font-medium">Material Savings:</span>
                      <span className="text-success-500 font-medium">{beam.savingsPercentage.toFixed(1)}%</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeamDetail;