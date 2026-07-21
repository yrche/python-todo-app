import { ITask } from "@/features/tasks/types";
import {
  CheckboxCard,
  HoverCard,
  Strong,
  Box,
  Link,
  Portal,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import TaskEditorDrawer from "./TaskEditorDrawer";
import { Editor } from "@/features/tasks/types";

interface TaskCardProps {
  task: ITask;
  handleToggle: (id: number, checked: boolean) => void;
}

export default function TaskCard({ task, handleToggle }: TaskCardProps) {
  return (
    <motion.div
      layout
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 35,
      }}
      style={{ width: "100%" }}
    >
      <CheckboxCard.Root
        variant="subtle"
        orientation="horizontal"
        colorPalette="teal"
        checked={task.complete}
        onCheckedChange={(details) => {
          handleToggle(task.id, !!details.checked);
        }}
        width="100%"
      >
        <CheckboxCard.HiddenInput />

        <CheckboxCard.Control
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
          gap="4"
          p="4"
          width="100%"
        >
          <CheckboxCard.Indicator my="auto" />

          <Box flex="1" textAlign="left">
            <CheckboxCard.Label
              fontSize="md"
              fontWeight="bold"
              lineHeight="short"
            >
              <span
                style={{
                  textDecoration: task.complete ? "line-through" : "none",
                  opacity: task.complete ? 0.55 : 1,
                  transition: "all 0.2s ease",
                  display: "inline-block",
                }}
              >
                {task.title}
              </span>
            </CheckboxCard.Label>

            <CheckboxCard.Description mt="1">
              <HoverCard.Root
                size="md"
                positioning={{ placement: "top-start" }}
              >
                <HoverCard.Trigger asChild>
                  <Link
                    color="gray.600"
                    _dark={{ color: "gray.300" }}
                    fontSize="xs"
                    fontWeight="medium"
                    href="#"
                    onClick={(e) => e.stopPropagation()}
                    _hover={{ textDecoration: "underline", color: "gray.500" }}
                  >
                    💬 See description
                  </Link>
                </HoverCard.Trigger>

                <Portal>
                  <HoverCard.Positioner>
                    <HoverCard.Content maxWidth="260px" boxShadow="md">
                      <HoverCard.Arrow>
                        <HoverCard.ArrowTip />
                      </HoverCard.Arrow>

                      <Box p="0">
                        <Strong fontSize="xs" color="gray.500">
                          Task description:
                        </Strong>
                        <Box
                          mt="1"
                          fontSize="sm"
                          color="fg.muted"
                          lineHeight="relaxed"
                        >
                          {task.description ||
                            "This task does not have a description"}
                        </Box>
                      </Box>
                    </HoverCard.Content>
                  </HoverCard.Positioner>
                </Portal>
              </HoverCard.Root>
            </CheckboxCard.Description>
          </Box>
          <TaskEditorDrawer type={Editor.EDIT} task={task} />
        </CheckboxCard.Control>
      </CheckboxCard.Root>
    </motion.div>
  );
}
