// This file should mirror the color palette in tailwind.config.js
// It allows using the same colors in JS/TS logic (e.g., for charts)

export const themeColors = {
  primary: '#0A1F44',
  secondary: '#C39A32',
  success: '#00875A',
  danger: '#DE350B',
  chart: {
    investment: '#C39A32', // Corresponds to secondary
    returns: '#0A1F44',    // Corresponds to primary
    principal: '#0A1F44',  // Corresponds to primary
    interest: '#DE350B',   // Corresponds to danger
  },
};