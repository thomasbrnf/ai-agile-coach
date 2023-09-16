import { Box, AppBar } from "@mui/material";
import { AgileIcon } from "./components/AgileIcon";
import { Logo, NavigationButton } from "./components";

const sideBarStyle = {
  mx: { xs: 1, sm: 4 },
  my: { xs: 0, sm: 4 },
  height: { xs: 0, sm: "100vh" },
  position: "fixed",
  display: { xs: "none", md: "flex" },
  flexDirection: { xs: "row", sm: "column" },
  alignItems: { xs: "flex-start", sm: "center" },
  justifyContent: "flex-start",
  gap: 1,
};

export function SideBar({setContent}: {setContent:() => void}) {
  return (
    <AppBar>
      <Box sx={sideBarStyle}>
        <Logo />
        <NavigationButton name="AI Agile Coach" onClick={setContent} icon={<AgileIcon />} />
      </Box>
    </AppBar>
  );
}
