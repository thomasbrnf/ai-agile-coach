import { Box, AppBar } from "@mui/material";
import { AgileIcon } from "./components/AgileIcon";
import { Logo, NavigationButton } from "./components";
import { useAppDispatch } from "../../hooks/hooks.ts";
import { chat } from "../../redux/slices/contentSlice.ts";

const sideBarStyle = {
  mx: { xs: 1, sm: 4, xl: 8 },
  my: { xs: 0, sm: 4 },
  height: { xs: 0, sm: "100vh" },
  position: "fixed",
  display: { xs: "none", md: "flex" },
  flexDirection: { xs: "row", sm: "column" },
  alignItems: { xs: "flex-start", sm: "center" },
  justifyContent: "flex-start",
  gap: 1,
};

export function SideBar() {
  const dispatch = useAppDispatch();

  return (
    <AppBar>
      <Box sx={sideBarStyle}>
        <Logo />
        <NavigationButton name="AI Agile Coach" onClick={() => dispatch(chat())} icon={<AgileIcon />} />
      </Box>
    </AppBar>
  );
}
