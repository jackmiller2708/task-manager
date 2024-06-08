import { RxCollection, RxJsonSchema } from 'rxdb';

export type IEntityCollection<T> = {
  [K in keyof T as T[K] extends RxJsonSchema<any> ? K : never]: RxCollection;
};
