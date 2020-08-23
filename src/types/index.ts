export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface Language {
  name: string;
  nativeName: string;
}

export interface Country {
  name: string;
  flag: string;
  population: number;
  region: string;
  subregion: string;
  capital: string;
  nativeName: string;
  topLevelDomain: string[];
  currencies: Currency[];
  languages: Language[];
  borders: string[];
  alpha3Code: string;
}

export interface Neighbor {
  slug: string;
  name: string;
}

export interface Error {
  status: number;
  message: string;
}
