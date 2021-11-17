import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useRoutes } from "react-router-dom";
import useSettings from "./hooks/useSettings";
import routers from "./router";
import createCustomTheme from "./theme";

function App() {
  const content = useRoutes(routers);

  const settings = useSettings();
  const theme = createCustomTheme({
    theme: settings.theme,
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {content}
    </ThemeProvider>
  );
}

export default App;
