import { Box, AppBar } from "@mui/material";
import { AgileIcon } from "./components/AgileIcon";
import { Logo, NavigationButton } from "./components";
import { useAppDispatch } from "../../hooks/hooks.ts";
import { chat } from "../../redux/slices/contentSlice.ts";

const sideBarStyle = {
  mx: { xs: 0, md: 4, xl: 8 },
  my: { xs: 0, md: 4 },
  height: { xs: "6vh", md: "100vh" },
  width: { xs: "100vw", md: "auto" },
  position: "fixed",
  display: "flex",
  flexDirection: { xs: "row", md: "column" },
  alignItems: { xs: "flex-start", md: "center" },
  justifyContent: "flex-start",
  gap: 1,
  backgroundColor: { xs: "#F9F9F9", md: "transparent" },
};

export function SideBar() {
  const dispatch = useAppDispatch();

  return (
    <AppBar>
      <Box sx={sideBarStyle}>
        <Logo />
        <NavigationButton
          name="AI Agile Coach"
          onClick={() => dispatch(chat())}
          icon={<AgileIcon />}
        />
      </Box>
    </AppBar>
  );
}
