// 출처: https://www.linkedin.com/posts/jazimabbas_understanding-infer-in-typescript-conditional-ugcPost-7205473637347287040-e-FH/?utm_source=share&utm_medium=member_ios

// infer 키워드를 사용해 타입을 capture하고 재사용할 수 있음.
// 특히 conditional 체크하면서 특정 타입 추출할 때 사용하기 좋음.

// with infer
type ElementType<T> = T extends (infer U)[] ? U : never;
type Example = ElementType<string[]>; // string

// without infer
type ElementType2<T> = T extends any[] ? T[number] : never;
type Example2 = ElementType<string[]>; // string

// ============================================================

// with infer
type GetDataValue<T> = T extends { data: infer Data } ? Data : never;
type Example3 = GetDataValue<{ data: { username: string } }>; // { username: string }

// without infer
type GetDataValue2<T> = T extends { data: any } ? T["data"] : never;
type Example4 = GetDataValue<{ data: { username: string } }>; // { username: string }
