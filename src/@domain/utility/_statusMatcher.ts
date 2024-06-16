import { STATUS } from "@application/constants";
import { Match } from "effect";

/**
 * Returns a function that matches the status of a task and returns 
 * a string representation of the status.
 *
 * @return A function that takes an object with a `status` property 
 * of type `STATUS` and returns a string representing the status of the task.
 */
export function _getStatusMatcher() {
  return Match.type<{ status: STATUS }>().pipe(
    Match.when({ status: STATUS.OPEN }, () => "open"),
    Match.when({ status: STATUS.IN_PROGRESS }, () => "in progress"),
    Match.when({ status: STATUS.DONE }, () => "done"),
    Match.orElseAbsurd,
  );
}
