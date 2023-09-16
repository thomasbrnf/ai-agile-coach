import { SideBar } from "./features/sidebar/SideBar";
import { ContentLayout } from "./components/ContentLayout";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "./styles/theme";

function App() {

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />

      <SideBar/>
      <ContentLayout/>

    </ThemeProvider>
  );
}

export default App;
