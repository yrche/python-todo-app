export const Status = {
  ALL: "all",
  DONE: "done",
  UNDONE: "undone",
} as const;

export const SortPriority = {
  ASC: "asc",
  DESC: "desc",
} as const;

export const HttpMethods = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  DELETE: "DELETE",
} as const;

export const TasksEndpoint = { url: "tasks" } as const;

export interface ITask {
  id: number;
  title: string;
  description: string | null;
  priority: number;
  complete: boolean;
}

export interface ITasks {
  data: ITask[];
}

export type TasksEndpoint = (typeof TasksEndpoint)[keyof typeof TasksEndpoint];
export type HttpMethods = (typeof HttpMethods)[keyof typeof HttpMethods];
export type Status = (typeof Status)[keyof typeof Status];
export type SortPriority = (typeof SortPriority)[keyof typeof SortPriority];

export interface SearchTasksRequestProps {
  status: Status;
  sortPriority?: SortPriority | null;
  search?: string;
}

export type UpdateTaskBody = Partial<Omit<ITask, "id">>;
export type AddTaskBody = Omit<ITask, "id" | "complete">;

export interface RequestOptions {
  method: HttpMethods;
  headers?: Headers;
  body?: UpdateTaskBody | AddTaskBody;
}

export interface UpdateTaskRequestProps {
  id: number;
  body: UpdateTaskBody;
}

export interface AddTaskRequestProps {
  body: AddTaskBody;
}

export interface DeleteTaskRequestProps {
  id: number;
}

export const Editor = {
  ADD: "add",
  EDIT: "edit",
} as const;

export type Editor = (typeof Editor)[keyof typeof Editor];

export const Filter = {
  STATUS: "status",
  SORT_PRIORITY: "sort_priority",
} as const;

export type Filter = (typeof Filter)[keyof typeof Filter];
