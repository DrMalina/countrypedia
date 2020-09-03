export const convertToStartCase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, ' $1');
};

export const checkIfEmptyString = (str: string): boolean => {
  return str.length === 0 || !str.trim();
};

export const chunkArray = <T>(array: T[], size: number): T[][] => {
  let result = [];
  for (let i = 0; i < array.length; i += size) {
    let chunk = array.slice(i, i + size);
    result.push(chunk);
  }
  return result;
};

export const pickRandomElement = <T>(array: T[]) => {
  return array[(array.length * Math.random()) << 0];
};

type Value = string | number;

export const convertValueToLocale = (element: Value): Value => {
  if (!element) return '-';

  return isNaN(+element) ? element : element.toLocaleString();
};
