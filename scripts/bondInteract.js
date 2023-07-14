const { ethers } = require("hardhat");
// interact.js
require("dotenv").config()
const API_URL = process.env.API_URL

// For Hardhat 
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/EAvatar.sol/EAvatar.json")
const contractAddress = "0x174f85bB05f5E974bBC15fA87EC75c400Cc81f9B"

// read the init message from our smart contract
async function main() {
    const eAvatar = await ethers.getContractAt('EAvatar', contractAddress);

    const info = await eAvatar.getBondInfo();
    console.log("bond info: " + info);
    
    const issuer = await eAvatar.getIssuer();
    console.log("bond issuer: " + issuer);

    const isavailable = await eAvatar.availableNFTs();
    console.log("Available: " + isavailable);

}
main();