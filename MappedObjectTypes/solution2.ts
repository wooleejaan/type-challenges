export type MovieInfoByGenre<T extends { [K: string]: string }> = {
  [K in keyof T]: {
    name: string;
    year: number;
    director: string;
  };
};
