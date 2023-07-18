//mintNFT with owner address and contract address
const { ethers } = require("hardhat");
require("dotenv").config()
const API_URL = process.env.API_URL
const collector = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/EAvatar.sol/EAvatar.json")
const contractAddress = "0x174f85bB05f5E974bBC15fA87EC75c400Cc81f9B"
const receiver = "0xfF650AD783D278994eaa379A70C3958b79A1044c"



async function main(){
    const eAvatar = await ethers.getContractAt('EAvatar', contractAddress);
    const symbol = await eAvatar.symbol();
    console.log(`Transferring ${symbol}#1 from collector ${collector} to another collector ${receiver} using contractOwner wallet...`);
    
    // getApproved()
    console.log(`Getting the account approved to spend ${symbol}#1...`);
    let NFT1Spender = await eAvatar.getApproved("1");
    console.log(`${NFT1Spender} has the approval to spend ${symbol}#$1\n`);

    // Calling the safeTransferFrom() using the contractOwner instance
    await eAvatar[
        "safeTransferFrom(address,address,uint256)"
      ](collector, receiver, "1", {
        gasLimit: 100000,
        
        nonce: undefined,
      });
    newOwner = await eAvatar.ownerOf("1");
    console.log(`Owner of ${symbol}#1: ${newOwner}\n`);

    

    
}
main();