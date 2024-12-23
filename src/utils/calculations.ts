export function calculateSlippage(startBin: string, endBin: string, tokenAmount: string) {
  if (!startBin || !endBin || !tokenAmount) return null;
  
  const start = parseFloat(startBin);
  const end = parseFloat(endBin);
  const amount = parseFloat(tokenAmount);
  
  if (isNaN(start) || isNaN(end) || isNaN(amount)) return null;
  
  const slippagePercentage = Math.abs((end - start) / start) * 100;
  const impactValue = (amount * slippagePercentage) / 100;
  
  return {
    percentage: slippagePercentage.toFixed(4),
    impact: impactValue.toFixed(4)
  };
}