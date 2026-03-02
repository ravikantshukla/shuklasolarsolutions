import { SOLAR_CONFIG } from './config.js';

const formatINR = (num) => `₹${Math.round(num).toLocaleString('en-IN')}`;

function calculateEMI(principal, annualRate, tenureYears) {
  const monthlyRate = annualRate / 12 / 100;
  const months = tenureYears * 12;
  if (monthlyRate === 0) return principal / months;
  const factor = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * factor) / (factor - 1);
}

export function initCalculator() {
  const el = {
    systemSize: document.getElementById('systemSize'),
    systemCost: document.getElementById('systemCost'),
    subsidy: document.getElementById('subsidy'),
    tenure: document.getElementById('tenure'),
    interest: document.getElementById('interest'),
    netCost: document.getElementById('netCost'),
    emi: document.getElementById('emi'),
    annualSavings: document.getElementById('annualSavings'),
    payback: document.getElementById('payback')
  };

  function updateCalculator() {
    const size = Number(el.systemSize.value);
    const totalCost = size * SOLAR_CONFIG.costPerKW;
    const subsidy = totalCost * SOLAR_CONFIG.subsidyRate;
    const netCost = totalCost - subsidy;
    const tenure = Number(el.tenure.value);
    const rate = Number(el.interest.value) || 0;

    const monthlyEMI = calculateEMI(netCost, rate, tenure);
    const annualSavings = Math.max(30000, SOLAR_CONFIG.yearlyBillBeforeSolar - 4800);
    const paybackYears = netCost / annualSavings;

    el.systemCost.value = Math.round(totalCost);
    el.subsidy.value = Math.round(subsidy);
    el.netCost.textContent = formatINR(netCost);
    el.emi.textContent = formatINR(monthlyEMI);
    el.annualSavings.textContent = formatINR(annualSavings);
    el.payback.textContent = `${paybackYears.toFixed(1)} years`;
  }

  [el.systemSize, el.tenure, el.interest].forEach((node) => node.addEventListener('input', updateCalculator));
  updateCalculator();
}
