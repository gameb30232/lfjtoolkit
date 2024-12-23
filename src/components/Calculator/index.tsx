import React, { useState, useCallback } from 'react';
import { Calculator as CalculatorIcon } from 'lucide-react';
import { CalculatorInput } from './Input';
import { TokenToggle } from './TokenToggle';
import { SlippageResult } from './SlippageResult';
import { calculateSlippage } from '../../utils/calculations';

export default function SlippageCalculator() {
  const [startBin, setStartBin] = useState('');
  const [endBin, setEndBin] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');
  const [tokenType, setTokenType] = useState<'JOE' | 'AVAX'>('JOE');

  const result = calculateSlippage(startBin, endBin, tokenAmount);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-purple-100 rounded-lg">
              <CalculatorIcon className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">LFJ.GG Slippage Calculator</h1>
              <p className="text-gray-600">Calculate the impact of moving between price bins</p>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CalculatorInput
                label="Start Bin Price"
                value={startBin}
                onChange={setStartBin}
                placeholder="e.g., 0.01060"
              />
              <CalculatorInput
                label="End Bin Price"
                value={endBin}
                onChange={setEndBin}
                placeholder="e.g., 0.01068"
              />
            </div>

            <div className="space-y-4">
              <CalculatorInput
                label="Token Amount"
                value={tokenAmount}
                onChange={setTokenAmount}
                placeholder="Enter amount"
              />
              
              <TokenToggle
                tokenType={tokenType}
                onTokenChange={setTokenType}
              />
            </div>

            {result && (
              <SlippageResult
                percentage={result.percentage}
                impact={result.impact}
                tokenType={tokenType}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}