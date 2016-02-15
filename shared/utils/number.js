import accounting from 'accounting';

export function formattedNumber(x = '0', type) {
  switch (type) {
    case 'variance':
      return `+$${accounting.formatNumber(x)}`;
    case 'percent':
      return `${x}%`;
    case 'currency':
      return `$${accounting.formatNumber(x)}`;
    default:
      return x;
  }
}
