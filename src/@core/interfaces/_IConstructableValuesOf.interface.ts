import type { PropertiesOf } from './_IPropertiesOf.interface';

/**
 * Represents the constructable values of an object type T, where the properties are optional.
 */
export type ConstructableValuesOf<T> = Partial<PropertiesOf<T>>;
