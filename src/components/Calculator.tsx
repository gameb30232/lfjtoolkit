import React, { useState, useCallback } from 'react';
import { Calculator, ArrowRightLeft, Info } from 'lucide-react';

interface CalculatorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const CalculatorInput = ({ label, value, onChange, placeholder }: CalculatorInputProps) => (
  <div className="relative">
    <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
    />
  </div>
);

export default function SlippageCalculator() {
  const [startBin, setStartBin] = useState('');
  const [endBin, setEndBin] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');
  const [tokenType, setTokenType] = useState<'JOE' | 'AVAX'>('JOE');

  const calculateSlippage = useCallback(() => {
    if (!startBin || !endBin || !tokenAmount) return null;
    
    const start = parseFloat(startBin);
    const end = parseFloat(endBin);
    const amount = parseFloat(tokenAmount);
    
    if (isNaN(start) || isNaN(end) || isNaN(amount)) return null;
    
    // Basic slippage calculation (this is a simplified version)
    const slippagePercentage = Math.abs((end - start) / start) * 100;
    const impactValue = (amount * slippagePercentage) / 100;
    
    return {
      percentage: slippagePercentage.toFixed(4),
      impact: impactValue.toFixed(4)
    };
  }, [startBin, endBin, tokenAmount]);

  const result = calculateSlippage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-8 h-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-800">LFJ.GG Slippage Calculator</h1>
          </div>
          
          <div className="space-y-6">
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

            <div className="flex flex-col space-y-4">
              <CalculatorInput
                label="Token Amount"
                value={tokenAmount}
                onChange={setTokenAmount}
                placeholder="Enter amount"
              />
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setTokenType('JOE')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                    tokenType === 'JOE'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  JOE
                </button>
                <ArrowRightLeft className="w-5 h-5 text-gray-400" />
                <button
                  onClick={() => setTokenType('AVAX')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                    tokenType === 'AVAX'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  AVAX
                </button>
              </div>
            </div>

            {result && (
              <div className="mt-8 space-y-4">
                <div className="bg-purple-50 rounded-xl p-6">
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
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-600">Percentage</p>
                      <p className="text-2xl font-bold text-purple-600">{result.percentage}%</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-600">Value Impact</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {result.impact} {tokenType}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}