type Data = {
  [key: string]: string;
};

// return unique values for key in array of objects
export const filterUniqueValues = (data: Data[], searchedKey: string): string[] => {
  return [...new Set(data.map((element) => element[searchedKey]))].filter(Boolean);
};

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

type Value = string | number;

export const convertValueToLocale = (element: Value): Value => {
  if (!element) return '-';

  return isNaN(+element) ? element : element.toLocaleString();
};
