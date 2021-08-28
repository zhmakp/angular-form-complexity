export type City = 'Lviv' | 'Rivne' | 'Kharkiv';

const cityStreetMap:{
  [Property in City]: string[];
} = {
  'Lviv': ['Brovarna', 'Berezhanska'],
  'Rivne': ['Grushevskoho', 'Soshenka'],
  'Kharkiv': ['Suhumska', 'Sumska']
};

export const address = {
  cities: ['Lviv', 'Rivne', 'Kharkiv'] as City[],
  retrieveStreet: (city: City) => cityStreetMap[city]
};
