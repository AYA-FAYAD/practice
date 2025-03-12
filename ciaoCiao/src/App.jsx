import React from "react";
import { createRoot } from "react-dom/client";
import Pasta from "./Pasta";

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Pasta"),
    React.createElement(Pasta, {
      name: "AGILIO E OLIO",
      description: "linguine,Garlic,Olive Oile, Red Paper",
    }),
    React.createElement(Pasta, {
      name: "PESTO",
      description: "linguine,Garlic,Olive Oile, Red Paper",
    }),
    React.createElement(Pasta, {
      name: "ALFREDO",
      description: "linguine,Garlic,Olive Oile, Red Paper",
    }),
  ]);
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
