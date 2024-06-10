import { DateTime } from 'luxon';
import { Option } from 'effect/Option';
import { List } from 'immutable';

type Nullable<T> = T | undefined;

export interface IEntityConvertible<T> {
  toEntity(): Readonly<RawObjOf<T>>;
}

export type RawObjOf<T> = {
  [K in keyof T as T[K] extends Function ? never : K]: Readonly<
    T[K] extends Option<infer I>
      ? Nullable<I extends List<infer P> ? ReadonlyArray<RawObjOf<P>> : I>
      : T[K] extends IEntityConvertible<infer M>
      ? RawObjOf<M>
      : T[K] extends List<infer L>
      ? ReadonlyArray<RawObjOf<L>>
      : T[K] extends DateTime
      ? string
      : T[K]
  >;
};
