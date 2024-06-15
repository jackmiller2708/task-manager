import { PRIORITY } from '@application/constants';
import { Match } from 'effect';

/**
 * Returns a function that takes an object with a `priority` property
 * and returns a string representing the priority level.
 *
 * @return A function that takes an object with a `priority` property.
 */
export function _getPriorityMatcher() {
  return Match.type<{ priority: PRIORITY }>().pipe(
    Match.when({ priority: PRIORITY.LOW }, () => 'low'),
    Match.when({ priority: PRIORITY.MEDIUM }, () => 'medium'),
    Match.when({ priority: PRIORITY.HIGH }, () => 'high'),
    Match.orElseAbsurd
  );
}
