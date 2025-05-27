import { Box, Input } from "@chakra-ui/react";

export default function FormsAutomatiza() {
  return (
    <div>
      <Box
       className="p-2 border rounded text-gray-900"
  bg="white"     
  borderColor="#428829"
  borderRadius="10px"
  borderWidth="4px"
  p={4}
>
        <h2>Qual a ideia Principal?</h2>
        <Input
          placeholder="Ideia da startup"
          color="white"
          className="text-gray-900"
          _placeholder={{ color: "gray.900" }}
        />
      </Box>
    </div>
  );
}
