type RequestMethod = "POST" | "GET";
export type ApiRequest<T, K extends RequestMethod = "GET"> = {
  data: T;
  method: K;
};

type Strict<T extends boolean = true> = { strict: T };
export type TSConfig<T extends Strict<boolean> = { strict: true }> = T;
