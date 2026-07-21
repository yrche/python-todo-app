import { useQuery } from "@tanstack/react-query";
import { SearchTasksRequestProps, Status } from "@/features/tasks/types";
import { getTasks } from "@/features/tasks/api/task";

export const TASKS_QUERY = ["tasks"];

export function useTaskQuery(searchParams: SearchTasksRequestProps) {
  return useQuery({
    queryKey: [...TASKS_QUERY, searchParams],
    queryFn: () => getTasks(searchParams),
    staleTime: 5 * 60 * 1000,
  });
}
