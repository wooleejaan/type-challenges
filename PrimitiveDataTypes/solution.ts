export interface Musician {
  artistName: string;
  age: number;
  deceased: boolean;
}

type ArtistName = Musician["artistName"];
type Age = Musician["age"];
type IsDeceased = Musician["deceased"];

export const playSong = (artistName: ArtistName, year: number) => {
  return `${artistName} was released in the year ${year}`;
};

export const artistName: ArtistName = "Frank Zappa";

export const age: Age = 52;

export const musicianInfo = <T extends Musician>(musician: T) => {
  const { artistName, age, deceased } = musician;
  return `${artistName}, age ${age}${deceased ? " (deceased)" : ""}`;
};

musicianInfo({
  artistName,
  age,
  deceased: true,
});
