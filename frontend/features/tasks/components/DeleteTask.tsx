import {
  CloseButton,
  Dialog,
  Button,
  useDialog,
  Portal,
} from "@chakra-ui/react";
import { useDeleteTasksMutation } from "../hooks/tasksMutations";

interface DeleteTaskProps {
  id: number;
}

export function DeleteTask({ id }: DeleteTaskProps) {
  const dialog = useDialog();
  const deleteTaskMutation = useDeleteTasksMutation();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    deleteTaskMutation.mutate({ id });
  }

  return (
    <Dialog.RootProvider value={dialog}>
      <Dialog.Trigger asChild>
        <Button bg={"red.500"} variant="outline" size="sm">
          Delete
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <form onSubmit={handleSubmit}>
              <Dialog.Header>
                <Dialog.Title>Delete this task?</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <p>Are You sure u want to delete this task ?</p>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Button
                  type="submit"
                  bg={"red.500"}
                  color={"white"}
                  loading={deleteTaskMutation.isPending}
                  loadingText="Deleting..."
                  spinnerPlacement="start"
                >
                  Delete
                </Button>
              </Dialog.Footer>
            </form>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.RootProvider>
  );
}
