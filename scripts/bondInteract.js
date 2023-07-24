require("dotenv").config();
const { ethers } = require("hardhat");

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