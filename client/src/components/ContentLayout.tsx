import { Box } from "@mui/material";
import { Chat } from "../features/chat/Chat.tsx";
import { useAppSelector } from "../hooks/hooks.ts";

const boxStyle = {
  py: { md: 5 },
  paddingLeft: { xs: 0, md: 30, xl: 40 },
  width: "100%",
  height: "100%",
  position: "fixed",
};

export function ContentLayout() {
  const content = useAppSelector((state) => state.content.current);

  return <Box sx={boxStyle}>{content === "chat" && <Chat />}</Box>;
}
