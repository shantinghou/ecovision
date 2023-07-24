/*
Documentation: 
Function: Get information about bonds
Procedure:
1. Make sure your contract is compiled and deployed
2. Make sure .env is updated to your own wallet settings and contract address
3. Make sure you are getting information about the right contract
4. Run the command node scripts/bondInteract.js in your terminal and check for the bond information
*/
const { ethers } = require("hardhat");
// interact.js
require("dotenv").config()
const API_URL = process.env.API_URL

// For Hardhat 
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

// Adjust contract address here
const contract = require("../artifacts/contracts/EAvatar.sol/EAvatar.json")
const contractAddress = "0x174f85bB05f5E974bBC15fA87EC75c400Cc81f9B"

// read the init message from our smart contract
async function main() {
    // Adjust contract name as needed
    const eAvatar = await ethers.getContractAt('EAvatar', contractAddress);

    const info = await eAvatar.getBondInfo();
    console.log("bond info: " + info);
    
    const issuer = await eAvatar.getIssuer();
    console.log("bond issuer: " + issuer);

    const interestPayment = await eAvatar.interestPaymentAmount();
    console.log("bond interest payment: " + interestPayment);

    const accruedInterest = await eAvatar.interestPaymentAmount();
    console.log("accrued interest:" + accruedInterest);

    const isavailable = await eAvatar.availableNFTs();
    console.log("Available: " + isavailable);

}
main();