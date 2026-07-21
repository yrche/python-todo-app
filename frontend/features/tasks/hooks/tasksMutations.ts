import { addTask, deleteTask, updateTask } from "@/features/tasks/api/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TASKS_QUERY } from "./tasks/query/tasksQuery";
import {
  AddTaskRequestProps,
  ITask,
  ITasks,
  DeleteTaskRequestProps,
  UpdateTaskRequestProps,
} from "../types";

export function useUpdateTasksMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskParams: UpdateTaskRequestProps) =>
      updateTask({ ...taskParams }),

    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: TASKS_QUERY });

      const previousTasks = queryClient.getQueriesData({
        queryKey: TASKS_QUERY,
      });

      queryClient.setQueriesData(
        { queryKey: TASKS_QUERY },
        (oldData: ITasks | undefined) => {
          if (!oldData) return oldData;

          const updatedTasks = oldData.data.map((task) => {
            return task.id === data.id ? { ...task, ...data.body } : task;
          });

          // sorted tasks

          const sortedTasks = updatedTasks.sort((first, second) => {
            if (first.complete !== second.complete) {
              return Number(first.complete) - Number(second.complete);
            }
            return second.id - first.id;
          });

          return {
            ...oldData,
            data: updatedTasks,
          };
        },
      );

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
