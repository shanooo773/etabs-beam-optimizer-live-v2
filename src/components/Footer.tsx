import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-800 text-neutral-200 py-8 mt-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ETABS Beam Optimizer</h3>
            <p className="text-sm text-neutral-400">
              A tool for structural engineers to optimize beam sections based on ETABS model data.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="text-sm text-neutral-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Documentation</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-700 mt-8 pt-6 text-sm text-neutral-400 text-center">
          &copy; {currentYear} ETABS Beam Optimizer. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;