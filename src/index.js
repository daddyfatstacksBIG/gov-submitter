import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Web3Provider, { Connectors } from "web3-react";

const { MetaMaskConnector } = Connectors;
const MetaMask = new MetaMaskConnector();
const connectors = { MetaMask };

ReactDOM.render(
  <Web3Provider connectors={connectors} libraryName="web3.js">
    <div className="App">
      <App />
    </div>
  </Web3Provider>,
  document.getElementById("root")
);
