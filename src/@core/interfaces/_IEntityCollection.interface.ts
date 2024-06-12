import type { RxCollection, RxJsonSchema } from 'rxdb';

export type IEntityCollection<T> = {
  // biome-ignore lint/suspicious/noExplicitAny: It could literally be any type
  [K in keyof T as T[K] extends RxJsonSchema<any> ? K : never]: RxCollection;
};
