import { MantineProvider } from "@mantine/core";
import React from "react";
import "@mantine/core/styles.css";
import ReactDOM from "react-dom/client";
import Game from "./Game";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <MantineProvider>
      <Game />
    </MantineProvider>
  </React.StrictMode>,
);
