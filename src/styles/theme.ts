// This file should mirror the color palette in tailwind.config.js
// It allows using the same colors in JS/TS logic (e.g., for charts)

export const themeColors = {
  primary: '#0f172a',
  secondary: '#d4af37',
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  chart: {
    investment: '#d4af37', // Corresponds to accent
    returns: '#0f172a',    // Corresponds to primary
    principal: '#334155',  // Corresponds to primary-700
    interest: '#ef4444',   // Corresponds to danger
    growth: '#10b981',     // Corresponds to success
    expenses: '#f59e0b',   // Corresponds to warning
  },
  gradients: {
    primary: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
    accent: 'linear-gradient(135deg, #d4af37 0%, #ca8a04 50%, #a16207 100%)',
    success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  }
};