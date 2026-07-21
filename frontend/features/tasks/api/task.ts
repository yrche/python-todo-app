import { ENV } from "@/config/env";
import { apiRequest, baseRequest } from "./core";
import {
  HttpMethods,
  ITask,
  ITasks,
  RequestOptions,
  SearchTasksRequestProps,
  TasksEndpoint,
  UpdateTaskRequestProps,
  AddTaskRequestProps,
  DeleteTaskRequestProps,
} from "../types";

function toQuery(...keys: string[]) {
  const activeKeys = keys.filter(Boolean);
  if (activeKeys.length === 0) return "";
  return "?" + activeKeys.join("&");
}

interface IURL {
  params?: SearchTasksRequestProps;
  path?: string;
}

function tasksUrl({ params, path }: IURL) {
  let url = new URL(TasksEndpoint.url, ENV.baseUrl);

  if (path) {
    url.pathname = `${url.pathname}/${path}`.replace(/\/+/g, "/");
  }

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        const backendKey = key.replace(
          /[A-Z]/g,
          (letter) => `_${letter.toLowerCase()}`,
        );

        url.searchParams.set(backendKey, value);
      }
    });
  }

  return url.href;
}

function requestOptions({ method, body, headers }: RequestOptions) {
  const newHeaders = new Headers();

  newHeaders.append("Content-Type", "application/json");

  return {
    method,
    headers: headers || newHeaders,
    body: JSON.stringify(body),
  };
}

export const getTasks = (params: SearchTasksRequestProps): Promise<ITasks> =>
  apiRequest(() =>
    baseRequest(
      tasksUrl({ params: params }),
      requestOptions({
        method: HttpMethods.GET,
      }),
    ),
  );

export const updateTask = ({
  id,
  body,
}: UpdateTaskRequestProps): Promise<ITask> =>
  apiRequest(() =>
    baseRequest(
      tasksUrl({ path: String(id) }),
      requestOptions({
        method: HttpMethods.PATCH,
        body: body,
      }),
    ),
  );

export const addTask = ({ body }: AddTaskRequestProps): Promise<ITask> =>
  apiRequest(() =>
    baseRequest(
      tasksUrl({}),
      requestOptions({
        method: HttpMethods.POST,
        body: body,
      }),
    ),
  );

export const deleteTask = ({ id }: DeleteTaskRequestProps): Promise<ITask> =>
  apiRequest(() =>
    baseRequest(
      tasksUrl({ path: String(id) }),
      requestOptions({
        method: HttpMethods.DELETE,
      }),
    ),
  );
