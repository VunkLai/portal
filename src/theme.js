import { createTheme } from "@mui/material/styles";
import { THEMES } from "./enumerations";

const defaultTheme = {
  typography: { button: { textTransform: "none" } },
};

const themeOptions = {
  [THEMES.LIGHT]: {
    palette: {
      mode: THEMES.LIGHT,
    },
  },
  [THEMES.DARK]: {
    palette: {
      mode: THEMES.DARK,
    },
  },
};

const createCustomTheme = (settings) => {
  const themeOption = themeOptions[settings.theme];
  let theme = createTheme({ ...defaultTheme, ...themeOption });
  return theme;
};

export default createCustomTheme;
