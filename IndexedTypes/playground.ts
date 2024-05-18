import { Expect, Equal } from "type-testing";
import { TheCoolestCarEverMade, TruckDriverBonusGiver } from "./solution";

type test_TheCoolestCarEverMade = Expect<
  Equal<TheCoolestCarEverMade, "Toyota Corolla">
>;

type test_TruckDriverBonusGiver = Expect<
  Equal<TruckDriverBonusGiver, 45_000_000>
>;
