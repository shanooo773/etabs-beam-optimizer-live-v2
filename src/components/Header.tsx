import React from 'react';
import { Bean as Beam } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-neutral-200 py-4 px-6 mb-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Beam className="h-8 w-8 text-primary-600 mr-2" />
          <div>
            <h1 className="text-2xl font-semibold text-neutral-800">ETABS Beam Optimizer</h1>
            <p className="text-sm text-neutral-500">Optimize structural beam sections based on moment requirements</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <a 
            href="https://github.com/yourorg/etabs-beam-optimizer" 
            target="_blank"
            rel="noopener noreferrer" 
            className="text-neutral-600 hover:text-primary-600 transition-colors"
          >
            Documentation
          </a>
          <a 
            href="#about" 
            className="text-neutral-600 hover:text-primary-600 transition-colors"
          >
            About
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;