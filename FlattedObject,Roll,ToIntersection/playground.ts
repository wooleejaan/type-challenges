// 출처 : https://d2.naver.com/helloworld/7472830

// 러셀의 역설
// 자기 자신이 포함하지 않는 모든 집합의 R -> 수학 기초론의 태동 -> 타입 이론의 탄생
// 타입스크립트는 타입 이론에 영향을 받음 (ts는 1.8까지만 공식문서 존재, 이후에는 tsc 구현이 곧 ts의 스펙이라고 가정)

// 타입이란?
// 심볼(Symbol, 변수명이라고도 할 수 있는)에 엮인(Binded)
// 메모리 공간에 존재할 수 있는
// 값(Value)의 집합과
// 그 값들이 가질 수 있는 성질(Properties)

// example1
// 3.141592: number
// 값 3.141592는 number 타입에 속한다.

// example2
// { x: number; y?: string } <~ { x: number }
// 타입 { x: number; y?: string }은 타입 { x: number }의 서브타입이다.
// 타입 B가 가지는 모든 속성을 A도 가지면, 타입 A는 B의 서브타입이다.

// 타입은 부분순서집합(Partially Ordered Set)
// 타입 비교는 대입 상황이 발생할 때 수행

// 원시 타입(Primitive Type)
// boolean, number, string, symbol, undefined, null (typeof 연산자로 조회할 수 있는, null은 존재하지 않으나 타입스크립트에서는 별도로 구분하므로 유효함)
// 공리적으로 정의, 이들 간에는 어떠한 관계도 없음(무관계)

// 리터럴 타입(Literal Type)
// 어떤 타입에 속한 값 하나만으로 구성하는 타입
// 본래 타입의 서브타입으로 간주
// as const로 특정 값을 리터럴 타입으로 선언할 수 있음.

// 객체 타입(Object Type)
// 객체 타입은 속성 타입에 대해 공변적(Covariant)임.

// { x: number; y?: string; z: boolean; } >~ { x: number; y: undefined; z: false; a: 'foo'; }
// x => number는 number의 서브 타입
// y => string | undefined는 undefined의 슈퍼 타입
// z => boolean은 false의 서브 타입
// 오른쪽 타입은 왼쪽의 서브 타입으로 간주.
// 개별적인 요소가 같은 방향을 가질 때, 전체 타입도 같은 방향을 가지는 성질을 공변성이라고 함.

// 배열/튜플 타입(Array/Tuple Type)
// 객체와 동일, number를 key로 갖는다는 점이 다름
// 튜플은 length가 상수 리터럴 타입으로 고정

// 키 타입(keyof)
// 객체 타입의 속성의 합집합(|)으로 이루어진 타입
// 가질 수 있는 가장 넓은 타입(즉 슈퍼 타입) : number, string, symbol
// 명시적으로 가질 경우, 필드명의 union

// 함수 타입(Function Type)
// 반환형과 인자형의 대입 조건을 모두 만족해야 함
// 반환형에 대해서는 공변적(Covariant)
// - A가 B의 서브타입이면, 인자형이 같을 때 => A를 반환하는 함수가 B를 반환하는 함수의 서브타입.
// 인자형에 대해서는 반변적(Contravariant)
// - A가 B의 서브타입이면, 반환형이 같을 때 => B를 인자로 갖는 함수는 A를 인자로 갖는 함수의 서브타입.
function processNumber(x: number) {}
function processNumberAndString(x: number | string) {}
let wide: (x: number) => void;
wide = processNumber;
wide = processNumberAndString;
let narrow: (x: number | string) => void;
// narrow = processNumber -> error
narrow = processNumberAndString;
// - 인자 수가 불일치하는 경우,
//   - 인자가 적은 함수를 인자가 많은 함수 타입에 대입할 수 있음. 거꾸로는 안 됨.
function consumOneArg(x: any) {}
let wide2: (x: any, y: any) => void;
wide2 = consumOneArg;
wide2(0, 1); // consumOneArg(0, 1), ingore 1
function consumTwoArg(x: any, y: any) {}
let narrow2: (x: any) => void;
// narrow2 = consumTwoArg -> error
// narrow2(0) // consumTwoArg(0, ?)

// 특수 타입
// never, unknown, any, void
// void는 일단 undefined와 비슷하다고 간주해도 무방
// never <~ T <~ unknown
// never는 반드시 T보다 작고, unknown은 그 어떤 타입보다도 크다.
// - never는 가장 좁은 타입
//   - 값의 집합이 공집합
//   - 타입 에러를 고의적으로 발생시킬 때 사용
// - unknown은 가장 넓은 타입
//   - any, unknown을 제외하고는 어떤 곳에서도 대입이 불가능
// T ~- any
// any가 강력한 이유는 그 어떤 타입과도 서로 포함관계이기 때문.
// any를 어디든 사용할 수 있다(단, never 제외).
// never <~ any
// never는 any와 같지 않음

