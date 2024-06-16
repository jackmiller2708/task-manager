import type { RxJsonSchema } from "rxdb";
import type { ITaskEntity } from "./_ITask.interface";

import { PRIORITY, STATUS } from "@application/constants";

export const TaskSchema: RxJsonSchema<ITaskEntity> = {
  version: 1,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 100,
    },
    title: {
      type: "string",
    },
    createdTime: {
      type: "string",
    },
    dueDate: {
      type: "string",
    },
    description: {
      type: "string",
    },
    status: {
      type: "number",
      enum: [STATUS.OPEN, STATUS.IN_PROGRESS, STATUS.DONE],
    },
    priority: {
      type: "number",
      enum: [PRIORITY.LOW, PRIORITY.MEDIUM, PRIORITY.HIGH],
    },
  },
};

export function migrateV1(oldDoc: ITaskEntity) {
  oldDoc.status = STATUS.OPEN;
  return oldDoc;
}
