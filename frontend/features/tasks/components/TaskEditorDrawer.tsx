"use client";

import { useState } from "react";
import {
  Button,
  CloseButton,
  Drawer,
  Portal,
  IconButton,
} from "@chakra-ui/react";
import TaskFormData from "@/features/tasks/components/TaskFormData";
import { LuPencil, LuPlus } from "react-icons/lu";
import { Editor, ITask } from "../types";
import {
  useAddTaskMutation,
  useUpdateTasksMutation,
} from "../hooks/tasksMutations";

interface TaskEditorDrawerProps {
  type: Editor;
  task?: ITask;
  handleEdit?: () => void;
}

export default function TaskEditorDrawer({
  type,
  task,
  handleEdit,
}: TaskEditorDrawerProps) {
  const [open, setOpen] = useState(false);

  const addTaskMutation = useAddTaskMutation();
  const updateTaskMutation = useUpdateTasksMutation();

  const isSubmitting =
    addTaskMutation.isPending || updateTaskMutation.isPending;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);

    const rawDescription = formData.get("description") as string;
    const description =
      rawDescription && rawDescription.trim().length > 0
        ? rawDescription.trim()
        : null;

    const taskData = {
      title: formData.get("title") as string,
      description,
      priority: Number(formData.get("priority")),
    };

    if (type === Editor.ADD) {
      addTaskMutation.mutate(
        { body: taskData },
        {
          onSuccess: () => {
            formElement.reset();
            setOpen(false);
          },
        },
      );
    } else if (type === Editor.EDIT && task) {
      updateTaskMutation.mutate(
        { id: task.id, body: taskData },
        {
          onSuccess: () => {
            setOpen(false);
          },
        },
      );
    }
  }

  return (
    <Drawer.Root size="md" open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Drawer.Trigger asChild>
        {type === Editor.ADD ? (
          <Button variant="outline" size="md">
            <LuPlus />
            Add new task
          </Button>
        ) : (
          <IconButton
            aria-label="Edit task"
            variant="ghost"
            colorPalette="gray"
            size="sm"
            onClick={handleEdit}
          >
            <LuPencil />
          </IconButton>
        )}
      </Drawer.Trigger>

      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Drawer.Header
                borderBottomWidth="1px"
                borderColor="border.subtle"
              >
                <Drawer.Title fontSize="lg" fontWeight="semibold">
                  {type === Editor.ADD ? "Add Task" : "Edit Task"}
                </Drawer.Title>
              </Drawer.Header>

              <Drawer.Body py={6}>
                <TaskFormData type={type} task={task} />
              </Drawer.Body>

              <Drawer.Footer
                borderTopWidth="1px"
                borderColor="border.subtle"
                gap={3}
              >
                <Button
                  type="submit"
                  loading={isSubmitting}
                  spinnerPlacement="start"
                  loadingText={
                    type === Editor.ADD ? "Submitting..." : "Saving..."
                  }
                >
                  {type === Editor.ADD ? "Submit" : "Save"}
                </Button>
              </Drawer.Footer>
            </form>

            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" pos="absolute" top={3} right={3} />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
