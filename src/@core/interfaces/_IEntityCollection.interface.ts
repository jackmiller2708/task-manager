import type { RxCollection, RxCollectionCreator } from "rxdb";

export type IEntityCollection<T> = {
  // biome-ignore lint/suspicious/noExplicitAny: It could literally be any type
  [K in keyof T as T[K] extends RxCollectionCreator<any>
    ? K
    : never]: RxCollection;
};
