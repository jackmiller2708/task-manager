import type { Observable, UnaryFunction } from "rxjs";
import type { TaskService } from "@application/services/task/task.service";

import { map, pipe, switchMap } from "rxjs";
import { Option } from "effect";
import { List } from "immutable";

/**
 * Orchestrates the bulk deletion of tasks by their IDs.
 *
 * @param taskService - The task service used to perform the deletion.
 * @return An observable that emits a list of deleted task IDs.
 */
export function orchestrateBulkDelete(taskService: TaskService): UnaryFunction<Observable<Option.Option<List<string>>>, Observable<List<string>>> {
  return pipe(
    map((maybeIds) => Option.getOrElse(maybeIds, () => List<string>())),
    switchMap((ids) => taskService.bulkDelete(ids)),
    map((removedList) => removedList.map(({ id }) => id)),
  );
}
