"use client";

import {
  Center,
  For,
  Stack,
  Text,
  ScrollArea,
  Box,
  Flex,
} from "@chakra-ui/react";
import TaskCard from "@/features/tasks/components/TaskCard";
import { useTaskQuery } from "@/features/tasks/hooks/tasks/query/tasksQuery";
import { useUpdateTasksMutation } from "@/features/tasks/hooks/tasks/mutations/tasksMutations";
import TaskEditorDrawer from "@/features/tasks/components/TaskEditorDrawer";
import { SearchTasks } from "@/features/tasks/components/SearchTasks";
import { useState } from "react";
import { SortPriority, Status } from "@/features/tasks/types";
import { TaskSkeleton } from "@/features/tasks/components/TaskSkeleton";
import { FilterTasks } from "@/features/tasks/components/FilterTasks";

export default function Home() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<Status>(Status.ALL);
  const [sortPriority, setSortPriority] = useState<SortPriority | null>(null);
  const { data: tasks, isLoading } = useTaskQuery({
    search,
    status,
    sortPriority,
  });
  const updateTaskMutation = useUpdateTasksMutation();

  async function changeState(id: number, state: boolean) {
    updateTaskMutation.mutate({ id, body: { complete: state } });
  }

  return (
    <Flex
      direction="column"
      h="100vh"
      w="100vw"
      p="40px"
      gap={6}
      overflow="hidden"
    >
      <Stack
        direction={{ base: "column", sm: "row" }}
        align="center"
        w="100%"
        gap={4}
      >
        <TaskEditorDrawer type="add" />
        <Box flex="1" w="100%">
          <SearchTasks onSearch={setSearch} />
        </Box>
        <FilterTasks type="status" onChange={setStatus} />
        <FilterTasks type="sort_priority" onChange={setSortPriority} />
      </Stack>

      <Box flex="1" minH="0" w="100%">
        <ScrollArea.Root h="100%" w="100%">
          <ScrollArea.Viewport style={{ height: "100%", width: "100%" }}>
            <ScrollArea.Content w="100%" pr={4}>
              {isLoading ? (
                <Stack spaceY={3} w="100%">
                  <TaskSkeleton />
                  <TaskSkeleton />
                  <TaskSkeleton />
                </Stack>
              ) : tasks?.data && tasks.data.length > 0 ? (
                <Stack spaceY={3} w="100%">
                  <For each={tasks.data}>
                    {(task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        handleToggle={changeState}
                      />
                    )}
                  </For>
                </Stack>
              ) : (
                <Center
                  p={12}
                  w="100%"
                  border="1px dashed"
                  borderColor="gray.200"
                  _dark={{ borderColor: "gray.800" }}
                  borderRadius="lg"
                >
                  <Text color="gray.500" fontSize="md" fontWeight="medium">
                    {search ? "Tasks not found" : "Task list is empty"}
                  </Text>
                </Center>
              )}
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="vertical" />
          <ScrollArea.Corner bg="bg" />
        </ScrollArea.Root>
      </Box>
    </Flex>
  );
}
