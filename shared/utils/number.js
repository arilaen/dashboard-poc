function formatAsCurrency(x) {
  return parseFloat(x, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

export function formattedNumber(x = '0', type) {
  switch (type) {
    case 'variance':
      return `+$${formatAsCurrency(x)}`;
    case 'percent':
      return `${x}%`;
    case 'currency':
      return `$${formatAsCurrency(x)}`;
    default:
      return x;
  }
}
