import { Chat } from "./features/chat/Chat";
import { SideBar } from "./features/sidebar/SideBar";
import { ContentLayout } from "./components/ContentLayout";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "./styles/theme";
import { useAppSelector, useAppDispatch } from './hooks/hooks.ts'
import { chat } from "./redux/contentSlice.ts";



function App() {
  const content = useAppSelector(state => state.content.current)
  const dispatch = useAppDispatch()

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <SideBar setContent={() => dispatch(chat())} />
      <ContentLayout>
        {content === 'chat' && <Chat />}
      </ContentLayout>
      </ThemeProvider>
  );
}

export default App;
