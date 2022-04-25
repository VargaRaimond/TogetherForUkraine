import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import HeaderMenu from "./components/header-menu/HeaderMenu";

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

const HomePage = () => {
  return <></>;
};

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
        {/* todo: link example - will be removed */}
        <Link to="/get-help">Link</Link>
        <Routes>
          {/*<Route path="/get-help" element={<GetHelpPage />} />*/}
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
