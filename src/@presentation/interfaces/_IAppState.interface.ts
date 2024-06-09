import { taskStateFactory } from '@presentation/stores/task/_task.state';

export interface IAppState {
  tasks: ReturnType<typeof taskStateFactory>;
}