// 퀴즈
// 이론상 가장 넓은 함수의 타입
// 정답 2번 : (...args: never[]) => unknown
// 반환형은 공변성을 가지므로 반환형이 가장 큰 게, 함수가 가장 커지는 방법임. (never 제외)
// 인자형, 인자 개수는 모든 선택지가 무한 개인 상황
// 인자는 반변성을 가지므로 넓은 타입을 갖기 위해서는, 가장 작은 타입을 골라야 함.
// 배열은 공변성을 가짐. unknown의 크기가 unkown[] 크기 방향과 같음
// 그러므로 never.
let q: (...args: unknown[]) => unknown;
let qq: (...args: never[]) => unknown;
let qqq: (...args: any[]) => any;
let qqqq: (...args: void[]) => never;

// ========================================================================

// 고급 타입 추론

// 타입 검사(Type Checking)
// 어떤 전체/부분 심볼에 대한 대입,연산,참조가 가능한지 확인하는 과정
// - 모든 심볼이 제약조건(=타입)을 만족하는지?
// - 어떤 코드 맥락에서, 심볼이 가질 수 있는 타입은 어떤 것인가? (ex. Type Guard가 된 if문 블록)
// 제약 조건이 갖는 만족 가능성 문제(Constrained Satisfaction Problem, CSP)와 동치
// - tsc가 SAT solver 혹은 CSP solver를 구현한 것은 아님
// - SAT 문제는 NP-완전: 이론상 지수시간복잡도 발생
// - 완벽하게 풀기엔 문제 크기가 너무 큼 -> tsc는 그리디 알고리즘을 사용하는 것으로 추정. 극도로 제한된 추론 깊이(~100)

// 제네릭(Generic)
// 타입에 대한 함수이자 관계 그 자체
// 1차 논리만 서술 가능
// - 즉 고차함수는 허용하지 않음 (ex. 제네릭의 제네릭 F<T> = T<number>)

// 명시적 타입 전달(Explicit Type Argument Passing)
// 제네릭 타입 인자에 직접 타입을 기술 (ex: useState<{x?:number}>({}))
// 전달한 정보를 전제로 사용
// 컨트롤 플로우 상 제네릭이 선언된 심볼 다음부터는 전달한 대로 간주
// 대부분 웹앱 개발에서 사용함. 엔드 유저들이 사용하는 주된 방식임.

// 타입 인자 추론(Type Argument Inference)
// 타입 선언 안 한 경우 / 제네릭 타입 인자 생략한 경우 / infer 문 사용한 경우
// 컨트롤 플로우 분석으로 수집한 전제로, 해당 타입 인자를 추론
// 그리디이므로 완벽하지 않음
// 그러므로 최대한 비관적, 보수적으로 분석
// 라이브러리 제작자가 자주 고려해야 할 방식
// - 함수 시그니쳐 오버로딩에서 강력

// 조건부 타입(Conditional Type)
// 어떤 타입이 다른 타입의 서브 타입인지 확인
// 그 여부에 따라서 다른 타입으로 반환
// 생각보다 그리디하고 일관성이 없음
type IsNever<T> = [T] extends [never] ? true : false;

// ========================================================================

// 응용 문제
// 객체의 중첩을 없애주는 함수의 타입 정의하기
// function flattedObject(obj: any, result: any = {}): any {}
// 예시
// { x: 0, y: 'bb', z: ['hh'], a: { b: { c: null }, d: undefined } }
type SimpleFlattedObject<T extends object> = {
  // [K in keyof T]: T[K];
  // 첫번째 시도
  //   [K in keyof T]: FilterValue<T[K]>;
  // 두번째 시도
  [K in FilterPrimitiveKey<T, keyof T>]: T[K];
};

// 첫번째 시도(실패)
// 아래 코드는 동작하지 않음
// key값은 무조건 존재하므로 never 타입으로 값의 타입을 지정하더라도
// undefined와 never는 다르므로 타입스크립트는 필터링을 해주지 않음.
// 그러므로 filter value가 아니라 filter key를 걸어주어야 함.
// // 객체면 최상위 key를 날리고
// // 객체가 아니면 그대로 두게끔 필터링
// type FilterValue<T> = T extends object
//   ? T extends unknown[] // 객체라면, 배열은 거를 수 없음 => 배열은 공변성을 가지므로 가장 큰 타입으로 지정
//     ? T
//     : never // 객체이되, 배열이 아니라면 안전한 객체라고 생각할 수 있으니 never로 처리
//   : T; // 객체가 아니면 그대로 반환

// 두번째 시도(성공)
// K는 모체 타입이 필요하므로 T를 같이 가져옴.
type FilterPrimitiveKey<T, K> = K extends keyof T
  ? T[K] extends object // T[K]가 object인지 체크
    ? T[K] extends unknown[] // object라면 배열인지 체크
      ? K // 배열이면 그대로 반환
      : never // 객체면 플랫하게 만들어야 하므로 제거
    : K // object가 아니면 K를 그대로 반환
  : never; // T에 key가 아닌 애들이 들어오면 고려하지 않기 위해 never 할당 (사용할 때 keyof T로만 사용)

