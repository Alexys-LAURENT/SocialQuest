export function getCheckboxGroupPriceDefaultValue(priceParams: string | string[] | undefined) {
  if (!priceParams) return [];
  let temp = [] as string[];
  if (typeof priceParams === 'string') {
    priceParams.split(',').map((price) => {
      switch (price.toLowerCase()) {
        case '0-100':
          temp.push('0-100');
          break;
        case '100-250':
          temp.push('100-250');
          break;
        case '250-400':
          temp.push('250-400');
          break;
        case '400-550':
          temp.push('400-550');
          break;
        case 'gt-550':
          temp.push('gt-550');
          break;
        default:
          break;
      }
    });
  }
  return temp;
}
