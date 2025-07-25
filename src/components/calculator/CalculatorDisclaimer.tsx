import React from 'react';
import { AlertTriangle } from 'lucide-react';

const CalculatorDisclaimer: React.FC = () => {
  return (
    <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 text-yellow-800 rounded-r-lg">
      <div className="flex">
        <div className="flex-shrink-0 pt-0.5">
          <AlertTriangle className="h-5 w-5 text-yellow-500" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className="text-sm font-bold">Disclaimer</p>
          <p className="mt-1 text-xs leading-relaxed">
            The calculations provided by these tools are for illustrative and informational purposes only. They are based on the data you provide and certain assumptions. The results should not be considered as financial, investment, or legal advice. SJ Capital Investaa does not guarantee the accuracy or applicability of the results to your individual circumstances. We strongly recommend consulting with a qualified financial advisor before making any investment decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CalculatorDisclaimer;