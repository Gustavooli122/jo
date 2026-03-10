export const formatMoney = (value) => {
  if (value >= 1000000000) {
    return `R$ ${(value / 1000000000).toFixed(2)}B`;
  }
  if (value >= 1000000) {
    return `R$ ${(value / 1000000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `R$ ${(value / 1000).toFixed(2)}K`;
  }
  return `R$ ${value.toFixed(2)}`;
};

export const formatNumber = (value) => {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(2)}B`;
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(2)}K`;
  }
  return value.toFixed(0);
};