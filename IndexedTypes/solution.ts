type Cars = ["Bugatti", "Ferarri", "Lambo", "Porsche", "Toyota Corolla"];

type Donations = {
  Bono: 15_000_000;
  "J.K. Rowling": 160_000_000;
  "Taylor Swift": 45_000_000;
  "Elton John": 600_000_000;
  "Angelina Jolie and Brad Pitt": 100_000_000;
};

type LastItemOfArray<T extends unknown[]> = T extends [...infer T, infer K]
  ? K
  : never;

export type TheCoolestCarEverMade = LastItemOfArray<Cars>;

export type TruckDriverBonusGiver = Donations["Taylor Swift"];
