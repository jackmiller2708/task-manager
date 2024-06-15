import type { RxJsonSchema } from "rxdb";

export type EntitySchemas<T> = {
  [K in keyof T as T[K] extends RxJsonSchema<unknown>
    ? K
    : never]: T[K] extends RxJsonSchema<infer I> ? RxJsonSchema<I> : never;
};
