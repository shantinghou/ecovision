/*
Documentation:
Function: Transferring one NFT to another address
Procedure:
1. Make sure your contract is compiled and deployed
2. Make sure .env is updated with the right wallet settings and contract address
4. See below for more testing specifications
3. Run the command node scripts/transfer.js in your terminal and check for the
transactions under the contract address or your wallet address in the Sepolia test net
*/
const { ethers } = require("hardhat");
require("dotenv").config()
const API_URL = process.env.API_URL
const collector = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

// Adjust as needed
const contract = require("../artifacts/contracts/EAvatar.sol/EAvatar.json")
const contractAddress = "0x174f85bB05f5E974bBC15fA87EC75c400Cc81f9B"

const receiver = "0xd08322911D373f642d7d18Be3C1B478D02eF15a2"

async function main(){
    // Adjust as needed
    const eAvatar = await ethers.getContractAt('EAvatar', contractAddress);
    const symbol = await eAvatar.symbol();
    const oldOwner = await eAvatar.ownerOf("1"); // Adjust as needed
    console.log(`Owner of #1: ${oldOwner}`);
    console.log(`Transferring ${symbol}#1 from collector ${oldOwner} to 
    another collector ${PUBLIC_KEY_3} using contractOwner wallet...`);

    // Comment this segment out if the contract owner wants to send the NFT
    console.log(`Approving contractOwner to spend collector ${symbol}#${1}...`);
    // Creates a new instance of the contract connected to the collector
    // Adjust which public key to use as needed
    const receiverSigner = await ethers.getSigner(PUBLIC_KEY_2)
    const collectorContract = eAvatar.connect(receiverSigner); 
    await collectorContract.approve(PUBLIC_KEY, 1);
    console.log(`contractOwner ${PUBLIC_KEY_3} has been approved to 
    spend collector ${PUBLIC_KEY_2} ${symbol}#${1}\n`);

    // Calling the safeTransferFrom() using the contractOwner instance
    // Transfer the NFT from the first address to the second; adjust as needed
    const transaction = await eAvatar["safeTransferFrom(address,address,uint256)"]
    (PUBLIC_KEY_2, PUBLIC_KEY_3, "1",{gasLimit: 100000, gasPrice: 20000000, nonce: undefined,});
    const t = await transaction;
    console.log(t);

}
main();