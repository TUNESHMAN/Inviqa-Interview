import AppSkeleton from "./components/AppSkeleton";
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#780E1C",
        light: "#905F65",
        dark: "#4C0710",
        contrastText: "#fff",
      },
      secondary: {
        main: "#FFFFFF",
        light: "#FFFFFF",
        dark: "#FFFFFF",
        contrastText: "#fff",
      },
      warning: {
        main: "#ed6c02",
        light: "#ff9800",
        dark: "#e65100",
        contrastText: "#fff",
      },
      info: {
        main: "#0288d1",
        light: "#03a9f4",
        dark: "#01579b",
        contrastText: "#fff",
      },
      success: {
        main: "green",
        light: "#4caf50",
        dark: "#1b5e20",
        contrastText: "#fff",
      },
      error: {
        main: "#d32f2f",
        light: "#ef5350",
        dark: "#c62828",
        contrastText: "#fff",
      },

      grey: {
        50: "#fafafa",
        100: "#f5f5f5",
        200: "#eeeeee",
        300: "#e0e0e0",
        400: "#bdbdbd",
        500: "#A6A6A6",
      },
    },
    // shadows: ["none",],
    typography: {
      fontSize: 14,
      fontFamily: "Poppins",
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      h1: {
        fontSize: 24,
      },
    },
  });
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AppSkeleton />
      </ThemeProvider>
    </Router>
  );
}

export default App;
