import { Observable, Subject, takeUntil } from 'rxjs';

export function storeRegisterFactory( this: ThisParameterType<any>, onDestroy$: Subject<void> ) {
  return function <T>(store$: Observable<T>, handler: (data: T) => void) {
    return store$.pipe(takeUntil(onDestroy$)).subscribe(handler);
  };
}
