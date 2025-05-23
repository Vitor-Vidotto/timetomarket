import { useDroppable } from "@dnd-kit/core";
import { Box } from "@chakra-ui/react";

export const DroppableColumn = ({ id, children, ...props }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <Box ref={setNodeRef} {...props}>
      {children}
    </Box>
  );
};
