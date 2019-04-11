import React, { useState } from "react";
import { useWeb3Context } from "web3-react";
import IPFS from "ipfs-mini";
import cmsAbi from "./abis/Cms.json";
import "./App.css";

// kovan cms deployment
const cmsAddress = "0x320977912a52296eaab4fabca53712ba2eb0ae6e";

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
  const context = useWeb3Context();

  const handleSubmit = async event => {
    event.preventDefault();
	const web3 = context.library;

    const hash = await addToIpfs(content);
    const cms = new web3.eth.Contract(cmsAbi, cmsAddress);
	const tx = await cms.methods.register(proposal, hash).send({from: context.account}).then(console.log);
	console.log(tx);
  };

  return (
    <React.Fragment>
      CMS Address: <a href={'https://kovan.etherscan.io/address/' + cmsAddress}>{cmsAddress}</a>
      <form onSubmit={handleSubmit}>

        <label>
          proposal address
          <input
            name="proposal"
            type="text"
            value={proposal}
            onChange={e => setProposal(e.target.value)}
          />
        </label>

        <br />

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

        {context.connectorName !== "MetaMask" && (
          <button onClick={() => context.setConnector("MetaMask")}>
            Activate MetaMask
          </button>
        )}
        {(context.active || context.error) && (
          <button onClick={() => context.unsetConnector()}>
            {context.active ? "Deactivate Metamask" : "Reset"}
          </button>
        )}

        <input type="submit" value="Submit" />

      </form>
    </React.Fragment>
  );
};

export default App;
