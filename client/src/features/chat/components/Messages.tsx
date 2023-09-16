import { Box } from "@mui/material";
import { MessageBubble } from "./MessageBubble";
import { Message } from "../interfaces/Message";

const boxStyle = {
  fontSize: "16px",
  display: "flex",
  flexDirection: "column",
  py: 2,
  px: 2,
  overflow: "auto",
  overflowX: "hidden",
};

export default function Messages({ messages }: { messages: Message[] }) {
  return (
    <Box sx={boxStyle}>
      {messages.map((message: Message) => (
        <MessageBubble message={message} />
      ))}
    </Box>
  );
}
