import { Box, Typography } from "@mui/material";
import { Message } from "../interfaces/Message";
import { MessageTail } from "./props";

export function MessageBubble({ message }: { message: Message }) {
  const bubbleStyle = {
    width: { md: "60%" },
    alignSelf: message.role === "user" ? "flex-end" : "flex-start",
    backgroundColor: message.role === "user" ? "#FEE2C5" : "#C4DDFF",
    borderRadius: "40px",
    py: 3,
    px: 4,
    mx: 1,
  };
  return (
    <>
      <Box sx={bubbleStyle} key={message.id} >
        <Typography style={{ whiteSpace: "pre-line" }}>{message.content}</Typography>
      </Box>
      <MessageTail variant={message.role === "user" ? "right" : "left"} />
    </>
  );
}
