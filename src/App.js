import React, { useState } from "react";
import { useWeb3Context } from "web3-react";
import IPFS from "ipfs-mini";
import Cms from "./abis/Cms.json";
import "./App.css";

const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https"
});

const addToIpfs = async content => {
  try {
    const hash = await ipfs.add(content);
    console.log("content added successfully!");
    console.log(`https://ipfs.infura.io/ipfs/${hash}`);
    return hash;
  } catch (err) {
    console.error(`failed to add content ${content} to ipfs`, err);
  }
};

const App = () => {
  const [proposal, setProposal] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();
    const hash = await addToIpfs(content);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          content
          <textarea
            name="content"
            type="text"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </label>

        <br />

        <label>
          proposal
          <input
            name="proposal"
            type="text"
            value={proposal}
            onChange={e => setProposal(e.target.value)}
          />
        </label>

        <br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default App;
