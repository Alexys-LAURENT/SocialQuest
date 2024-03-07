// Fonction pour trier et récupérer les modérateurs
export function getSortedItems<T extends { username: string }>(data: T[]): T[][] {
  // Fonction pour comparer les usernames et les trier
  const compareUsernames = (a: T, b: T) => {
    const usernameA = a.username.toUpperCase();
    const usernameB = b.username.toUpperCase();

    if (usernameA < usernameB) {
      return -1;
    }
    if (usernameA > usernameB) {
      return 1;
    }
    return 0;
  };

  // Regroupement des items par lettre initiale de l'username ou autre caractère
  const groupedData = data.reduce((acc: { [key: string]: T[] }, obj: T) => {
    const firstCharacter = obj.username.charAt(0).toUpperCase();
    const groupKey = isAlphabetCharacter(firstCharacter) ? firstCharacter : '_';

    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(obj);
    return acc;
  }, {});

  // Triage des items dans chaque groupe
  for (const group in groupedData) {
    groupedData[group].sort(compareUsernames);
  }

  // Placer les items dont le nom ne commence pas par une lettre à la fin de l'array
  const sortedGroups = Object.entries(groupedData).sort(([a], [b]) => {
    if (a === '_') return 1;
    if (b === '_') return -1;
    return a.localeCompare(b);
  });

  // Création de l'array d'array d'items
  return sortedGroups.map(([_, items]) => items);
}

// Fonction pour vérifier si un caractère est une lettre de l'alphabet
function isAlphabetCharacter(char: string): boolean {
  return /^[A-Za-z]$/.test(char);
}
