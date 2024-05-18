type GenreType<T> = keyof T;

type MovieInfo = {
  name: string;
  year: number;
  director: string;
};

export type MovieInfoByGenre<T extends Record<string, string>> = Record<
  GenreType<T>,
  MovieInfo
>;
