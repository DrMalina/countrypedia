export const convertToStartCase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, ' $1');
};

type Value = string | number;

export const convertValueToLocale = (element: Value): Value => {
  if (!element) return '-';

  return isNaN(+element) ? element : element.toLocaleString();
};

export const checkIfEmpty = (str: string): Boolean => {
  return str.length === 0 || !str.trim();
};
