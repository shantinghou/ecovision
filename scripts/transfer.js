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

const receiver = "0xd08322911D373f642d7d18Be3C1B478D02eF15a2"

async function main(){
    const eAvatar = await ethers.getContractAt('EAvatar', contractAddress);
    const symbol = await eAvatar.symbol();
    console.log(`Transferring ${symbol}#1 from collector ${collector} to another collector ${receiver} using contractOwner wallet...`);
    
    // getApproved()
    console.log(`Getting the account approved to spend ${symbol}#1...`);
    let NFT1Spender = await eAvatar.getApproved("1");
    console.log(`${NFT1Spender} has the approval to spend ${symbol}#$1\n`);

    const tx = await eAvatar.setApprovalForAll(contractAddress, true);
    await tx.wait();

    // Calling the safeTransferFrom() using the contractOwner instance
    oldOwner = await eAvatar.ownerOf("1");
    console.log(`owner of #1 = ${oldOwner}`)
    const transaction = await eAvatar[
        "safeTransferFrom(address,address,uint256)"
      ](oldOwner, receiver, "1", {
        gasLimit: 100000,
        gasPrice: 20000000,

        nonce: undefined,
      });
    const t = await transaction
    console.log(t);
    newOwner = await eAvatar.ownerOf("1");
    console.log(`Owner of ${symbol}#1: ${newOwner}\n`);

    // const transaction = await eAvatar.transferNFT(collector, receiver, ethers.utils.parseUnits("0.001", "ether"), "1", {
    //         gasLimit: 100000,
    //         nonce: undefined,
    //       })
    // const tx = await transaction
    // console.log(tx);
    // newOwner = await eAvatar.ownerOf("1")
    // console.log(`Owner of ${symbol}#1: ${newOwner}\n`);

    

    
}
main();