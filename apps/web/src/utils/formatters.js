export const formatMoney = (num) => {

  if (num < 1000000) {
    return Math.floor(num).toString();
  }

  const unidades = ["M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"];
  let unidadeIndex = -1;

  while (num >= 1000000 && unidadeIndex < unidades.length - 1) {
    num /= 1000;
    unidadeIndex++;
  }

  return num.toFixed(1) + unidades[unidadeIndex] ;
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