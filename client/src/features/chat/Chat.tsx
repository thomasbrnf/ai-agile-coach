import { Paper, Box } from "@mui/material";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { MessageInput, Messages, WritingStatus } from "./components";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Message } from "./interfaces/Message";
import { receiveMessage, setInitialMessages } from "../../redux/slices/messagesSlice";
import { pending, recieved } from "../../redux/slices/pendingSlice";

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
  const pending = useAppSelector(state => state.pending)
  const dispatch = useAppDispatch();

  const send = (value: string) => {
    socket?.emit("message", value);
  };

  useEffect(() => {
    const socket = io("http://localhost:3000");
    setSocket(socket);

    socket?.emit("allMessages", (messages: Message[]) => {
      dispatch(setInitialMessages(messages));
    });
  }, [setSocket]);

  const messageListener = (message: Message) => {
    dispatch(receiveMessage(message));
  };

  useEffect(() => {
    socket?.on("message", messageListener);
    return () => {
      socket?.off("message", messageListener);
    };
  }, [messageListener]);

  useEffect(() => {
    socket?.on("pending", () => {
      dispatch(pending())
    });

    socket?.on("received", () => {
      dispatch(recieved())
    });
  }, []);

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
