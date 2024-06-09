import { FlattedObject, Roll } from "./solution";

// 타입스크립트이 갖는 양날의 검
// 타입을 좁힐 수록 타입 코드는 복잡해지지만 사용은 편리함.
// 정밀한 타입을 지향하는 조직과 그렇지 않은 조직이 나뉨.
// but 라이브러리 개발자라면 정밀한 타입을 지향해야 함.
function flattedObject<T extends object>(
  obj: T,
  result: any = {}
): Roll<FlattedObject<T>> {
  for (const key in obj) {
    if (
      typeof obj[key] === "object" && // object라고 타입 단언을 하더라도 타입 에러가 날 수 있음(타입스크립트가 그리디이므로) 이럴 때는 ignore를 사용
      obj[key] &&
      !(obj[key] instanceof Array)
    ) {
      // @ts-ignore
      flattedObject(obj[key], result);
    } else {
      result[key] = obj[key];
    }
  }
  return result;
}

const ret = flattedObject({
  x: 0,
  y: "bbb",
  a: {
    b: {
      c: null,
    },
    d: undefined,
  },
  h: {
    hh: {
      hhh: [1, 2, 3],
    },
  },
});
