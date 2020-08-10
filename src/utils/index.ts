type Data = {
  [key: string]: string;
};

// return unique values for key in array of objects
export const filterUniqueValues = (data: Data[], searchedKey: string): string[] => {
  return [...new Set(data.map((element) => element[searchedKey]))].filter(Boolean);
};
