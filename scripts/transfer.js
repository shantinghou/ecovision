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
const CONTRACT_ADDRESS_EAVATAR = process.env.CONTRACT_ADDRESS_EAVATAR
const CONTRACT_ADDRESS_ECOITEM = process.env.CONTRACT_ADDRESS_ECOITEM
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PUBLIC_KEY_3 = process.env.PUBLIC_KEY_3

async function transfer(from, to, tokenId, contract){
    // Adjust as needed
    const symbol = await contract.symbol();
    const oldOwner = await contract.ownerOf(tokenId); // Adjust as needed
    console.log(oldOwner == from);
    console.log(`Owner of #1: ${oldOwner}`);
    console.log(`Transferring ${symbol}#1 from collector ${from} to 
    another collector ${to} using contractOwner wallet...`);

    // Comment this segment out if the contract owner wants to send the NFT
    console.log(`Approving contractOwner to spend collector ${symbol}#${1}...`);
    // Creates a new instance of the contract connected to the collector
    const receiverSigner = await ethers.getSigner(from)
    const collectorContract = contract.connect(receiverSigner); 
    await collectorContract.approve(to, tokenId);
    console.log(`contractOwner ${to} has been approved to 
    spend collector ${from} ${symbol}#${1}\n`);

    // Calling the safeTransferFrom() using the contractOwner instance
    // Transfer the NFT from the first address to the second; adjust as needed
    const transaction = await contract["safeTransferFrom(address,address,uint256)"]
    (from, to, tokenId,{gasLimit: 100000, gasPrice: 20000000, nonce: undefined,});
    const t = await transaction;
    console.log(t);

}
async function main(){
    //transfer eAvatar
    const eAvatar = await ethers.getContractAt('EAvatar', CONTRACT_ADDRESS_EAVATAR);
    transfer(PUBLIC_KEY, PUBLIC_KEY_3, 1, eAvatar);

    //transfer ecoItem
    const ecoItem = await ethers.getContractAt('EcoItems', CONTRACT_ADDRESS_ECOITEM);
    transfer(PUBLIC_KEY, PUBLIC_KEY_3, 1, ecoItem);
}

main();