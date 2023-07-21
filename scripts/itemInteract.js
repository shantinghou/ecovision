const { ethers } = require("hardhat");
// interact.js
require("dotenv").config()
const API_URL = process.env.API_URL

// For Hardhat 
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/EcoItems.sol/EcoItems.json")
const contractAddress = "0xa87f8ECd38c56F45021BeCA0fC20882B37d8D885"

// read the init message from our smart contract
async function main() {
    const ecoItem = await ethers.getContractAt('EcoItems', contractAddress);

    const info = await ecoItem.getItemInfo();
    console.log("Item info: " + info);
    
    const hp_boost = await ecoItem.getHPBoost();
    console.log("HP Boost: " + hp_boost);

    const ap_boost = await ecoItem.getAPBoost();
    console.log("AP Boost: " + ap_boost);

}
main();