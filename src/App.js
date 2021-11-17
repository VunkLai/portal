import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import useSettings from "./hooks/useSettings";
import createCustomTheme from "./theme";

function App() {
  const settings = useSettings();
  const theme = createCustomTheme({
    theme: settings.theme,
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      App
    </ThemeProvider>
  );
}

export default App;