// 위에서 a 객체를 날렸다면
// 이제는 a 객체를 추출하기만 하면 됨
// 추출하는 건 위의 코드를 그대로 반전시키기만 하면 됨.
type NestedObject<T extends object> = {
  [K in FilterNestedKey<T, keyof T>]: T[K];
};

type FilterNestedKey<T, K> = K extends keyof T
  ? T[K] extends object
    ? T[K] extends unknown[]
      ? never
      : K
    : never
  : never;

// 객체를 플랫할 때 해당 객체의 key 이름이 중요하지 않음. => 제거할 필요가 있음. (value만 추출)
type Values<T extends object> = T[keyof T];

// 한번 끌어올린 (key는 제거하고 객체 값만 추출해서 union으로 변환)
type UnwrappedObject<T extends object> = ToIntersection<
  RecursionHelper<Values<NestedObject<T>>>
>;
// 재귀적으로 플랫하게 만들려면 지연평가가 필요함
// 타입스크립트의 제네릭도 결국은 ts 컴파일러가 인지를 해서 내부적으로 타입을 평가해야 하는 구조
// 만나자마자 평가를 하는 게 있는 반면, 지연시켜서 평가하도록 하는 것 중 대표적인 게 제네릭 안에서 Conditioned Type을 사용하는 것임.
// 객체면 flatted 적용하고 아니면 날린다.
// 어차피 T에 object를 날린 건 분명한데도 지연평가를 위해 T extends object로 컨디션 적용
type RecursionHelper<T> = T extends object ? FlattedObject<T> : never;
// union으로 만든 객체들은 &(intersection)으로 바꾸기만 하면 됨. 트릭이 필요
// 어차피 T extends any는 모든 경우인데 (_: T) => void라고 바로 쓰면 안 되는가?
// 조건부 타입에서 이렇게 뭐라도 한번 걸러주는 경우 T extends any더라도
// distributive law의 적용을 받음. 그래서 개별개별을 따로따로 적용하게끔 만듦
// 예를 들어, string | number면 (_: T) => void면 여전히 유니온으로 들어가는데,
// 한번 조건부를 타면 string 따로 number 따로 적용됨.
// (_: string | number) => void가 아니라
// ((_: string) => void) | ((_: number) => void)로 적용되게끔 하는 일종의 트릭.
type ToIntersection<T> = (T extends any ? (_: T) => void : never) extends (
  _: infer S
) => void
  ? S // 앞선 타입에 대해 가질 수 있는 서브타입 중 가장 큰 S를 달라고 하면 S를 반환.
  : // ((_: string) => void) | ((_: number) => void) <= (_: infer S) => void
    // 즉 오른쪽이 왼쪽의 슈퍼타입이 되려면, (_: string) => void도 만족해야 하고 (_: number) => void도 만족해야 함
    // but 함수가 타입이 커지려면 반변적이므로, 인자에 대해 반변적이므로 두 함수를 반변적으로 만족시킬 수 있는 타입이어야 함.
    // 즉, S가 두 함수보다도 작아져야 함. string 타입보다 작고 number 타입보다 작은 애들 중 가장 큰 타입이 뭐가 있냐면 => 인터섹션임 (number & string)
    // A타입보다 작고 B 타입보다 작으면서 가장 큰 타입이 A & B
    never;

export type FlattedObject<T extends object> = SimpleFlattedObject<T> &
  UnwrappedObject<T>;

// 타입 더럽지 않게 만들어주는 트릭 & {}를 활용한 것(내부 동작 원리 모르겠음)
export type Roll<T> = {
  [K in keyof T]: T[K];
} & {};

// RecursionHelper이 없으면 내부 중첩 해결 못함
// type X = Roll<
//   FlattedObject<{
//     x: number;
//     y: {
//       z: string;
//     };
//     a: null;
//     b: [1];
//     h: {
//       //   hh: "hhh"
//       hh: {
//         hhh: 3;
//       };
//     };
//   }>
// >;

// function flattedObject<T extends object>(
//   obj: T,
//   result: any = {}
// ): Roll<FlattedObject<T>> {
//   for (const key in obj) {
//     if (
//       typeof obj[key] === "object" && // object라고 타입 단언을 하더라도 타입 에러가 날 수 있음(타입스크립트가 그리디이므로) 이럴 때는 ignore를 사용
//       obj[key] &&
//       !(obj[key] instanceof Array)
//     ) {
//       // @ts-ignore
//       flattedObject(obj[key], result);
//     } else {
//       result[key] = obj[key];
//     }
//   }
//   return result;
// }

// const ret = flattedObject({
//   x: 0,
//   y: "bbb",
//   a: {
//     b: {
//       c: null,
//     },
//     d: undefined,
//   },
//   h: {
//     hh: {
//       hhh: [1, 2, 3],
//     },
//   },
// });
