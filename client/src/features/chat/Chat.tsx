import { Paper, Box } from "@mui/material";
import { useEffect } from "react";
import { MessageInput, Messages, WritingStatus } from "./components";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  receiveMessage,
  recieved,
  recieving,
  setInitialMessages,
} from "../../redux/slices/socketSlice";
import { Message } from "../../interfaces/Message";
import socket from "../../socket";

const paperStyle = {
  bgcolor: "#F9F9F9",
  borderRadius: { md: "40px 0px 0px 40px" },
  gap: 1,
  height: { xs: "100vh", md: "90vh" },
  py: { xs: 7, md: 5 },
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
  marginTop: 2,
  mx: { sm: 2 },
};

export function Chat() {
  const pending = useAppSelector((state) => state.socket.pending);
  const dispatch = useAppDispatch();

  const send = (value: string) => {
    socket.emit("request", value);
  };

  useEffect(() => {
    socket.emit("history", (messages: Message[]) => {
      dispatch(setInitialMessages(messages));
    });
  }, []);

  const messageListener = (message: Message) => {
    dispatch(receiveMessage(message));
  };

  useEffect(() => {
    socket.on("message", messageListener);
    return () => {
      socket.off("message", messageListener);
    };
  }, [messageListener]);

  useEffect(() => {
    socket.on("pending", () => {
      dispatch(recieving());
    });

    socket.on("received", () => {
      dispatch(recieved());
    });
  }, [socket]);

  return (
    <Paper elevation={1} sx={paperStyle}>
      <Messages />

      <Box sx={boxStyle}>
        {pending && <WritingStatus />}
        <MessageInput send={send} />
      </Box>
    </Paper>
  );
}
