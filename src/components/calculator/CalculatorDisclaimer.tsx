import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Info } from 'lucide-react';

const CalculatorDisclaimer: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-8 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-200 rounded-3xl p-5 shadow-lg"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-2.5 rounded-xl shadow-lg">
            <AlertTriangle className="h-5 w-5 text-white" />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-base font-bold text-amber-800">Important Disclaimer</h3>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-amber-600" />
              <span className="text-xs font-medium text-amber-700">AMFI Registered</span>
            </div>
          </div>
          
          <div className="space-y-3 text-amber-800">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs leading-relaxed">
                <strong>Illustrative Purpose Only:</strong> The calculations provided by these tools are for 
                illustrative and informational purposes only. They are based on the data you provide and 
                certain mathematical assumptions about market performance.
              </p>
            </div>
            
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs leading-relaxed">
                <strong>Not Financial Advice:</strong> The results should not be considered as financial, 
                investment, tax, or legal advice. Past performance does not guarantee future results, and 
                actual returns may vary significantly from projections.
              </p>
            </div>
            
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs leading-relaxed">
                <strong>Professional Consultation:</strong> SJ Capital Investaa does not guarantee the 
                accuracy or applicability of the results to your individual circumstances. We strongly 
                recommend consulting with a qualified financial advisor before making any investment decisions.
              </p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-white/60 rounded-2xl border border-amber-200">
            <p className="text-xs text-amber-700 font-medium text-center">
              <strong>Market Risk:</strong> Mutual fund investments are subject to market risks. 
              Please read all scheme-related documents carefully before investing.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CalculatorDisclaimer;