import {
  Field,
  Input,
  Stack,
  Textarea,
  NumberInput,
  Editable,
} from "@chakra-ui/react";
import { Editor, ITask } from "@/features/tasks/types";
import { DeleteTask } from "./DeleteTask";

interface TaskFormDataProps {
  type: Editor;
  task?: ITask;
}

export default function TaskFormData({ type, task }: TaskFormDataProps) {
  return (
    <Stack gap="4" align="flex-start" maxW="sm">
      {type === Editor.EDIT && task ? <DeleteTask id={task.id} /> : null}
      <Field.Root required>
        <Field.Label>
          Title
          <Field.RequiredIndicator />
        </Field.Label>

        {type === Editor.ADD ? (
          <Input name="title" placeholder="What's on your mind" required />
        ) : type === Editor.EDIT ? (
          <Editable.Root
            textAlign="start"
            defaultValue={task?.title || ""}
            placeholder="Click to edit"
          >
            <Editable.Preview />
            <Editable.Input name="title" required />
          </Editable.Root>
        ) : null}
        <Field.ErrorText></Field.ErrorText>
      </Field.Root>

      <Field.Root>
        <Field.Label>Description</Field.Label>
        {type === Editor.ADD ? (
          <Textarea name="description" placeholder="Description..." />
        ) : type === Editor.EDIT ? (
          <Editable.Root
            defaultValue={task?.description || ""}
            placeholder="Click to edit description"
          >
            <Editable.Preview />
            <Editable.Textarea name="description" />
          </Editable.Root>
        ) : null}
      </Field.Root>

      <Field.Root>
        <Field.Label>Priority</Field.Label>
        <NumberInput.Root
          width="100px"
          defaultValue={String(task?.priority || "1")}
          min={1}
          max={10}
        >
          <NumberInput.Control />
          <NumberInput.Input name="priority" />
        </NumberInput.Root>
      </Field.Root>
    </Stack>
  );
}
