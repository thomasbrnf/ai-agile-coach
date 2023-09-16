import { Paper, Box } from "@mui/material";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { MessageInput, Messages, WritingStatus } from "./components";
import { Message } from "./interfaces/Message";

const paperStyle = {
  bgcolor: "#F9F9F9",
  borderRadius: { md: "40px 0px 0px 40px" },
  gap: 1,
  height: { xs: "100vh", md: "90vh" },
  py: 6,
  px: { xs: 2, md: 6 },
  paddingBottom: { xs: 3, md: 7 },
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: { lg: "center" },
  boxShadow: "0px 0px 15px -5px rgba(0,0,0,0.2)",
};

const boxStyle = {
  width: { lg: "60%" },
  gap: 1,
  mx: { sm: 2 },
};

export function Chat({}) {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<Message[]>([]);

  const send = (value: string) => {
    socket?.emit("message", value);
  };

  useEffect(() => {
    const socket = io("http://localhost:3000");
    setSocket(socket);

    socket?.emit("allMessages", (response: Message[]) => {
      setMessages(response);
    });
  }, [setSocket]);

  const messageListener = (message: Message) => {
    setMessages([...messages, message]);
    console.log(messages);
  };

  useEffect(() => {
    socket?.on("message", messageListener);
    return () => {
      socket?.off("message", messageListener);
    };
  }, [messageListener]);
  return (
    <Paper elevation={1} sx={paperStyle}>
      <Messages messages={messages} />
      <Box sx={boxStyle}>
        <WritingStatus />
        <MessageInput send={send} />
      </Box>
    </Paper>
  );
}
