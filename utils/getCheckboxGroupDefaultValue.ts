export function getCheckboxGroupDefaultValue(typeParams: string | string[] | undefined) {
  if (!typeParams) return [''];
  let temp = [''];
  if (typeof typeParams === 'string') {
    switch (typeParams) {
      case 'banniere':
        temp.push('Bannières');
        break;
      case 'badge':
        temp.push('Badges');
        break;
      case 'arme':
        temp.push('Armes');
        break;
      default:
        break;
    }
  } else {
    typeParams.map((type) => {
      switch (type) {
        case 'banniere':
          temp.push('Bannières');
          break;
        case 'badge':
          temp.push('Badges');
          break;
        case 'arme':
          temp.push('Armes');
          break;
        default:
          break;
      }
    });
  }
  return temp;
}
