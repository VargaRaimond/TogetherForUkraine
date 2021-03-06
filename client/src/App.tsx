import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

import HeaderMenu from "./components/header-menu/HeaderMenu";
import AppContent from "./AppContent";

const appTheme = createTheme({
  // https://mui.com/customization/palette/
  // https://coolors.co/13293d-2f97c1-fde74c-baf2e9-bdede0
  palette: {
    primary: {
      main: "#006494",
      light: "#E8F1F2",
      dark: "#13293D",
    },
  },
  mixins: {
    toolbar: {
      minHeight: 96,
    },
  },
});

function App() {
  // Don't delete!
  // Example on how to comunicate with backend
  // const x = 5;
  // useEffect(() => {
  //   const sayHello = async () => {
  //     const response = await fetch("/api/hello");
  //     const body = await response.json();
  //     console.log(body);
  //   };
  //   console.log(x);
  //   sayHello();
  // }, []);

  return (
    <ThemeProvider theme={appTheme}>
      <BrowserRouter>
        <HeaderMenu />
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
