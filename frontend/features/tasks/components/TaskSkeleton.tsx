import { HStack, Skeleton, SkeletonCircle, Stack, Box } from "@chakra-ui/react";

export function TaskSkeleton() {
  return (
    <HStack
      width="100%"
      p="4"
      borderWidth="1px"
      borderRadius="l2"
      borderColor="border.subtle"
      bg="bg.subtle"
      gap="4"
      alignItems="center"
      justifyContent="flex-start"
    >
      <Box flex="1">
        <Skeleton height="4" width="70%" mb="2" borderRadius="sm" />
        <Skeleton height="3" width="30%" borderRadius="sm" />
      </Box>

      <Skeleton height="8" width="8" borderRadius="md" />
    </HStack>
  );
}
