type MoviesName<T> = {
  [K in keyof T]: string;
};

export type MovieInfoByGenre<T extends Record<string, string>> = {
  [K in keyof T]: {
    name: MoviesName<T>[K];
    year: number;
    director: string;
  };
};
