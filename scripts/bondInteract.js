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
require("dotenv").config();
const CONTRACT_ADDRESS_EAVATAR = process.env.CONTRACT_ADDRESS_EAVATAR

// read the init message from our smart contract
async function main() {
    const eAvatar = await ethers.getContractAt('EAvatar', CONTRACT_ADDRESS_EAVATAR);

    const info = await eAvatar.getBondInfo();
    console.log("bond info: " + info);
    
    const issuer = await eAvatar.getIssuer();
    console.log("bond issuer: " + issuer);

    const isMatured = await eAvatar.isBondMatured();
    console.log("bond matured: " + isMatured);

    const matureAmount = await eAvatar.bondMatureAmount();
    console.log("bond mature amount: " + matureAmount);

    const isInterestTime = await eAvatar.isInterestTime();
    console.log("time to pay interest: " + isInterestTime);

    const interestPayment = await eAvatar.interestPaymentAmount();
    console.log("bond interest payment: " + interestPayment);

    const accruedInterest = await eAvatar.calculateAccruedInterest();
    console.log("accrued interest:" + accruedInterest);

    const isavailable = await eAvatar.availableNFTs();
    console.log("Available: " + isavailable);

}
main();