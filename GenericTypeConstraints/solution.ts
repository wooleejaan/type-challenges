export type AllowString<T extends string> = T;
export type AllowNumber<T extends number> = T;

type LogConstraints = (logNum: number) => void;
export type CreateLogger<Fn extends LogConstraints> = {
  log: Fn;
  exit: () => void;
};
