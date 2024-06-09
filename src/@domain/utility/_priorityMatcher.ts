import { PRIORITY } from '@application/constants';
import { Match } from 'effect';

export function _getPriorityMatcher() {
  return Match.type<{ priority: PRIORITY }>().pipe(
    Match.when({ priority: PRIORITY.LOW }, () => 'low'),
    Match.when({ priority: PRIORITY.MEDIUM }, () => 'medium'),
    Match.when({ priority: PRIORITY.HIGH }, () => 'high'),
    Match.orElseAbsurd
  );
}
