export function getCheckboxGroupTypeDefaultValue(typeParams: string | string[] | undefined) {
  if (!typeParams) return [];
  let temp = [] as string[];
  if (typeof typeParams === 'string') {
    typeParams.split(',').map((type) => {
      switch (type.toLowerCase()) {
        case 'banniere':
          temp.push('Banniere');
          break;
        case 'badge':
          temp.push('Badge');
          break;
        case 'arme':
          temp.push('Arme');
          break;
        default:
          break;
      }
    });
  }
  return temp;
}
