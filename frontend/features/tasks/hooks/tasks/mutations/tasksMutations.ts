import { addTask, deleteTask, updateTask } from "@/features/tasks/api/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TASKS_QUERY } from "../query/tasksQuery";
import {
  AddTaskRequestProps,
  ITask,
  ITasks,
  DeleteTaskRequestProps,
  UpdateTaskRequestProps,
  Status,
  SortPriority,
} from "@/features/tasks/types";
import { queryObjects } from "node:v8";

export function useUpdateTasksMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskParams: UpdateTaskRequestProps) =>
      updateTask({ ...taskParams }),

    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: TASKS_QUERY });

      const previousTasks = queryClient.getQueriesData<ITasks>({
        queryKey: TASKS_QUERY,
      });

      previousTasks.forEach(([queryKey, oldData]) => {
        if (!oldData) return;

        const params = (queryKey[1] || {}) as {
          search?: string;
          status?: Status;
          sortPriority?: SortPriority;
        };

        const updatedTasks = oldData.data.map((task: ITask) => {
          return task.id === data.id ? { ...task, ...data.body } : task;
        });

        const filteredTasks = updatedTasks.filter((task: ITask) => {
          if (params.status === Status.DONE) return task.complete === true;
          if (params.status === Status.UNDONE) return task.complete === false;
          return true;
        });

        const searchFilteredTasks = filteredTasks.filter((task: ITask) => {
          if (!params.search || !params.search.trim()) return true;
          const query = params.search.toLowerCase();
          return (
            task.title.toLowerCase().includes(query) ||
            task.description?.toLowerCase().includes(query)
          );
        });

        const sortedTasks = searchFilteredTasks.sort(
          (first: ITask, second: ITask) => {
            if (params.status === Status.ALL || !params.status) {
              if (first.complete !== second.complete) {
                return Number(first.complete) - Number(second.complete);
              }
            }

            if (params.sortPriority === SortPriority.ASC) {
              if (first.priority !== second.priority) {
                return first.priority - second.priority;
              }
            } else if (params.sortPriority === SortPriority.DESC) {
              if (first.priority !== second.priority) {
                return second.priority - first.priority;
              }
            }

            return second.id - first.id;
          },
        );

        queryClient.setQueryData(queryKey, {
          ...oldData,
          data: sortedTasks,
        });
      });

      return { previousTasks };
    },

    onError: (err, variable, context) => {
      if (context?.previousTasks) {
        context.previousTasks.forEach(([key, value]) => {
          queryClient.setQueryData(key, value);
        });
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY });
    },
  });
}

export function useAddTaskMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskParams: AddTaskRequestProps) => addTask({ ...taskParams }),

    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: TASKS_QUERY });

      const previousTasks = queryClient.getQueriesData({
        queryKey: TASKS_QUERY,
      });

      queryClient.setQueriesData(
        { queryKey: TASKS_QUERY },
        (oldData: ITasks | undefined) => {
          if (!oldData) return { data: [] };

          const lastId = oldData.data.reduce((acc, current) => {
            return acc > current.id ? acc : current.id;
          }, 0);

          const tempTask: ITask = {
            id: lastId + 1,
            title: data.body.title,
            description: data.body.description,
            priority: data.body.priority,
            complete: false,
          };

          console.log(data);

          return {
            ...oldData,
            data: [tempTask, ...oldData.data],
          };
        },
      );

      return { previousTasks };
    },

    onError: (err, newTask, context) => {
      if (context?.previousTasks) {
        context.previousTasks.forEach(([key, value]) => {
          queryClient.setQueryData(key, value);
        });
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY });
    },
  });
}

export function useDeleteTasksMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (deleteParams: DeleteTaskRequestProps) =>
      deleteTask({ ...deleteParams }),

    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: TASKS_QUERY });
      const previousTasks = queryClient.getQueriesData({
        queryKey: TASKS_QUERY,
      });

      queryClient.setQueriesData(
        { queryKey: TASKS_QUERY },
        (oldData: ITasks | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: oldData.data.filter((task) => task.id !== data.id),
          };
        },
      );

      return { previousTasks };
    },

    onError: (err, data, context) => {
      if (context?.previousTasks) {
        context.previousTasks.forEach(([key, value]) => {
          queryClient.setQueryData(key, value);
        });
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY });
    },
  });
}
