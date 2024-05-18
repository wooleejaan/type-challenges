import { Expect, Equal } from "type-testing";
import {
  almostPi,
  literalFunction,
  LiteralFunction,
  literalNumber,
  LiteralNumbers,
  literalObject,
  LiteralObject,
  literalString,
  LiteralString,
  literalTrue,
  LiteralTrue,
} from "./solution";

type test_LiteralString = Expect<Equal<LiteralString, "chocolate chips">>;

type test_LiteralTrue = Expect<Equal<LiteralTrue, true>>;

type test_LiteralNumber = Expect<Equal<LiteralNumbers, 1 | 2 | 3 | 4 | 5 | 6>>;

type test_LiteralObject = Expect<
  Equal<
    LiteralObject,
    {
      name: "chocolate chips";
      inStock: true;
      kilograms: 5;
    }
  >
>;

type test_LiteralFunction = Expect<
  Equal<LiteralFunction, (a: number, b: number) => number>
>;

type test_literalString = Expect<
  Equal<typeof literalString, "Ziltoid the Omniscient">
>;

type test_literalTrue = Expect<Equal<typeof literalTrue, true>>;

type test_literalNumber = Expect<Equal<typeof literalNumber, 1 | 2>>;

type test_almostPi = Expect<
  Equal<
    typeof almostPi,
    3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196442881097566593344612847564823378678316527120190914564856692346034861045432664821339360726024914127372458700660631558817488152092096282925409171536436789259036001133053054882046652138414695194151160943305727036575959195309218611738193261179310511854807446237996274956735188575272489122793818301194912983367336244065664308602139494639522473719070217986094370277053921717629317675238467481846766940513200056812714526356082778577134275778960917363717872146844090122495343014654958537105079227968925892354201995611212902196086403441815981362977477130996051870721134999999837297804995105973173281609631859502445945534690830264252230825334468503526193118817101000313783875288658753320838142061717766914730359825349042875546873115956286388235378759375195778185778053217122680661300192787661119590921642019891337
  >
>;

type test_literalObject = Expect<
  Equal<
    typeof literalObject,
    {
      origin: string;
      command: string;
      item: string;
      time: string;
    }
  >
>;

type test_literalFunction = Expect<
  Equal<typeof literalFunction, (a: number, b: string) => string | number>
>;
