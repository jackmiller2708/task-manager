import { Observable, UnaryFunction, map, pipe, switchMap } from 'rxjs';
import { TaskService } from '@application/services/task/task.service';
import { Option } from 'effect';
import { List } from 'immutable';

export function orchestrateBulkDelete(taskService: TaskService): UnaryFunction<Observable<Option.Option<List<string>>>, Observable<List<string>>> {
  return pipe(
    map((maybeIds) => Option.getOrElse(maybeIds, () => List<string>())),
    switchMap((ids) => taskService.bulkDelete(ids)),
    map((removedList) => removedList.map(({ id }) => id))
  );
}
