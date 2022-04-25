import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import logo from "./logo.svg";

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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </ThemeProvider>
  );
}

export default App;
