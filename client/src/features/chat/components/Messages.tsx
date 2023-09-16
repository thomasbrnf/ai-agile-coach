import { Box } from "@mui/material";
import { MessageBubble } from "./MessageBubble";
import { Message } from "../interfaces/Message";
import { useRef, useEffect } from "react";
import { useAppSelector } from "../../../hooks/hooks";

const boxStyle = {
  fontSize: "16px",
  display: "flex",
  flexDirection: "column",
  py: 2,
  px: 2,
  overflow: "auto",
  overflowX: "hidden",
};

export default function Messages() {
  const messages = useAppSelector(state => state.messages.content);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTo(0, boxRef.current.scrollHeight);
    }
  }, [messages]);
  
  return (
    <Box ref={boxRef} sx={boxStyle}>
      {messages.map((message: Message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </Box>
  );
}
