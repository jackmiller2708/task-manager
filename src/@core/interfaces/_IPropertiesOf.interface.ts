export type PropertiesOf<T> = {
  // biome-ignore lint/complexity/noBannedTypes: If it's a fucntion, ignores it.
  [K in keyof T as T[K] extends Function ? never : K]: T[K];
};
