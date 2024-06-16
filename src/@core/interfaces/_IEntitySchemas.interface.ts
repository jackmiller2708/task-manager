import type { RxCollectionCreator } from "rxdb";

export type EntitySchemas<T> = {
  [K in keyof T as T[K] extends RxCollectionCreator<unknown>
    ? K
    : never]: T[K] extends RxCollectionCreator<infer I> ? RxCollectionCreator<I> : never;
};
