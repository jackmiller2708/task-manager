import type { Observable, Subject } from "rxjs";

import { takeUntil } from "rxjs";

// biome-ignore lint/suspicious/noExplicitAny: This could be any object
export function storeRegisterFactory(this: ThisParameterType<any>, onDestroy$: Subject<void>) {
  return <T>(store$: Observable<T>, handler: (data: T) => void) => {
    return store$.pipe(takeUntil(onDestroy$)).subscribe(handler.bind(this));
  };
}
