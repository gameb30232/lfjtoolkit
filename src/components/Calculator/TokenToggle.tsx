import React from 'react';
import { ArrowRightLeft } from 'lucide-react';

interface TokenToggleProps {
  tokenType: 'JOE' | 'AVAX';
  onTokenChange: (token: 'JOE' | 'AVAX') => void;
}

export function TokenToggle({ tokenType, onTokenChange }: TokenToggleProps) {
  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => onTokenChange('JOE')}
        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
          tokenType === 'JOE'
            ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        JOE
      </button>
      <ArrowRightLeft className="w-5 h-5 text-gray-400" />
      <button
        onClick={() => onTokenChange('AVAX')}
        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
          tokenType === 'AVAX'
            ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        AVAX
      </button>
    </div>
  );
}