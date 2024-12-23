import React from 'react';
import { Info } from 'lucide-react';

interface SlippageResultProps {
  percentage: string;
  impact: string;
  tokenType: 'JOE' | 'AVAX';
}

export function SlippageResult({ percentage, impact, tokenType }: SlippageResultProps) {
  return (
    <div className="bg-purple-50 rounded-xl p-6 transform transition-all hover:scale-[1.02]">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Slippage Impact</h3>
          <p className="text-sm text-gray-600 mt-1">
            Moving between selected price bins
          </p>
        </div>
        <Info className="w-5 h-5 text-purple-600" />
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-600">Percentage</p>
          <p className="text-2xl font-bold text-purple-600">{percentage}%</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-600">Value Impact</p>
          <p className="text-2xl font-bold text-purple-600">
            {impact} {tokenType}
          </p>
        </div>
      </div>
    </div>
  );
}