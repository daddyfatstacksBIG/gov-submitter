const fs = require('mz/fs');
const IPFS = require('ipfs');
const fetch = require('node-fetch');

const pin = async hash => {
  const infura = 'https://ipfs.infura.io:5001';
  const url = `api/v0/pin/add?arg=${hash}&recursive=true`;
  const res = await fetch(`${infura}/${url}`);
  return await res.text();
};

const main = async () => {
  const folder = process.argv['2'];
  const ipfs = new IPFS();

  ipfs.on('ready', async () => {
    console.log(`adding ${folder} to ipfs`);
    const added = await ipfs.addFromFs(folder, { recursive: true });

    console.log('pinning at infura');
    const hash = added[added.length - 1].hash;
    await pin(hash);

    console.log(`available at: https://ipfs.io/ipfs/${hash}`);
    process.exit();
  });
};

main();

